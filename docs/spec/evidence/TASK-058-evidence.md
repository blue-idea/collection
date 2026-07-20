# TASK-058 验收证据

## TDD

- Red：质量配置因仍存在 `pnpm --dir ui test --run` 失败；影响选择器有 3 项新期望失败。
- Green：删除重复 Vitest 步骤并实现零浏览器测试门禁后，质量配置与影响选择测试通过。
- Refactor：删除重复影响域，PR/main 复用统一选择器，定时/手动复用统一全量入口。

## 本地真实结果

```text
pnpm --dir ui test:e2e:impact:test
tests 9, pass 9, fail 0

pnpm --dir ui verify:quality-config
Quality configuration is valid

pnpm --dir ui test:coverage
exit code 0, duration 16.2s

pnpm --dir ui lint
PASS

pnpm --dir ui typecheck
PASS

pnpm --dir ui build
PASS（保留既有 chunk warning）
```

Coverage 总计：Lines 79.33%、Branches 77.79%、Functions 81.81%。现有配置未以全局阈值阻止本次运行；本任务只消除重复执行，不调整既定覆盖率治理范围。
