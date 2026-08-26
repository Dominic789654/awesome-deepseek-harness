# dsh-multi-cloud

DSH（DeepSeek Harness）技能插件：**多云架构**。

跨 AWS/Azure/GCP/OCI 决策框架、计算/存储/数据库服务对照、四种多云模式（单云+DR/择优组合/地理分布/云无关抽象）、防厂商锁定与数据引力评估。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-multi-cloud
```

## 触发方式

描述中包含"多云 / 跨云 / AWS Azure GCP / 云无关 / 防厂商锁定 / 灾备 / 数据主权"等关键词时自动触发。

## 能力

- 四云服务对照速查（计算/存储/数据库）
- 四种多云模式与选型决策框架
- 数据引力、egress 成本与合规评估
- 云无关抽象（K8s/Terraform）与治理清单

## 许可

MIT
