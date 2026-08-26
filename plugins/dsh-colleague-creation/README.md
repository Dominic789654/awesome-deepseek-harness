# dsh-colleague-creation

DSH（DeepSeek Harness）技能插件：**把真人蒸馏成 AI 技能**。

提供源材料（飞书/DingTalk/Slack 消息、微信聊天、邮件、截图）+ 主观描述，生成"像 TA 一样工作"的 Skill：工作能力层 + 五层人格层（硬规则→身份→表达→决策→人际）、人格/公司文化/职级标签、增量演进（追加文件自动合并、对话纠正立即生效）与版本回滚。受 [titanwings/colleague-skill](https://github.com/titanwings/colleague-skill)（23.5k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-colleague-creation
```

## 触发方式

描述中包含"复刻同事 / 数字永生 / 保留经验 / 生成像 TA 的 skill / 接手离职同事的工作"等关键词时自动触发。

## 能力

- 多源材料采集（聊天/文档/邮件/截图/粘贴文本）
- 两部分架构：Work Skill + Persona
- 人格/公司文化/职级标签体系
- 增量演进与版本回滚
- 对话纠正（Correction 层立即生效）
- 执行链：任务 → 态度 → 执行 → 用 TA 的声音输出

## 许可

MIT
