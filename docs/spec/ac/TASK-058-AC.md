# TASK-058 AC 验收矩阵

| AC | 验收内容 | 状态 | 证据 |
|----|----------|:----:|------|
| REQ-024-AC-006 | CI 不重复运行普通 Vitest 与 Coverage | PASS | `verify:quality-config` 断言 Coverage 恰好一次且不存在 `test --run` |
| REQ-024-AC-006 | 文档与无 UI 影响的纯 Go 变更跳过浏览器测试 | PASS | 影响选择器测试 9/9 通过 |
| REQ-028-AC-004 | UI 影响域仍选择对应 E2E/视觉，未知前端代码安全升级全量 | PASS | 影响选择器功能域与安全升级测试 |
| CI-FULL | 定时与手动 CI 保留全量 E2E/视觉回归 | PASS | `.github/workflows/ci.yml` 配置契约 |

远程 Actions 的耗时改善须在 PR 与 main push 后记录，当前不预先伪报远程执行结果。
