# dsh-career-ops

求职指挥中心：JD 分析评估（A-F 评分）、简历优化、求职管线与面试准备。

受 [santifer/career-ops](https://github.com/santifer/career-ops)（65k★ MIT，
WIRED / Business Insider 报道的开源求职系统）启发，改编为 DSH 中文精简原创技能：
保留核心方法论（结构化评估、ATS 简历优化、管线跟踪、面试复盘），去掉其 30+
子命令模式，聚焦高价值流程。

## 安装

```sh
dsh plugin --profile web add dsh-career-ops
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-career-ops
# 重启 dsh web 生效
```

## 使用

对 agent 说"帮我评估这个岗位"（粘贴 JD）→ A-F 评分表；
"优化我的简历" → 针对 JD 的关键词映射 + ATS 检查；"准备面试" → STAR 题库。

## 结构

```
dsh-career-ops/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/career-ops/SKILL.md
```

## License

MIT。技能内容为原创精简改编，灵感来自 santifer/career-ops（MIT）。
