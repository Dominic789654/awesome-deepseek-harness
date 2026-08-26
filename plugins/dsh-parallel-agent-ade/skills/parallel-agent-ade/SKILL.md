---
name: parallel-agent-ade
description: |
  并行 agent 开发环境：Codex/ClaudeCode/OpenCode/Pi 并排跑，
  各在独立 git worktree——一个 prompt 扇出多个 agent 并行做，
  比较结果合并胜者；移动伴侣应用监控与续推、Ghostty 级终端
  分屏、Design Mode（点击真实 UI 元素送 HTML/CSS/截图进
  prompt）、GitHub/Linear 原生浏览、SSH 远程 worktree、
  AI diff 行级标注回推。
  当用户要并行多 agent 开发、A/B 多个方案、远程跑 agent 时使用。
  受 stablyai/orca（49k★ MIT）启发的中文原创精简版。
---

# Parallel Agent ADE — 并行 agent 开发环境

为 100x builder 打造的 AI 编排器：Codex、ClaudeCode、OpenCode
或 Pi 并排跑——各自独立 worktree、一处跟踪。

## 何时用

- 一个 prompt 想扇出多个 agent 并行做（A/B 方案）
- 移动端监控/续推 agent
- 远程（SSH）跑 agent、本地看结果

## 1. 核心特性

- **并行 worktree**：一个 prompt 扇到 5 个 agent，各在独立 git
  worktree——比较结果、合并胜者
- **移动伴侣**：手机监控、agent 完成通知、随时发后续
- **终端分屏**：Ghostty 级终端、WebGL 渲染、无限分屏、重启不丢
  回滚
- **Design Mode**：点击真实 Chromium 窗口里的 UI 元素，把它的
  HTML/CSS + 裁剪截图直接送进 agent prompt
- **GitHub & Linear 原生**：应用内浏览 PR/Issue/看板，任务一键
  开 worktree
- **SSH worktree**：远程大机器跑 agent（文件编辑/git/终端全支持，
  自动重连 + 端口转发）
- **AI diff 标注**：任何 diff 行上留言，直接回推给 agent

## 2. 工作流

1. 启动 agent 会话（Codex/ClaudeCode/OpenCode/Pi）
2. 每个 agent 独立 worktree（并行隔离）
3. 扇出 prompt → 比较结果 → 合并胜者
4. Design Mode 精确送 UI 上下文
5. diff 标注回推迭代
6. 移动端随时监控/续推

## 3. 自查清单

- [ ] 多 agent 各在独立 worktree
- [ ] 扇出 prompt 并行执行
- [ ] 结果比较 + 合并胜者
- [ ] Design Mode（UI 元素精确送上下文）
- [ ] diff 行级标注回推
- [ ] SSH 远程 worktree（如需要）

## 边界

- 并行 agent 消耗多倍 token——扇出规模按需。
- 远程 worktree 需安全 SSH 配置。
