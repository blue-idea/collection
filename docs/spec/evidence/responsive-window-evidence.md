# 主窗口响应式扩展验收证据

> 日期：2026-07-19

## TDD

| 阶段 | 命令 | 真实结果 |
|------|------|----------|
| Red | `pnpm --dir ui exec vitest run src/features/shell/AppShell.test.tsx` | 1 test FAIL，检测到 `md:max-w-[1400px]` 与 `md:max-h-[880px]` |
| Red | `pnpm --dir ui exec playwright test tests/visual/responsive-window.spec.ts --workers=1` | 1920×1080 下实测宽度仍为 1400px，尺寸断言失败 |
| Green | 相同 Vitest 命令 | 1 test PASS |
| Green | 相同 Playwright 命令 | 1 test PASS；实测壳体为 1872×1032 |

## QA

| 命令 | 真实结果 |
|------|----------|
| `pnpm --dir ui typecheck` | PASS，0 error |
| `pnpm --dir ui lint` | PASS，0 error |
| `pnpm --dir ui build` | PASS；保留 2 条既有混合导入提示 |
| `pnpm --dir ui exec vitest run` | 59 files、248 tests PASS |
| `pnpm --dir ui exec playwright test tests/e2e/app-shell.spec.ts tests/visual/responsive-window.spec.ts --workers=1` | 6 tests PASS，含快捷键、拖入 URL、axe 无障碍与大窗口视觉回归 |

## 视觉证据

- `responsive-window-1920x1080-baseline.png`
- `responsive-window-1920x1080-actual.png`
- `responsive-window-1920x1080-diff.png`
- `responsive-window-diff-metric.txt`

Playwright MCP 独立 Chromium 仍因字面量 `%USERNAME%` 浏览器路径而 `BLOCKED`；项目 Playwright Test 已使用实际 Chromium 完成截图与尺寸测量。
