# dsh-autonomous-research

DSH（DeepSeek Harness）技能插件：**自主研究 agent**。

给 AI agent 一个小而真实的 LLM 训练设置，让它过夜自主实验：修改代码 → 固定 5 分钟训练 → 检查 val_bpb 是否改善 → 保留或丢弃 → 重复（约 12 实验/小时、一晚约 100 个）；单文件修改（train.py）、program.md 超轻量 agent skill、固定时间预算让实验可比较、找最适当前平台的模型。受 [karpathy/autoresearch](https://github.com/karpathy/autoresearch)（94k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-autonomous-research
```

## 触发方式

描述中包含"自主研究 / LLM 训练调参 / 过夜实验 / val_bpb / 自主实验循环 / 训练优化"等关键词时自动触发。

## 能力

- 自主实验循环（改→训→判→保/弃）
- 固定 5 分钟时间预算
- val_bpb 词表无关比较
- 单文件修改可审
- program.md 超轻量 skill
- 小平台调参指引

## 许可

MIT
