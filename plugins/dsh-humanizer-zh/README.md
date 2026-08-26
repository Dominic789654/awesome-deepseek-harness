# dsh-humanizer-zh

中文去 AI 痕迹：识别并改写 AI 生成的腔调（空洞强调、模板句、过度书面化、
机械结构），让文字更像真人书写。

受 [op7418/Humanizer-zh](https://github.com/op7418/Humanizer-zh)
（15.6k★ MIT，Humanizer 汉化版）启发，改编为 DSH 中文原创精简技能：
保留 5 条核心原则与高频模式清单，控制篇幅，聚焦可直接执行的改写流程。

## 安装

```sh
dsh plugin --profile web add dsh-humanizer-zh
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-humanizer-zh
# 重启 dsh web 生效
```

## 使用

对 agent 说"这段文字去 AI 痕迹"或"改写得更有人味"，粘贴文本，
`humanizer-zh` 技能会输出改写全文 + 改动说明。

## 结构

```
dsh-humanizer-zh/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/humanizer-zh/SKILL.md
```

## License

MIT。技能内容为原创精简改编，灵感来自 op7418/Humanizer-zh（MIT）。
