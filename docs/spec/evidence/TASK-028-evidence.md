# TASK-028 验收证据

> 日期：2026-07-18  
> 分支：`feat/TASK-028-cloud-repository`

## 命令与结果

### Unit

```text
pnpm --dir ui exec vitest run src/repositories/cloud src/repositories/cloud-draft-sync
```

结果：15 passed（见 `TASK-028-vitest-output.txt`）

覆盖：

- CloudRepository：load / create / save / replace / describe
- Zod 与 user_id 二次校验
- expectedRevision 零行 → `CLOUD_REVISION_CONFLICT`
- 网络错误 → `CLOUD_REQUEST_FAILED`
- `saveCloudLibraryWithDraft`：失败保留 dirty draft、成功清理

### API（本地 Supabase）

```text
pnpm --dir ui run test:supabase:revision
```

结果：全部 PASS（见 `TASK-028-revision-api-output.txt`）

- 条件更新递增 revision
- 陈旧 expectedRevision → `CLOUD_REVISION_CONFLICT`，云端 revision 不变
- 冲突后本人行仍可读

### 静态检查

- `tsc --noEmit`：零 error
- `eslint`（相关文件）：零 error
- `pnpm --dir ui run build`：成功
