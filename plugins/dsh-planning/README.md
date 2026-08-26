# dsh-planning

计划与任务拆解：把模糊目标拆成可验证的小任务、排序依赖、估算工作量、
里程碑与追踪。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 planning-and-task-breakdown 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-planning
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-planning
# 重启 dsh web 生效
```

## 使用

对 agent 说"做个计划 / 拆解任务 / 怎么开始"，`planning` 技能输出
可验证的任务表 + 依赖排序 + 里程碑。

## 结构

```
dsh-planning/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/planning/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
