---
name: skill-optimization
description: |
  把技能当可训练参数：像训练神经网络一样训练 agent 技能
  （epochs/batchsize/learning rate/验证门禁，但不碰模型权重）——
  rollout→reflect→aggregate→select→update→evaluate 循环、候选
  编辑仅在严格改善 held-out 验证分时接受、文本学习率预算、
  拒绝编辑缓冲、零推理时模型调用、部署紧凑 best_skill.md。
  当用户要优化/进化技能、用轨迹训练技能、验证技能改进时使用。
  受 microsoft/SkillOpt（MIT）启发的中文原创精简版。
---

# Skill Optimization — 把技能当可训练参数

像训练神经网络一样训练 agent 技能：epochs、批大小、学习率、
验证门禁——但不碰模型权重。技能文档是冻结 agent 的可训练状态。

## 何时用

- 手写/一次性生成的技能想可靠改进
- 用轨迹数据训练技能（如神经网络训练）
- 让技能自进化（夜间离线训练）

## 1. 训练循环

```
rollout（用当前技能跑任务，打分）
  → reflect（优化器模型分析结果）
  → aggregate（汇总候选编辑）
  → select（有界 add/delete/replace 编辑）
  → update（候选编辑仅在严格改善 held-out 验证分时接受）
  → evaluate（评估）
```

## 2. 稳定性机制

- **验证门禁**：候选编辑必须严格改善 held-out 验证分才接受
- **文本学习率预算**：控制每次编辑的幅度
- **拒绝编辑缓冲**：防止来回震荡
- **epoch 级慢/元更新**：训练稳定
- **零推理时模型调用**：部署时无额外成本

## 3. 部署产物

- 紧凑 `best_skill.md`（通常 300-2,000 tokens）
- 对未变的目标模型运行
- 结果可跨模型规模/跨 harness（Codex/Claude Code）迁移

## 4. SkillOpt-Sleep（夜间自进化）

- 收割（harvest）→ 挖掘（mine）→ 重放（replay）→ 巩固（consolidate）
- 在 held-out 验证门禁后合并已验证技能
- 本地 coding agent 夜间离线运行

## 5. 自查清单

- [ ] rollout 有评分（非主观）
- [ ] 候选编辑有界（add/delete/replace）
- [ ] held-out 验证门禁（严格改善才接受）
- [ ] 文本学习率预算
- [ ] 拒绝缓冲防震荡
- [ ] 部署零推理开销

## 边界

- 训练的是技能文本，不是模型权重——模型保持冻结。
- 验证集要 held-out，防止过拟合技能到训练轨迹。
