# TASK-060 证据

> 日期：2026-07-21

## 命令

```text
pnpm --dir ui exec vitest run src/features/shell/shortcuts.test.ts src/features/settings/ShortcutsPanel.test.ts ...
pnpm --dir ui typecheck
pnpm --dir ui exec playwright test tests/e2e/settings-shortcuts.spec.ts --workers=1
# 1 passed
```

## 截图

- `docs/spec/evidence/TASK-060-shortcuts-panel.png`
