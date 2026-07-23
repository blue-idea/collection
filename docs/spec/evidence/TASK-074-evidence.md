# TASK-074 验收证据

> 任务：fix_task 1.16-1.18：一级分类入口、左右侧栏快捷键拆分、托盘双击显示窗口  
> 日期：2026-07-23

## 命令

```bash
pnpm --dir ui exec vitest run src/components/Sidebar.category-label.test.tsx src/features/shell/shortcuts.test.ts src/features/settings/ShortcutsPanel.test.tsx src/features/auth/persist-ui-settings.test.ts src/domain/library.test.ts
go test ./internal/tray ./internal/platform ./internal/settingsstore -count=1
go test ./... -count=1
pnpm --dir ui typecheck
pnpm --dir ui lint
pnpm --dir ui exec playwright test ui/tests/e2e/category-crud.spec.ts -g "当前选中分类时，收藏分类标题加号" --workers=1
pnpm --dir ui exec playwright test ui/tests/e2e/app-shell.spec.ts -g "快捷键 shall 打开 New Bookmark、Insights、Settings 并切换视图与左右侧栏" --workers=1
pnpm --dir ui exec playwright test ui/tests/e2e/settings-shortcuts.spec.ts -g "设置中列出 Shortcuts 分区与全部快捷键" --workers=1
```

## 结果

- Vitest：5 files passed，32 tests passed。
- Go：`internal/tray`、`internal/platform`、`internal/settingsstore` 全部通过。
- Go full suite：`go test ./... -count=1` 通过。
- Typecheck：通过。
- Lint：通过。
- Playwright：3 个定向用例全部通过。
- Manual：托盘图标双击的真实原生桌面验收本回合 `BLOCKED`。

## 截图与产物

- `docs/spec/evidence/TASK-074-root-category-create.png`
- `docs/spec/evidence/TASK-074-shortcuts-panel.png`
- `docs/spec/evidence/TASK-022-shortcut-matrix.json`

## 行为摘要

1. 左侧“收藏分类”标题后的 `+` 不再受当前选中分类影响，只创建一级分类。
2. 可配置快捷键从单一 `Toggle sidebar` 拆分为 `Toggle left sidebar` 和 `Toggle right sidebar`，默认分别为 `CmdOrCtrl+/`、`CmdOrCtrl+\`。
3. Shortcuts 展示层继续按平台渲染 `Ctrl` / `⌘`，并兼容旧 `toggleSidebar` 配置迁移到右侧栏动作。
4. 托盘宿主新增双击回调入口；Windows 与 macOS 代码路径已接入显示主窗口逻辑，但真实原生双击验收尚未执行。
5. 2026-07-23 补充修复：`Ctrl+L` 之所以能正常显示窗口，是因为它已接到 `ShowMainWindow/ToggleMainWindow` 路径；Windows 托盘双击异常的根因是 `main.go` 仅配置了 `OnSettings` 与 `OnQuit`，没有把 `OnDoubleClick` 绑定到同一显示路径。现已通过统一的托盘回调构造函数修复，并新增单元测试覆盖双击、Settings、Quit 三条路径。
