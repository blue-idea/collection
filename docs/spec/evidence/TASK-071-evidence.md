# TASK-071 验收证据

> 范围：New Bookmark Manual 零 AI、Smart/Enter 智能分析与入口视觉回归
> 日期：2026-07-22

## TDD Red

```text
pnpm --dir ui exec vitest run src/components/NewBookmarkDialog.entry-modes.test.tsx
# FAIL：3 个测试中 2 个失败；找不到 Manual / Smart，Enter 既有智能路径通过

pnpm --dir ui exec vitest run src/features/bookmarks/analysis.test.ts
# FAIL：2 个断言失败；元数据/手动预览尚未透传 faviconUrl 与 faviconDataUrl

pnpm --dir ui exec playwright test tests/e2e/new-bookmark-entry-modes.spec.ts --workers=1
# FAIL：Manual 按钮不存在

# 竞态回归 Red：关闭并重开后解析旧 Manual / Smart 延迟结果
# FAIL：旧标题覆盖新 URL 会话并错误进入 Save 预览
```

失败均由目标行为缺失导致，不是语法或测试环境错误。

## Green / Refactor

```text
pnpm --dir ui exec vitest run src/components/NewBookmarkDialog.entry-modes.test.tsx src/features/bookmarks/analysis.test.ts src/components/NewBookmarkDialog.ai-tags.test.tsx
# 3 files / 13 tests PASS
```

- `resolveBookmarkAnalysis` 继续作为 Manual 元数据编排的唯一实现，并补齐图标字段。
- `beginPreview` 统一重复 URL 门禁与 loading 状态。
- `applyReviewPreview` 统一 Manual/Smart 的标题、描述、分类、标签与图标状态写入。
- Manual 不构造 AI context，也不触发 `wailsAnalyzeClient`；Smart 与 Enter 复用同一函数。
- `previewRequestIdRef` 在关闭、重开、上下文变化与卸载时使旧请求失效，Manual/Smart 完成后仅允许当前请求应用结果。
- 组件回归直接覆盖 Manual favicon 保存、Manual 重复 URL 零请求、Smart/Enter 保存前 `onCreate=0` 与两条旧请求竞态。

## 全量、覆盖率与静态检查

```text
pnpm --dir ui exec vitest run
# 95 files / 363 tests PASS

pnpm --dir ui test:coverage
# 95 files / 363 tests PASS
# 全项目：lines/statements 72.85%，branches 77.49%，functions 73.01%
# 变更纯函数 analysis.ts：lines 95.83%，functions 100%，branches 61.53%

pnpm --dir ui typecheck
# PASS

pnpm --dir ui lint
# PASS

pnpm --dir ui build
# PASS；仅存在既有动态导入与 chunk size warnings
```

全局覆盖率低于项目 85% 目标属于既有覆盖债务；按用户“不要询问、使用推荐意见”的授权采用任务范围风险例外。本任务 Manual、Smart、Enter、元数据成功/失败、重复 URL、favicon 保存、旧请求失效及零 AI 关键路径均有直接断言，且不将全局指标无条件标记为达标。

## Playwright E2E

```text
pnpm --dir ui exec playwright test tests/e2e/new-bookmark-entry-modes.spec.ts tests/e2e/bookmark-crud.spec.ts tests/e2e/ai-bookmark-analysis.spec.ts tests/e2e/local-mvp/core-paths.spec.ts tests/e2e/local-mvp/journeys.spec.ts --workers=1
# 13 tests PASS / 22.4s
```

## Playwright MCP 与视觉证据

- Playwright MCP 实际页面可见 `Cancel / Manual / Smart`，无 `Analyze`。
- MCP 点击 Manual 后观测：`metadata=1`、`ai=0`、标题为 `Metadata preview title`，Save 可见。
- Baseline：`TASK-071-entry-modes-baseline.png`。
- Actual：`TASK-071-entry-modes-actual.png`。
- Diff：`TASK-071-entry-modes-diff.png`。
- MCP 截图：`TASK-071-entry-modes-mcp.png`。
- 指标：10 像素差异，`pixelDiffRatio=0.0000624376`，低于 `0.08` 门限。

## 边界与风险

- 未执行真实第三方 AI 调用；真实 AI 服务总验收继续由 TASK-037 跟踪，未以固定响应冒充真实服务结果。
- 本任务不新增数据库结构、迁移、网络端点或 AI 请求。
- 测试使用版本控制中的本地 seed 与显式 Wails 测试替身，不读取或输出任何真实凭据。
