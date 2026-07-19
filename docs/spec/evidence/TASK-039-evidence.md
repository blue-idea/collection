# TASK-039 验收证据

## TDD 记录

- Red（Go）：`internal/health` 契约不存在，测试因 ProgressEvent、NewService、Fingerprint 等符号缺失而构建失败。
- Green（Go）：实现受限 HTTP 扫描、SHA-256 指纹、并发 worker、context 取消、事件进度和 Wails 事件桥接。
- Red（E2E）：对话框缺少 Manual scan only、Start scan、真实进度与状态入口行为。
- Green（E2E）：抽离 Health feature，接入手动扫描、逐项结果保存、Updated/Broken 入口与计数。
- Refactor：集中事件名和并发配置；桌面与浏览器适配器共享 HealthResult 契约；前端忽略非当前 scanId 的过期事件。

## 真实结果

- Go：PASS，86.8% statement coverage。
- Vitest：3 PASS，0 FAIL。
- Playwright E2E/视觉回归：1 PASS，0 FAIL。
- TypeScript、ESLint、Vite 正式构建：PASS。
- E2E 请求计数证明未主动触发时无健康网络请求。

## 证据文件

- `docs/spec/evidence/TASK-039-health-scan.png`
- `ui/tests/e2e/health-scan.spec.ts-snapshots/TASK-039-health-scan.png`

## 风险

- Playwright 验证浏览器适配器与 UI 契约；Go `httptest` 验证真实 HTTP 分类和取消。正式 Wails 桌面绑定将在 TASK-042 的桌面旅程中再次验收。
