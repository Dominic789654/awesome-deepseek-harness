# dsh-postmortem

事故复盘写作：无指责文化、根因分析（5 Whys）、时间线、行动项，驱动组织学习。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 incident-response/postmortem-writing 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-postmortem
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-postmortem
# 重启 dsh web 生效
```

## 使用

对 agent 说"写事故复盘 / 复盘这次事故"，提供事件信息，
`postmortem` 技能输出无指责复盘文档（摘要/时间线/5 Whys 根因/行动项/教训）。

## 结构

```
dsh-postmortem/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/postmortem/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
