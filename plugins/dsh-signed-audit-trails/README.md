# dsh-signed-audit-trails

DSH（DeepSeek Harness）技能插件：**Agent 工具调用签名审计**。

策略先行（Cedar 默认拒绝）+ Ed25519 签名收据 + 哈希链防篡改 + 离线验证，为 agent 的每个工具调用提供合规级证据（金融/医疗/欧盟 AI 法案/SLSA）。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-signed-audit-trails
```

## 触发方式

描述中包含"审计 / 签名收据 / 防篡改 / agent 治理 / 策略执行 / 合规证据 / SLSA / 哈希链"等关键词时自动触发。

## 能力

- 策略评估先行（默认拒绝、按工具分级放行）
- Ed25519 签名收据与哈希链机制
- 离线验证与防篡改检测
- CI/CD 集成与审计报告节奏

## 许可

MIT
