# TASK-048 验收证据

> 日期：2026-07-19  
> 任务：书签项直接访问入口  
> 需求：REQ-008-AC-005

---

## 真实执行命令

| 命令 | 结果 |
|------|:----:|
| `pnpm --dir ui exec vitest run src/features/views/BookmarkItemActions.test.tsx` | PASS，2 tests |
| `pnpm --dir ui exec vitest run src/features/views src/features/bookmarks/visit.test.ts` | PASS，4 files / 9 tests |
| `pnpm --dir ui typecheck` | PASS |
| `pnpm --dir ui lint` | PASS |
| `pnpm --dir ui build` | PASS，Vite 输出 2 条既有 chunk warning |
| `pnpm --dir ui exec vitest run` | PASS，64 files / 262 tests |
| `pnpm --dir ui exec playwright test tests/e2e/bookmark-actions.spec.ts --workers=1 --update-snapshots` | PASS，生成 TASK-048 baseline |
| `pnpm --dir ui exec playwright test tests/e2e/bookmark-actions.spec.ts --workers=1` | PASS，4 tests |

---

## 视觉证据

| 类型 | 路径 | 说明 |
|------|------|------|
| Baseline | `docs/spec/evidence/TASK-048-direct-access-baseline.png` | Card 视图直达入口基线 |
| Actual | `docs/spec/evidence/TASK-048-direct-access.png` | 常规 E2E 执行保存的实际主窗口截图 |
| Diff | `docs/spec/evidence/TASK-048-direct-access-diff.png` | 常规 Playwright screenshot 对比通过，diff metric 为 0 |
| Metric | `docs/spec/evidence/TASK-048-direct-access-diff-metric.txt` | `pixelDiffRatio=0.0000` |

---

## BLOCKED

| 项目 | 状态 | 原因 | 替代证据 |
|------|:----:|------|----------|
| Playwright MCP screenshot | BLOCKED | MCP 运行环境缺少 `chromium_headless_shell-1200` 可执行文件 | Playwright CLI E2E 与截图已真实执行并保存 |
