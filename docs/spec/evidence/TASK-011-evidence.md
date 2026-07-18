# TASK-011 验收证据

> 日期：2026-07-18

## 命令与真实结果

```text
pnpm --dir ui exec vitest run src/domain/commands/bookmarks src/features/bookmarks
 Test Files  2 passed (2)
      Tests  11 passed (11)

pnpm --dir ui exec playwright test -g "书签新增|书签编辑|书签删除"
  3 passed (5.4s)
```

### 关键场景

| 场景 | 结果 |
|------|------|
| Analyze → 预览 → Save | 确认前不入库；Save 后可见标题 |
| 元数据不可用 | 英文 `Could not fetch…` 降级，无伪 AI |
| 编辑标题 | 详情与列表同步 |
| 删除确认 | Cancel 保留；Delete 移除 |

## 截图

- `docs/spec/evidence/TASK-011-new-bookmark-fallback.png`
- `docs/spec/evidence/TASK-011-bookmark-saved.png`
- `docs/spec/evidence/TASK-011-delete-confirm.png`

## 实现文件

- `ui/src/domain/commands/bookmarks.ts`
- `ui/src/features/bookmarks/*`
- `ui/src/components/Dialogs.tsx`、`DetailPanel.tsx`、`App.tsx`
- `ui/tests/e2e/bookmark-crud.spec.ts`
