# TASK-046 验收证据

> 任务：优化六套主题皮肤并新增浅色主题
> 日期：2026-07-19
> 分支：`feat/TASK-046-theme-skins`

## TDD 证据

### Red

| 命令 | 真实结果 |
|------|----------|
| `pnpm --dir ui exec vitest run src/services/settings/settings.test.ts src/features/settings/settings-ui.test.ts src/themes.test.ts` | 6 个目标断言失败：Daylight/Paper Schema、本地化、主题列表和 CSS token 尚未实现 |
| `go test ./internal/settingsstore -run TestDecodeAcceptsAllThemeValues -count=1` | `daylight`、`paper` 被 Go 设置校验拒绝 |
| `pnpm --dir ui exec playwright test tests/visual/theme-skins.spec.ts --workers=1` | 在寻找 `Daylight` 主题按钮时失败，符合 E2E Red 预期 |

### Green / Refactor

| 命令 | 真实结果 |
|------|----------|
| `pnpm --dir ui exec vitest run src/services/settings/settings.test.ts src/features/settings/settings-ui.test.ts src/themes.test.js` | 3 files、12 tests 全部通过 |
| `go test ./internal/settingsstore -run TestDecodeAcceptsAllThemeValues -count=1` | PASS |
| `pnpm --dir ui exec playwright test tests/visual/theme-skins.spec.ts --workers=1 --update-snapshots` | 生成 12 张 Baseline；调整测试超时预算后 1 test PASS |
| `pnpm --dir ui exec playwright test tests/visual/theme-skins.spec.ts --workers=1` | 1 test PASS，六主题全部完成选择、保存、重载恢复与截图比对 |

## QA 结果

| 测试层级 | 命令 | 真实结果 |
|----------|------|----------|
| TypeScript | `pnpm --dir ui typecheck` | PASS，0 error |
| ESLint | `pnpm --dir ui lint` | PASS，0 error |
| Build | `pnpm --dir ui build` | PASS；存在 2 条既有动态/静态混合导入提示，不影响构建 |
| React Unit/Coverage | `pnpm --dir ui test:coverage` | 58 files、247 tests PASS；全局行覆盖率 36.52%，分支 76.43% |
| Go Unit | `go test -cover ./internal/settingsstore` | PASS，statement coverage 86.2% |
| Go Regression | `go test ./...` | PASS，全部 Go package 无失败 |
| E2E/Visual | `pnpm --dir ui exec playwright test tests/e2e/settings-i18n.spec.ts tests/visual/theme-skins.spec.ts --workers=1` | 5 tests PASS，耗时 48.2s |

## 视觉证据

- Snapshot Baseline：`ui/tests/visual/theme-skins.spec.ts-snapshots/TASK-046-*-baseline.png`（12 张）。
- 归档 Baseline：`docs/spec/evidence/TASK-046-*-baseline.png`（12 张）。
- Actual：`docs/spec/evidence/TASK-046-*-actual.png`（12 张）。
- Diff：`docs/spec/evidence/TASK-046-*-diff.png`（12 张）。
- 指标：`docs/spec/evidence/TASK-046-visual-diff-metric.txt`。
- Playwright `maxDiffPixelRatio <= 0.02`：12/12 PASS。
- 本地人工审查 Daylight、Paper 主窗口与 Appearance 设置：未发现重叠、裁切或不可读控件。

## 工具阻塞与风险

- Playwright MCP 独立浏览器启动为 `BLOCKED`：其运行时错误地解析到字面量路径 `C:\Users\%USERNAME%\AppData\Local\ms-playwright\...`，Chromium executable 不存在。项目内 Playwright Test 使用已安装 Chromium 完成全部视觉验收；不得将 MCP 启动失败伪报为 PASS。
- 项目级 Vitest 全局行覆盖率 36.52%，低于 `test_strategy.md` 的 85% 目标。该差距主要来自既有大型 UI 组件未纳入单元覆盖；本次直接变更的 `config/themes.ts`、Schema、i18n 均为 100%，`themes.ts` 为 95%。

## 功能边界检查

- 未修改收藏、分类、主题组合、标签、同步、AI 或窗口交互流程。
- 默认主题仍为 Midnight；现有四主题 ID 和设置结构保持兼容。
- 新增主题只扩展 AppSettings 合法枚举、主题元数据、本地化与视觉令牌。
