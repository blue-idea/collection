# TASK-001 验收证据

> 日期：2026-07-16
>
> 环境：macOS Darwin arm64、Go 1.26.5、Node.js 24.14.1、pnpm 10.33.0、Wails 2.13.0

## TDD 证据

### RED

命令：

```bash
go test internal/scaffold/scaffold_test.go -v
```

真实结果：`FAIL`。测试分别报告缺少 `wails.json`、`go.mod`、`main.go`，以及 `packageManager` 为空。失败原因是 TASK-001 骨架尚未实现，不是测试语法或环境错误。

### GREEN / REFACTOR

命令：

```bash
go test ./internal/scaffold -v
```

真实结果：4 个子测试全部 `PASS`：

- Wails 配置指向现有 `ui` 前端并统一使用 pnpm。
- Go module 锁定项目路径与 Wails v2.13.0。
- Wails 入口嵌入前端产物并使用集中配置。
- 前端仅保留 pnpm 锁文件并锁定 pnpm 10.33.0。

## 静态检查与构建

| 命令 | 实际结果 |
|------|---------|
| `pnpm --dir ui install --frozen-lockfile` | exit 0，`Lockfile is up to date` |
| `go test ./... -cover` | exit 0；骨架测试通过；当前生产入口无可覆盖业务分支，报告 0.0% statements |
| `go vet ./...` | exit 0，无输出 |
| `pnpm --dir ui typecheck` | exit 0 |
| `pnpm --dir ui lint` | exit 0，无 error / warning |
| `pnpm --dir ui build` | exit 0，1530 modules transformed；存在既有单包体积提示 |
| `wails build -clean -platform darwin/arm64` | exit 0，生成 `Linkit.app`，最近一次验证耗时 3.514s |
| `wails build -clean -platform windows/amd64` | exit 0，生成 `linkit.exe`，最近一次验证耗时 2.724s |

## 运行与视觉证据

- macOS 打包应用启动后观察到进程：`Linkit.app/Contents/MacOS/linkit`。
- 原生窗口截图因 macOS Screen Recording 权限返回 `could not create image`，未伪造截图结论。
- 使用 Playwright 在相同 React UI 中进入本地模式，语义选择器确认以下区域可见：
  - Sidebar：`资料库`
  - Content Area：`全部收藏`
  - Detail Panel：`AI 摘要`
  - Top bar：`新增`
- Baseline 从 Git `HEAD` 提取的临时只读 UI 生成；Actual 从当前 TASK-001 工作树生成。
- ImageMagick 像素比较实际输出：`0 (0)`，无视觉差异。
- 上述 Playwright 与视觉 Diff 仅验证 React/Vite UI；由于原生窗口截图受系统权限阻止，不能替代 Wails 容器内的最终 E2E 证据。

证据文件：

- `docs/spec/evidence/TASK-001-main-window-baseline.png`
- `docs/spec/evidence/TASK-001-main-window-actual.png`
- `docs/spec/evidence/TASK-001-main-window-diff.png`
- `docs/spec/evidence/TASK-001-ui-recon.png`（登录入口探索截图）
- `docs/spec/evidence/TASK-001-main-window.png`（主窗口探索截图）

## BLOCKED 项

1. Wails 原生主窗口内的三区域与顶栏可操作证据未取得，需授权 macOS Screen Recording 或由 TASK-043 执行桌面 E2E。
2. 真实 Windows 关键旅程与 Ctrl/窗口控件惯例未执行，依赖 TASK-042 的 Windows 主机。
3. 持久化失败英文错误与恢复状态尚未实现，依赖 TASK-006 / TASK-007。
