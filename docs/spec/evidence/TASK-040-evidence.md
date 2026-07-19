# TASK-040 安全与隐私测试报告

## TDD 与修复记录

- Red：`test:security` 不存在；Secret Scan 发现 3 个 Supabase 测试脚本硬编码 JWT 形态 anon key；`govulncheck` 发现 17 个可达漏洞。
- 用户确认第 1 轮修复方案后，新增测试环境契约测试，确认模块不存在导致 Node 测试失败。
- Green：抽取统一 `.env.test` 加载器并移除硬编码 key；新增不输出敏感值的仓库扫描器；升级 `golang.org/x/net` 至 v0.55.0，并固定 `toolchain go1.26.5`。
- Refactor：远程与本地 Supabase 脚本复用同一环境加载逻辑；统一 `test:security` 入口。

## 真实结果

- Go 漏洞：修复前 17 个可达漏洞，修复后 0。
- Node 依赖：0 个已知漏洞。
- Secret Scan：626 个受控及新增文件，0 命中。
- 截图敏感模式：90 个受控截图，0 命中。
- 安全相关 Vitest：57 PASS，0 FAIL。
- 环境配置 Node Test：2 PASS，0 FAIL。
- 远程 Supabase：17 PASS，0 FAIL；未认证读为空，写入被拒绝，跨用户无数据泄露。
- 全量 Go：PASS。

## 风险与说明

- 本地 Supabase 在首次基线运行时未启动，连接失败；最终 RLS 结论来自已授权的远程 staging 实际调用，而非 Mock。
- `REQ-025-AC-004` 针对自建入站 HTTP API/Edge Function；当前产品没有该接口面，因此没有可安全触发的自建限流端点，也未制造虚假 429。
- OS Keychain 的真实平台验收继续由 TASK-042/TASK-043 执行。
