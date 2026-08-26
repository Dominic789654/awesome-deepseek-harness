# dsh-service-mesh

DSH（DeepSeek Harness）技能插件：**服务网格**。

Istio/Linkerd 流量管理（路由/金丝雀/熔断）、mTLS 零信任服务通信、证书层级与轮换、网格可观测性（RED/追踪/访问日志）。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-service-mesh
```

## 触发方式

描述中包含"服务网格 / Istio / Linkerd / mTLS / 零信任 / sidecar / 网格可观测性 / 证书轮换"等关键词时自动触发。

## 能力

- Sidecar 数据面与控制面原理
- Istio/Linkerd 流量管理（VirtualService/金丝雀/熔断）
- mTLS 双向认证与证书生命周期
- 网格可观测性（RED 指标/追踪/访问日志）与排障

## 许可

MIT
