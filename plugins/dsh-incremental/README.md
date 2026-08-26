# dsh-incremental

增量实现：小步推进、每步可验证、始终保持系统可运行，避免大爆炸式改动。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 incremental-implementation 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-incremental
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-incremental
# 重启 dsh web 生效
```

## 使用

对 agent 说"逐步实现 / 增量开发"，`incremental` 技能按
拆步 → 门控推进 → 保持可运行 执行。

## 结构

```
dsh-incremental/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/incremental/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
