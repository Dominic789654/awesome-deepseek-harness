# dsh-prompt-engineering

提示词工程模式：结构化推理（CoT/ToT）、few-shot 动态示例、模板变量、
生产级优化与调试、防幻觉指令。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 llm-application-dev/prompt-engineering-patterns 技能启发，改编为
DSH 中文原创精简版（与 dsh-skill-creator 互补）。

## 安装

```sh
dsh plugin --profile web add dsh-prompt-engineering
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-prompt-engineering
# 重启 dsh web 生效
```

## 使用

对 agent 说"优化这个提示词 / 设计 prompt 模板"，
`prompt-engineering` 技能按模式 → 模板 → 优化 → 自查输出。

## 结构

```
dsh-prompt-engineering/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/prompt-engineering/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
