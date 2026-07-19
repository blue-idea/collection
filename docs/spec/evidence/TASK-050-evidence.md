# TASK-050 验收证据

> 日期：2026-07-19  
> 任务：Collection Emoji 候选图标菜单  
> 需求：REQ-012-AC-005、REQ-012-AC-001

---

## 真实执行命令

| 命令 | 结果 |
|------|:----:|
| `pnpm --dir ui exec vitest run src/features/collections/CollectionFormDialog.test.tsx` | RED：FAIL，缺少 `Choose collection icon` 按钮 |
| `pnpm --dir ui exec vitest run src/features/collections/CollectionFormDialog.test.tsx` | PASS，2 tests |
| `pnpm --dir ui exec playwright test tests/e2e/collection-crud.spec.ts --workers=1` | PASS，4 tests，生成 TASK-050 截图 |
| `pnpm --dir ui exec vitest run src/features/collections/CollectionFormDialog.test.tsx src/features/collections/apply-collection-command.test.ts src/domain/collections/collections.test.ts` | PASS，3 files / 12 tests |
| `pnpm --dir ui typecheck` | PASS |
| `pnpm --dir ui lint` | PASS |
| `pnpm --dir ui build` | PASS，Vite 输出 2 条既有 chunk warning |
| `pnpm --dir ui exec vitest run` | PASS，67 files / 268 tests |

---

## 视觉证据

| 类型 | 路径 | 说明 |
|------|------|------|
| Actual | `docs/spec/evidence/TASK-050-collection-emoji-menu.png` | New collection 对话框中展开 Emoji 候选菜单 |

---

## BLOCKED

| 项目 | 状态 | 原因 | 替代证据 |
|------|:----:|------|----------|
| Playwright MCP screenshot | BLOCKED | MCP 浏览器启动时查找 `C:\Users\%USERNAME%\AppData\Local\ms-playwright\chromium-1200\chrome-win64\chrome.exe`，可执行文件不存在 | Playwright CLI E2E 与截图已真实执行并保存 |
