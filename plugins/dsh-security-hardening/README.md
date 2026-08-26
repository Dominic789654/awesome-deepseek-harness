# dsh-security-hardening

安全加固：威胁建模（STRIDE）+ 三层边界系统，任何接收用户输入/鉴权/存储敏感
数据/集成外部服务的功能都按"安全第一"开发。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）启发，改编为 DSH 中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-security-hardening
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-security-hardening
# 重启 dsh web 生效
```

## 使用

对 agent 说"帮我加固这段代码 / 这个功能安全吗 / 做威胁建模"，
`security-hardening` 技能按 威胁建模 → 三层边界 → 交付清单 流程执行。

## 结构

```
dsh-security-hardening/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/security-hardening/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
