---
name: autonomous-research
description: |
  自主研究 agent：给 AI agent 一个小而真实的 LLM 训练设置，让它
  过夜自主实验——修改代码 → 固定 5 分钟训练 → 检查 val_bpb 是否
  改善 → 保留或丢弃 → 重复（约 12 实验/小时、一晚约 100 个）；
  单文件修改（train.py）、program.md 是超轻量 agent skill、固定
  时间预算让实验可比较、找最适当前平台的模型。
  当用户要 agent 自动做 LLM 训练研究/调参时使用。
  受 karpathy/autoresearch（94k★ MIT）启发的中文原创精简版。
---

# Autonomous Research — 自主研究 agent

给 AI agent 一个小而真实的 LLM 训练设置，让它过夜自主实验。
你醒来时看到一份实验日志和（但愿）更好的模型。

## 何时用

- 让 agent 自主优化 LLM 训练（模型/超参/架构）
- 无人值守过夜实验（一晚约 100 个）
- 找最适应当前平台的模型

## 1. 核心设计（三文件）

```
prepare.py      — 固定常量、一次性数据准备 + 运行时工具（不改）
train.py        — GPT 模型 + 优化器 + 训练循环（agent 改这个）
program.md      — agent 指令（人改这个，超轻量 skill）
```

## 2. 自主实验循环

```
修改 train.py（架构/超参/优化器/批大小均可改）
  → 训练固定 5 分钟（墙钟，排除启动/编译）
  → 检查 val_bpb（验证 bits per byte，越低越好）
  → 改善则保留，否则丢弃
  → 重复（约 12 实验/小时）
```

- **val_bpb**：与词表大小无关，架构改动可公平比较
- **单文件修改**：范围可控、diff 可审
- **固定时间预算**：实验直接可比，且找最适当前平台的模型
  （代价：与其他平台结果不可比）
- **自包含**：单 GPU、无分布式、无复杂配置

## 3. 运行 agent

在仓库里启动 agent（建议禁用权限），prompt：
"看一下 program.md，开一个新实验！先做 setup。"

program.md 本质上就是超轻量 skill——人通过编辑它来"编程"
自主研究组织。

## 4. 小平台调参建议（Macbook 等）

- 用低熵数据集（如 TinyStories）
- 降低 vocab_size（8192 → 4096/2048/1024 或字节级 256）
- 大幅降低 MAX_SEQ_LEN、EVAL_TOKENS
- train.py 里 DEPTH（默认 8）降到 4、TOTAL_BATCH_SIZE 降
  到 2**14 左右（保持 2 的幂）
- WINDOW_PATTERN 用 "L"（SSSL 交替带状注意力在小平台低效）

## 5. 自查清单

- [ ] 单文件修改（train.py）
- [ ] 固定时间预算（5 分钟）
- [ ] val_bpb 指标可比较（词表无关）
- [ ] 保留/丢弃决策有日志
- [ ] program.md 指令清晰
- [ ] 平台适配（GPU/Mac/Windows 调参）

## 边界

- 结果与异构平台不可比（固定时间预算的代价）。
- 自主修改代码需权限控制与审计。
