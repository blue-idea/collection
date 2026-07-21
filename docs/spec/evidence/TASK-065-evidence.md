# TASK-065 验收证据

> 日期：2026-07-22
> 平台：Windows 11 / Wails v2.13.0 / windows-amd64 production build

## TDD Red

```text
go test ./internal/tray -count=1
FAIL: MenuSettings、OnSettings 尚不存在

pnpm --dir ui exec vitest run src/features/shell/tray-settings.test.ts
FAIL: 无法解析 ./tray-settings
```

失败原因均为目标能力缺失，随后才进入实现。

## 自动化验证

```text
go test ./... -count=1
PASS

go vet ./...
PASS

pnpm --dir ui test --run
85 files passed / 324 tests passed

pnpm --dir ui quality
lint PASS / typecheck PASS / build PASS

wails build
PASS: build/bin/linkit.exe
```

覆盖率补充：

- Go `internal/tray` 包整体 17.4%（未在 Unit 中启动原生 systray 消息循环）；本次修改的 `NewHost`、`DefaultMenuItems`、`HandleMenuClick` 均为 100%。
- 前端本次新增/抽取的 `config/events.ts`、`tray-settings.ts`、`services/wails-events.ts` 均为 100% statements/branches/functions/lines。

## Windows 原生验收

1. 启动 `build/bin/linkit.exe`，获取 Linkit 进程所属 `wailsWindow` 与 `SystrayClass`。
2. 发送主窗口 `WM_CLOSE`，确认 `HiddenAfterClose=true`。
3. 向 Linkit 自身托盘窗口发送第一项 `WM_COMMAND`，确认 `VisibleAfterSettings=true`。
4. 截图确认 Settings 对话框已打开：`TASK-065-tray-settings.png`。
5. 向同一托盘窗口发送第二项 `WM_COMMAND`，确认 `Exited=true`。

截图已裁剪为设置弹窗区域，不包含可读的收藏内容、Email、密钥或 Token。

## Quit 未改动审查

- `internal/platform/desktop.go`：无差异。
- `internal/platform/service.go`：无差异。
- `internal/tray/systray_runner_windows.go`：无差异。
- `main.go` 中 `OnQuit: func() { _ = nativeFileService.QuitApplication() }` 保持原调用。
