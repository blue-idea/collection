# TASK-014 验收证据

> 日期：2026-07-18

## 命令与真实结果

```text
pnpm --dir ui exec vitest run src/domain/categories src/features/categories
 Test Files  2 passed (2)
      Tests  10 passed (10)

pnpm --dir ui exec playwright test -g "分类创建|分类删除"
  2 passed (6.6s)

pnpm --dir ui exec tsc --noEmit
（零 error）

pnpm --dir ui lint / pnpm --dir ui build
（零 error）
```

### 删除前后关系（Unit 样本）

| 策略 | 结果 |
|------|------|
| move-then-delete(`cat-child`) | 删除 child；grand.parentId→root；bm-child.categoryId→root |
| recursive-delete + 二次确认 | 删除 child+grand；bm-child/bm-grand.categoryId→null |
| cancel | LibraryData 引用不变 |

## 截图

- `docs/spec/evidence/TASK-014-category-create.png`
- `docs/spec/evidence/TASK-014-category-delete.png`

## 实现文件

- `ui/src/domain/categories/index.ts`
- `ui/src/features/categories/*`
- `ui/src/components/Sidebar.tsx`、`ui/src/App.tsx`
- `ui/tests/e2e/category-crud.spec.ts`
