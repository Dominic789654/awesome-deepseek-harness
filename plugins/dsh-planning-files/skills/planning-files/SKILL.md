---
name: planning-files
description: |
  三文件持久化规划：task_plan.md（阶段+进度）/ findings.md
  （研究发现）/ progress.md（会话日志+测试结果）落地磁盘，
  每轮 hook 重注入——计划扛过上下文丢失、/clear、崩溃与压缩；
  会话恢复 catchup 重新读取三文件续跑；并行任务用隔离目录。
  当用户做多步长任务、要计划持久化、会话被清空后续跑时使用。
  受 OthmanAdi/planning-with-files（25k★ MIT）启发的中文原创精简版。
---

# Planning Files — 三文件持久化规划

"你的 agent 的上下文窗口会死，计划不会。" 把计划写进磁盘文件、
每轮重新注入，计划就能扛过 /clear、崩溃和上下文压缩。

## 何时用

- 3+ 步骤或 5+ 次工具调用的复杂任务
- 长任务会触发上下文压缩/清空
- 需要跨会话续跑、并行多任务

## 1. 核心原则

```
上下文窗口 = RAM（易失、有限）
文件系统 = 磁盘（持久、无限）
→ 任何重要内容都写进磁盘
```

## 2. 三文件模式

```
your-project/
├── task_plan.md   ← 阶段 + 复选框；/clear 后的恢复点
├── findings.md    ← 研究发现与决策，边走边追加
└── progress.md    ← 会话日志与测试结果
```

并行任务用隔离目录：`.planning/YYYY-MM-DD-slug/`（同三文件），
通过 `.active_plan` 选择。纯 Markdown、默认 gitignore。

## 3. 触发链（每轮检查第一格适用的）

```
1. 任务需 3+ 步或 5+ 次调用？ → 先建三文件
2. 学到东西？                 → 追加到 findings.md
3. 做了事情？                 → 记入 progress.md
4. 阶段完成？                 → 在 task_plan.md 打勾
5. 上下文死了（/clear/崩溃）？ → 会话 catchup 重读三文件
6. 所有阶段完成？             → 才释放 Stop 门（gated 模式）
```

## 4. Hooks 机制

- 每轮开注入计划块（`===BEGIN PLAN DATA===`）
- 写入后提醒、停止前检查完成度
- 让第 2-6 步机械化而非可选

## 5. 会话恢复（catchup）

上下文塞满跑 `/clear` 后自动恢复：

1. 查会话存储（`~/.claude/projects/` 等）找前一会话数据
2. 找规划文件最后更新时间
3. 提取之后的对话（潜在丢失上下文）
4. 展示 catchup 报告供同步

**Pro tip**：关掉 auto-compact 最大化上下文再清空。

## 6. 自查清单

- [ ] 复杂任务先建三文件（task_plan/findings/progress）
- [ ] 学到即记 findings、做完即记 progress
- [ ] 阶段完成打勾 task_plan
- [ ] 每轮注入计划块（hook 或手动）
- [ ] 上下文丢失后 catchup 重读续跑
- [ ] 并行任务隔离目录 + .active_plan

## 边界

- 纯文件无运行时状态；文件即真相。
- 简单任务（<3 步）不必建文件——避免过度工程。
