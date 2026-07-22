# TASK-073 验收证据

> 范围：新建书签随机渐变缩略图、保存持久化及详情/基础视图回归
> 日期：2026-07-22

## 需求解释与数据边界

- fix_task 1.15 的“新建标签”按现有数据模型解释为 New Bookmark：Tag 仅有 `id`、`label`、`color`，没有 thumbnail。
- Bookmark 已有 `thumbnail` 字段，版本化示例数据使用 `blue`、`green`、`amber`、`coral`、`violet`、`gray` 六种键。
- 实现不新增字段、数据库迁移、网络请求或 AI 图片生成。

## TDD Red

```text
pnpm --dir ui exec vitest run src/features/bookmarks/thumbnail.test.ts src/components/NewBookmarkDialog.entry-modes.test.tsx
# 3 FAIL / 7 PASS
# randomBookmarkThumbnail 尚不存在，返回 undefined
# 组件实际保存 thumbnail="blue"，期望 "violet"

pnpm --dir ui exec playwright test tests/e2e/new-bookmark-random-thumbnail.spec.ts --workers=1
# 1 FAIL：本地资料库实际 thumbnail="blue"，期望 "violet"
```

集中配置后首次 Typecheck 暴露 `TS7053`：`MiniBrowser` 仍以任意 string 索引精确键对象。按系统化调试回退实现后，先增加解析器失败测试：有效键解析与未知/空键 gray 回退共 2 FAIL，再实现集中解析器并复用到 MiniBrowser/Masonry。

独立审查后的回归 Red：

```text
pnpm --dir ui exec vitest run src/features/bookmarks/thumbnail.test.ts
# 1 FAIL / 3 PASS：`__proto__` 实际命中 Object 原型并返回对象，期望 gray 渐变

pnpm --dir ui exec vitest run src/components/NewBookmarkDialog.entry-modes.test.tsx -t 'Manual 确认保存时写入随机渐变缩略图'
# 1 FAIL / 7 SKIP：无 favicon 夹具在 Save 前已调用一次 Math.random，无法隔离 thumbnail 保存时机
```

初始实现 Red 与 `__proto__` 回归 Red 均由目标行为或类型边界缺失导致；保存时机 Red 则明确暴露测试夹具把图标随机性与 thumbnail 随机性混在一起，随后在测试边界使用有效 favicon 隔离，未改动生产保存语义。

## Green / Refactor

```text
pnpm --dir ui exec vitest run src/features/bookmarks/icon.test.ts src/features/bookmarks/thumbnail.test.ts src/components/NewBookmarkDialog.entry-modes.test.tsx src/components/ui.test.tsx src/features/views/presenter.test.ts
# 5 files / 23 tests PASS / 1.64s

pnpm --dir ui typecheck
# PASS
```

- `config/thumbnail-gradients.ts` 成为六种键、渐变类与旧键回退的唯一配置来源。
- `randomBookmarkThumbnail` 接受可注入随机源，生产默认使用 `Math.random`。
- 通用 `pickRandomItem` 被 thumbnail 与既有 favicon 随机色共同复用，消除重复边界算法。
- `NewBookmarkDialog` 只在显式 Save 时调用一次随机选择器并写入 payload。
- `MiniBrowser` 与 `MasonryView` 复用 `resolveThumbnailGradient`，未知旧键继续安全回退 gray。
- 渐变解析器仅接受配置对象自身属性，`__proto__`、`constructor` 与 `toString` 均回退 gray。
- 保存时机组件测试使用有效 favicon 隔离图标随机源，明确断言 Save 前 0 次、Save 后 1 次随机调用与 1 次 `onCreate`。
- E2E 在持久化 `violet` 之外显式断言详情预览包含 violet 三段渐变类。

## 全量、覆盖率与静态检查

```text
pnpm --dir ui exec vitest run
# 97 files / 371 tests PASS / 14.77s

pnpm --dir ui test:coverage
# 97 files / 371 tests PASS / 16.36s
# 全项目：statements/lines 80.61%，branches 77.70%，functions 76.58%
# thumbnail-gradients.ts：lines/functions/branches 100%
# thumbnail.ts：lines/functions 100%，branches 50%
# random-item.ts：lines/functions 100%，branches 50%

pnpm --dir ui typecheck
# PASS

pnpm --dir ui lint
# PASS

pnpm --dir ui build
# PASS；仅存在既有动态导入与 chunk size warnings
```

全局行覆盖率 80.61% 仍低于项目 85% 目标，属于既有覆盖债务；按用户“不要询问、使用推荐意见”的授权采用任务范围风险例外。新增配置与纯函数行覆盖率均为 100%，随机区间、越界、Object 原型属性、保存时机、持久化和视觉关键路径均有直接断言，不将全局指标无条件报告为达标。

## Playwright E2E

```text
pnpm --dir ui exec playwright test tests/e2e/new-bookmark-random-thumbnail.spec.ts tests/e2e/bookmark-crud.spec.ts tests/e2e/new-bookmark-entry-modes.spec.ts tests/e2e/base-views.spec.ts --workers=1
# 9 tests PASS / 17.7s
```

- 随机缩略图 1/1 PASS。
- 书签 CRUD 4/4 PASS。
- Manual/Smart/Enter 入口 1/1 PASS。
- Card/List/Masonry 基础视图 3/3 PASS。
- Playwright 进程仅输出 `NO_COLOR` 被 `FORCE_COLOR` 覆盖的环境提示，不是应用错误。

## Playwright MCP 与视觉证据

- MCP 固定 `Math.random=0.75` 后创建 `MCP Violet Gradient Bookmark`。
- 本地资料库实际读取 `thumbnail="violet"`。
- 详情 DOM 实际类为 `from-violet2-500 via-violet2-400 to-accent-500`。
- 浏览器 console error：0。
- Baseline：`TASK-073-random-thumbnail-baseline.png`。
- Actual：`TASK-073-random-thumbnail-actual.png`。
- Diff：`TASK-073-random-thumbnail-diff.png`。
- MCP 截图：`TASK-073-random-thumbnail-mcp.png`。
- 指标：5,365 像素差异，`pixelDiffRatio=0.0058214`，低于 `0.08` 门限。

## 边界与风险

- 随机选择发生在 Save 时；重新渲染或进入预览不会改变已保存 thumbnail。
- 本任务不改变 Tag、Bookmark 或 Supabase/本地信封结构，既有 `thumbnail` round-trip 路径继续复用。
- 未访问真实第三方服务；测试使用版本控制中的 seed、本地模式与显式固定随机源，不读取真实凭据。
