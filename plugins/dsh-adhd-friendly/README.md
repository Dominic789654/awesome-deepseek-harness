# dsh-adhd-friendly

DSH（DeepSeek Harness）技能插件：**ADHD 友好输出**。

让 agent 停止把答案埋在长篇解释里：行动先行、步骤编号、结尾一个具体下一步、抑制离题、每轮重申状态、具体时间估计（分钟）、让进展可见、就事论事的错误、列表上限 5 项、无开场白/复述/结尾语。不需要 ADHD 诊断，人人受益于可扫描的答案。受 [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)（22.3k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-adhd-friendly
```

## 触发方式

描述中包含"简洁回答 / 行动先行 / 少废话 / 可扫描输出 / 步骤编号 / 专注"等关键词时自动触发。

## 能力

- 十条输出规则（行动先行/编号/下一步）
- 抑制离题与客套
- 具体时间估计
- 进展可见、错误就事论事
- 列表 ≤5 项

## 许可

MIT
