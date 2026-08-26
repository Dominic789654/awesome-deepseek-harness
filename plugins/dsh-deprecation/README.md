# dsh-deprecation

弃用与迁移：代码是负债。安全移除旧系统/API/功能，规划迁移生命周期
（并行运行 → 灰度切换 → 弃用 → 清理收尾）。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 deprecation-and-migration 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-deprecation
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-deprecation
# 重启 dsh web 生效
```

## 使用

对 agent 说"下线这个功能 / 弃用这个 API / 迁移方案"，
`deprecation` 技能输出迁移计划 + 阶段化弃用流程。

## 结构

```
dsh-deprecation/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/deprecation/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
