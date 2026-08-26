# dsh-llm-api-integration

DSH（DeepSeek Harness）技能插件：**LLM API 集成模式**。

SDK vs 原始 HTTP（不混用）、流式默认、思考模式、工具调用、提示缓存、token 计数、API 漂移验证（不凭记忆写 SDK 用法）、模型迁移与提示词审计。受 [Anthropic 官方 skills](https://github.com/anthropics/skills) 的 claude-api（Apache-2.0）启发的中文原创泛化精简版。

## 安装

```bash
dsh plugin add dsh-llm-api-integration
```

## 触发方式

描述中包含"LLM API / 模型集成 / SDK 调用 / 工具调用 / 流式 / agent 构建 / 模型迁移"等关键词时自动触发。

## 能力

- SDK/HTTP 选型与不混用纪律
- 流式默认与思考模式
- 漂移验证与文档为准
- 模型迁移含提示审计

## 许可

MIT
