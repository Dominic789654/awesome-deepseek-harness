# dsh-issue-triage

DSH（DeepSeek Harness）技能插件：**Issue/PR 分流**。

状态机驱动的分流流程（分类角色 bug/enhancement + 状态角色 needs-triage/needs-info/ready-for-agent/ready-for-human/wontfix）、验证与盘问、agent 就绪简报（AGENT-BRIEF）。受 [mattpocock/skills](https://github.com/mattpocock/skills) 的 triage（223k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-issue-triage
```

## 触发方式

描述中包含"分流 issue / triage / 分类缺陷 / 外部 PR 处理 / 交给 agent / 待办简报"等关键词时自动触发。

## 能力

- 分类角色 + 状态角色状态机
- 验证与盘问流程
- agent 就绪简报撰写
- 状态冲突与异常转移标记

## 许可

MIT
