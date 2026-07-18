# TASK-020 验收证据

> 任务：实现 Timeline、Tag Aggregation、Theme Space  
> 验收标准：REQ-016-AC-001~004、REQ-028-AC-004  
> 日期：2026-07-18

## 命令与结果

```text
pnpm --dir ui exec vitest run src/domain/views
# ✓ 4 passed

pnpm --dir ui exec playwright test -g "Timeline|Tag Aggregation|Theme Space"
# ✓ 3 passed

pnpm --dir ui exec tsc --noEmit -p tsconfig.app.json
pnpm --dir ui exec eslint src/domain/views src/features/views src/components/ContentArea.tsx --max-warnings 0
pnpm --dir ui run build
# 零 error
```

## 截图

| 文件 | 覆盖 AC |
|------|---------|
| `TASK-020-timeline-baseline.png` / `TASK-020-timeline-actual.png` | REQ-016-AC-001、REQ-028-AC-004 |
| `TASK-020-tag-aggregation-baseline.png` / `TASK-020-tag-aggregation-actual.png` | REQ-016-AC-003、REQ-028-AC-004 |
| `TASK-020-theme-space-baseline.png` / `TASK-020-theme-space-actual.png` | REQ-016-AC-004、REQ-028-AC-004 |

Playwright Snapshot 源：`ui/tests/e2e/aggregate-views.spec.ts-snapshots/`

## 实现要点

- `ui/src/domain/views/`：Timeline / Tag / Theme 聚合投影
- `TimelineView`：时间源切换 + 行虚拟化
- `TagAggregationView`：标签分组计数 + 行虚拟化
- `ThemeSpaceView`：主题容器虚拟化，成员嵌套在容器内
- `ViewDensity` 扩展含 `timeline` / `tag-aggregation` / `theme-space`
