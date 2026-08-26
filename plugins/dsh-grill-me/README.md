# dsh-grill-me

苏格拉底式追问技能：不断向用户提问，直到对方案/设计达成共识。

灵感来自 [RobMitt/grill-me-skill](https://github.com/robmitt/grill-me-skill)
（skills.sh 热门技能，226★）。本实现为 DSH 原创改编：使用 DSH 的
`ask_user_question` 工具逐个提问，2-4 个具体选项，逐步走完决策树后输出总结。

## 安装

```sh
dsh plugin --profile web add dsh-grill-me
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-grill-me
# 重启 dsh web 生效
```

## 使用

装好后新会话的 `<available_skills>` 目录会出现 `grill-me`。对 agent 说
"grill me" / "帮我挑毛病" / "帮我验证这个方案"，它会用结构化提问逐条追问。

## 结构

```
dsh-grill-me/
├── index.js           # 注册 skills/ 到 ctx.skills（与官方技能提供方同秩 600）
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/grill-me/SKILL.md
```

## License

MIT。技能灵感来自 grill-me-skill（无 LICENSE 的公开仓库），正文为原创。
