# TASK-031 验收证据

> 日期：2026-07-18  
> 分支：`feat/TASK-031-secretstore-ai-consent`

## 命令与结果

### Go Unit / Security

```text
go test ./internal/secretstore/... ./internal/settingsstore/... -cover
```

结果：全部 PASS（见 `TASK-031-go-test-output.txt`）

- Memory SecretStore：Set / Delete / GetAIKeyStatus（仅 configured）
- `RedactSecrets`：Bearer / sk- / token 明文脱敏
- settingsstore consent 匹配与 API Base 变化失效（既有覆盖）

### Vitest

```text
pnpm --dir ui exec vitest run src/features/settings/ai-consent
```

结果：4 passed（见 `TASK-031-vitest-output.txt`）

### E2E

```text
pnpm --dir ui exec playwright test tests/e2e/ai-consent.spec.ts
```

结果：2 passed；截图 `TASK-031-ai-consent.png`

### 静态检查

- `tsc --noEmit` / eslint / `pnpm build`：通过
- `main.go` 已绑定 `secretService`
