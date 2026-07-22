# TASK-068 证据

> 书签图标领域持久化、新建/编辑 UI、元数据 favicon 抓取（REQ-006-AC-006 / REQ-006-AC-007）

## 命令

```powershell
go test ./internal/metadata/... ./config/... -count=1
pnpm --dir ui typecheck
pnpm --dir ui exec vitest run
pnpm --dir ui test:e2e
supabase db push --linked --yes
```

## 结果（2026-07-22）

| 检查项 | 结果 |
|--------|------|
| Go `internal/metadata` + `config` | PASS |
| `pnpm typecheck` | PASS |
| Vitest 全量 `pnpm exec vitest run` | **347** tests PASS（92 files） |
| E2E `pnpm test:e2e` | **93** passed，**6** skipped（云 auth，未配置 Supabase 环境） |
| 远程 push | `main` → `origin/main`（`32f241d`） |

## 产品行为（用户确认）

- 元数据含 favicon URL 或 Go 抓到 `faviconDataUrl` → 新建预览默认 **网站图标**。
- 无任何图标 → 默认 **文字图标**（标题首字母 + 随机背景色）。
- 编辑书签可切换网站/文字图标并设置背景色与 glyph。

## 说明

- 未实现 `lattice.library` → `library.json` 历史回填（用户确认暂不处理）。
- Supabase 本地 migration 文件名与远程对齐：`20260718113845`、`20260718113930`、`20260722101627`。
- 云 `user_bookmarks.data` 仍为 LibraryData JSONB；契约 migration 已同步远程 `linkit`。
