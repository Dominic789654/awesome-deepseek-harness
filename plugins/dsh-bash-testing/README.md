# dsh-bash-testing

DSH（DeepSeek Harness）技能插件：**Shell 脚本测试**。

BATS（Bash Automated Testing System）单元测试：错误条件与边界测试（含消息断言）、fixture 与依赖 stub、CI 集成、多 shell 方言验证。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-bash-testing
```

## 触发方式

描述中包含"BATS / shell 测试 / 脚本单元测试 / 脚本 TDD / bash 测试 / 脚本 CI"等关键词时自动触发。

## 能力

- BATS run/$status/$output 断言模式
- 错误条件测试（缺文件/非法输入/权限拒绝）
- fixture 与依赖 stub、环境隔离
- CI 接入与多方言验证

## 许可

MIT
