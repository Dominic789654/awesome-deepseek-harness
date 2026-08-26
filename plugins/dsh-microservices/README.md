# dsh-microservices

微服务架构模式：服务边界（按业务能力）、通信（同步/异步选型）、
分布式数据（Saga/事件溯源/CQRS）、韧性（熔断/超时/舱壁/幂等）、事件驱动。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 backend-development/microservices-patterns 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-microservices
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-microservices
# 重启 dsh web 生效
```

## 使用

对 agent 说"拆微服务 / 服务边界怎么划"，`microservices` 技能输出
边界方案 + 通信选型 + 韧性设计。

## 结构

```
dsh-microservices/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/microservices/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
