# dsh-prompt-audit

DSH（DeepSeek Harness）技能插件：**提示词审计与模型迁移**。

扫描提示词/技能/工具描述中的过时模式（旧模型 cruft）：确立范围与目标模型、盘点与来源追踪、模式扫描，产出审计报告（file:line/原因/置信度）+ 建议 diff。受 [Anthropic 官方 skills](https://github.com/anthropics/skills) 的 claude-api prompt-audit（Apache-2.0）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-prompt-audit
```

## 触发方式

描述中包含"提示词审计 / 迁移新模型 / 过时模式 / cruft / 优化技能描述 / 提示适配"等关键词时自动触发。

## 能力

- 范围与目标模型声明
- 盘点/来源追踪/模式扫描
- 审计报告（file:line/原因/置信度）
- 建议 diff 与按需应用

## 许可

MIT
