# dsh-shipping

发布上线：发布前检查清单、灰度策略、回滚优先、上线后监控与快速响应。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 shipping-and-launch 技能启发，改编为 DSH 中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-shipping
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-shipping
# 重启 dsh web 生效
```

## 使用

对 agent 说"准备上线 / 发版检查"，`shipping` 技能输出
发布检查清单 + 灰度计划 + 回滚预案 + 监控项。

## 结构

```
dsh-shipping/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/shipping/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
