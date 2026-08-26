# dsh-self-improving-agent

DSH（DeepSeek Harness）技能插件：**自改进 AI agent**。

内置学习回路：从经验自动创建技能、使用时改进、FTS5 会话搜索 + LLM 摘要跨会话回忆、Honcho 辩证用户建模（跨会话深化对用户的模型）、跨平台网关（Telegram/Discord/Slack/WhatsApp/Signal）、cron 自然语言调度自动化、子代理并行、serverless 休眠唤醒近零成本。受 [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)（154k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-self-improving-agent
```

## 触发方式

描述中包含"自改进 agent / 学习回路 / 越用越强 / 跨平台常驻 / 会话回忆 / 调度自动化"等关键词时自动触发。

## 能力

- 闭环学习回路（创建→改进→回忆）
- Honcho 辩证用户建模
- 跨平台网关（6 平台）
- cron 自然语言调度
- 子代理并行 + RPC 脚本
- 7 种后端 + serverless 休眠

## 许可

MIT
