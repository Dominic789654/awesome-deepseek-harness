# dsh-before-you-build

DSH（DeepSeek Harness）技能插件：**建前风险预审**。

动工前七维风险检查（需求/定位/变现/留存/信任/分发/采纳）→ 输出风险结论、最关键假设、最小验证步骤、应推迟范围。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-before-you-build
```

## 触发方式

描述中包含"要不要建 / 建之前 / MVP 风险 / 产品验证 / 需求检查 / 该不该做"等关键词时自动触发。

## 能力

- 七维风险清单（需求/定位/变现/留存/信任/分发/采纳）
- 决策导向输出格式（风险结论/关键假设/最小验证）
- 产品风险与工程难度区分
- 跳过条件（纯实现修复不用）

## 许可

MIT
