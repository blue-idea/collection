# TASK-056 验收证据

> 分支：`feat/TASK-056-ui-language-alignment`
> 日期：2026-07-20
> 验收标准：REQ-023-AC-004、REQ-023-AC-005、REQ-023-AC-006、REQ-023-AC-008

## 命令与真实结果

```text
pnpm --dir ui install --frozen-lockfile --reporter append-only
# Done in 53.1s using pnpm v10.33.0

pnpm --dir ui exec playwright install chromium
# Chromium browser installed

pnpm --dir ui exec playwright test tests/e2e --workers=1 --reporter=json
# 87 passed, 6 skipped, 0 failed
# duration: 643.575s

pnpm --dir ui quality
# lint: PASS
# typecheck: PASS
# build: PASS
# Vite emitted existing chunk/dynamic import warnings, no error

pnpm --dir ui test:coverage
# Test Files: 76 passed
# Tests: 300 passed
# Coverage: lines 78.83%, branches 78.32%, functions 81.69%, statements 78.83%
# TASK-056 direct i18n files: lines 100%, branches 100%

pnpm --dir ui exec playwright test tests/visual/ui-language-alignment.spec.ts --workers=1
# 2 passed
```

## Playwright MCP 截图

- MCP 成功打开 `http://127.0.0.1:5173/` 并保存 `TASK-056-mcp-login.png`。
- MCP console 中仅出现 `favicon.ico` 404，不影响应用行为。
- 当前 MCP 懒加载工具只提供 tab、snapshot 和 screenshot，未提供点击/脚本执行能力；完整语言切换验收以 Playwright CLI E2E 和 Visual Snapshot 为准。

## 视觉证据

| 文件 | 覆盖 |
|------|------|
| `TASK-056-en-main-baseline.png` / `TASK-056-en-main-actual.png` / `TASK-056-en-main-diff.png` | English 主界面 |
| `TASK-056-zh-new-bookmark-baseline.png` / `TASK-056-zh-new-bookmark-actual.png` / `TASK-056-zh-new-bookmark-diff.png` | 中文主界面与新建书签对话框 |
| `TASK-056-mcp-login.png` | Playwright MCP 登录门截图 |

## 结论

- 非自定义系统 UI 文案、状态文案、Toast 与无障碍名称已跟随 `settings.locale`。
- 用户输入、导入或 AI 生成内容未被翻译或改写。
- 本任务未修改领域值、Repository、Schema、Go/Wails API 或业务回调。
