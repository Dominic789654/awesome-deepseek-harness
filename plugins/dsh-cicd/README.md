# dsh-cicd

CI/CD 自动化：质量门禁、shift-left、构建部署管线、发布策略、调试 CI 失败。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 ci-cd-and-automation 技能启发，改编为 DSH 中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-cicd
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-cicd
# 重启 dsh web 生效
```

## 使用

对 agent 说"配 CI / 加质量门禁 / 部署管线怎么搭"，
`cicd` 技能输出管线配置 + 门禁清单 + 部署策略。

## 结构

```
dsh-cicd/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/cicd/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
