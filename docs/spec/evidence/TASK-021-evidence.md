# TASK-021 验收证据

> 任务：实现 Spotlight 关键词与 URL 流程  
> 验收标准：REQ-017-AC-001~004  
> 日期：2026-07-18

## 命令与结果

```text
pnpm --dir ui exec vitest run src/domain/search src/features/search
# ✓ 5 passed

pnpm --dir ui exec playwright test -g "Spotlight 关键词|URL 快捷入库"
# ✓ 3 passed

pnpm --dir ui exec tsc --noEmit -p tsconfig.app.json
pnpm --dir ui exec eslint src/domain/search src/features/search src/components/Spotlight.tsx src/App.tsx --max-warnings 0
pnpm --dir ui run build
# 零 error
```

## 截图

| 文件 | 覆盖 AC |
|------|---------|
| `TASK-021-spotlight-open.png` | REQ-017-AC-001 |
| `TASK-021-spotlight-select.png` | REQ-017-AC-003 |
| `TASK-021-url-new-bookmark.png` | REQ-017-AC-004 |

## 实现要点

- `ui/src/domain/search/`：关键词匹配与字段权重排序
- `ui/src/features/search/url.ts`：仅显式 http/https 触发 New Bookmark
- `Spotlight`：dialog/search 可访问名、空状态、结果 `role=option`
- App：Cmd/Ctrl+K；URL 入库时先写 URL 再打开确认对话框

## 备注

Chromium 会拦截 `Control+K`，E2E 通过派发等价 `keydown`（ctrlKey+k）验证应用快捷键处理。
