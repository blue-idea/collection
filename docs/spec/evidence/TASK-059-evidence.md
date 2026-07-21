# TASK-059 验收证据

> 任务：关闭隐藏、系统托盘与窗口显隐全局热键  
> 日期：2026-07-21  
> 状态：Unit PASS；Manual 由 TASK-061 关闭

| TASK | REQ / AC | test_type | 期望 | 结果 | 证据 | 备注 |
|------|----------|-----------|------|:----:|------|------|
| TASK-059 | REQ-030-AC-001 | Unit | ShouldPreventClose 默认阻止退出；Quit 后放行 | PASS | `internal/platform/desktop_test.go` | 关闭隐藏装配见 `main.go` OnBeforeClose |
| TASK-059 | REQ-030-AC-002 | Unit | 托盘菜单含 Show/Quit | PASS | `internal/tray/menu_test.go` | 真实托盘图标 Manual → TASK-061 |
| TASK-059 | REQ-030-AC-003 | Unit | Show/Hide/Toggle 调用窗口运行时 | PASS | `internal/platform/desktop_test.go` | |
| TASK-059 | REQ-030-AC-004 | Unit | QuitApplication 设置 allowQuit 并 Quit | PASS | `internal/platform/desktop_test.go` | |
| TASK-059 | REQ-030-AC-005 | Unit | 默认 CmdOrCtrl+L；热键触发 Toggle | PASS | `internal/hotkey/*_test.go`、`desktop_test.go` | 系统级注册 Manual → TASK-061 |
| TASK-059 | REQ-030-AC-010 | Unit | GetDesktopCapability 返回平台字段 | PASS | `internal/platform/desktop_test.go` | Linux best-effort 运行时降级 |
| TASK-059 | REQ-030-AC-001~005 | Manual | OS 关闭隐藏、托盘 Show/Quit、隐藏态 Ctrl+L | PASS | TASK-061 | 用户确认 J-17 |

Go 测试输出：`docs/spec/evidence/TASK-059-go-test.txt`
