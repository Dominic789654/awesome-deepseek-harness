# dsh-internal-comms

DSH（DeepSeek Harness）技能插件：**内部沟通写作**。

3P 更新（进度/计划/问题）、公司通讯、FAQ 回答、状态/领导层/项目更新、事件报告：识别类型 → 按指南决定格式/语气/内容收集。受 [Anthropic 官方 skills](https://github.com/anthropics/skills) 的 internal-comms（Apache-2.0）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-internal-comms
```

## 触发方式

描述中包含"内部沟通 / 3P 更新 / 公司通讯 / 状态报告 / 周报 / FAQ / 事件报告"等关键词时自动触发。

## 能力

- 沟通类型识别与指南匹配
- 3P 更新与事件报告要点
- 结论先行、受众导向
- 行动请求带选项与截止

## 许可

MIT
