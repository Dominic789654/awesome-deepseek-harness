# dsh-architecture

架构模式：Clean Architecture、Hexagonal（六边形）、DDD 战术模式、
依赖规则（向内依赖）与测试边界。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 backend-development/architecture-patterns 技能启发，改编为 DSH
中文原创精简版（与 dsh-domain-modeling / dsh-microservices 互补）。

## 安装

```sh
dsh plugin --profile web add dsh-architecture
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-architecture
# 重启 dsh web 生效
```

## 使用

对 agent 说"设计架构 / 分层怎么划"，`architecture` 技能输出
分层结构 + 依赖规则 + 测试边界。

## 结构

```
dsh-architecture/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/architecture/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
