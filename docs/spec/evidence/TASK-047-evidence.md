# TASK-047 验收证据

> 分支：`feat/TASK-047-data-root`  
> 日期：2026-07-19

---

## 命令与结果

### Go

```text
go test ./internal/localstore/... ./internal/settingsstore/... -count=1 -cover
ok  github.com/blue-idea/collection/internal/localstore      coverage: 79.1% of statements
ok  github.com/blue-idea/collection/internal/settingsstore   coverage: 85.6% of statements
```

数据根相关用例：`TestGetDataRoot_*`、`TestMigrateDataRoot_*`、`TestResolveEffectiveDataRoot_*` 全部 PASS。

### Vitest

```text
pnpm --dir ui test -- src/services/storage/data-root.test.ts
Test Files  1 passed (1)
Tests       3 passed (3)
```

### Playwright

```text
pnpm --dir ui exec playwright test tests/e2e/storage-data-root.spec.ts
2 passed (7.6s)
```

截图：`docs/spec/evidence/TASK-047-data-root-settings.png`

### Typecheck

```text
pnpm --dir ui typecheck
exit 0
```

---

## 实现要点

- `data-root.json` 固定在默认 AppData 引导根；有效数据根可重定向。
- 迁移白名单：library / settings / cloud-draft 及其 bak/tmp；密钥不落盘。
- `main.go` 通过 `WithRootChanged` 同步 `settingsstore.SetRootDir`。
- Settings → Storage 增加 Data location 展示、文件夹选择确认与英文错误。

---

## 残余风险

- 浏览器 E2E 使用对话框替身，完整原生 `OpenDirectoryDialog` 需在 Wails 桌面旅程（TASK-042）补验。
- 跨盘超大资料库迁移耗时未做性能测试；失败路径已有回滚单测。
