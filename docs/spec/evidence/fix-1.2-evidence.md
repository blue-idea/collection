# fix_task 1.2 验收证据

> 任务：分类图标设置（候选图标）  
> 日期：2026-07-19

## 命令

```bash
pnpm --dir ui exec vitest run src/domain/categories/categories.test.ts src/features/categories/SetCategoryIconDialog.test.tsx src/features/categories/drag/drag.test.ts
pnpm --dir ui exec playwright test tests/e2e/category-icon.spec.ts tests/e2e/category-drag.spec.ts
```

## 结果

- Unit：16 passed
- E2E：3 passed
- 截图：`docs/spec/evidence/fix-1.2-category-icon.png`

## 行为摘要

1. 侧栏分类悬停操作由 `Move category` 替换为 `Set category icon`。
2. 对话框提供扩充候选图标（>40）与 6 色 token，Save 后同时写入 `icon`/`color`。
3. 分类树移动仍通过拖拽（dnd-kit）完成；领域移动单测保持通过。
