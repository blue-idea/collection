# TASK-062 验收证据

> 日期：2026-07-21  
> 分支：`feat/TASK-062-ui-size`

## 实现摘要

- `config/window_size.go`：四档预设与 `ResolveWindowSize`
- `settingsstore`：`uiSize` 字段、缺省合并、`LaunchWindowSize`
- `platform.SetMainWindowSize` + Wails `WindowSetSize`
- `main.go` 冷启动按 `uiSize` 设置 Width/Height
- 前端 `ui/src/config/window-size.ts` 与 Zod `AppSettings.uiSize`

## 测试产物

- `docs/spec/evidence/TASK-062-go-test.txt`
- `docs/spec/evidence/TASK-062-vitest.txt`

## Manual

原生窗口立即缩放与拖拽后重启恢复：用户 2026-07-21 确认 J-18 通过（见 TASK-063）。
