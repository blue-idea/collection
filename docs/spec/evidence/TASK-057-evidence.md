# TASK-057 验收证据

## TDD

- Red：实现文件不存在时，Node Test 因 `ERR_MODULE_NOT_FOUND` 失败。
- Green：`pnpm --dir ui test:e2e:impact:test` 实际执行 7 项，7 项通过。
- Refactor：影响映射集中到 `config/test/e2e-impact.mjs`，流水线只消费统一输出。

## 已验证命令

```text
pnpm --dir ui test:e2e:impact:test
tests 7, pass 7, fail 0

pnpm --dir ui verify:quality-config
Quality configuration is valid

pnpm --dir ui exec playwright test tests/e2e/smoke.spec.ts
1 passed
```

## 远程门禁

- PR：https://github.com/blue-idea/collection/pull/5
- CI Run：https://github.com/blue-idea/collection/actions/runs/29780522532
- Desktop Build Run：https://github.com/blue-idea/collection/actions/runs/29780522518
- 影响选择：`fullSuite: true`，原因包含两个工作流、集中影响配置与 `ui/package.json`。
- E2E：88 PASS、6 SKIPPED，耗时约 9.9 分钟。
- Visual：5 PASS，耗时约 1.2 分钟。
- Windows 构建：PASS。
- macOS 构建：PASS。

云认证 6 项用例因 CI 环境未配置相应凭据而 SKIPPED，未计入 PASS。main push 与 Release 门禁需要合并及发版时分别产生真实运行结果。
