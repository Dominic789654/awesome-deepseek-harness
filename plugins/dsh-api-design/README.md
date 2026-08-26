# dsh-api-design

API/接口设计：稳定、难误用的接口。Hyrum's Law、REST/GraphQL 设计、
模块边界、变更公开接口的评估流程。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 api-and-interface-design 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-api-design
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-api-design
# 重启 dsh web 生效
```

## 使用

对 agent 说"设计这个 API / 这个接口怎么设计"，`api-design` 技能按
核心原则 → REST/GraphQL/模块边界 → 变更评估 流程输出接口设计文档。

## 结构

```
dsh-api-design/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/api-design/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
