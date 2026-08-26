# dsh-observability

可观测性与埋点：日志/指标/追踪三支柱、结构化日志、RED/USE 指标、
分布式追踪、基于 SLO 的告警设计。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 observability-and-instrumentation 技能启发，改编为 DSH
中文原创精简版（与 dsh-slo 互补）。

## 安装

```sh
dsh plugin --profile web add dsh-observability
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-observability
# 重启 dsh web 生效
```

## 使用

对 agent 说"加日志 / 埋点 / 监控告警怎么设"，
`observability` 技能按三支柱 + 实现清单输出。

## 结构

```
dsh-observability/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/observability/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
