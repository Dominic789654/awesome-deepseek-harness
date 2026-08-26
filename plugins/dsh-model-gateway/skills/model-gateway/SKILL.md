---
name: model-gateway
description: |
  模型路由网关：一个端点连接 290+ AI 提供商（90+ 免费、
  1200+ 模型），Claude Code/Codex/Cursor/Cline/Copilot 全兼容——
  配额感知自动回退、19 种路由策略、RTK+Caveman 叠加压缩
  省 15-95% token、免费层聚合预算（~1.5B tokens/月诚实计算）、
  MCP/A2A、本地优先私有。
  当用户要多模型统一接入、省 token 成本、免费层叠加时使用。
  受 diegosouzapw/OmniRoute（51k★ MIT）启发的中文原创精简版。
---

# Model Gateway — 模型路由网关

一个端点，所有 AI 工具 → 290+ 提供商。配额感知自动回退，
压缩省 token，免费层叠加——"永不停止编码"。

## 何时用

- 多编码工具（Claude Code/Codex/Cursor/Cline/Copilot）统一接模型
- 想叠加免费层省成本（~1.5B tokens/月）
- 模型路由策略（成本/质量/延迟权衡）

## 1. 核心能力

- **一个端点**：290+ 提供商、1200+ 模型（Kimi/Claude/GPT/Gemini/GLM/
  DeepSeek/MiniMax…），90+ 免费层
- **兼容所有工具**：Claude Code/Codex/Cursor/OpenCode/Cline/Copilot
- **配额感知自动回退**：限流/失败自动切备用提供商
- **19 种路由策略**：成本/质量/延迟/混合
- **RTK + Caveman 叠加压缩**：省 15-95% token（平均 ~89%），
  永不撞限流
- **免费层聚合预算**：43 个提供商池/516 模型的文档化免费额度
  诚实汇总（池去重），dashboard 实时显示

## 2. 工作流

1. 部署网关（npm/Docker/桌面 PWA）
2. 配置提供商密钥（或纯免费层起步）
3. 编码工具指向网关端点
4. 选路由策略（默认自动）
5. dashboard 监控用量/成本/免费预算

## 3. 自查清单

- [ ] 端点统一（多工具指同一网关）
- [ ] 自动回退开启（配额感知）
- [ ] 路由策略匹配目标（成本/质量）
- [ ] 压缩叠加（RTK+Caveman）
- [ ] 免费层预算监控（诚实池去重）
- [ ] 本地优先（密钥不出机器）

## 边界

- 免费层会变动——两周一审计的诚实数字，非最好情况。
- 部分提供商 ToS 标注让你自己决定；合规自行评估。
