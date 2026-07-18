# TASK-024 验收证据

> 日期：2026-07-18

## 命令与结果

```text
pnpm --dir ui exec vitest run src/features/import-export
# 6 passed

pnpm --dir ui exec playwright test -g "JSON import|JSON export" --workers=1
# 4 passed (17.4s)

pnpm --dir ui typecheck  # exit 0
pnpm --dir ui lint       # exit 0
pnpm --dir ui build      # exit 0
```

## 截图

- `docs/spec/evidence/TASK-024-export-en.png`
- `docs/spec/evidence/TASK-024-import-confirm-en.png`
- `docs/spec/evidence/TASK-024-import-invalid-en.png`
- `docs/spec/evidence/TASK-024-import-confirm-zh.png`

## 实现要点

- `ui/src/features/import-export/`：导出版本化信封、解析、摘要、覆盖确认门禁与错误本地化
- `ImportOverwriteDialog`：确认前零副作用
- Settings General：Export / Import 接入确认流与 i18n
