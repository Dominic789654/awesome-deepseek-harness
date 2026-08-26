# dsh-quant-backtest

量化回测与风险指标：构建稳健回测系统（规避前视/幸存者偏差、计入交易成本、
walk-forward 分析），计算风险指标（夏普/最大回撤/VaR）。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 quantitative-trading/backtesting-frameworks 与 risk-metrics-calculation
技能启发，改编为 DSH 中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-quant-backtest
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-quant-backtest
# 重启 dsh web 生效
```

## 使用

对 agent 说"回测这个策略 / 算风险指标"，`quant-backtest` 技能按
设计 → 规避偏差 → walk-forward → 风险指标 → 报告 流程输出。

## 结构

```
dsh-quant-backtest/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/quant-backtest/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
