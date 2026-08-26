# dsh-superpowers-essentials

工程方法论核心技能：动手前分类获批（Spike/Bounded/Architectural）+ 系统化调试。

受 [obra/superpowers](https://github.com/obra/superpowers)（274k★ MIT，
最热门的 agentic skills 框架之一）启发，精选其核心方法论改编为 DSH 原创
精简技能：保留"实现前必须获批"的 HARD GATE 与"系统性调试"流程，去掉
其脚本依赖，聚焦可直接执行的工程纪律。

## 安装

```sh
dsh plugin --profile web add dsh-superpowers-essentials
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-superpowers-essentials
# 重启 dsh web 生效
```

## 使用

对 agent 说"先想清楚再做 / 帮我设计这个功能 / 这个 bug 怎么排查"，
`superpowers-essentials` 技能会自动加载工程方法论。

## 结构

```
dsh-superpowers-essentials/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/superpowers-essentials/SKILL.md
```

## License

MIT。技能内容为原创精简改编，灵感来自 obra/superpowers（MIT）。
