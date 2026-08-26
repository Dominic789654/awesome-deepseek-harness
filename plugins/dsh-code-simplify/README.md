# dsh-code-simplify

代码简化：删冗余、降复杂度、去不必要的抽象，让代码更简单可维护。
简化 = 去掉复杂度，不是去掉功能；行为保持不变。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 code-simplification 技能启发，改编为 DSH 中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-code-simplify
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-code-simplify
# 重启 dsh web 生效
```

## 使用

对 agent 说"简化这段代码 / 太绕了精简一下"，
`code-simplify` 技能按 理解 → 列简化点 → 小步简化 → 验证 → 交付 diff 执行。

## 结构

```
dsh-code-simplify/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/code-simplify/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
