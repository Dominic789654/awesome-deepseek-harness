# dsh-skill-optimization

DSH（DeepSeek Harness）技能插件：**把技能当可训练参数**。

像训练神经网络一样训练 agent 技能（epochs/batchsize/learning rate/验证门禁，但不碰模型权重）：rollout→reflect→aggregate→select→update→evaluate 循环、候选编辑仅在严格改善 held-out 验证分时接受、文本学习率预算、拒绝编辑缓冲、零推理时模型调用、部署紧凑 best_skill.md（300-2000 tokens）。受 [microsoft/SkillOpt](https://github.com/microsoft/SkillOpt)（MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-skill-optimization
```

## 触发方式

描述中包含"训练技能 / 技能优化 / 自进化 / 验证门禁 / 轨迹训练 / best_skill"等关键词时自动触发。

## 能力

- 六步训练循环（rollout→evaluate）
- held-out 验证门禁
- 文本学习率预算
- 零推理时模型调用
- SkillOpt-Sleep 夜间自进化
- 跨模型/harness 迁移

## 许可

MIT
