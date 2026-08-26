# dsh-doc-compiled-skills

DSH（DeepSeek Harness）技能插件：**文档预编译成可执行技能**。

官方文档里已编码决策、程序、最佳实践、约束——与其每次 RAG 检索原始文本，不如预编译成结构化可执行技能：提取高价值任务导向能力 → 按目的分类（限制/故障排查/配置/架构/安全）→ 按用户意图按需揭示。知识预编译成 agent 可直接使用的动作/选择/护栏。受 [MicrosoftDocs/Agent-Skills](https://github.com/MicrosoftDocs/Agent-Skills)（Azure Agent Skills）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-doc-compiled-skills
```

## 触发方式

描述中包含"文档转技能 / 预编译知识 / 替代 RAG / 官方文档技能化 / 按需揭示"等关键词时自动触发。

## 能力

- 三步骤方法论（提取/分类/揭示）
- 预编译 vs RAG 对比
- 按用户意图按需加载
- 动作/选择/护栏结构化
- 权威文档引用
- 团队可复用

## 许可

MIT
