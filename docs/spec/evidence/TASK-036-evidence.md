# TASK-036 验收证据

## TDD 记录

- Red：推荐与知识图测试因正式 feature 模块不存在而失败；组件测试因对话框不存在而失败。
- Green：实现库内推荐、主题缺口、确定性径向图模型、探索对话框与交互式 SVG。
- Refactor：按排序后的书签 ID 统一布局；规则推荐由知识图复用；非法 AI ID 在边界处过滤。

## 真实结果

- Vitest：7 PASS，0 FAIL。
- Playwright E2E/视觉回归：2 PASS，0 FAIL。
- 探索核心逻辑：100% 行覆盖。
- 知识图模型：97.72% 行覆盖、84.61% 分支覆盖。
- TypeScript、ESLint、Vite 正式构建：PASS。

## 证据文件

- `TASK-036-library-recommendations.png`
- `TASK-036-knowledge-graph.png`
- `ui/tests/e2e/explore-knowledge-graph.spec.ts-snapshots/TASK-036-knowledge-graph.png`

## 风险

- 真实 AI 相关边由 TASK-037 使用真实服务验收；本任务已验证 AI 缺失或返回库外 ID 时保留规则关联，且不产生公网推荐。
