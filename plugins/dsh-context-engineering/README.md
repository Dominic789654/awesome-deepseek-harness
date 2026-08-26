# dsh-context-engineering

上下文工程：按层级（规则文件→规格→源码→错误输出→对话历史）主动策划 agent
看到的信息，提升输出质量。上下文是 agent 输出质量的**最大杠杆**。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT，Google Chrome 团队 Addy Osmani 的生产级工程技能集）启发，
改编为 DSH 中文原创精简版（适配 AGENTS.md 规则文件体系）。

## 安装

```sh
dsh plugin --profile web add dsh-context-engineering
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-context-engineering
# 重启 dsh web 生效
```

## 使用

对 agent 说"帮我配置项目的规则文件 / 输出质量下降了 / 整理一下这个项目的上下文"，
`context-engineering` 技能按五层上下文层级排查与搭建。

## 结构

```
dsh-context-engineering/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/context-engineering/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
