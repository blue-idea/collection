# TASK-027 验收证据

> 日期：2026-07-18  
> 分支：`feat/TASK-027-supabase-auth`

## 命令

```powershell
pnpm --dir ui exec vitest run src/features/auth src/repositories/auth.test.ts
pnpm --dir ui exec node ./scripts/supabase-auth-api-test.mjs
$env:VITE_SUPABASE_URL='http://127.0.0.1:54321'
$env:VITE_SUPABASE_ANON_KEY='<local demo anon>'
$env:CI='1'
pnpm --dir ui exec playwright test tests/e2e/auth.spec.ts --retries=0
```

## 结果摘要

### Vitest

- AuthRepository 8/8 PASS
- auth-flow / startup-gate / LoginScreen 共 8 PASS
- 详见 `docs/spec/evidence/TASK-027-vitest-output.txt`

### Auth API（本地 Supabase）

```
PASS REQ-001-AC-003 无效凭据被拒绝
PASS REQ-001-AC-001 有效登录返回 session
PASS REQ-001-AC-004 getSession 恢复会话
PASS REQ-002-AC-003 signOut 清除会话
```

详见 `docs/spec/evidence/TASK-027-auth-api-output.txt`

### Playwright

```
5 passed
1 skipped（Check your email — 由单元测试覆盖）
```

## 实现要点

- `AuthRepository` + `createSupabaseAuthClient`
- `useAuth` 改为走 Repository；注册区分 authenticated / email_confirmation_required
- `LoginScreen` 支持 Check your email；`Button type="submit"` 修复表单提交
- sessionSlice 增加 `markAuthenticated` / `markSignedOut`
