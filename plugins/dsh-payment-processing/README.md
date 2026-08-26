# dsh-payment-processing

DSH（DeepSeek Harness）技能插件：**支付处理与订阅计费**。

订阅生命周期、账单自动化（发票/dunning 催缴/proration/税）、支付流（Checkout/PaymentIntent/SetupIntent）、webhook 事件处理、PCI 合规与 Stripe 测试卡。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-payment-processing
```

## 触发方式

描述中包含"支付 / 订阅计费 / Stripe / PayPal / 退款 / webhook / 账单 / PCI"等关键词时自动触发。

## 能力

- 订阅状态机与账单自动化（dunning/proration/税）
- 支付流选型（Checkout vs PaymentIntent vs SetupIntent）
- webhook 幂等与验签、PCI 合规要点、测试卡

## 许可

MIT
