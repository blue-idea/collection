# TASK-052 证据记录

> 任务：主题批量成员命令与候选过滤  
> 验收标准：REQ-012-AC-007、008、009、011；REQ-026-AC-003

## RED

```text
pnpm --dir ui exec vitest run src/domain/commands/membership.test.ts src/features/collections/membership-candidates.test.ts src/features/collections/apply-collection-command.test.ts
```

- 结果：FAIL，8 failed / 7 passed
- 失败原因：`batchSetBookmarkCollectionMembership`、`listMembershipCandidates`、`toggleCandidateSelection`、`runBatchSetMembership` 均为 `undefined`

## GREEN

```text
pnpm --dir ui exec vitest run src/domain/commands/membership.test.ts src/features/collections/membership-candidates.test.ts src/features/collections/apply-collection-command.test.ts
```

- 结果：PASS，3 files / 15 tests

```text
pnpm --dir ui typecheck
```

- 结果：PASS

## 实现要点

- `ui/src/domain/commands/index.ts`：`batchSetBookmarkCollectionMembership` 一次校验、一次返回新 LibraryData
- `ui/src/features/collections/membership-candidates.ts`：排除已成员 + 搜索 + 多选
- `ui/src/features/collections/apply-collection-command.ts`：`runBatchSetMembership` 适配投影
- `ui/src/config/domain.ts`：补充 `bookmarksNotFound` 与 `collectionMembershipBatchChanged` 事件名
