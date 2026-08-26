# dsh-meeting-minutes

会议纪要自动生成：从录音转写/文字稿生成结构化会议纪要。
灵感来自腾讯 SkillHub Top 50 热门技能"会议纪要自动生成"（58万+ 下载）。
本实现为 DSH 原创：输入 → 提炼（讨论/决策/行动项/风险）→ 校验 → 结构化输出。

## 安装

```sh
dsh plugin --profile web add dsh-meeting-minutes
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-meeting-minutes
# 重启 dsh web 生效
```

## 使用

对 agent 说"生成会议纪要"，提供转写文本或录音文件路径，`meeting-minutes`
技能会输出结构化纪要（含行动项表格与负责人/截止时间）。

## 结构

```
dsh-meeting-minutes/
├── index.js
├── cordis.patch.yml
├── package.json       # dsh.bundle manifest
└── skills/meeting-minutes/SKILL.md
```

## License

MIT。
