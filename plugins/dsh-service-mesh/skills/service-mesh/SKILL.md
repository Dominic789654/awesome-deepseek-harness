---
name: service-mesh
description: |
  服务网格：Istio/Linkerd 流量管理、mTLS 零信任服务通信、网格可观测性、
  证书轮换与迁移策略。
  当用户做微服务通信安全、配置服务网格（Istio/Linkerd）、
  mTLS、证书管理或网格排障时使用。受 wshobson/agents（38k★ MIT）
  启发的中文原创精简版。
---

# Service Mesh — 服务网格

Istio / Linkerd 服务网格：流量管理、mTLS 零信任、可观测性与证书生命周期。

## 何时用

- 实现零信任网络（服务间通信加密与认证）
- 配置服务网格（Istio/Linkerd）流量管理
- mTLS 与证书轮换管理
- 网格可观测性（指标/追踪/日志）
- 多集群安全通信
- 合规要求（PCI-DSS、HIPAA）

## 1. 核心概念：Sidecar 与数据面

- 每个工作负载旁挂 sidecar 代理，服务流量全部经代理。
- 控制面下发配置（路由、策略、证书）；数据面执行。
- 服务间通信自动升级为加密通道（无需改业务代码）。

## 2. 流量管理

**Istio**：
- VirtualService：路由规则（权重/header 分流/超时重试）
- DestinationRule：负载均衡、连接池、熔断（outlier detection）
- 金丝雀发布：按权重逐步切流；灰度验证后全量

**Linkerd**：
- 轻量（仅数据面 Rust 代理 + 控制面 Go），配置更简单
- ServiceProfile：每服务路由级指标与重试策略
- 与 Istio 定位不同：Istio 功能全/复杂，Linkerd 简单/低资源

## 3. mTLS（双向 TLS）

握手：ClientHello → ServerHello + 服务端证书 → 客户端证书 → 双向校验 → 加密通道。

证书层级：根 CA（自签、长寿命）→ 集群级中间 CA → 工作负载证书（短寿命）。

**要**：
- 从 PERMISSIVE 模式开始，逐步迁移到 STRICT
- 监控证书过期并告警；工作负载证书 ≤24h；定期轮换 CA
- 记录 TLS 错误（调试与审计）
- 校验完整证书链

**不要**：不在生产关 mTLS；不忽略证书过期（自动化轮换）；
不用自签证书（用正确 CA 层级）；不跳过链校验。

## 4. 网格可观测性

- 指标：RED（Rate/Errors/Duration）或 Golden Signals 按服务/路由聚合
- 追踪：请求跨服务传播 trace context（sidecar 自动注入）
- 日志：sidecar 访问日志（源/目标服务、协议、状态码）
- 排障：先看指标异常 → 追踪定位跨服务路径 → 访问日志验证

## 5. 自查清单

- [ ] mTLS 迁移按 PERMISSIVE → STRICT 分步
- [ ] 证书短寿命 + 自动轮换 + 过期告警
- [ ] 金丝雀/权重路由已配置并验证
- [ ] 熔断/超时/重试策略就位
- [ ] RED 指标 + 追踪 + 访问日志齐备
- [ ] 多集群证书层级规划

## 边界

- Istio vs Linkerd 取舍：功能深度 vs 简单低开销，按团队规模与运维能力选。
- 网格引入运维复杂度：小集群/单体可先不用，服务规模上来再引入。
