# TASK-070 验收证据

> 范围：新建与重新分析书签的 AI 摘要 200 字限制
> 日期：2026-07-22

## TDD Red

```text
go test ./internal/ai -run 'TestBuildAnalyzeBookmarkSystemPromptLocale|TestParseAnalyzeResultTruncatesSummaryToTwoHundredRunes' -count=1
# FAIL：prompt missing summary length limit
# FAIL：Expected 200 summary runes, got 201
```

两个失败均由目标行为缺失导致，不是语法或测试环境错误。

## Green / Refactor

```text
go test ./internal/ai -run 'TestBuildAnalyzeBookmarkSystemPromptLocale|TestParseAnalyzeResultEnforcesSummaryRuneLimit|TestAnalyzeAndReanalyzeLimitSummaryWithoutExtraAIRequests' -count=1
# PASS
```

- `config.AISummaryMaxRunes` 集中定义为 200。
- 提示词复用配置值，不重复硬编码生产限制。
- 服务解析复用既有 `truncateRunes`，在 Unicode 边界截断。
- 公共 `AnalyzeBookmark` / `ReanalyzeBookmark` 各执行一次时，Completer 调用次数分别为 1 / 累计 2，没有为截断发起额外请求。
- 边界矩阵覆盖 199、200、201 字符、Unicode 空白、emoji 与纯空白拒绝。

## QA

```text
go test ./internal/ai -count=1 -cover
# PASS；coverage: 81.0% of statements

go tool cover -func=/private/tmp/task070-ai.cover
# buildAnalyzeBookmarkSystemPrompt 100.0%
# parseAnalyzeResult 85.0%
# truncateRunes 100.0%

go test ./config/... -count=1
# PASS

go test ./... -count=1
# PASS；macOS 链接器输出既有 duplicate -lobjc warning

go vet ./...
# PASS
```

## 边界

- 未执行真实第三方 AI 调用；服务端兜底截断使最终长度不依赖模型是否遵循提示词。
- 无数据库、Supabase、网络请求次数或 UI 结构变更，因此不需要视觉回归截图。
- `internal/ai` 包整体覆盖率 81.0%，低于 B2C 85% 全局目标；本次变更函数达到 85%~100%，差距来自包内既有未覆盖分支，按风险通过记录。
