---
name: observability-tools
description: |
  可观测性工具实操：Prometheus 配置（采集/服务发现/Recording Rules/
  告警规则）、Grafana 仪表盘（RED/USE 方法、信息层级）、
  分布式追踪（OpenTelemetry/Jaeger、trace 上下文传播）。
  当用户搭 Prometheus 监控、写 Grafana 面板、做分布式追踪
  或配置告警时使用。受 wshobson/agents（38k★ MIT）启发的中文原创精简版。
---

# Observability Tools — 可观测性工具实操

Prometheus + Grafana + 分布式追踪：从采集到可视化到排障的落地配置。

## 何时用

- 搭建 Prometheus 监控
- 配置指标采集与服务发现
- 写 Recording/告警规则
- 建 Grafana 仪表盘（含 SLO 面板）
- 实施分布式追踪

## 1. Prometheus 配置

- **指标命名**：`prefix_name_unit` 一致命名（如 `http_requests_total`）
- **采集间隔**：典型 15-60s；高基数指标评估成本
- **Recording Rules**：昂贵查询预计算（如 5m 速率聚合）
- **告警规则**：基于表达式 + 标签分组；告警要有"可行动"的信息
- **服务发现**：K8s/consul/file_sd，别硬编码 target

## 2. Grafana 仪表盘

**信息层级**：顶部大数字（关键指标）→ 时间序列（关键趋势）→
表格/热力图（细节）。

**方法论**：
- **RED**（服务视角）：Rate 每秒请求 / Errors 错误率 / Duration 延迟
- **USE**（资源视角）：Utilization 利用率 / Saturation 饱和度（队列长度）/
  Errors 错误数

**面板要点**：标题即结论（"延迟 P95 < 200ms"而非"延迟"）；时间范围默认合理；
变量/模板复用（环境/服务下拉）；告警阈值线标在图上；SLO 面板显示余量。

## 3. 分布式追踪

- **OpenTelemetry** 统一插桩（自动 + 手动 span）；导出到 Jaeger/Zipkin/X-Ray
- **trace 上下文传播**：跨服务传递 trace-id/span-id（HTTP 头/消息头），
  否则链路断裂
- 关键 span 属性：服务/操作/状态/耗时；采样策略（尾部采样保关键路径）
- 排障：trace 定位慢链路 → 结合指标（RED）与日志（关联 trace-id）

## 4. 自查清单

- [ ] 指标命名一致、采集间隔合理
- [ ] 昂贵查询有 Recording Rules
- [ ] Grafana 按信息层级 + RED/USE 组织
- [ ] 面板标题即结论、有告警阈值线
- [ ] OpenTelemetry 插桩 + 上下文跨服务传播
- [ ] trace/metrics/logs 可关联排障

## 边界

- 工具生态（Loki/Thanos/VictoriaMetrics 等）按规模选型。
- 可观测性投入要有回报：先解决"最疼的排障路径"再铺全量。
