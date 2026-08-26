# dsh-doubt-driven-dev

怀疑驱动开发：每个非平凡决策在落地前接受新鲜上下文的对抗性审查。
五步循环：CLAIM（写下断言）→ EXTRACT（剥离推理只留产物+契约）→
DOUBT（召唤新鲜上下文审查者证伪）→ RECONCILE（逐条对照分类）→
STOP（满足停止条件）。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）启发，改编为 DSH 中文原创精简版（适配 DSH 子代理做新鲜上下文审查）。

## 安装

```sh
dsh plugin --profile web add dsh-doubt-driven-dev
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-doubt-driven-dev
# 重启 dsh web 生效
```

## 使用

对 agent 说"帮我验证这个改动 / 这个决策靠谱吗 / 挑战一下我的方案"，
`doubt-driven-dev` 技能会走五步怀疑循环，用对抗性审查证伪你的断言。

## 结构

```
dsh-doubt-driven-dev/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/doubt-driven-dev/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
