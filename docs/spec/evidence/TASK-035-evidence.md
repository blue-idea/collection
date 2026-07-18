# TASK-035 验收证据

## TDD 记录

- Red：Vitest 因 `collections/index.ts`、`duplicates/index.ts` 不存在而失败；Go 因 `GenerateCollection` 契约不存在而构建失败。
- Green：实现严格候选 ID 校验、确认后主题创建、重复预览与合并/删除命令，新增单元测试全部通过。
- Refactor：统一复用主题创建与成员命令；URL 去重比较忽略根路径尾斜杠；UI 使用语义化对话框与按钮。

## 真实结果

- Go AI：PASS，覆盖率 79.9%。
- TASK-035 Vitest：8 PASS，0 FAIL；相关 feature 文件覆盖率 92.45% statements、80% branches。
- Playwright E2E/视觉回归：2 PASS，0 FAIL。
- TypeScript 类型检查、ESLint、Vite 正式构建：PASS。

## 证据文件

- `TASK-035-ai-collection-preview.png`
- `TASK-035-duplicate-diff.png`
- `ui/tests/e2e/ai-organizer.spec.ts-snapshots/` 两张视觉 Baseline

## 风险

- 真实外部 AI 调用仍由 TASK-037 统一验收；本 TASK 使用完整 Wails 契约测试替身验证 UI 预览和确认边界，不将模拟结果冒充真实 AI 服务结果。
- Go `internal/ai` 总覆盖率为 79.9%，低于项目全局 85% 目标；TASK-035 新路径已覆盖成功、未知 ID 与确认边界，剩余覆盖缺口进入 TASK-044 全量质量门禁。
