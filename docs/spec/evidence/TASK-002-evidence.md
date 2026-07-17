# TASK-002 验收证据

> 日期：2026-07-18
> 环境：Windows 10、Node.js / pnpm 10.33.0、Playwright Chromium 149
> 验收标准：REQ-024-AC-006、REQ-028-AC-004

---

## TDD 证据

### RED

首次 `pnpm --dir ui test --run` 在缺少 Vitest / jsdom 配置时无法作为产品测试入口运行；配置完成后组件测试曾因 `toHaveAccessibleName` 与 `kbd` 语义不匹配失败，随后收敛为文本断言。

E2E 冒烟首次失败原因：

- `getByText('网址收藏管理')` / `Lattice` 命中多个节点（strict mode）
- 全页 axe 严重级清零超出本任务范围（归 TASK-022）

### GREEN

- Vitest + React Testing Library + V8 Coverage 可运行
- Playwright 列出并执行 e2e / visual 用例
- axe-core 可对主窗口执行分析，并验证顶栏核心控件可访问名称
- Husky pre-commit / pre-push 与 GitHub Actions 骨架通过 `verify:quality-config`

---

## 命令与真实结果

| 命令 | 实际结果 |
|------|---------|
| `pnpm --dir ui verify:quality-config` | exit 0；`Quality configuration is valid` |
| `pnpm --dir ui test --run` | exit 0；2 files / 3 tests passed |
| `pnpm --dir ui test:coverage` | exit 0；生成 V8 coverage 报告；`format-date.ts` 100% |
| `pnpm --dir ui exec playwright test --list` | exit 0；Total: 3 tests in 3 files |
| `pnpm --dir ui test:e2e` | exit 0；2 passed |
| `pnpm --dir ui test:visual` | exit 0；Baseline 匹配通过 |
| `pnpm --dir ui typecheck` | exit 0 |
| `pnpm --dir ui lint` | exit 0 |
| `pnpm --dir ui build` | exit 0；最大 chunk 214.62 kB |
| `go test ./internal/scaffold/...` | exit 0 |

说明：根模块 `go test ./...` 在本地曾因无法从 `proxy.golang.org` 下载 Wails 依赖而失败；与本任务无关的工程契约测试 `./internal/scaffold/...` 已通过。完整 Go module 下载与桌面构建由 CI / 后续桌面任务验证。

---

## 视觉回归证据

- Baseline：`docs/spec/evidence/TASK-002-main-window-baseline.png`
- Actual：`docs/spec/evidence/TASK-002-main-window-actual.png`
- Diff 指标：`docs/spec/evidence/TASK-002-main-window-diff-metric.txt`（0% 像素差异）
- Playwright Snapshot：`ui/tests/visual/main-window.spec.ts-snapshots/main-window-baseline.png`

---

## 范围说明

- REQ-024-AC-006：本任务验证测试框架可检测顶栏核心控件可访问名称，并接入 axe-core；全页 WCAG 严重级清零由 TASK-022 负责。
- REQ-028-AC-004：本任务建立 Playwright Screenshot 流程，并归档 Baseline / Actual / Diff 指标。
