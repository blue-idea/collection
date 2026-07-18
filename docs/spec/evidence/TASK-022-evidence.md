# TASK-022 验收证据

> 任务：重构主窗口、快捷键、拖入 URL 与可访问性  
> 验收标准：REQ-024-AC-001~006、REQ-028-AC-004  
> 日期：2026-07-18

## 命令与结果

```text
pnpm --dir ui exec vitest run src/features/shell
# ✓ 3 passed

pnpm --dir ui exec playwright test tests/e2e/app-shell.spec.ts
# ✓ 5 passed

pnpm --dir ui exec tsc --noEmit -p tsconfig.app.json
pnpm --dir ui exec eslint src/features/shell src/App.tsx ... --max-warnings 0
pnpm --dir ui run build
# 零 error
```

## 截图与报告

| 文件 | 覆盖 AC |
|------|---------|
| `TASK-022-main-window-baseline.png` / `TASK-022-main-window-actual.png` | REQ-024-AC-001、REQ-028-AC-004 |
| `TASK-022-shortcut-matrix.json` | REQ-024-AC-002~003 |
| `TASK-022-drop-url.png` | REQ-024-AC-005 |
| `TASK-022-axe-report.json` | REQ-024-AC-006 |

## 实现要点

- `ui/src/features/shell/`：AppShell、WindowChrome、overlay-stack、shortcuts、drop、Esc
- Dialog / Settings 增加 `role=dialog` 与 accessible name
- Tag / Star / Expand 等图标按钮补齐 `aria-label`
