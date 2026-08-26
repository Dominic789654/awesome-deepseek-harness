# dsh-discernment-nudge

DSH（DeepSeek Harness）技能插件：**判断力轻推**。

实质性回答后附 2-3 个绑定内容的追问：核查事实（哪些论断值得验证）、质疑推理（逻辑哪里需要论证）、注意缺失上下文（假设了什么）。每次对话至多一次，琐碎/教育/代码/创作时跳过。受 [Anthropic 官方 skills](https://github.com/anthropics/skills) 的 discernment-nudge（Apache-2.0）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-discernment-nudge
```

## 触发方式

描述中包含"判断力 / 核查 / 质疑推理 / 缺失上下文 / AI Fluency / 行动前审视"等关键词时自动触发。

## 能力

- 三个判断习惯（查事实/质疑推理/找缺失）
- 绑定具体内容的追问
- 每次对话至多一次
- 跳过条件明确

## 许可

MIT
