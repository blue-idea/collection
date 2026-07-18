# TASK-015 验收证据

> 任务：分类与书签拖拽  
> 验收标准：REQ-011-AC-001~003、REQ-024-AC-006  
> 日期：2026-07-18

## 命令与结果

```text
pnpm --dir ui exec vitest run src/features/categories/drag
# ✓ 4 passed

pnpm --dir ui exec playwright test -g "分类拖拽|书签归类"
# ✓ 2 passed

pnpm --dir ui exec tsc --noEmit
pnpm --dir ui exec eslint ... --max-warnings 0
pnpm --dir ui run build
# 零 error
```

## 截图

| 文件 | 覆盖 AC |
|------|---------|
| `TASK-015-category-move.png` | REQ-011-AC-001、REQ-024-AC-006 |
| `TASK-015-bookmark-assign.png` | REQ-011-AC-003 |

## 实现要点

- `ui/src/features/categories/drag/`：`moveCategoryUnder`、`assignBookmarkToCategory`、`InvalidCategoryMoveError`、dnd-kit、Move category 对话框
- Sidebar HTML5 书签 drop + App 参数顺序修正（categoryId / bookmarkId）
