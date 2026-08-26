---
name: agent-reach
description: |
  给 AI Agent 一键装互联网能力：网页阅读、YouTube 字幕提取、
  RSS、全网语义搜索、GitHub、Twitter/X、B站、Reddit、Facebook、
  Instagram、小红书、LinkedIn、V2EX、雪球、小宇宙播客——零配置
  即用 + 多后端路由（平台封了自动切换）、agent-reach doctor 诊断、
  Cookie 仅存本地、隐私安全。当用户要 agent 读网页/搜社媒/看
  YouTube/查 B站/读小红书时使用。受 Panniantong/Agent-Reach
  （73k★ MIT）启发的中文原创精简版。
---

# Agent Reach — 给 AI Agent 装互联网能力

AI Agent 能写代码，但"去网上找东西"常抓瞎：YouTube 拿不到字幕、
Twitter API 要付费、Reddit 服务器 IP 被 403、小红书必须登录、
B站被风控。Agent Reach 把这件事变成一句话：装上后几分钟就能
读推特、搜 Reddit、看 YouTube、刷小红书。

## 何时用

- 让 agent 读网页/YouTube 字幕/RSS
- 搜索社媒内容（X/Reddit/小红书/B站/雪球…）
- 总结视频、看 GitHub 仓库与 Issue

## 1. 平台覆盖

| 平台 | 装好即用 | 配置后解锁 |
|------|---------|-----------|
| 网页 / YouTube / RSS / V2EX | ✅ 阅读/字幕/搜索 | — |
| 全网搜索 | — | 语义搜索（免费 MCP） |
| GitHub | 公开仓库+搜索 | 私有/Issue/PR/Fork |
| Twitter/X | 单条推文 | 搜索/时间线/长文 |
| B站 | 搜索+详情（bili-cli） | 字幕（OpenCLI） |
| Reddit / Facebook / Instagram / 小红书 | — | 浏览器登录态（OpenCLI） |
| LinkedIn | 公开页（Jina） | Profile/公司/职位 |
| 雪球 / 小宇宙播客 | 行情/热门 | 播客转写（Whisper） |

## 2. 设计理念

- **零配置优先**：能免配置的绝不要求配置；"帮我配 XXX"一句话引导
- **多后端路由**：每平台「首选 + 备选」，接入失效自动换（yt-dlp 被封 →
  bili-cli 切换，用户零操作）
- **隐私安全**：Cookie 只存本地、不上传；代码开源可审查
- **自带诊断**：`agent-reach doctor` 一条命令查通断与修法

## 3. 工作流

1. 安装：给 agent 一句安装指令（读 install.md）
2. 按需配置：告诉 agent「帮我配 XXX」，它逐步引导
3. 使用：直接说需求（"总结这个 YouTube 视频" / "搜一下小红书上 X 的口碑"）
4. 诊断：`agent-reach doctor` 排查

## 4. 自查清单

- [ ] 平台有零配置路径时优先用
- [ ] 需登录的平台引导配置（不代登录）
- [ ] Cookie 仅本地（不注入/不上传）
- [ ] 多后端路由失效自动切换
- [ ] doctor 诊断跑过
- [ ] 更新一句话完成

## 边界

- 遵守各平台条款；只读用户明确授权的会话。
- 代登录与未授权爬取不在范围内。
