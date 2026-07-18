# TASK-008 验收证据

> 日期：2026-07-18

## 命令与真实结果

```text
go test ./internal/platform/... ./internal/localstore/... -count=1 -cover
ok  github.com/blue-idea/collection/internal/platform   coverage: 93.8% of statements
ok  github.com/blue-idea/collection/internal/localstore coverage: 89.3% of statements
```

### 覆盖场景

| 场景 | 结果 |
|------|------|
| 导出有效 LibraryEnvelope | `state=saved`，文件含 `exportedAt`/`appVersion` |
| 用户取消导出 | `state=cancelled`，不写文件 |
| 导出含 apiKey | `EXPORT_INVALID` |
| 导入有效 JSON | `state=selected`，返回文件名/大小/文档 |
| 用户取消导入 | `state=cancelled` |
| 损坏 JSON / 非法 UTF-8 / 超大 | `IMPORT_INVALID` |
| 导入含 apiKey | `IMPORT_INVALID` |

## 实现文件

- `internal/platform/*`
- `config/app.go`（`AppVersion`）
- `config/errors.go`（`IMPORT_INVALID` / `EXPORT_INVALID`）
- `main.go`（绑定 + `OnStartup` `SetContext`）
