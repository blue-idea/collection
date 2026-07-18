# TASK-009 验收证据

> 日期：2026-07-18

## 命令与真实结果

```text
go test ./internal/metadata/... ./internal/platform/... ./internal/httpurl/... -count=1 -cover
ok  internal/metadata  coverage: 86.6% of statements
ok  internal/platform  coverage: 93.4% of statements
ok  internal/httpurl   coverage: 78.6% of statements
```

### 关键场景

| 场景 | 结果 |
|------|------|
| 静态 HTML 解析 | 提取 title/description/favicon/contentText，脚本样式不泄漏 |
| User-Agent | 使用 `Linkit/<version> (+desktop)` |
| 危险协议 | `javascript:`/`file:`/`data:`/`ftp:` → `URL_INVALID` |
| 危险重定向 | 重定向到 `javascript:` → `METADATA_FETCH_FAILED` |
| 安全重定向 | 跟随后返回最终 URL 与标题 |
| 超大响应 / 超时 / 4xx/5xx | `METADATA_FETCH_FAILED` |
| OpenExternalURL 成功/失败 | nil / `EXTERNAL_OPEN_FAILED` |
| OpenExternalURL 危险协议 | `URL_INVALID`，不调用 opener |

## 实现文件

- `config/network.go`、`config/errors.go`
- `internal/httpurl/*`
- `internal/metadata/*`
- `internal/platform/external_url.go`、`service.go`
- `main.go`（绑定 MetadataService）
