# dsh-hybrid-cloud

DSH（DeepSeek Harness）技能插件：**混合云网络**。

本地数据中心与云平台互联：Site-to-Site VPN vs 专线（Direct Connect/ExpressRoute/Interconnect/FastConnect）、BGP 路由与冗余、双活与灾备演练、数据驻留合规与渐进迁移。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-hybrid-cloud
```

## 触发方式

描述中包含"混合云 / 专线 / VPN / Direct Connect / ExpressRoute / 本地连云 / 双活 / 数据驻留"等关键词时自动触发。

## 能力

- VPN vs 专线选型与双通道设计
- BGP 路由、网段规划与高可用冗余
- 双活/灾备切换演练
- 合规画线与渐进迁移回退

## 许可

MIT
