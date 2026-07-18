# TASK-018 验收证据

> 任务：标签维护、筛选与建议采纳  
> 验收标准：REQ-014-AC-001~003  
> 日期：2026-07-18

## 命令与结果

```text
pnpm --dir ui exec vitest run src/domain/tags src/features/tags
# ✓ 11 passed

pnpm --dir ui exec playwright test -g "标签筛选|标签编辑"
# ✓ 2 passed

pnpm --dir ui exec tsc --noEmit -p tsconfig.app.json
pnpm --dir ui exec eslint src --max-warnings=0
pnpm --dir ui run build
# 零 error
```

## 截图

| 文件 | 覆盖 AC |
|------|---------|
| `TASK-018-tag-filter.png` | REQ-014-AC-001 |
| `TASK-018-tag-edit.png` | REQ-014-AC-002 |

## 实现要点

- `ui/src/domain/tags/`：create/delete/add/remove/acceptSuggested + count
- `ui/src/features/tags/`：UI 适配与筛选/计数辅助
- Sidebar 显示 `Label (count)`；DetailPanel 走领域命令维护标签
