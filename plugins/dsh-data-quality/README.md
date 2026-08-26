# dsh-data-quality

数据质量框架：八类校验规则、数据契约（跨团队）、质量监控、CI 自动化。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 data-engineering/data-quality-frameworks 技能启发，改编为 DSH
中文原创精简版（与 dsh-database-design 互补）。

## 安装

```sh
dsh plugin --profile web add dsh-data-quality
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-data-quality
# 重启 dsh web 生效
```

## 使用

对 agent 说"加数据质量检查 / 建数据契约"，`data-quality` 技能输出
校验规则 + 契约 + 监控方案。

## 结构

```
dsh-data-quality/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/data-quality/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
