# dsh-model-gateway

DSH（DeepSeek Harness）技能插件：**模型路由网关**。

一个端点连接 290+ AI 提供商（90+ 免费、1200+ 模型），Claude Code/Codex/Cursor/Cline/Copilot 全兼容：配额感知自动回退、19 种路由策略、RTK+Caveman 叠加压缩省 15-95% token（平均 ~89%）、免费层聚合预算（~1.5B tokens/月诚实池去重计算）、MCP/A2A、本地优先私有。受 [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)（51k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-model-gateway
```

## 触发方式

描述中包含"模型路由 / AI 网关 / 免费层叠加 / 自动回退 / 省 token / 多提供商统一"等关键词时自动触发。

## 能力

- 290+ 提供商一个端点
- 配额感知自动回退
- 19 种路由策略
- RTK+Caveman 压缩（15-95%）
- 免费层诚实预算（~1.5B/mo）
- 本地优先、密钥不出机

## 许可

MIT
