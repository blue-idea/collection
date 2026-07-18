# TASK-017 验收证据

> 任务：手动拖出创建主题组合  
> 验收标准：REQ-013-AC-001~002  
> 日期：2026-07-18

## 命令与结果

```text
pnpm --dir ui exec vitest run src/features/collections/compose
# ✓ 7 passed

pnpm --dir ui exec playwright test -g "创建主题组合"
# ✓ 2 passed

pnpm --dir ui exec tsc --noEmit -p tsconfig.app.json
pnpm --dir ui exec eslint src --max-warnings=0
pnpm --dir ui run build
# 零 error
```

## 截图

| 文件 | 覆盖 AC |
|------|---------|
| `TASK-017-compose-preview.png` | REQ-013-AC-001 |
| `TASK-017-compose-cancel.png` | REQ-013-AC-001（取消无副作用） |
| `TASK-017-compose-confirm.png` | REQ-013-AC-002 |

## 实现要点

- `ui/src/features/collections/compose/`：预览构建、确认原子创建、取消、多选/拖拽载荷解析
- ContentArea：Ctrl/Cmd 多选 +「Create collection from selection」
- Sidebar：Create collection drop zone
