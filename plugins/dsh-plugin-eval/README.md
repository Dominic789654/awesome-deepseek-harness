# dsh-plugin-eval

DSH（DeepSeek Harness）技能插件：**插件/技能质量评估方法论**。

三层评估（静态分析/LLM 评委/蒙特卡洛模拟）、十个评分维度、复合公式与徽章阈值、反模式扣分、可执行改进指南（触发词/worker 纯净/结构优化）。受 [wshobson/agents](https://github.com/wshobson/agents) 的 plugin-eval（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-plugin-eval
```

## 触发方式

描述中包含"评估插件 / 技能质量 / 评分维度 / 触发准确率 / 质量徽章 / 插件改进"等关键词时自动触发。

## 能力

- 三层评估机制与十维评分
- 反模式扣分与蒙特卡洛复合公式
- 低分维度解读与改进指南
- 市场阈值校准与徽章口径

## 许可

MIT
