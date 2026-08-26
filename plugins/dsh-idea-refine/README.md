# dsh-idea-refine

想法打磨：结构化发散-收敛思考，把模糊想法打磨成可执行的清晰概念
（一句话/用户/价值/范围/假设/成功标准/下一步）。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 idea-refine 技能启发，改编为 DSH 中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-idea-refine
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-idea-refine
# 重启 dsh web 生效
```

## 使用

对 agent 说"帮我想想 / 打磨这个想法"，`idea-refine` 技能走
发散 → 收敛 → 一页纸产出。

## 结构

```
dsh-idea-refine/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/idea-refine/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
