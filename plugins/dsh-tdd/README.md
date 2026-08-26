# dsh-tdd

测试驱动开发：先写失败测试再写实现（红-绿-重构）；修 bug 用 Prove-It 模式
（先复现再修）。测试是证明——"看起来对"不算完成。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 test-driven-development 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-tdd
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-tdd
# 重启 dsh web 生效
```

## 使用

对 agent 说"TDD 方式实现 / 修 bug（先写复现测试）"，
`tdd` 技能按红-绿-重构循环 + Prove-It 模式执行。

## 结构

```
dsh-tdd/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/tdd/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
