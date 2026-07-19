# TASK-049 验收证据

> 日期：2026-07-19  
> 任务：Spotlight 搜索结果回车直接访问  
> 需求：REQ-017-AC-005、REQ-008-AC-002

---

## 真实执行命令

| 命令 | 结果 |
|------|:----:|
| `pnpm --dir ui exec vitest run src/components/Spotlight.test.tsx` | RED：FAIL，`onOpenDirectly` 未被调用 |
| `pnpm --dir ui exec vitest run src/components/Spotlight.test.tsx` | PASS，2 tests |
| `pnpm --dir ui exec playwright test tests/e2e/spotlight.spec.ts --workers=1` | PASS，4 tests，生成 TASK-049 截图 |
| `pnpm --dir ui exec vitest run src/components/Spotlight.test.tsx src/features/bookmarks/visit.test.ts src/domain/search/search.test.ts src/features/search/url.test.ts` | PASS，4 files / 10 tests |
| `pnpm --dir ui typecheck` | PASS |
| `pnpm --dir ui lint` | PASS |
| `pnpm --dir ui build` | PASS，Vite 输出 2 条既有 chunk warning |
| `pnpm --dir ui exec vitest run` | PASS，66 files / 266 tests |
| `pnpm --dir ui exec playwright test tests/e2e/spotlight.spec.ts --workers=1` | PASS，4 tests，刷新 dialog 截图 |
| `pnpm --dir ui lint` | PASS |

---

## 视觉证据

| 类型 | 路径 | 说明 |
|------|------|------|
| Actual | `docs/spec/evidence/TASK-049-spotlight-direct-open.png` | Spotlight 搜索 React 时的结果高亮态；Enter 后 E2E 断言直接打开 `https://react.dev` |

---

## BLOCKED

| 项目 | 状态 | 原因 | 替代证据 |
|------|:----:|------|----------|
| Playwright MCP screenshot | BLOCKED | MCP 浏览器启动时查找 `C:\Users\%USERNAME%\AppData\Local\ms-playwright\chromium-1200\chrome-win64\chrome.exe`，可执行文件不存在 | Playwright CLI E2E 与截图已真实执行并保存 |
