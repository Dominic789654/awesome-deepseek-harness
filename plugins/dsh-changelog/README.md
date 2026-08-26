# dsh-changelog

变更日志自动化：Keep a Changelog 格式 + Conventional Commits + 语义化版本，
从 commit/PR 生成发布说明。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 documentation-generation/changelog-automation 技能启发，
改编为 DSH 中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-changelog
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-changelog
# 重启 dsh web 生效
```

## 使用

对 agent 说"生成 changelog / 写发布说明 / 规范 commit 信息"，
`changelog` 技能按 收集变更 → 分类 → 去噪 → 写条目 → 定版本 流程执行。

## 结构

```
dsh-changelog/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/changelog/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
