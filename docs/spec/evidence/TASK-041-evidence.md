# TASK-041 性能验收证据

## TDD 与采样记录

- Red 1：`test:performance` 不存在。
- Green 1：建立 production preview Playwright 性能入口与 10,000 条确定性数据采样。
- Red 2：完整 UI 投影超过浏览器 localStorage 配额；改用同一授权生成器的紧凑查询投影，桌面 AppData 不受此浏览器限制。
- Red 3：性能旅程发现搜索框 `value` 被硬编码为空，查询无法清除；绑定 `filters.query` 后恢复。
- Red 4：Playwright 跨进程测得视图切换 P95 168.29ms；切换到浏览器内 Performance API 后仍出现 97.50–134.30ms 波动。
- Refactor：按 TanStack Virtual 文档为 Card/List 提供统一 `initialRect`，减少首次尺寸探测等待。
- 规格对齐：用户确认将视图切换 P95 预算调整为 150ms；搜索与筛选继续保持 100ms。
- Green 2：全部 REQ-028-AC-005~008 调整后预算通过。

## 原始结果摘要

| 指标 | P50 | P95 / 实际 | 预算 |
|------|----:|-----------:|-----:|
| 热启动 | 219.31ms | 402.32ms | 2000ms |
| 搜索 | 21.05ms | 41.11ms | 100ms |
| 筛选 | 28.21ms | 34.11ms | 100ms |
| 视图切换 | 81.00ms | 141.50ms | 150ms |
| 本地保存 | 38.00ms | 41.20ms | 500ms |
| 网络 pending | — | 117.14ms | 300ms |

完整 66 个计时样本保存在 `TASK-041-performance-raw.json`。

## Go Benchmark

- 10,000 条资料库 revision 更新与 JSON 序列化：10.40–11.15ms/op。
- 吞吐：53.71–57.60 MB/s。
- 内存：约 3.78–3.83 MB/op，39–40 allocs/op。

## 风险

- 浏览器正式构建用于 UI 渲染、交互和 pending 预算；Windows Wails 正式二进制的启动与原生文件路径将在 TASK-042 再次验证。
- 连续三轮视图切换 P95 为 119.0ms、122.5ms、141.5ms，全部通过；最高值距离 150ms 门限较近，TASK-044 全量回归应持续监控。
