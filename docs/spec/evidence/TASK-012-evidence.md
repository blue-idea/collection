# TASK-012 验收证据

> 日期：2026-07-18

## 命令与真实结果

```text
pnpm --dir ui exec vitest run src/domain/commands/bookmark-state src/features/bookmarks
 Test Files  3 passed (3)
      Tests  14 passed (14)

pnpm --dir ui exec playwright test tests/e2e/bookmark-state.spec.ts
  5 passed (8.3s)

pnpm --dir ui exec tsc --noEmit
（零 error）

pnpm --dir ui lint
（零 error）

pnpm --dir ui build
✓ built in 2.41s
```

### 关键场景

| 场景 | 结果 |
|------|------|
| 切换星标 / 置顶 | `aria-pressed` 立即更新，自动保存链路保留 |
| 外部打开成功 | visitCount +1，更新 lastVisitedAt |
| 外部打开失败 | visitCount 不变（Unit 覆盖） |
| 阅读状态 | 四种枚举可写；非法状态返回 READ_STATUS_INVALID |
| 阅读状态筛选 | 列表仅保留匹配项 |

## 截图

- `docs/spec/evidence/TASK-012-visit-count.png`
- `docs/spec/evidence/TASK-012-star-read-status.png`

## 实现文件

- `ui/src/domain/commands/bookmark-state.ts`
- `ui/src/features/bookmarks/visit.ts`
- `ui/src/features/bookmarks/external-url.ts`
- `ui/src/components/DetailPanel.tsx`、`ContentArea.tsx`、`App.tsx`
- `ui/tests/e2e/bookmark-state.spec.ts`
