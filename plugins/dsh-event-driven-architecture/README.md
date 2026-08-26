# dsh-event-driven-architecture

DSH（DeepSeek Harness）技能插件：**事件驱动架构**。

CQRS 读写分离、事件溯源（Event Sourcing）与事件存储设计、投影（Projection）读模型、Saga 分布式事务与补偿编排。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-event-driven-architecture
```

## 触发方式

描述中包含"事件驱动 / CQRS / 事件溯源 / Event Sourcing / Saga / 分布式事务 / 事件存储 / 投影"等关键词时自动触发。

## 能力

- CQRS 命令/查询模型分离与最佳实践
- 事件存储设计（append-only/版本化/幂等）与技术选型
- 投影读模型与可重放
- Saga 编排/编排舞、补偿路径测试与卡死排查

## 许可

MIT
