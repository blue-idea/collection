# TASK-045 书签操作与批量操作验收证据

## TDD 记录

- Red：领域测试首次因 `batch-actions` 模块不存在而失败。
- Red：E2E 首次因缺少 `Edit bookmark` 与 `Select bookmark` 入口而失败。
- Green：实现统一编辑、原子批量移动/删除、结果投影和可见操作入口，领域测试 3/3 通过。
- Red：新增 Shift 范围测试后因 `selectBookmarkRange` 不存在而失败。
- Green：实现按当前视图顺序的范围计算，领域测试 4/4 通过。
- QA 修复：扩展 Ctrl/Cmd 与 Shift E2E 时，测试 seed 标题少了“界面”二字导致定位超时；用户确认后对齐真实 seed，复跑 2/2 通过。

## 实际命令结果

| 命令 | 实际结果 |
|------|----------|
| `pnpm --dir ui typecheck` | PASS，零 TypeScript error |
| `pnpm --dir ui exec vitest run src/features/bookmarks/batch-actions.test.ts` | PASS，4 tests |
| `pnpm --dir ui exec playwright test tests/e2e/bookmark-actions.spec.ts --workers=1 --update-snapshots` | PASS，2 tests，生成 Baseline |
| `pnpm --dir ui exec playwright test tests/e2e/bookmark-actions.spec.ts --workers=1` | PASS，2 tests，无视觉 Diff |
| `pnpm --dir ui lint` | PASS，零 ESLint error |
| `pnpm --dir ui build` | PASS；Vite 输出两个既有动态/静态混合导入 warning |

## 覆盖旅程

1. 从卡片可见 Edit 入口打开统一编辑对话框。
2. 对话框显示 URL 与 Notes，并保存修改后的 Title 和 URL。
3. Ctrl/Cmd 点击追加选择，Shift 点击选择连续范围。
4. checkbox 选择两项后显示固定批量工具栏。
5. 批量移动选择其他分类并在成功后清空选择。
6. 批量删除显示数量和二次确认，取消后保留选择。

## 截图

- `docs/spec/evidence/TASK-045-bookmark-actions.png`
- `ui/tests/e2e/bookmark-actions.spec.ts-snapshots/TASK-045-bulk-delete.png`

## 已知风险

- Vite 构建仍报告 `storage.ts` 与 `browser-adapters.ts` 同时被静态和动态导入的既有 warning，不影响本任务构建产物或验收旅程。
