# TASK-026 验收证据

> 日期：2026-07-18  
> 分支：`feat/TASK-026-supabase-rls`

## 执行命令

```powershell
supabase db reset --local
pnpm --dir ui test:supabase
pnpm --dir ui run supabase:types
```

## 真实结果摘要

### 本地 db reset

- 应用 migration `20260715112414_create_user_bookmarks.sql` 成功
- 执行 `supabase/seed.sql` 成功（用户 A/B + 各一行 `user_bookmarks`）
- 容器重启完成：`Finished supabase db reset`

### pgTAP（`supabase test db`）

```
All tests successful.
Files=1, Tests=13
Result: PASS
```

覆盖：表结构、`schema_version`/`revision`、RLS 启用、本人可读、跨用户空结果、未认证 SELECT 空、未认证写拒绝。

### PostgREST API（`ui/scripts/supabase-rls-api-test.mjs`）

```
PASS REQ-025-AC-003 未认证 SELECT 空结果
PASS REQ-025-AC-005 未认证写入拒绝 permission denied for table user_bookmarks
PASS REQ-003-AC-002 本人 CRUD
PASS REQ-003-AC-003 跨用户空结果
All Supabase RLS API checks passed
```

完整控制台输出见：`docs/spec/evidence/TASK-026-supabase-rls-output.txt`

### 远程项目（Supabase MCP）

| 项 | 结果 |
|----|------|
| 创建项目 | `linkit`，ref `zheqhjsctvkuzmtohrnm`，region `ap-southeast-1`，状态 ACTIVE_HEALTHY |
| apply_migration | `create_user_bookmarks` success |
| list_tables | `public.user_bookmarks`，RLS enabled，含 schema_version/revision |
| seed | 用户 A/B 各一行，`schema_version=1`，`revision=0` |

## 生成类型摘录

`ui/src/database.types.ts` 中 `public.Tables.user_bookmarks.Row` 含：

- `data: Json`
- `schema_version: number`
- `revision: number`
- `user_id: string`
- `updated_at: string`

## 未写入仓库的敏感信息

- 远程 anon / publishable key 仅写入本机 `ui/.env` / `.env.test`（勿提交）
- 本地默认 anon key 为 Supabase CLI demo key，可出现在本地测试脚本回退值中
