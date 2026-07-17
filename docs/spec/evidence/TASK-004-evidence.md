# TASK-004 验收证据

> 日期：2026-07-18
> 分支：`feat/TASK-004-test-factory`

## TDD 证据

- Red 1：Factory 测试 3/3 按预期失败，失败原因是 `createBookmark` 与 `createCoreJourneySeed` 尚不存在。
- Green 1：实现最小实体 Factory 与核心旅程 seed 后 3/3 通过；Refactor 消除 Vite 重复键警告后保持全绿。
- Red 2：性能数据测试 3/3 按预期失败，失败原因是 `generatePerformanceLibrary` 尚不存在。
- Green 2：实现固定 seed 生成器后 3/3 通过，10,000 条 Schema/引用校验实际完成。
- Red/Green 3：非法书签数量测试先按预期失败；增加集中管理的英文错误后性能数据套件 4/4 通过。

## 实际执行结果

| 命令 | 实际结果 |
|------|----------|
| `pnpm --dir ui exec vitest run tests/factories tests/performance-data` | PASS，2 files、7/7 tests；10,000 条完整校验用例约 1.11s |
| `pnpm --dir ui exec vitest run tests/factories tests/performance-data --coverage "--coverage.include=src/testing/**/*.ts" "--coverage.include=src/config/test-data.ts"` | PASS；行 100%，分支 84.78%，函数 100% |
| `pnpm --dir ui exec vitest run --coverage` | PASS，6 files、27/27 tests；仓库全局行覆盖率 14.31%、分支 89.03% |
| `pnpm --dir ui typecheck` | PASS，0 error |
| `pnpm --dir ui lint` | PASS，0 error |
| `pnpm --dir ui build` | PASS，Vite production build 完成 |
| `git diff --check` | PASS，无空白错误 |

## 10,000 条数据验收

- 书签数量：10,000。
- 唯一书签 ID：10,000。
- 固定 seed：相同 seed 与规模生成结果完全相同，不同 seed 生成不同 ID 空间。
- 关联实体：分类、标签、主题均由集中配置生成，所有引用通过 `validateLibraryEnvelope`。
- 重复检测：修改生成结果制造重复书签 ID 后，校验器返回 `DUPLICATE_ENTITY_ID`。
- UI 视觉回归：不适用，本任务未修改 UI、布局、主题或组件。

## 已知风险

- 仓库全局行覆盖率仍为 14.31%，主要来自尚未进入后续 TASK 的原型 UI；本任务新增模块的作用域覆盖率已达到行 100%、分支 84.78%。
- REQ-028-AC-005~007 的应用级性能阈值尚未执行，保持 `BLOCKED` 并由 TASK-041 在相关功能完成后统一验收。

## 产物

- HTML 覆盖率：`ui/coverage/index.html`
- JSON 摘要：`ui/coverage/coverage-summary.json`
- AC 矩阵：`docs/spec/ac/TASK-004-AC.md`
- 测试报告：`docs/spec/reports/TASK-004-report.md`
