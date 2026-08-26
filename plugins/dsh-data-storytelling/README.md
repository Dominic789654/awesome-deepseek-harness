# dsh-data-storytelling

数据叙事：用可视化、上下文与说服结构把数据变成推动决策的故事。
SCQA 结构、图表选型、标题即结论、可信度增强。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 business-analytics/data-storytelling 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-data-storytelling
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-data-storytelling
# 重启 dsh web 生效
```

## 使用

对 agent 说"把这份数据讲成故事 / 做数据汇报"，`data-storytelling` 技能输出
核心信息 + SCQA 结构 + 图表建议 + 数据支撑。

## 结构

```
dsh-data-storytelling/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/data-storytelling/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
