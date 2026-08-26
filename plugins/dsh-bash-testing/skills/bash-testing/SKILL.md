---
name: bash-testing
description: |
  Shell 脚本测试：BATS（Bash Automated Testing System）单元测试、
  错误条件与边界测试、fixture 与依赖注入、CI 集成、
  多 shell 方言验证。
  当用户给 shell 脚本写测试、做脚本 TDD、
  搭 CI 测试或验证脚本错误处理时使用。
  受 wshobson/agents（38k★ MIT）启发的中文原创精简版。
---

# Bash Testing — Shell 脚本测试

用 BATS 给 shell 脚本写生产级测试：单元、错误条件、边界与 CI。

## 何时用

- 给 shell 脚本写单元测试
- 脚本 TDD（先测试后实现）
- CI/CD 流水线自动化测试
- 测试边界与错误条件
- 多 shell 环境验证（bash/sh/dash）

## 1. BATS 基础

```bash
#!/usr/bin/env bats

@test "正常路径：函数返回预期输出" {
    run my_function "input"
    [ "$status" -eq 0 ]
    [[ "$output" == *"expected"* ]]
}
```

- `run` 捕获状态码与输出；`$status`/`$output` 断言
- setup/teardown：`setup()` 每用例前、`teardown()` 每用例后

## 2. 错误条件测试（重点）

- 缺文件：`run my_function "/nonexistent"` → status≠0 + 错误信息断言
- 非法输入：空参/错误选项 → status≠0 + "Usage:" 断言
- 权限拒绝：`chmod 000` 场景 → status≠0（测完恢复权限）
- 每条错误路径都有对应测试（含消息内容，不只状态码）

## 3. fixture 与依赖

- 测试用临时目录（`$BATS_TMPDIR`），不污染真实环境
- 外部命令 stub：PATH 前置假命令目录
- 环境变量隔离：测试内 export，teardown 还原

## 4. CI 集成与方言

- CI 步骤：`bats tests/`（或按目录）；失败即阻断
- 多方言：bash/sh/dash 各跑一遍（shebang 兼容性）
- shellcheck 静态检查与 BATS 测试互补

## 5. 自查清单

- [ ] 正常路径 + 每条错误路径都有测试
- [ ] 错误断言含消息内容（不只状态码）
- [ ] 测试隔离（临时目录/环境变量还原）
- [ ] 外部依赖已 stub
- [ ] CI 接入并阻断失败
- [ ] 多 shell 方言验证

## 边界

- BATS 版本差异（v5+ 与旧版语法），按安装版本查文档。
- 测试要快：慢集成留到 CI 单独阶段，别拖慢本地 TDD 循环。
