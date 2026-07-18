# TASK-005 验收证据

> 日期：2026-07-18
> 分支：`feat/TASK-005-domain-store`

## TDD 证据

- Red 1：领域成员命令测试 4/4 因目标函数不存在而按预期失败。
- Green 1：实现统一 `CommandResult`、结构化错误和双向成员命令后 4/4 通过。
- Red 2：Repository/Coordinator 测试 8/8 因工厂不存在而按预期失败。
- Green 2：实现正式接口、真实 MemoryRepository、revision 冲突、校验和活动仓库路由后 8/8 通过；其中一次数组匹配断言错误已修正为检查实际书签字段。
- Red 3：Zustand Store 测试 8/8 因 Store 和 selector 不存在而按预期失败。
- Green 3：安装精确版本 Zustand 5.0.12，并按官方 slices pattern 实现五类 slice 后 8/8 通过。
- QA 修复第 1 轮：类型检查发现失败联合在闭包中未收窄；经用户确认后将辅助函数返回类型收窄，重新执行全部门禁通过。

## 实际执行结果

| 命令 | 实际结果 |
|------|----------|
| `pnpm --dir ui exec vitest run src/store src/domain/commands src/repositories` | PASS，3 files、20/20 tests |
| `pnpm --dir ui exec vitest run src/store src/domain/commands src/repositories --coverage ...` | PASS；任务行 100%、分支 94.84%、函数 100%；领域命令分支 92.3% |
| `pnpm --dir ui exec vitest run` | PASS，9 files、47/47 tests |
| `pnpm --dir ui typecheck` | PASS，0 error |
| `pnpm --dir ui lint` | PASS，0 error |
| `pnpm --dir ui build` | PASS，Vite production build 完成 |
| `pnpm --dir ui audit --audit-level high --registry https://registry.npmjs.org` | PASS，未发现已知漏洞 |
| `rg` 实体数组原地修改检查 | PASS，`bookmarks/categories/collections/tags` 未发现 `push/splice/sort/reverse/shift/unshift` |
| `git diff --check` | PASS，无空白错误 |

## 功能证据

- 领域命令：添加/移除主题成员时同步两侧引用，不修改输入数据，并输出 `bookmark.collection-membership.changed` 事件。
- 命令失败：不存在的实体或无效结果返回稳定英文错误，Store 保留最后有效资料库。
- Repository：支持 empty/found、深拷贝加载、校验保存、replace、describe 和 revision 冲突。
- StorageCoordinator：所有 load/save/replace/describe 调用由活动或指定 Repository 执行。
- Store：组合 session、library、sync、ui、settings slices；不使用 Zustand `persist` 保存领域数据。
- Selector：书签、会话模式、同步状态、主题和选中书签均使用细粒度 selector。
- 外部失败：云错误不禁用本地模式和领域命令；保存失败不产生伪成功状态。
- UI 视觉回归：不适用，本任务未修改现有组件渲染或样式。

## 依赖记录

- 新增直接依赖：`zustand` 5.0.12，版本与已定稿 `design.md` 一致并精确锁定。
- 用途：实现模块化 slices、vanilla Store 单元测试和细粒度 selector。
- 安全影响：首次使用当前镜像审计时端点返回 HTTP 405；改用 npm 官方 registry 后真实审计通过，无已知漏洞。

## 已知风险

- 原型 `App.tsx` 仍使用 React `setBookmarks/setCats/setCols/setTagList` 进行不可变状态替换；不存在源实体数组原地 mutation，但完整迁移到新命令/Store 将随 TASK-010~018 的业务实现逐步完成。
- session slice 的真实 signIn/signUp/signOut 适配属于 TASK-027；sync 的防抖保存、重试、冲突决策属于 TASK-006、TASK-028~029。
- REQ-027-AC-002~003 的真实 UI/E2E 仍保持 `BLOCKED`。

## 产物

- HTML 覆盖率：`ui/coverage/index.html`
- JSON 摘要：`ui/coverage/coverage-summary.json`
- AC 矩阵：`docs/spec/ac/TASK-005-AC.md`
- 测试报告：`docs/spec/reports/TASK-005-report.md`
