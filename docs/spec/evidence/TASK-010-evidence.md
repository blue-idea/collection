# TASK-010 验收证据

> 日期：2026-07-18

## 命令与真实结果

```text
pnpm --dir ui exec vitest run src/features/auth src/services/storage src/storage.test.ts src/components/ui.test.tsx
 Test Files  5 passed (5)
      Tests  12 passed (12)

pnpm --dir ui exec playwright test -g "本地模式|启动恢复"
  7 passed (9.8s)
```

### 关键场景

| 场景 | 结果 |
|------|------|
| 启动 Loading → 登录门 | 未点击前不出现侧边栏/主界面 |
| 本地模式 + 刷新 | 自动进入本地主界面并恢复书签标题 |
| 退出再进 | 本机 `lattice.library` 保留 |
| 种子恢复 | 显示 `Replace current library?` 确认框 |
| 不完整书签恢复 | `normalizeLocalLibrary` + Favicon 回退，主界面不崩溃 |

## 截图

- `docs/spec/evidence/TASK-010-login-gate.png`
- `docs/spec/evidence/TASK-010-local-restore.png`
- `docs/spec/evidence/TASK-010-seed-confirm.png`

## 实现文件

- `ui/src/services/storage/*`（bootstrap、browser-adapters、local-repository）
- `ui/src/features/auth/*`（startup-gate、use-local-startup、seed-restore、RecoveryDialog）
- `ui/src/App.tsx`、`ui/src/storage.ts`、`ui/src/components/ui.tsx`、`ui/src/components/SettingsDialog.tsx`
- `ui/tests/e2e/local-startup.spec.ts`
