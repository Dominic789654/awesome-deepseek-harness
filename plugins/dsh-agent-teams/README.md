# dsh-agent-teams

多 agent 团队协作：团队构成（主导/执行/评审）、任务协调、并行工作流、
沟通协议、集成验收。契合 DSH 的 subagent 机制。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 agent-teams 插件技能启发，改编为 DSH 中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-agent-teams
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-agent-teams
# 重启 dsh web 生效
```

## 使用

对 agent 说"多 agent 并行处理 / 团队式开发"，`agent-teams` 技能输出
角色划分 + 任务协调 + 沟通协议。

## 结构

```
dsh-agent-teams/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/agent-teams/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
