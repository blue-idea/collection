# TASK-054 证据记录

> 任务：主题视图移出成员  
> 验收标准：REQ-012-AC-011、REQ-026-AC-003

## RED

- `BookmarkItemActions` 缺少 `Remove from collection` 按钮 → 组件测试失败
- `RemoveFromCollectionDialog` 模块缺失 → 套件无法解析

## GREEN

```text
pnpm --dir ui exec vitest run src/features/views/BookmarkItemActions.test.tsx src/features/collections/RemoveFromCollectionDialog.test.tsx
→ PASS，6 tests

pnpm --dir ui exec playwright test tests/e2e/collection-membership.spec.ts --workers=1
→ PASS，3 tests

pnpm --dir ui typecheck
→ PASS
```

## 截图

- `docs/spec/evidence/TASK-054-remove-from-collection.png`

## 实现要点

- 主题视图书签项 `Remove`（aria: Remove from collection）立即 `member: false`
- 多选工具栏 `Remove from collection` + 确认对话框，确认前零副作用
- 移出不删除书签记录
