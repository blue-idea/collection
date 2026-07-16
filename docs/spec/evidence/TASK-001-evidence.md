# TASK-001 验收证据

> 日期：2026-07-16
> 环境：macOS Darwin arm64、Go 1.26.5、Node.js 24.14.1、pnpm 10.33.0、Wails 2.13.0
> 验收标准：REQ-027-AC-004

---

## TDD 证据

### RED

`go test ./internal/scaffold/...` 首次返回 exit 1，工程入口未满足嵌入目录契约。失败来自目标骨架缺失，不是测试语法错误。

### GREEN / REFACTOR

`go test ./internal/scaffold/...` 返回 exit 0，四个子场景覆盖：

- Wails 配置指向现有 `ui` 前端并统一使用 pnpm。
- Go module 锁定项目路径、Go 1.26 与 Wails v2.13.0。
- Wails 入口嵌入前端产物并使用集中配置。
- 仓库只保留 pnpm 锁文件并锁定 pnpm 10.33.0。

Lint 修复后将 Wails 自动生成绑定排除在应用源码规则之外；图标改为在 `ui/src/config/icons.ts` 显式注册实际使用项，移除全量 `lucide-react` 导入和双重类型断言。

---

## 静态检查与构建

| 命令 | 实际结果 |
|------|---------|
| `pnpm --dir ui install --frozen-lockfile` | exit 0；锁文件未变化；仅允许 `esbuild` 已知构建脚本 |
| `go test ./...` | exit 0；工程契约测试通过 |
| `go vet ./...` | exit 0；无输出 |
| `pnpm --dir ui typecheck` | exit 0 |
| `pnpm --dir ui lint` | exit 0；无 error / warning |
| `pnpm --dir ui build` | exit 0；1531 modules；最大 chunk 214.62 kB；无大包 warning |
| `wails build -platform darwin/arm64 -clean` | exit 0；生成 `Linkit.app`；最近一次耗时 5.376s |
| `wails build -platform windows/amd64 -clean` | exit 0；生成 `linkit.exe`；最近一次耗时 3.853s |

Windows 结果为 Wails 交叉构建证据，不冒充真实 Windows 桌面旅程。真实完整旅程按 requirements 1.3.0 在 TASK-042 或 TASK-043 中选择一个平台执行。

---

## macOS 运行冒烟

重新生成 macOS 包后直接启动：

```text
build/bin/Linkit.app/Contents/MacOS/linkit
app_running=true
```

进程持续运行 3 秒后由测试主动终止，证明打包应用能够启动。

---

## Playwright 视觉回归

Playwright MCP 使用 Chromium 1280×720 打开 Vite UI，选择 `使用本地模式（无需登录）` 后确认：

- Sidebar、Content Area、Detail Panel 与顶栏均可见。
- 收藏卡片、分类/主题图标和详情操作均正常渲染。
- 浏览器控制台无 error。

Baseline 与 Actual 均为 1280×720。ImageMagick 使用 2% 抗锯齿容差比较：

```text
5440 / 921600 pixels = 0.590278%
RMSE normalized = 0.00673279
```

人工复核未发现布局位移、图标缺失或组件样式变化。差异集中在 Chromium 版本变化产生的字体与 SVG 抗锯齿边缘。

证据文件：

- `docs/spec/evidence/TASK-001-main-window-baseline.png`
- `docs/spec/evidence/TASK-001-main-window-actual-v2.png`
- `docs/spec/evidence/TASK-001-main-window-diff-v2.png`
- `docs/spec/evidence/TASK-001-main-window-diff-v2-metric.txt`

---

## 未解决风险

- TASK-001 无未解决 FAIL 或 BLOCKED。
- Windows/macOS 完整关键旅程由 TASK-042/043 跟踪，至少选择一个平台执行；另一平台必须保留构建证据。
- 持久化失败与恢复 UI 由 TASK-006/007/028 覆盖，不再错误绑定到工程骨架任务。
