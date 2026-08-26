# dsh-skill-creator

技能创作器：教 agent 按 agentskills.io 规范编写高质量 SKILL.md 技能。
改编自 [Anthropic 官方 skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)
（Apache-2.0），并针对 DSH 技能体系（ctx.skills、kebab-case、触发描述）做了适配。

## 安装

```sh
dsh plugin --profile web add dsh-skill-creator
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-skill-creator
# 重启 dsh web 生效
```

## 使用

对 agent 说"创建一个技能/写一个 SKILL.md"，`skill-creator` 会自动加载，
按 澄清 → 起草 → 充实 → 校验 → 交付 的流程产出完整技能。

## 结构

```
dsh-skill-creator/
├── index.js
├── cordis.patch.yml
├── package.json       # dsh.bundle manifest
└── skills/skill-creator/
    ├── SKILL.md
    └── references/
        ├── frontmatter.md
        └── description-writing.md
```

## License

Apache-2.0（改编自 Anthropic 官方 skill-creator，Apache-2.0）。
