---
name: issue-triage
description: |
  Issue/PR 分流：状态机驱动（分类角色 bug/enhancement +
  状态角色 needs-triage/needs-info/ready-for-agent/ready-for-human/wontfix）、
  验证与盘问、产出 agent 就绪简报（AGENT-BRIEF）。
  当用户要分流 issue、处理外部 PR、分类缺陷/增强、
  把 issue 交给 agent 或写待办简报时使用。
  受 mattpocock/skills 的 triage（223k★ MIT）启发的中文原创精简版。
---

# Issue Triage — Issue/PR 分流

把 issue 推进一个小的分流状态机：分类、验证、必要时盘问、写 agent 就绪简报。

## 何时用

- 分流项目 issue（缺陷/增强）
- 处理外部 PR（= 带代码的 issue，同一状态机）
- 分类与验证 issue
- 把 issue 规整到"可交给 agent"

## 1. 角色

**分类角色**（恰好一个）：
- `bug`：有东西坏了
- `enhancement`：新功能或改进

**状态角色**（恰好一个）：
- `needs-triage`：维护者需要评估
- `needs-info`：等报告人补充信息
- `ready-for-agent`：规格完整，可交给 agent
- `ready-for-human`：需要人工实现
- `wontfix`：不处理

PR 的同一状态对代码读：`ready-for-agent` = 附简报、agent 该对 diff 迈下一步；
`ready-for-human` = 可以人工合并。

状态冲突 → 先标记并问维护者，再做任何事。

## 2. 状态转移

未标记 issue 通常先到 `needs-triage`；再移向 `needs-info` /
`ready-for-agent` / `ready-for-human` / `wontfix`。
`needs-info` 在报告人回复后回到 `needs-triage`。
维护者可随时覆盖；异常的转移要标记并先问。

## 3. 分流流程

1. **分类**：bug 还是 enhancement（一个分类角色）
2. **验证**：能复现吗？信息够吗？不够 → needs-info 并列出缺什么
3. **盘问（grill）**：规格模糊时向报告人追问（一次问清，别来回）
4. **写简报**：ready-for-agent 的 issue 附 AGENT-BRIEF（durable，不依赖对话）
5. **标记**：每个分流过的 issue 恰好一个分类 + 一个状态

## 4. 简报（AGENT-BRIEF）要点

- 目标与验收标准可检查
- 上下文/复现步骤/相关代码位置
- 明确范围（不做什么）
- 独立成文：任何 agent 读到都能接手，不依赖原始对话

## 5. 自查清单

- [ ] 每 issue 恰好一个分类 + 一个状态
- [ ] 信息不足 → needs-info 并列出缺口
- [ ] 规格模糊已盘问清楚
- [ ] ready-for-agent 的 issue 有完整简报
- [ ] 状态冲突已标记并询问
- [ ] 异常转移已标记

## 边界

- 具体标签字符串随项目配置不同，先确认映射。
- AI 分流的内容应声明"由 AI 生成"（透明性）。
