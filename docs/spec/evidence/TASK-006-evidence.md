# TASK-006 验收证据

> 日期：2026-07-18
> 分支：`feat/TASK-006-localstore`

## TDD 证据

- Red 1：Wails 入口绑定测试因 `internal/localstore` 与 `LocalDocumentService` 不存在而失败；Green 后服务实例通过 `options.App.Bind` 装配。
- Red 2：本地文件生命周期、损坏恢复、写入失败和云草稿测试真实失败于 `Not implemented`；Green 后实现 AppData 路径、revision、同步临时写入、原子替换、`.bak`、恢复信号及 dirty 清理门禁。
- Red 3：空资料库摘要省略 `updatedAt`；Green 后使用可空字段稳定输出 `updatedAt: null`。
- QA 修复第 1 轮：覆盖率 77.6%；原子最终替换失败会删除旧备份，备份提交失败会留下部分成功的新正式文件。经确认后按 Red-Green 修复完整回滚，并拒绝尾随 JSON、隔离公开错误消息，覆盖率升至 81.0%。
- QA 修复第 2 轮：短写被误报成功、信封时间与 `data` 类型未校验、缺失 `bookmarks` 被误报为 0、磁盘超限文件错误码错误、Windows 普通文件根路径被误判为空。经确认后逐项 Red-Green，并补齐文件系统错误矩阵，最终覆盖率 89.3%。

## 实际执行结果

| 命令 | 实际结果 |
|------|----------|
| `go test ./internal/localstore -v` | PASS，49 个测试节点、失败 0 |
| `go test -count=1 -covermode=atomic -coverprofile .\coverage-task006.out ./internal/localstore/...` | PASS，语句覆盖率 89.3% |
| `go tool cover -func .\coverage-task006.out` | `writeSyncedFile` 100%、`commitRecoveryAsBackup` 100%、`atomicReplace` 92.9%，原子成功与主要失败/回滚路径均有状态断言 |
| `go test ./...` | PASS，`internal/localstore` 与 `internal/scaffold` 全部通过 |
| `go vet ./...` | PASS，0 error |
| `gofmt -l config internal main.go` | PASS，无未格式化文件 |
| `pnpm --dir ui quality` | PASS，ESLint、TypeScript、Vite production build 均通过 |
| `pnpm --dir ui exec vitest run` | PASS，9 files、47/47 tests |
| `pnpm --dir ui verify:quality-config` | PASS，质量配置契约有效 |
| `git diff --check` | PASS，无空白错误；仅存在 Git 的 LF/CRLF 工作区提示 |

## 文件状态证据

| 场景 | 真实测试断言 |
|------|--------------|
| 首次保存 | 仅存在 `library.json`；revision 为 1；`library.json.tmp` 与 `.bak` 不存在 |
| 连续保存 | `library.json` revision 为 2；`library.json.bak` revision 为 1；临时文件不存在 |
| 最终替换失败 | `library.json` 保持原内容，`.bak` 保持旧备份，`.tmp` 与 `.previous` 均不存在 |
| 备份提交失败 | 新正式文件被回滚，原正式文件与原备份同时恢复 |
| 损坏正式文件 | 返回 `recovery_available` 和有效备份 JSON，不静默覆盖损坏文件 |
| dirty 云草稿 | `ClearCloudDraft` 返回 `INVALID_ARGUMENT` 且保留草稿 |
| clean 云草稿 | 调用方写入 `dirty=false` 后允许清理，正式草稿文件不存在 |

## 功能证据

- `LocalDocumentService` 作为独立 Go Service 绑定到 Wails；未手工编辑生成绑定。
- 本地资料库支持 empty/found/recovery_available、revision 校验、confirmed replace 和存储摘要。
- 原子写入使用权限受限的同步临时文件；失败时清理临时路径并保护正式文件与备份。
- 云草稿独立于本地资料库，dirty 状态未经解决时禁止清理。
- Go 仅校验 JSON 整体语法、大小、信封格式、UTC 时间和摘要所需字段；完整领域 Schema 继续由前端 Zod 负责。
- 公开错误消息为稳定英文，不包含底层本机路径；内部 cause 仍可通过 `errors.Is` 追踪。
- UI 视觉回归不适用，本任务未修改组件渲染或样式。

## 配置与依赖记录

- 新增集中配置：AppData 子目录名、资料库/备份/临时文件名、云草稿文件名和 64 MiB 单文件上限。
- 64 MiB 为规格未规定固定数值时采用的保守实现上限，集中保存在 `config/storage.go`，未硬编码到业务流程。
- 未新增第三方依赖；原子文件实现使用 Go 标准库。

## 已知风险

- 完整本地重启恢复还需要 TASK-007 的设置文件和 TASK-010 的启动接入。
- CloudRepository、真实 Supabase 失败、revision 冲突选择和 dirty 草稿启动恢复由 TASK-028、TASK-029 完成。
- TypeScript LocalRepository/Wails 生成绑定适配未在本任务接入，避免提前侵入启动装配任务。
- 双重文件系统故障中的回滚自身失败属于低概率嵌套异常；主要原子写入、同步、备份提交及单次回滚失败路径已覆盖。

## 产物

- AC 矩阵：`docs/spec/ac/TASK-006-AC.md`
- 测试报告：`docs/spec/reports/TASK-006-report.md`
- 实现：`internal/localstore/`、`config/storage.go`、`config/errors.go`、`main.go`
