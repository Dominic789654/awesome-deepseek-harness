# dsh-slo

SLI/SLO/错误预算：定义可衡量的可靠性目标，用错误预算平衡可靠性与创新速度，
建立 SLO 告警与预算耗尽行动策略。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 observability-monitoring/slo-implementation 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-slo
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-slo
# 重启 dsh web 生效
```

## 使用

对 agent 说"给这个服务定可靠性目标 / 设计 SLO"，
`slo` 技能按 选 SLI → 定 SLO → 算错误预算 → 建告警 → 定期评审 流程输出。

## 结构

```
dsh-slo/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/slo/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
