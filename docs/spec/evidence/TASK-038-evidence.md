# TASK-038 验收证据

## TDD 记录

- Red：先创建洞察单元测试和 E2E 用户旅程；单元测试因 `features/insights/index.ts` 不存在而失败。
- Green：实现确定性洞察模型、报告对话框及行动路由，使空库、少量数据、10,000 条数据和 Insights 旅程通过。
- Refactor：统一 `metric`、`evidence`、`action` 契约，复用现有资料库类型与筛选状态，限制最多返回 6 张卡片。

## 真实结果

- Vitest：3 PASS，0 FAIL。
- Playwright E2E/视觉回归：1 PASS，0 FAIL。
- 核心规则模块：100% 行覆盖、92% 分支覆盖、100% 函数覆盖。
- TypeScript、ESLint、Vite 正式构建：PASS。
- 10,000 条数据用例验证结果确定、卡片数量有限且单次计算低于 500ms。

## 证据文件

- `docs/spec/evidence/TASK-038-insights-report.png`
- `ui/tests/e2e/insights.spec.ts-snapshots/TASK-038-insights-report.png`

## 风险

- 本任务只生成当前资料库的确定性统计与规则洞察，不发起外部网络请求。
- 链接健康扫描及 Updated/Broken 持久化由 TASK-039 继续实现；本任务仅跳转到已有健康筛选入口。
