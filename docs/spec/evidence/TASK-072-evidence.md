# TASK-072 验收证据

> 范围：分类名称双击展开/折叠及单击、Chevron、拖拽回归
> 日期：2026-07-22

## TDD Red

```text
pnpm --dir ui exec vitest run src/components/Sidebar.category-double-click.test.tsx
# FAIL：双击父分类名称未触发展开回调；Sidebar 回调尚未提供当前实际展开值

pnpm --dir ui exec playwright test tests/e2e/category-name-double-click.spec.ts --workers=1
# FAIL：双击分类名称后子分类仍可见
```

失败均由目标交互缺失导致，不是语法、选择器或测试环境错误。

## Green / Refactor

```text
pnpm --dir ui exec vitest run src/components/Sidebar.category-double-click.test.tsx src/components/Sidebar.category-label.test.tsx src/components/Sidebar.rename.test.tsx
# 3 files / 9 tests PASS / 693ms

pnpm --dir ui exec vitest run src/features/categories/drag/drag.test.ts
# 1 file / 4 tests PASS / 495ms
```

- `NavRow` 仅在名称可展开时绑定双击处理，并阻止双击继续冒泡到行单击。
- `Sidebar` 以同一 `toggleExpand` 回调服务名称双击与 Chevron，叶子分类不创建切换回调。
- `Sidebar` 将当前实际 `isExpanded` 传给 App；App 直接写入其反值，修复默认展开根分类第一次切换无效的问题。
- 分类选择、重命名、分类领域拖拽和书签归类保持回归覆盖。

## 全量、覆盖率与静态检查

```text
pnpm --dir ui exec vitest run
# 96 files / 366 tests PASS / 6.47s

pnpm --dir ui test:coverage
# 96 files / 366 tests PASS / 7.76s
# 全项目：statements/lines 73.20%，branches 77.65%，functions 73.52%
# Sidebar.tsx：statements/lines 89.30%，branches 75.34%

pnpm --dir ui typecheck
# PASS

pnpm --dir ui lint
# PASS

pnpm --dir ui build
# PASS；仅存在既有动态导入与 chunk size warnings
```

全局行覆盖率低于项目 85% 目标，属于既有覆盖债务；按用户“不要询问、使用推荐意见”的授权采用任务范围风险例外。本任务名称单击、父分类双击、叶子双击、默认展开首次切换、Chevron 和拖拽回归均有直接自动化证据，不将全局指标无条件报告为达标。

## Playwright E2E

```text
pnpm --dir ui exec playwright test tests/e2e/category-name-double-click.spec.ts tests/e2e/category-crud.spec.ts tests/e2e/category-drag.spec.ts --workers=1
# 7 tests PASS / 13.7s
```

- 分类 CRUD 4/4 PASS。
- 分类操作与书签归类 2/2 PASS。
- 分类名称双击、单击与 Chevron 组合旅程 1/1 PASS。
- Playwright 进程仅输出 `NO_COLOR` 被 `FORCE_COLOR` 覆盖的环境提示，不是应用错误。

## Playwright MCP 与视觉证据

- Playwright MCP 验证切换前 `expanded=true` 且子分类可见。
- 双击“技术”后 `expanded=false` 且子分类不可见，浏览器控制台无 error。
- Baseline：`TASK-072-category-name-double-click-baseline.png`。
- Actual：`TASK-072-category-name-double-click-actual.png`。
- Diff：`TASK-072-category-name-double-click-diff.png`。
- MCP 截图：`TASK-072-category-name-double-click-mcp.png`。
- 指标：45 像素差异，`pixelDiffRatio=0.0000488281`，低于 `0.08` 门限。

## 边界与风险

- 本任务不改变分类、书签或数据库结构，只改变侧栏事件路由和展开状态写入语义。
- 未新增网络请求、第三方依赖、密钥读取或持久化字段。
- 视觉差异仅来自分类折叠后的预期树状态，Diff 比例远低于门限。
