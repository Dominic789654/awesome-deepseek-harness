---
name: self-improving-agent
description: |
  自改进 AI agent：内置学习回路——从经验自动创建技能、使用时
  改进、周期性记忆提示、FTS5 会话搜索 + LLM 摘要跨会话回忆、
  Honcho 辩证用户建模（跨会话深化对用户的模型）、跨平台网关
  （Telegram/Discord/Slack/WhatsApp/Signal）、cron 调度自动化、
  子代理并行、serverless 休眠唤醒近零成本。
  当用户要搭一个会越用越强的 agent、跨平台常驻、自动化日常
  任务时使用。受 NousResearch/hermes-agent（154k★ MIT）启发的
  中文原创精简版。
---

# Self-Improving Agent — 自改进 AI agent

唯一带内置学习回路的 agent：从经验创建技能、使用时改进、自我
提示持久化知识、搜索自己过去的对话、跨会话建立对你的模型。

## 何时用

- 想要越用越强的 agent（学习回路）
- 跨平台常驻（Telegram/Discord/Slack/WhatsApp）
- 自然语言调度自动化（日报/夜间备份/周审计）
- 云端运行 + serverless 休眠唤醒

## 1. 闭环学习回路（核心）

- **从经验创建技能**：复杂任务完成后自主创建技能
- **技能自我改进**：使用过程中改进
- **周期性记忆提示**：agent 自我提示持久化知识
- **会话搜索**：FTS5 全文检索 + LLM 摘要 → 跨会话回忆
- **Honcho 辩证用户建模**：跨会话深化"你是谁"的模型

## 2. 跨平台网关

- Telegram / Discord / Slack / WhatsApp / Signal / CLI 单网关进程
- 语音备忘录转写、跨平台会话连续性
- 从 Telegram 指挥云端 VM 上的 agent

## 3. 调度与并行

- **内置 cron 调度器**：自然语言定时任务，送到任意平台
  （每日报告/每周审计，无人值守运行）
- **子代理并行**：隔离子代理处理并行工作流
- **RPC 脚本**：Python 脚本调工具，多步流水线折叠成零上下文成本轮次

## 4. 运行形态

- 7 种终端后端：本地 / Docker / SSH / Singularity / Modal / Daytona / Vercel Sandbox
- Daytona/Modal serverless 持久化：空闲休眠、按需唤醒，近零成本
- 任意模型：`hermes model` 切换，无锁定

## 5. 自查清单

- [ ] 学习回路闭合（创建→改进→回忆）
- [ ] 技能从经验自动创建
- [ ] 跨会话回忆可用（FTS5 + 摘要）
- [ ] 用户建模持续深化（Honcho）
- [ ] 调度自动化就位（cron 自然语言）
- [ ] 后端选择匹配成本（serverless 休眠）

## 边界

- 学习回路依赖会话历史质量——定期审计记忆。
- 模型无锁定但能力随模型变化；关键任务验证输出。
