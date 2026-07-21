# FIX-1.8 验收证据

> 任务：关闭隐藏到托盘、Ctrl/Cmd+L、Settings→Shortcuts  
> 日期：2026-07-21

## 命令与结果

```text
go test ./internal/hotkey ./internal/tray ./internal/platform -count=1
ok  github.com/blue-idea/collection/internal/hotkey
ok  github.com/blue-idea/collection/internal/tray
ok  github.com/blue-idea/collection/internal/platform

pnpm --dir ui exec vitest run src/features/shell/shortcuts.test.ts src/features/settings/ShortcutsPanel.test.tsx ...
Test Files  5 passed / Tests  34 passed

pnpm --dir ui exec playwright test tests/e2e/settings-shortcuts.spec.ts --workers=1
1 passed

wails build -platform windows/amd64 -s
Built build/bin/linkit.exe
```

## 截图

- `docs/spec/evidence/FIX-1.8-shortcuts-panel.png` — Settings → Shortcuts 分区与快捷键列表

## 实现要点

- `main.go`：`OnBeforeClose` 隐藏窗口；托盘 Show/Quit；默认注册 `CmdOrCtrl+L`
- `internal/hotkey` / `internal/tray` / `internal/platform`：跨平台热键与窗口控制
- `ui/.../ShortcutsPanel`：设置页列出并可改绑全部快捷键；冲突检测与恢复默认
- 桌面态 `toggleWindow` 仅由 Go 全局热键处理，避免与前端双绑定

## 桌面冒烟

```text
wails build -platform windows/amd64
# Built build/bin/linkit.exe

Start-Process build/bin/linkit.exe
# alive=True（约 6s 观察窗口内进程保持运行）
```

> 注：`-s` 跳过前端时若未同步 `frontend/dist`，会报 `no index.html`；完整 `wails build` 正常。

## Manual J-17（待确认）

请在本机对 `build/bin/linkit.exe`（或 `./scripts/dev.ps1`）确认：

1. 点击窗口关闭 → 隐藏到托盘，进程不退出  
2. 托盘菜单 Show / Quit  
3. Ctrl+L 全局显隐  
4. Settings → Shortcuts 改绑后保存生效
