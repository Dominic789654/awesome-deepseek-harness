# dsh-distributed-debugging

DSH（DeepSeek Harness）技能插件：**分布式系统排障**。

应急响应流程（止血/时间线/假设验证）、指标-日志-追踪三件套联动、K8s 排障（describe/logs/events/OOM/网络/存储）、网络与 DNS 分层诊断、性能与微服务/消息队列问题。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-distributed-debugging
```

## 触发方式

描述中包含"生产故障 / 排障 / 根因分析 / K8s 异常 / 分布式问题 / 服务不可用 / 消息积压"等关键词时自动触发。

## 能力

- 止血优先的应急响应流程
- 指标/日志/追踪三件套联动
- K8s 与网络分层排障
- 性能画像与消息队列问题

## 许可

MIT
