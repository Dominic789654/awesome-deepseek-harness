# dsh-karpathy-methodology

Karpathy 编码方法论：先想后写、简单优先、外科手术式改动、目标驱动验证。

受 [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)
（203k★，从 Andrej Karpathy 的观察提炼的 CLAUDE.md）启发。原仓库无 LICENSE，
本技能为**全部原创撰写**（方法论本身是公开工程常识），仅在 README 注明灵感来源。

## 安装

```sh
dsh plugin --profile web add dsh-karpathy-methodology
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-karpathy-methodology
# 重启 dsh web 生效
```

## 使用

对 agent 说"帮我写这段逻辑 / 修这个 bug / 别过度设计"，
`karpathy-methodology` 技能自动加载四条编码纪律。

## 结构

```
dsh-karpathy-methodology/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/karpathy-methodology/SKILL.md
```

## License

MIT。内容为原创撰写，灵感来自 andrej-karpathy-skills 公开方法论。
