# dsh-agent-loop-engineering

DSH（DeepSeek Harness）技能插件：**Agent 循环工程**。

设计并编排自主 agent 的循环系统：L1 自动 / L2 辅助循环分级、常用循环模式（每日 triage、PR 保姆、依赖清扫、changelog 起草）、多循环协调、验证器与人工门、loop-audit（就绪评分/成本审计）与反模式清单。受 [cobusgreyling/loop-engineering](https://github.com/cobusgreyling/loop-engineering)（10k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-agent-loop-engineering
```

## 触发方式

描述中包含"agent 循环 / 自动化循环 / 自主任务循环 / 循环审计 / 多循环协调"等关键词时自动触发。

## 能力

- L1/L2 循环分级与初始化
- 循环模式：daily triage、PR babysitter、dependency sweeper、changelog drafter
- 多循环协调与职责划分
- 验证器必需 + 人工门规则
- loop-audit：就绪评分、token/时间成本审计
- 反模式识别（无验证器自动合并、循环漂移等）

## 许可

MIT
