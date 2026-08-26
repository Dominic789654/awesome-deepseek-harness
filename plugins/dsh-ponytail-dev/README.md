# dsh-ponytail-dev

懒人高级开发哲学：YAGNI 阶梯（能不建就不建→复用→标准库→一行搞定）+
根因修复 + 极简纪律。最好的代码是没写出来的代码。

受 [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)
（105k★，"让你的 AI agent 像最懒的高级开发一样思考"）启发，
改编为 DSH 中文原创技能。

## 安装

```sh
dsh plugin --profile web add dsh-ponytail-dev
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-ponytail-dev
# 重启 dsh web 生效
```

## 使用

对 agent 说"最简单的方案 / 别过度设计 / 能复用吗"，`ponytail-dev`
技能让 agent 写任何代码前先爬 YAGNI 阶梯，修 bug 找根因。

## 结构

```
dsh-ponytail-dev/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/ponytail-dev/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 DietrichGebert/ponytail（MIT）。
