# dsh-a11y-audit

WCAG 2.2 无障碍审计：POUR 原则、合规等级（A/AA/AAA）、自动化+人工验证、
修复建议。审计网页无障碍性并给出可执行的修复。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT，
多 harness 插件技能库）的 accessibility-compliance 插件启发，
改编为 DSH 中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-a11y-audit
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-a11y-audit
# 重启 dsh web 生效
```

## 使用

对 agent 说"检查这个网站的无障碍 / 做 WCAG 审计"，`a11y-audit` 技能
按 自动化扫描 → 人工验证 → 分级报告 → 修复复验 流程输出审计报告。

## 结构

```
dsh-a11y-audit/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/a11y-audit/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
