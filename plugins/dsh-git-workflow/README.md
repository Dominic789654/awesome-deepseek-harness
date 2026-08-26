# dsh-git-workflow

git 工作流与版本管理：主干开发、提交纪律、分支策略、语义化版本、发布流程。
与 dsh-merge-conflicts 互补（那个解决冲突，这个管完整工作流纪律）。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 git-workflow-and-versioning 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-git-workflow
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-git-workflow
# 重启 dsh web 生效
```

## 使用

对 agent 说"帮我规范 git 流程 / 怎么分支怎么发版"，
`git-workflow` 技能给出主干开发/提交纪律/版本与发布流程。

## 结构

```
dsh-git-workflow/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/git-workflow/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
