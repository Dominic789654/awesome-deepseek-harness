# dsh-frontend-engineering

前端 UI 工程：组件设计、状态管理、数据获取、性能与可维护性，把前端当工程做。
与 dsh-frontend-design 互补（设计好看 vs 实现正确）。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 frontend-ui-engineering 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-frontend-engineering
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-frontend-engineering
# 重启 dsh web 生效
```

## 使用

对 agent 说"搭前端工程 / 组件怎么设计 / 状态管理怎么选"，
`frontend-engineering` 技能按组件→状态→数据→性能→结构 输出工程方案。

## 结构

```
dsh-frontend-engineering/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/frontend-engineering/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
