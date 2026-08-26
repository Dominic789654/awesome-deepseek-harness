# dsh-database-design

数据库表设计：主键/规范化/索引/数据类型/约束/性能模式，PostgreSQL 重点
+ 通用规范。DSH 市场 database 类插件极少（约 2 个），空白明确。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT，
多 harness 插件技能库）的 database-design 插件启发，改编为 DSH
中文原创精简版（含 PostgreSQL Gotchas 中文整理）。

## 安装

```sh
dsh plugin --profile web add dsh-database-design
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-database-design
# 重启 dsh web 生效
```

## 使用

对 agent 说"帮我设计表结构 / review 这个 schema"，`database-design`
技能按 澄清需求 → 出模型 → 对照规则自查 → 给 DDL 流程执行。

## 结构

```
dsh-database-design/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/database-design/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
