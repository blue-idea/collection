# TASK-003 验收证据

> 日期：2026-07-18  
> 分支：`feat/TASK-003-data-schema`

## TDD 证据

- Red：占位接口运行 10 个测试，9 个因目标行为缺失而失败；补充有效 AppSettings 用例后覆盖 Schema 接受路径。
- Green：实现 Schema、关系验证与迁移器后，11 个初始测试全部通过。
- Refactor / QA：补齐类型与覆盖率边界用例，最终领域测试 15/15 通过。

## 实际执行结果

| 命令 | 实际结果 |
|------|----------|
| `pnpm --dir ui exec vitest run src/domain` | PASS，15/15 |
| `pnpm --dir ui exec vitest run src/domain --coverage --coverage.include=src/domain/*.ts` | PASS；行 100%，分支 96.66%，函数 100% |
| `pnpm --dir ui typecheck` | PASS，0 error |
| `pnpm --dir ui lint` | PASS，0 error |
| `pnpm --dir ui exec vitest run` | PASS，4 files、20/20 tests |
| `pnpm --dir ui build` | PASS，Vite production build 完成 |

## 样本覆盖

- 有效 V1 `LibraryEnvelope`。
- 无效 JSON 文本。
- category/tag/collection/bookmark 全类型悬空引用。
- 分类间接环、重复关系、主题关系不对称。
- 现有原型 `tags` 到 `tagIds` 迁移与字段补齐。
- 当前 V1 只读校验、不支持未来版本、非对象输入。
- 完整 Bookmark 字段序列化往返。

## 产物

- HTML 覆盖率：`ui/coverage/index.html`
- JSON 摘要：`ui/coverage/coverage-summary.json`
- AC 矩阵：`docs/spec/ac/TASK-003-AC.md`
- 测试报告：`docs/spec/reports/TASK-003-report.md`
