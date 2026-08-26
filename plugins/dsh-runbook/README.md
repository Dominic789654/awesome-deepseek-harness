# dsh-runbook

事故手册：严重度分级（SEV1-4）、检测→分类→缓解→恢复→沟通五阶段、
升级路径、值班交接（on-call handoff）。手册写给"凌晨三点的脑袋"。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 incident-response/incident-runbook-templates 与 on-call-handoff-patterns
技能启发，改编为 DSH 中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-runbook
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-runbook
# 重启 dsh web 生效
```

## 使用

对 agent 说"写事故手册 / 搭服务恢复流程 / 值班交接"，
`runbook` 技能输出结构化手册（服务概述/常见场景/升级路径/联系方式）。

## 结构

```
dsh-runbook/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/runbook/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
