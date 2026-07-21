# TASK-064 验收证据

> 任务：修复 Windows 托盘 Quit 无法退出
> 日期：2026-07-22

## 根因证据

- `energye/systray` 的 Windows 托盘隐藏窗口（HWND）与 `GetMessage` 消息循环原本可能位于不同 OS 线程。
- Win32 窗口的创建、消息循环与销毁需要保持在线程一致的生命周期内；线程漂移会导致 `systray.Quit()` 的清理消息无法被正确处理。
- 托盘菜单回调原本同步进入 Wails 窗口退出，同时 Wails 先结束消息循环，存在原生消息回调重入和托盘清理晚于应用退出的问题。

## 修复证据

- `internal/tray/systray_runner_windows.go`：专用 goroutine 调用 `runtime.LockOSThread()`，并在该线程运行 `systray.Run()`。
- `internal/tray/systray_runner_other.go`：macOS/Linux 继续使用第三方包的 `RunWithExternalLoop()`，不引入 Windows 专用线程策略。
- `internal/tray/menu.go`：Show/Quit 回调异步派发，避免阻塞或重入原生托盘消息回调。
- `internal/platform/desktop.go`、`main.go`：在 Wails `Quit` 前执行托盘停止钩子；`OnShutdown` 保留幂等 fallback 清理。

## 自动化验证

```text
go test ./... -count=1
PASS（全部 Go 包通过）

go vet ./...
PASS（exit 0）

git diff --cached --check
PASS（exit 0；仅出现用户级 Git ignore 权限 warning）
```

此前已执行 `wails build`，Windows 构建通过。Race 测试因本机 Go race runtime 不可用标记为 `BLOCKED`，不计为 PASS。

## Windows 原生验收

- 托盘 Show：通过原生 `WM_COMMAND` 路径验证，主窗口成功显示。
- 托盘 Quit：用户于 2026-07-22 确认“应用能正常退出了”。

## macOS / Linux 审查

- 两个平台由 `//go:build !windows` 路径继续使用 `RunWithExternalLoop()`，不涉及 Windows HWND 线程亲和性根因。
- 异步菜单回调与 Quit 前清理属于共享修复，对 macOS/Linux 同样生效。
- 当前环境未执行 macOS/Linux 原生托盘运行验收，因此该项保持 `BLOCKED`，等待对应平台 runner 或实机验证。
