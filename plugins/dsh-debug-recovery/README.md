# dsh-debug-recovery

调试与错误恢复：建立证据 → 错误分类 → 系统化定位根因 → 恢复策略
（回滚/降级/修复）→ 防回归。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 debugging-and-error-recovery 技能启发，改编为 DSH
中文原创精简版（与 dsh-superpowers-essentials 的系统化调试互补）。

## 安装

```sh
dsh plugin --profile web add dsh-debug-recovery
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-debug-recovery
# 重启 dsh web 生效
```

## 使用

对 agent 说"排查这个 bug / 为什么不对"，
`debug-recovery` 技能输出调试报告（现象/复现/根因/修复/防回归）。

## 结构

```
dsh-debug-recovery/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/debug-recovery/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
