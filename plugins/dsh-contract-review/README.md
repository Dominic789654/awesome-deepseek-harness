# dsh-contract-review

合同风险识别器：扫描中文合同风险条款，输出分级风险报告与修改建议。
灵感来自腾讯 SkillHub Top 50 热门技能"合同风险识别器"（52万+ 下载）。
本实现为 DSH 原创：审查流程 + 关键条款清单 + 分级输出格式。

## 安装

```sh
dsh plugin --profile web add dsh-contract-review
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-contract-review
# 重启 dsh web 生效
```

## 使用

对 agent 说"帮我审一下这份合同/看看有什么坑"，提供合同文本或文件路径，
`contract-review` 技能会按 读全文 → 逐条核查 → 分级 → 出报告 的流程输出
风险报告（含原文摘录、问题、修改建议、严重度）。

## 结构

```
dsh-contract-review/
├── index.js
├── cordis.patch.yml
├── package.json       # dsh.bundle manifest
└── skills/contract-review/
    ├── SKILL.md
    └── references/risk-checklist.md
```

## License

MIT。不构成法律意见。
