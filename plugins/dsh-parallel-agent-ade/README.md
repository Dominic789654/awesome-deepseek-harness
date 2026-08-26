# dsh-parallel-agent-ade

DSH（DeepSeek Harness）技能插件：**并行 agent 开发环境**。

Codex/ClaudeCode/OpenCode/Pi 并排跑，各在独立 git worktree——一个 prompt 扇出多个 agent 并行做、比较结果合并胜者；移动伴侣应用监控与续推、Ghostty 级终端分屏、Design Mode（点击真实 UI 元素送 HTML/CSS/截图进 prompt）、GitHub/Linear 原生浏览、SSH 远程 worktree、AI diff 行级标注回推。受 [stablyai/orca](https://github.com/stablyai/orca)（49k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-parallel-agent-ade
```

## 触发方式

描述中包含"并行 agent / worktree 扇出 / A/B 方案 / 移动监控 / Design Mode / SSH 远程跑 agent"等关键词时自动触发。

## 能力

- 并行 worktree 扇出合并
- 移动伴侣监控续推
- Design Mode UI 上下文
- GitHub/Linear 原生
- SSH 远程 worktree
- AI diff 行级标注

## 许可

MIT
