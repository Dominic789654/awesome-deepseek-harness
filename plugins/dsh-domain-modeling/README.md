# dsh-domain-modeling

领域建模：主动构建并打磨项目的领域模型——挑战模糊术语、推敲边界场景、
维护术语表（CONTEXT.md）与决策记录（ADR）。

受 [mattpocock/skills](https://github.com/mattpocock/skills)
（223k★ MIT，Matt Pocock 的"给真正工程师的技能"）启发，改编为
DSH 中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-domain-modeling
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-domain-modeling
# 重启 dsh web 生效
```

## 使用

对 agent 说"帮我把项目的术语理清楚 / 这个词到底指什么 / 记录一个架构决策"，
`domain-modeling` 技能会挑战模糊术语、压测边界场景，并维护 CONTEXT.md 与 ADR。

## 结构

```
dsh-domain-modeling/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/domain-modeling/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 mattpocock/skills（MIT）。
