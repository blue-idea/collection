# TASK-013 验收证据

> 日期：2026-07-18

## 命令与真实结果

```text
pnpm --dir ui exec vitest run src/domain/query
 Test Files  1 passed (1)
      Tests  7 passed (7)

pnpm --dir ui exec playwright test tests/e2e/bookmark-query.spec.ts
  2 passed (5.7s)

pnpm --dir ui exec tsc --noEmit
（零 error）

pnpm --dir ui lint
（零 error）

pnpm --dir ui build
✓ built in 2.41s
```

## 排序筛选用例矩阵（实际返回 ID）

| 场景 | 输入要点 | 实际 ID 顺序 |
|------|----------|--------------|
| sort=recent | 含 null lastVisitedAt | b-recent, b-mid, b-old, b-never |
| sort=created | 四条不同 createdAt | b-mid, b-recent, b-never, b-old |
| sort=visits | 30/10/5/0 | b-old, b-mid, b-recent, b-never |
| sort=title | Alpha/Beta/Delta/Zeta | b-mid, b-never, b-old, b-recent |
| pinned+title | 2 pinned + 2 normal | p-a, p-b, n-a, n-b |
| pinned+visits | 同上 | p-b, p-a, n-a, n-b |
| 交集筛选 | 星标∧双标签∧30d∧reading | keep |
| 清除后 query | 3 条 scoped + title | b, a, c（pinned 优先） |

## 截图

- `docs/spec/evidence/TASK-013-clear-filters.png`

## 实现文件

- `ui/src/domain/query/index.ts`
- `ui/src/config/query.ts`
- `ui/src/App.tsx`、`ui/src/components/ContentArea.tsx`
- `ui/src/domain/query/query.test.ts`
- `ui/tests/e2e/bookmark-query.spec.ts`
