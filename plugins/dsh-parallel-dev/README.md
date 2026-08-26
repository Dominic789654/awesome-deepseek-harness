# dsh-parallel-dev

并行功能开发：文件所有权、接口契约先行、避免冲突、集成策略
（垂直切片 vs 水平分层）。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 agent-teams/parallel-feature-development 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-parallel-dev
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-parallel-dev
# 重启 dsh web 生效
```

## 使用

对 agent 说"拆并行开发 / 多 agent 同时实现"，`parallel-dev` 技能输出
工作流划分 + 文件所有权 + 接口契约 + 集成计划。

## 结构

```
dsh-parallel-dev/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/parallel-dev/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
