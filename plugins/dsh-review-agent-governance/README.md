# dsh-review-agent-governance

DSH（DeepSeek Harness）技能插件：**Agent 审查行为治理**。

对 agent 的 PR 审查/评论/合并、issue 处理、版本发布、CI 配置修改等高影响操作设置人工审批窗口 + Cedar 策略 + Ed25519 签名收据（每次尝试可离线验证）。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-review-agent-governance
```

## 触发方式

描述中包含"审查 agent / 人工审批 / 治理 / PR 合并门控 / 审批窗口 / 审查行为审计"等关键词时自动触发。

## 能力

- 高影响动作清单与默认拒绝策略
- 审批窗口机制（flag 文件/斜杠命令/只读审计模式）
- Ed25519 收据链与离线验证
- 与其他策略叠加（双钩子同时评估）

## 许可

MIT
