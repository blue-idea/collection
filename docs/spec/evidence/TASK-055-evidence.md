# TASK-055 验收证据

> 分支：`main`  
> 日期：2026-07-20

## 命令与结果

```text
go test ./config -count=1
# PASS

go test -tags=dev ./config -count=1
# PASS

go run ./scripts/check-identity
# profile=release
# appData=...\Roaming\Linkit
# secretService=Linkit

go run -tags=dev ./scripts/check-identity -write-probe
# profile=dev
# appData=...\Roaming\Linkit-Dev
# write-probe=ok
# 正式槽 data-root.json 未改变
```

## 结论

- 开发与正式身份槽隔离生效。
- Release CI 已增加正式身份断言与产物 `Linkit-Dev` 扫描门禁。
