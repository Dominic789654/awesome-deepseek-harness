# dsh-code-reviewer

五轴代码评审：正确性/可读性/架构/安全/性能 + 质量门槛，任何变更合并前必审
（自己写的、其他 agent 写的、人类写的都要审）。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）启发，改编为 DSH 中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-code-reviewer
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-code-reviewer
# 重启 dsh web 生效
```

## 使用

对 agent 说"帮我 review 这个改动 / 合并前检查一下"，
`code-review` 技能按五轴评审输出结论（批准/需修改/拒绝）+ 分级建议。

## 结构

```
dsh-code-reviewer/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/code-review/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
