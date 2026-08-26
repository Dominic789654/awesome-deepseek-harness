# dsh-source-driven

源码驱动开发：每个框架/库代码决策都用官方文档背书，不凭记忆实现，
验证并引用来源（注释标注 + 来源清单交付）。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 source-driven-development 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-source-driven
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-source-driven
# 重启 dsh web 生效
```

## 使用

对 agent 说"按官方文档实现 / 要验证过的写法"，
`source-driven` 技能查官方文档、引用来源、交付来源清单。

## 结构

```
dsh-source-driven/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/source-driven/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
