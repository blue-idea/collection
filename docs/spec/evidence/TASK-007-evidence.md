# TASK-007 验收证据

> 日期：2026-07-18

## 命令与真实结果

### Go settingsstore

```text
go test ./internal/settingsstore/... -count=1 -coverprofile=settingsstore.cover
ok  github.com/blue-idea/collection/internal/settingsstore  0.864s  coverage: 86.2% of statements
```

关键场景：
- 空目录 → `state=default`，`locale=en`，AI 未配置，无 apiKey 字段
- 写入后读取 → `state=found`，主题/AI Base/Model 往返一致
- API Base 改变 → `aiConsent` 被清除
- `GrantAIConsent` + 规范化匹配；损坏正式文件从 `.bak` 恢复；双损坏回退 default
- 含 `apiKey`、非法主题、非 loopback HTTP 均返回 `SETTINGS_INVALID`

### 前端 settings 服务

```text
pnpm --dir ui exec vitest run src/services/settings/settings.test.ts
 ✓ src/services/settings/settings.test.ts (6 tests)
```

### 全量回归（任务收尾）

```text
go test ./... -count=1
ok  internal/localstore
ok  internal/scaffold
ok  internal/settingsstore

pnpm --dir ui exec vitest run
 Test Files  10 passed (10)
      Tests  53 passed (53)

pnpm --dir ui build
✓ built in 2.16s
```

## 实现文件

| 层级 | 路径 |
|------|------|
| Go 服务 | `internal/settingsstore/*` |
| 配置 | `config/storage.go`、`config/errors.go` |
| Wails 绑定 | `main.go` |
| 前端服务 | `ui/src/services/settings/*` |
| 默认值/错误键 | `ui/src/config/settings.ts` |
| Schema | `ui/src/domain/schemas.ts`（允许未配置 AI） |
