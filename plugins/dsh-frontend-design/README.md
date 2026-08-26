# dsh-frontend-design

前端设计技能：指导 agent 产出高质量 Web 前端设计（视觉层级、配色、排版、组件、
响应式、无障碍）。改编自 [Anthropic 官方 frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)
（Apache-2.0），frontend-design 也是 skills.sh 榜单热门技能。

## 安装

```sh
dsh plugin --profile web add dsh-frontend-design
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-frontend-design
# 重启 dsh web 生效
```

## 使用

装好后对 agent 说"做一个落地页/设计一个仪表盘/美化这个界面"，`frontend-design`
技能会自动加载，指导设计思考 → 视觉原则 → 组件 → 响应式/无障碍 → 交付自查。

## 结构

```
dsh-frontend-design/
├── index.js
├── cordis.patch.yml
├── package.json       # dsh.bundle manifest
└── skills/frontend-design/
    ├── SKILL.md
    └── references/design-checklist.md
```

## License

Apache-2.0（改编自 Anthropic 官方 frontend-design，Apache-2.0）。
