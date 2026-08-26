# dsh-academic-research

学术研究流水线：研究问题→文献检索→来源核验→跨来源综合→论文写作→同行评审。

受 [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills)
（43k★，Claude Code 学术研究技能集）启发，精简为 DSH 中文原创六阶段流水线。

## 安装

```sh
dsh plugin --profile web add dsh-academic-research
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-academic-research
# 重启 dsh web 生效
```

## 使用

对 agent 说"帮我做文献综述 / 深度研究这个主题 / 写论文框架"，
`academic-research` 技能按六阶段流水线执行，输出研究简报或完整论文。

## 结构

```
dsh-academic-research/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/academic-research/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 Imbad0202/academic-research-skills（MIT）。
