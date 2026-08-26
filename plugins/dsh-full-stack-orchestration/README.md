# dsh-full-stack-orchestration

DSH（DeepSeek Harness）技能插件：**全栈功能编排**。

跨后端/前端/数据库/基础设施的端到端功能交付：状态机驱动（state.json）、分步执行 + 阶段检查点、每步产出文件（不靠上下文记忆）、失败即停、会话恢复与归档。受 [wshobson/agents](https://github.com/wshobson/agents) 的 full-stack-feature（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-full-stack-orchestration
```

## 触发方式

描述中包含"全栈功能 / 端到端交付 / 垂直切片 / 前后端联调 / 分层实现 / 阶段检查点"等关键词时自动触发。

## 能力

- 状态机驱动的分步工作流
- 阶段检查点与失败即停
- 每步落盘（可恢复/可审查）
- 会话恢复与归档重开

## 许可

MIT
