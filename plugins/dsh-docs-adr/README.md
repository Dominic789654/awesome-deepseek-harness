# dsh-docs-adr

文档与架构决策记录：记录"为什么"而非只是"什么"。ADR 完整格式、
文档策略、何时不写文档。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 documentation-and-adrs 技能启发，改编为 DSH
中文原创精简版（与 dsh-domain-modeling 互补）。

## 安装

```sh
dsh plugin --profile web add dsh-docs-adr
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-docs-adr
# 重启 dsh web 生效
```

## 使用

对 agent 说"记录这个架构决策 / 写 ADR"，
`docs-adr` 技能输出 ADR + 文档策略建议。

## 结构

```
dsh-docs-adr/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/docs-adr/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
