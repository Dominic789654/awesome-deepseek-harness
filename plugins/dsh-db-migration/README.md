# dsh-db-migration

数据库迁移：迁移流程、up/down 成对脚本、不宕机变更模式
（expand-contract）、数据一致性校验、回滚。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 framework-migration/database-migration 技能启发，改编为 DSH
中文原创精简版（与 dsh-database-design / dsh-deprecation 互补）。

## 安装

```sh
dsh plugin --profile web add dsh-db-migration
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-db-migration
# 重启 dsh web 生效
```

## 使用

对 agent 说"改表结构 / 数据迁移"，`db-migration` 技能输出
迁移方案（up/down + 不宕机模式 + 校验与回滚）。

## 结构

```
dsh-db-migration/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/db-migration/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
