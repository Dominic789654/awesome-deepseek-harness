# dsh-handoff

会话交接：把当前会话压缩成交接文档，供新会话/另一个 agent 接手继续工作。
含建议技能清单、引用已有产物（不重复）、脱敏、可执行下一步。

受 [mattpocock/skills](https://github.com/mattpocock/skills)
（223k★ MIT）启发，改编为 DSH 中文原创精简版（契合 DSH/CC 的交接档案体系）。

## 安装

```sh
dsh plugin --profile web add dsh-handoff
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-handoff
# 重启 dsh web 生效
```

## 使用

对 agent 说"写个交接文档 / 总结进度给下一个会话"，
`handoff` 技能输出结构化交接文档（状态/决策/下一步/建议技能/引用/风险）。

## 结构

```
dsh-handoff/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/handoff/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 mattpocock/skills（MIT）。
