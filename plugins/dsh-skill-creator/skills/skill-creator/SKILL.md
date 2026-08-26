---
name: skill-creator
description: |
  Create a new, high-quality SKILL.md skill following the Agent Skills open
  standard (agentskills.io). Use when the user asks to "create a skill",
  "write a SKILL.md", "做一个技能", "编写一个 skill", or wants to package a
  repeatable workflow/instruction for an agent.
---

# Skill Creator — 技能创作器

按 Agent Skills 开放标准（agentskills.io）创建高质量技能。改编自 Anthropic
官方 skill-creator（Apache-2.0），并针对 DSH 技能体系（ctx.skills）做了适配。

## 什么是技能（Skill）

技能是一个文件夹，包含 `SKILL.md`（指令+元数据）和可选的 `references/`、
`scripts/`、`assets/`。agent 按需动态加载，用于提升特定任务的表现。
与 MCP 的关系：MCP 提供"能力/工具"，技能提供"怎么做"的工作流——二者互补。

## SKILL.md 结构

```markdown
---
name: my-skill
description: |
  做什么 + 何时用。写明触发场景与关键词，让 agent 能正确命中。
---

# 标题

分步工作流、示例、边界情况。正文自由 markdown。
```

### Frontmatter 字段

- `name`（必填）：kebab-case，小写字母数字与连字符，≤64 字符，目录名必须一致。
- `description`（必填）：≤1024 字符（Claude.ai 上传限 200）。写法：
  "做什么 + 何时用 + 触发关键词"。好例："Extracts text and tables from
  PDF files. Use when the user mentions PDFs."；差例："Helps with PDFs"。
- `license`（可选）：开源协议。
- `compatibility`（可选）：运行环境要求。
- `allowed-tools`（可选，实验性）：预授权工具，如 `Bash(git:*) Read`。
- `metadata`（可选）：字符串键值映射。
- DSH 特有：`disable-model-invocation`（默认 false）、`user-invocable`（默认 true）。

### 正文规范

- 一个技能只聚焦一个工作流。
- 建议 <500 行；长内容拆到 `references/*.md`，正文用相对路径引用。
- 含分步流程、输入/输出示例、边界情况与错误处理。
- 先写 markdown，需要时才加 scripts；脚本依赖用 `dependencies` 声明。
- 安全：不硬编码密钥；只处理可信输入。

## 创作流程

1. **澄清**：问清用户要什么（任务、触发场景、输入输出、运行环境）。
2. **起草**：先写 `name` 与 `description`（触发词要具体），再写正文骨架。
3. **充实**：分步流程 + 示例 + 边界情况；长内容拆 references/。
4. **校验**：frontmatter 合法（name 小写连字符、description 完整）；正文 ≤500 行；
   相对路径引用正确。
5. **交付**：给出完整文件夹结构（`skills/<name>/SKILL.md`），并说明安装方式
   （DSH：做成 bundle 或放入本地 skills 目录；通用：npx skills / Claude 插件）。

## 参考

- [references/frontmatter.md](references/frontmatter.md) — frontmatter 字段速查
- [references/description-writing.md](references/description-writing.md) — description 写法示例
