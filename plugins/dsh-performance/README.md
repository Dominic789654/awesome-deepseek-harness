# dsh-performance

性能优化：测量先行、定位瓶颈、复杂度分析、缓存/懒加载、资源释放、性能预算。
先测量再优化——不测量的优化是猜测。

受 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
（88k★ MIT）的 performance-optimization 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-performance
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-performance
# 重启 dsh web 生效
```

## 使用

对 agent 说"太慢了，优化一下 / 性能分析"，`performance` 技能按
测量 → 定位瓶颈 → 优化 → 验证回归 流程输出 before/after 对比报告。

## 结构

```
dsh-performance/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/performance/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 addyosmani/agent-skills（MIT）。
