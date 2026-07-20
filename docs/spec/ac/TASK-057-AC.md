# TASK-057 AC 验收矩阵

| AC | 验收内容 | 状态 | 证据 |
|----|----------|:----:|------|
| REQ-024-AC-006 | PR 测试选择保持固定 Smoke，并对共享或未知生产代码安全升级全量 | PASS | `pnpm --dir ui test:e2e:impact:test`：7/7 通过 |
| REQ-028-AC-004 | UI/视觉影响域能够选择视觉回归，共享基础设施触发全量视觉测试 | PASS | `config/test/e2e-impact.mjs` 与选择器测试 |
| CI-PR | PR 执行受影响 E2E/视觉，不默认运行全部套件 | PASS | `.github/workflows/ci.yml` 静态配置与选择器输出契约 |
| CI-MAIN | main push 执行全量 E2E 与视觉回归 | PASS | `.github/workflows/ci.yml` 的 push 门禁 |
| CI-RELEASE | Release 校验相同 SHA 的 main CI 成功，并在构建前执行发布关键旅程 | PASS | `.github/workflows/release.yml` 的依赖链 |

未在本地触发 GitHub Actions runner 的项目标记为配置验收 PASS；实际远程工作流运行结果须在首次 PR/main/release 执行后补充，不能以本报告替代远程运行结论。
