---
name: channel-assistant
description: |
  渠道化个人助手：单操作员的个人 AI 助手，通过一个 Gateway 连接
  模型/工具/消息频道/伴侣应用——频道即界面（WhatsApp/Telegram/
  Slack/Discord/Signal/iMessage…）、Control UI/CLI/TUI 三种界面、
  配对安全模型（未知发件人默认配对，可批准/拒绝）、工具沙箱化
  执行、ClawHub 插件市场、模型提供商灵活切换。
  当用户要搭一个常驻消息渠道的个人助手、多频道统一指挥时使用。
  受 openclaw/openclaw（247k★ MIT）启发的中文原创精简版。
---

# Channel Assistant — 渠道化个人助手

你的助手，在你的设备上，在你的聊天里。单操作员设计：一个
Gateway 连接模型、工具、消息频道和可选伴侣应用。

## 何时用

- 想通过 WhatsApp/Telegram/Slack 等日常渠道指挥 AI 助手
- 单操作员个人助手（非多用户团队产品）
- 需要统一 Gateway 控制会话/工具/事件/频道

## 1. 核心架构

- **Gateway** — 本地控制平面：会话、工具、事件、频道连接
- **Control UI / CLI / TUI** — 三种连接方式
- **Channels** — 频道即界面：WhatsApp/Telegram/Slack/Discord/
  Google Chat/Signal/iMessage 等
- **Companion apps** — 语音、Canvas、相机、屏幕、设备本地动作
- **模型提供商** — 托管与本地模型灵活切换
- **工具/技能/插件** — 扩展能力，ClawHub 市场分发

## 2. 安全模型

- 入站消息视为不可信输入
- **DM 频道默认配对未知发件人**：`pairing approve <channel> <code>` 批准
- 工具在主会话宿主运行，除非配置沙箱——先读安全指南再对外暴露
- 远程暴露 Gateway 前走暴露 runbook

## 3. 起步流程

1. 安装（curl / PowerShell / npm）
2. `openclaw onboard --install-daemon` 完成向导
3. `openclaw gateway status` / `openclaw dashboard`
4. 设置频道接入，开始日常使用

## 4. 自查清单

- [ ] 单操作员设计（非多用户）
- [ ] Gateway 控制平面就位
- [ ] 频道接入（消息平台即界面）
- [ ] 配对安全（未知发件人默认拒绝/待批准）
- [ ] 工具沙箱化（对外暴露前）
- [ ] 技能/插件按需扩展

## 边界

- 入站消息不可信：配对与沙箱是底线。
- 远程暴露 Gateway 需完整安全评估。
