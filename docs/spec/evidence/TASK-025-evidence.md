# TASK-025 验收证据

> 日期：2026-07-18

## 命令与结果

```text
pnpm --dir ui exec playwright test tests/e2e/local-mvp --workers=1
# 6 passed
```

## 操作计数（REQ-028-AC-001~003）

见 `docs/spec/evidence/TASK-025-action-counts.json`：

| AC | 路径 | primaryActions | 上限 |
|----|------|:--------------:|:----:|
| AC-001 | new-bookmark | 3 | 3 |
| AC-002 | spotlight-open | 2 | 3 |
| AC-003 | organize-tag | 1 | 3 |

## 视觉证据（REQ-028-AC-004）

| 画面 | Baseline | Actual |
|------|----------|--------|
| 主窗口 | `TASK-025-main-window-baseline.png` | `TASK-025-main-window-actual.png` |
| 六视图 | `TASK-025-six-views-baseline.png` | `TASK-025-six-views-actual.png` |
| 设置 | `TASK-025-settings-baseline.png` | `TASK-025-settings-actual.png` |

Playwright `toHaveScreenshot` 在 `maxDiffPixelRatio: 0.03` 下通过（无未批准 Diff）。

## 旅程截图

- `TASK-025-local-mvp-journey.png`
