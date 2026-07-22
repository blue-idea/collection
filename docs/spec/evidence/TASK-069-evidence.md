# TASK-069 验收证据

> 范围：AI 新建书签标签候选复用、保守匹配与低开销约束
> 日期：2026-07-22

## TDD Red

```text
go test ./internal/ai -run TestBuildAnalyzeBookmarkSystemPromptLocale -count=1
# FAIL：prompt missing exact candidate tag reuse rule

pnpm --dir ui exec vitest run src/components/NewBookmarkDialog.ai-tags.test.tsx
# FAIL：期望 tags=[tag-react]，实际 tags=[]

pnpm --dir ui exec vitest run src/features/tags/suggested-tag-matching.test.ts
# 3 FAIL：# React、machine-learning、全角标签均未匹配
```

失败均为目标行为缺失导致的断言失败，不是语法或测试环境错误。

## Green / Refactor

```text
go test ./internal/ai -run TestBuildAnalyzeBookmarkSystemPromptLocale -count=1
# PASS

pnpm --dir ui exec vitest run src/features/tags/suggested-tag-matching.test.ts src/components/NewBookmarkDialog.ai-tags.test.tsx
# 2 files / 8 tests PASS

pnpm --dir ui exec vitest run src/features/ai/bookmark-analysis src/features/tags src/components/NewBookmarkDialog.ai-tags.test.tsx
# 4 files / 22 tests PASS
```

## 覆盖率

```text
pnpm --dir ui exec vitest run src/features/tags/suggested-tag-matching.test.ts --coverage --coverage.include=src/features/tags/suggested-tag-matching.ts --coverage.reporter=text
# statements 100% / branches 94.73% / functions 100% / lines 100%

go test ./internal/ai -count=1 -cover
# PASS；internal/ai package coverage 80.2%
```

## 全量与静态检查

```text
pnpm --dir ui test --run
# 94 files / 356 tests PASS

pnpm --dir ui exec playwright test tests/e2e/ai-bookmark-analysis.spec.ts --workers=1
# 4 tests PASS；16.5s

pnpm --dir ui typecheck
# PASS

pnpm --dir ui lint
# PASS

pnpm --dir ui build
# PASS；存在既有动态导入与 chunk size warnings

go test ./... -count=1
# PASS

go vet ./...
# PASS
```

## 截图

- `docs/spec/evidence/TASK-069-ai-tag-match.png`：新建书签保存后，详情区显示已有 `React` 标签。

## BLOCKED 与边界

- Playwright MCP 配置的 Chromium 路径指向不存在的 revision，补充视觉核验 `BLOCKED`；同一 Playwright CLI E2E 已真实通过并截图。
- 未执行真实第三方 AI 调用；该验收仍由现有 `TASK-037` 跟踪，不以固定响应冒充真实 AI 结果。
- 无数据库结构、迁移或 Supabase 变更。
