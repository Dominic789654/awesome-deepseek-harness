# dsh-browser-testing

浏览器测试与 UI 验证：用真实浏览器验证 DOM/控制台/网络/性能，替代
"猜运行时发生了什么"。修复验证闭环（复现→假设→修复→浏览器重测→回归）。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 browser-testing-with-devtools 技能启发，改编为 DSH
中文原创精简版（不强制依赖 DevTools MCP，按环境可用性分层）。

## 安装

```sh
dsh plugin --profile web add dsh-browser-testing
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-browser-testing
# 重启 dsh web 生效
```

## 使用

对 agent 说"验证这个页面 / 排查 UI 问题"，`browser-testing` 技能输出
浏览器验证报告（DOM/控制台/网络/性能逐项）。

## 结构

```
dsh-browser-testing/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/browser-testing/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
