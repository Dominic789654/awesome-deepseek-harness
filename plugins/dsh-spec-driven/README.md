# dsh-spec-driven

规格驱动开发：写代码前先写结构化 spec（背景/目标/非目标/范围/验收标准/
开放问题），四阶段门控推进（写 spec → 获批 → 实现 → 验证）。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 spec-driven-development 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-spec-driven
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-spec-driven
# 重启 dsh web 生效
```

## 使用

对 agent 说"先写规格再实现 / 这个功能怎么定义"，
`spec-driven` 技能输出结构化 spec，获批后才进入实现。

## 结构

```
dsh-spec-driven/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/spec-driven/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
