# dsh-merge-conflicts

解决 git 合并/变基冲突：看清现状 → 找到各方意图 → 逐块解决 →
跑自动化检查 → 完成合并。

受 [mattpocock/skills](https://github.com/mattpocock/skills)
（223k★ MIT）启发，改编为 DSH 中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-merge-conflicts
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-merge-conflicts
# 重启 dsh web 生效
```

## 使用

对 agent 说"帮我解决这个合并冲突 / rebase 冲突了"，提供 git 状态，
`merge-conflicts` 技能按五步流程稳定解决。

## 结构

```
dsh-merge-conflicts/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/merge-conflicts/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 mattpocock/skills（MIT）。
