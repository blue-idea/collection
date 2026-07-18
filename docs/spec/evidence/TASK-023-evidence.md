# TASK-023 验收证据

> 日期：2026-07-18

## 命令与结果

```text
pnpm --dir ui exec vitest run src/i18n src/features/settings src/services/settings
# Test Files  3 passed | Tests  14 passed

pnpm --dir ui exec playwright test tests/e2e/settings-i18n.spec.ts --workers=1
# 4 passed (16.4s)

pnpm --dir ui typecheck  # exit 0
pnpm --dir ui lint       # exit 0
pnpm --dir ui build      # exit 0

pnpm --dir ui exec playwright test tests/e2e/smoke.spec.ts tests/e2e/app-shell.spec.ts --workers=1
# 6 passed (20.5s)
```

## 截图

- `docs/spec/evidence/TASK-023-settings-sections.png`
- `docs/spec/evidence/TASK-023-theme-ocean.png`
- `docs/spec/evidence/TASK-023-locale-zh.png`

## 实现要点

- `ui/src/i18n/`：i18next 实例、en/zh 词典、缺失键回退 English
- `ui/src/features/settings/`：五分区 id 与主题标签解析
- `SettingsDialog`：Language 分区；保存前 await 持久化
- `UiSettings.locale` 贯通 bootstrap / persist / LoginScreen / WindowChrome
