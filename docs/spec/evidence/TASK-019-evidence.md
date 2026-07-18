# TASK-019 验收证据

> 任务：实现 Card、List、Masonry 基础视图  
> 验收标准：REQ-015-AC-001~003、REQ-028-AC-004  
> 日期：2026-07-18

## 命令与结果

```text
pnpm --dir ui exec vitest run src/features/views
# ✓ 4 passed

pnpm --dir ui exec playwright test -g "Card|List|Masonry"
# ✓ 3 passed

pnpm --dir ui exec tsc --noEmit -p tsconfig.app.json
pnpm --dir ui exec eslint src/features/views src/components/ContentArea.tsx src/components/ui.tsx --max-warnings 0
pnpm --dir ui run build
# 零 error
```

## 截图与 DOM 记录

| 文件 | 覆盖 AC |
|------|---------|
| `TASK-019-card-baseline.png` / `TASK-019-card-actual.png` | REQ-015-AC-001、REQ-028-AC-004 |
| `TASK-019-list-baseline.png` / `TASK-019-list-actual.png` | REQ-015-AC-002、REQ-028-AC-004 |
| `TASK-019-masonry-baseline.png` / `TASK-019-masonry-actual.png` | REQ-015-AC-003、REQ-028-AC-004 |
| `TASK-019-dom-counts.json` | REQ-015-AC-003（masonryOverlaps=0, columns=3） |

Playwright Snapshot 源：`ui/tests/e2e/base-views.spec.ts-snapshots/`

## 实现要点

- `ui/src/features/views/presenter.ts`：三视图共享 BookmarkPresenter
- `ui/src/features/views/layout.ts`：`detectOverlaps`、`assignMasonryColumns`
- `CardView` / `ListView`：TanStack Virtual 行虚拟化
- `MasonryView`：列分配布局，验收保证无重叠
- `ContentArea` 接入三视图；`Segmented` 增加 `aria-label` / `aria-pressed`
