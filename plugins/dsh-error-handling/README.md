# dsh-error-handling

错误处理模式：错误分层（预期/意外）、类型化错误与统一格式、优雅降级、
可观测性（日志/指标/告警）、恢复策略（重试/补偿/人工介入）。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 developer-essentials/error-handling-patterns 技能启发，改编为 DSH
中文原创精简版（与 dsh-observability / dsh-tdd 互补）。

## 安装

```sh
dsh plugin --profile web add dsh-error-handling
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-error-handling
# 重启 dsh web 生效
```

## 使用

对 agent 说"错误处理怎么设计"，`error-handling` 技能输出
错误分层 + 类型化格式 + 优雅降级 + 可观测方案。

## 结构

```
dsh-error-handling/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/error-handling/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
