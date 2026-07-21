# TASK-066 验收证据

> 日期：2026-07-22  
> 平台：Windows 11 / Wails v2.13.0 / windows-amd64 production build

## 根因

1. `use-local-startup.ts` 的 UI/Domain 设置双向转换遗漏 `uiSize`，保存时由默认值覆盖为 `medium`，启动加载后 UI 中又变成 `undefined`。
2. 保存任意设置都会重新注册显隐全局热键；平台调用失败时后续窗口缩放与成功提示均不会执行。
3. `SettingsDialog` 未捕获异步保存异常，也没有保存中状态，用户只能看到弹窗保持原状。

## TDD Red

```text
persist-ui-settings.test.ts
FAIL: expected 'medium' to be 'large'
FAIL: expected undefined to be 'xlarge'

desktop-hotkey.test.ts
FAIL: unchanged accelerator still called SetToggleWindowHotkey once

SettingsDialog.test.tsx
FAIL: Unable to find role="alert"
FAIL: Save settings button was not disabled
Unhandled Rejection: desktop save failed
```

以上失败均来自目标行为缺失，随后才进入实现。

## 自动化验证

```text
定向 Vitest：3 files / 6 tests PASS
前端全量 Vitest：87 files / 329 tests PASS
Go 全量测试：PASS
go vet ./...：PASS
pnpm --dir ui quality：lint / typecheck / production build PASS
wails build：PASS，生成 build/bin/linkit.exe
Playwright Visual：1 test PASS（更新 Baseline 后再次运行 PASS）
```

定向覆盖率：

- `use-local-startup.ts`：88.67% lines。
- `desktop-hotkey.ts`：86.66% lines / 75% branches / 100% functions。
- `SettingsDialog.tsx`：38.37% lines；本任务新增的保存成功等待、保存中禁用与失败反馈关键分支均由组件测试覆盖。

## 视觉回归

- Baseline：`ui/tests/visual/settings-save-feedback.spec.ts-snapshots/TASK-066-settings-save-error-baseline.png`
- Actual：`docs/spec/evidence/TASK-066-settings-save-error-actual.png`
- Diff：`docs/spec/evidence/TASK-066-settings-save-error-diff.png`
- 不同像素：1527 / 328960，差异率 0.46419%，低于项目 12% 门限。

Playwright MCP 因运行环境将浏览器路径错误解析为包含字面量 `%USERNAME%` 而无法启动；同一用例已使用仓库锁定的 Playwright CLI 与 Chromium 真实执行，未将 MCP 阻塞伪报为 PASS。

## Windows 原生冷启动验收

1. 使用随机临时 `APPDATA`，不读取或修改用户真实 Linkit 数据。
2. 写入完整且有效的 `settings.json`，其中 `uiSize=large`。
3. 启动正式构建 `build/bin/linkit.exe`。
4. 通过 Win32 `GetWindowRect` 读取原生窗口，实际为 `1536×960`，与 Large 预设一致。
5. 通过 `PrintWindow` 留存截图：`TASK-066-native-large-restart.png`。
6. 仅终止本次启动的精确 PID；未操作其他 Linkit 进程。

测试使用内置示例资料库，不包含真实 Email、API Key、Token 或用户收藏。
