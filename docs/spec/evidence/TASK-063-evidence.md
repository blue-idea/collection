# TASK-063 验收证据

> 日期：2026-07-21  
> 分支：`feat/TASK-062-ui-size`

## 实现摘要

- Appearance 增加 Window size 四选一
- i18n：`settings.uiSize.*` en/zh
- 保存时 `persistUiSettings` + `setMainWindowSize(uiSize)`
- E2E：`ui/tests/e2e/settings-window-size.spec.ts`

## 截图

- `docs/spec/evidence/TASK-063-window-size-en.png`
- `docs/spec/evidence/TASK-063-window-size-zh.png`

## Manual J-18

用户于 2026-07-21 确认通过（`./scripts/dev.ps1`）：保存后窗口立即按档位缩放；重启恢复；手动拖拽后重启仍按档位。
