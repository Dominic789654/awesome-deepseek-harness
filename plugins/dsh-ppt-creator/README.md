# dsh-ppt-creator

中文 PPT 生成技能：从需求到大纲、视觉设计、出稿（HTML / 可选 python-pptx），
附排版自查清单。原创轻量技能，不依赖任何第三方模板库。

思路参考 [GordenSun/GordenPPTSkill](https://github.com/GordenSun/GordenPPTSkill)
（3k★，中文 PPT 技能，但依赖 Python 脚本且禁商用）与
[hugohe3/ppt-master](https://github.com/hugohe3/ppt-master)（48k★，原生 PPTX 生成），
去除其脚本/模板依赖，聚焦结构化流程 + 设计原则。

## 安装

```sh
dsh plugin --profile web add dsh-ppt-creator
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-ppt-creator
# 重启 dsh web 生效
```

## 使用

对 agent 说"做一份年终总结 PPT / 把这个内容做成幻灯片"，
`ppt-creator` 技能会先给大纲，确认后出稿（默认 HTML 稿，可要求 .pptx）。

## 结构

```
dsh-ppt-creator/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/ppt-creator/
    ├── SKILL.md
    └── references/design-guide.md
```

## License

MIT。原创技能。
