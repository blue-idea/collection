# TASK-051 证据记录

## RED

- `pnpm --dir ui exec vitest run src/domain/commands/bookmarks.test.ts`
  - 结果：FAIL，1 failed / 6 passed
  - 失败原因：重复 URL 当前仍创建了新书签，期望 `BOOKMARK_URL_DUPLICATE`
- `pnpm --dir ui exec playwright test tests/e2e/bookmark-crud.spec.ts -g "URL 已存在" --workers=1`
  - 结果：FAIL
  - 失败原因：重复 URL 进入分析/预览阶段，显示 metadata fallback alert，而不是 `Bookmark URL already exists`

## GREEN 与回归

- `pnpm --dir ui exec vitest run src/domain/commands/bookmarks.test.ts`
  - 结果：PASS，1 file / 7 tests
- `pnpm --dir ui exec playwright test tests/e2e/bookmark-crud.spec.ts -g "URL 已存在" --workers=1`
  - 结果：PASS，1 test
- `pnpm --dir ui exec playwright test tests/e2e/bookmark-crud.spec.ts --workers=1`
  - 结果：PASS，4 tests
  - 截图：`docs/spec/evidence/TASK-051-duplicate-url-warning.png`
- `pnpm --dir ui exec vitest run src/domain/commands/bookmarks.test.ts src/features/bookmarks/batch-actions.test.ts src/features/bookmarks/analysis.test.ts`
  - 结果：PASS，3 files / 16 tests
- `pnpm --dir ui exec vitest run`
  - 结果：PASS，71 files / 281 tests
- `pnpm --dir ui typecheck`
  - 结果：PASS
- `pnpm --dir ui lint`
  - 结果：PASS
- `pnpm --dir ui build`
  - 结果：PASS
  - 备注：存在既有 Vite warning：`ui/src/storage.ts` 同时被动态与静态导入，dynamic import 不会拆出独立 chunk

## BLOCKED

- Playwright MCP screenshot
  - 状态：BLOCKED
  - 原因：MCP 启动 Chromium 失败，缺少 `C:\Users\%USERNAME%\AppData\Local\ms-playwright\chromium-1200\chrome-win64\chrome.exe`
  - 替代证据：CLI Playwright E2E 已生成 `TASK-051-duplicate-url-warning.png`
