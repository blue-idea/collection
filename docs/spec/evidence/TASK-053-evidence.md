# TASK-053 证据记录

> 任务：主题视图添加书签入口与挑选器  
> 验收标准：REQ-012-AC-006~010

## RED

- 组件测试：`AddBookmarksToCollectionDialog` 模块不存在，Vitest 解析失败（feature missing）。

## GREEN

```text
pnpm --dir ui exec vitest run src/features/collections/AddBookmarksToCollectionDialog.test.tsx
→ PASS，3 tests

pnpm --dir ui exec playwright test tests/e2e/collection-membership.spec.ts --workers=1
→ PASS，2 tests

pnpm --dir ui typecheck
→ PASS
```

## 截图

- `docs/spec/evidence/TASK-053-add-bookmarks-picker.png`
- `docs/spec/evidence/TASK-053-empty-add-cta.png`

## 实现要点

- `AddBookmarksToCollectionDialog`：搜索 / 多选 / Confirm 禁用 / Cancel 零副作用
- `ContentArea`：主题视图工具栏 `Add bookmarks`；空态 CTA
- `App`：`runBatchSetMembership(member: true)`；Esc 浮层 `add-bookmarks`
