---
name: obsidian-vault
description: |
  Obsidian 知识库操作：Obsidian 风味 Markdown（wikilinks/embeds/
  callouts/properties/frontmatter）、Bases 数据库视图（views/
  filters/formulas/summaries）、JSON Canvas 画布（nodes/edges/
  groups/connections）、Obsidian CLI（插件与主题开发）、Defuddle
  网页转净 Markdown（去杂乱省 token）。当用户要操作 Obsidian
  vault/笔记/画布/知识库时使用。受 kepano/obsidian-skills
  （36k★）启发的中文原创精简版。
---

# Obsidian Vault — Obsidian 知识库操作

面向任何兼容 skills 的 agent 的 Obsidian 官方技能：
在 vault 里创建和编辑笔记、画布、数据库视图，并用 CLI 开发插件。

## 何时用

- 在 Obsidian vault 创建/编辑 Markdown 笔记
- 用 Obsidian 特有语法（wikilink/embed/callout/properties）
- 建立 Bases 数据库视图、JSON Canvas 白板
- 开发 Obsidian 插件/主题（CLI）
- 把网页抓成干净 Markdown 存入 vault

## 1. obsidian-markdown

Obsidian 风味 Markdown（`.md`）：
- **wikilinks**：`[[笔记名]]`、`[[笔记名|别名]]`
- **embeds**：`![[笔记名]]` 嵌入其他笔记内容
- **callouts**：`> [!note]` / `> [!tip]` / `> [!warning]` 提示块
- **properties**：frontmatter 属性（tags/date/aliases…）

## 2. obsidian-bases

Bases 数据库视图（`.base`）：
- **views**：以卡片/表格查看笔记集合
- **filters**：按属性过滤
- **formulas**：计算字段
- **summaries**：汇总统计

## 3. json-canvas

JSON Canvas 画布（`.canvas`）：
- **nodes**：节点（笔记/文本/组）
- **edges**：节点间连线
- **groups**：分组与连接关系
- 纯 JSON 格式，可编程生成

## 4. obsidian-cli

通过 Obsidian CLI 与 vault 交互：
- 插件与主题开发
- vault 自动化操作

## 5. defuddle

把网页提取成干净 Markdown：
- 去除导航/广告/杂乱 DOM
- 保存 token——直接进 vault 或上下文

## 6. 自查清单

- [ ] 语法用对（wikilink/embed/callout/properties）
- [ ] Bases 视图/过滤/公式正确
- [ ] Canvas 节点/边/组结构合法
- [ ] 网页抓取走 Defuddle 去杂乱
- [ ] 输出遵循 Agent Skills 规范（可移植）

## 边界

- 面向 vault 内容操作；重度知识管理策略见专门技能。
- Defuddle 只做净提取，不改变源网页。
