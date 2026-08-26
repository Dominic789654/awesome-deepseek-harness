---
name: payment-processing
description: |
 支付处理与订阅计费：订阅生命周期、账单自动化（发票/催缴 dunning/
  按比例 proration/税）、支付流（Checkout/PaymentIntent/SetupIntent）、
  webhook 事件、PCI 合规、Stripe 集成与测试卡。
  当用户集成支付、做订阅计费、处理退款/争议、写 webhook 或
  搭 Stripe/PayPal 支付流程时使用。受 wshobson/agents（38k★ MIT）
  启发的中文原创精简版。
---

# Payment Processing — 支付处理与订阅计费

稳健、PCI 合规的支付与订阅计费：从订阅生命周期到支付流与 webhook。

## 何时用

- Web/移动应用集成支付
- 搭建 SaaS 订阅计费
- 一次性支付与周期扣款
- 处理退款与争议
- 管理客户支付方式
- 账单自动化（发票/催缴/按比例/税）
- 欧洲 SCA（强客户认证）
- 市场平台分账（Stripe Connect）

## 1. 订阅生命周期与计费

状态机：`trial → active → past_due → canceled`，可 `paused → resumed`。

计费周期：月（SaaS 最常见）/年（折扣）/季/周/自定义（用量、按席位）。

**账单自动化要点**：
- **Dunning 催缴**：失败扣款自动恢复流程——重试计划、客户通知、宽限期、账户限制
- **Proration 按比例**：期中升级/降级、增减席位、改计费频率时调整费用
- **税**：销售税 / VAT / GST 处理
- **用量计费**：按 usage 记录计费

## 2. 支付流（Stripe 视角，其他网关同理）

- **Checkout Session**：大多数集成的推荐——托管结账页/嵌入式表单/Elements
  自定义 UI（`ui_mode='custom'`），内置行项目/折扣/税/地址/留存支付方式，
  集成与维护负担低。
- **Payment Intent**：需要完全自主控制时——自己算税/折扣/货币换算，
  实现与长期维护更复杂，PCI 合规依赖 Stripe.js。
- **Setup Intent**：只存支付方式不扣款（订阅、未来支付用）。

## 3. Webhook 关键事件

- `payment_intent.succeeded` / `payment_intent.payment_failed`
- `customer.subscription.updated` / `customer.subscription.deleted`
- `charge.refunded`
- `invoice.payment_succeeded`

处理原则：幂等（事件 ID 去重）、验签（webhook 签名）、
事件处理后返回 2xx、重试幂等安全。

## 4. 安全与合规

- 信用卡数据不落自己服务器（用托管元素/支付页）→ PCI 范围最小化
- 用测试模式 key（`sk_test_...`）开发
- 测试卡：成功 `4242...`、拒付 `4000...0002`、3DS `4000...155`、
  余额不足 `4000...9995`
- 密钥走环境变量/密钥管理，绝不进代码库

## 5. 自查清单

- [ ] 订阅状态机与边界（取消/暂停/逾期）处理完整
- [ ] 期中变更做了 proration
- [ ] 失败扣款有 dunning 流程
- [ ] webhook 验签 + 幂等 + 事件闭环
- [ ] 卡数据不落自有服务器（PCI 范围最小）
- [ ] 测试模式与测试卡覆盖主要分支

## 边界

- 网关（Stripe/PayPal/国内支付）API 差异大，按所选网关查文档。
- 跨境支付涉及税务/合规（增值税、跨境结算），需要法务确认。
