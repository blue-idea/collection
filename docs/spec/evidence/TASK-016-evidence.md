# TASK-016 验收证据

> 任务：主题 CRUD 与双向成员关系  
> 验收标准：REQ-012-AC-001~004、REQ-026-AC-003  
> 日期：2026-07-18

## 命令与结果

```text
pnpm --dir ui exec vitest run src/domain/collections src/features/collections src/domain/commands/membership.test.ts
# ✓ 14 passed

pnpm --dir ui exec playwright test -g "主题 CRUD|主题成员"
# ✓ 3 passed

pnpm --dir ui exec tsc --noEmit
pnpm --dir ui exec eslint src --max-warnings=0
pnpm --dir ui run build
# 零 error
```

## 截图

| 文件 | 覆盖 AC |
|------|---------|
| `TASK-016-collection-create.png` | REQ-012-AC-001 |
| `TASK-016-collection-members.png` | REQ-012-AC-004 |
| `TASK-016-collection-delete.png` | REQ-012-AC-002 |

## 实现要点

- `ui/src/domain/collections/`：`createCollection` / `updateCollection` / `deleteCollection` / `listCollectionMembers`
- `ui/src/features/collections/`：适配层、表单与删除对话框
- App/Sidebar：主题 CRUD 入口；`toggleCollection` / `addToCollection` 走领域成员命令保持双向一致
