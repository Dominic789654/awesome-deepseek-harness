---
name: multi-cloud
description: |
  多云架构：跨 AWS/Azure/GCP/OCI 的决策框架、服务对比选型、
  四种多云模式（灾备/择优/地理分布/云无关抽象）、防厂商锁定。
  当用户做多云战略、跨云迁移、选云服务、云无关架构或
  跨云成本优化时使用。受 wshobson/agents（38k★ MIT）启发的中文原创精简版。
---

# Multi-Cloud — 多云架构

用决策框架在 AWS/Azure/GCP/OCI 之间选型与集成：云无关设计 + 防锁定。

## 何时用

- 设计多云战略
- 云厂商间迁移
- 为具体负载选云服务
- 实现云无关架构
- 跨云成本优化

## 1. 服务对照速查

**计算**：EC2↔VM↔Compute Engine↔Compute；EKS↔AKS↔GKE↔OKE（K8s）；
Lambda↔Functions↔Cloud Functions↔Functions（Serverless）。

**存储**：S3↔Blob↔Cloud Storage↔Object Storage；EBS↔Managed Disks↔Persistent Disk；
EFS↔Azure Files↔Filestore；Glacier↔Archive Storage（冷存储）。

**数据库**：RDS↔SQL Database↔Cloud SQL（托管 SQL）；
DynamoDB↔Cosmos DB↔Firestore↔NoSQL；Aurora↔PostgreSQL/MySQL↔Spanner↔Autonomous（分布式 SQL）；
ElastiCache↔Cache for Redis↔Memorystore（缓存）。

## 2. 四种多云模式

1. **单云 + 异地灾备（DR）**：主负载在一朵云，灾备在另一朵；
   跨云数据库复制 + 自动故障切换。最常用、复杂度最低。
2. **择优组合（Best-of-Breed）**：各家用最强的——AI/ML 上 GCP、
   企业应用上 Azure、受监管数据平台上 OCI、通用计算上 AWS。
3. **地理分布**：就近服务用户；满足数据主权合规；全局负载均衡 + 区域故障切换。
4. **云无关抽象**：K8s 统一计算、Terraform 统一 IaC、抽象层屏蔽厂商差异。

## 3. 决策框架

- **防锁定**：优先云无关接口（K8s/托管 K8s、标准 SQL、对象存储 S3 兼容）
- **数据引力**：数据在哪、算力就在哪——跨云数据搬迁成本高
- **合规**：数据主权/监管要求决定区域与云商
- **成本**：跨云比价 + 出口流量费（egress）常被低估
- **运维复杂度**：多云 = 多套账号/监控/安全/账单，团队要扛得住

## 4. 自查清单

- [ ] 多云动机明确（DR/择优/地理/合规），非为多而多
- [ ] 关键负载走云无关抽象（K8s/Terraform）
- [ ] 数据引力与 egress 成本已评估
- [ ] 灾备模式有复制 + 自动切换 + 演练
- [ ] 跨云账号/监控/安全/账单治理就位
- [ ] 单一云足够时未过度引入多云

## 边界

- 多云 ≠ 更好：运维与安全面翻倍，多数团队"单云为主 + DR"更优。
- 服务对标随各家更新变化，选型前查最新文档与定价。
