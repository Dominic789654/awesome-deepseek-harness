---
name: repo-graphify
description: |
  仓库知识图谱：读代码/PDF/Markdown/截图/白板照片（多模态），
  提取概念与关系建一张持久知识图谱——god nodes（中心概念）、
  惊人连接、建议问题、71.5x token 节省、wiki 式导航、--watch
  自动同步、git hook 每次提交重建、边标签 EXTRACTED/INFERRED/
  AMBIGUOUS（诚实区分找到 vs 猜的）。
  当用户要理解陌生代码库、论文集、混合语料的结构时使用。
  受 safishamsi/graphify（48.7k★）启发的中文原创精简版。
---

# Repo Graphify — 仓库知识图谱

读取文件、构建知识图谱、还给你不知道存在的结构。多模态：
代码、PDF、Markdown、截图、白板照片、任何语言的图片。

## 何时用

- 理解陌生代码库/论文集/笔记混合语料
- Karpathy 式 `/raw` 文件夹（论文+推文+截图+笔记）
- 代码与论文/图片之间的隐藏连接
- 跨会话持久知识（不每次重读原文）

## 1. 提取与建图

| 类型 | 提取方式 |
|------|----------|
| 代码（.py/.ts/.js/.go/.rs…） | tree-sitter AST + call-graph 遍历 |
| 文档（.md/.txt/.rst） | 概念 + 关系（LLM） |
| 论文（.pdf） | 引用挖掘 + 概念提取 |
| 图片（png/jpg/webp/gif） | 视觉——截图/图表/任意语言 |

每条边带标签：**EXTRACTED**（找到）/ **INFERRED**（推断）/
**AMBIGUOUS**（模糊）——永远知道什么是找到的 vs 猜的。

## 2. 输出

- `graph.html` — 交互图谱（点击/搜索/社区过滤）
- `obsidian/` — 可作 Obsidian vault 打开
- `wiki/` — 每个社区/中心节点的百科式文章 + index.md（agent 可导航）
- `GRAPH_REPORT.md` — god nodes、惊人连接、建议问题
- `graph.json` — 持久图谱（数周后查询无需重读）
- `cache/` — SHA256 缓存（只处理变更文件）

## 3. 核心价值

- **God nodes** — 最高度概念（万物经它连接）
- **惊人连接** — 按综合分排序（代码-论文边 > 代码-代码边），
  每条附白话解释
- **Token 基准** — 混合语料实测 **71.5x** 每查询 token 节省
- **诚实** — EXTRACTED/INFERRED/AMBIGUOUS 边标签

## 4. 查询与同步

- `query "what connects X to Y?"` / `path A B` / `explain X`
- `--watch` — 后台自动同步（代码变更即时重建，文档提醒 --update）
- `hook install` — 每次 commit 后自动重建图谱
- `--wiki` / `--svg` / `--graphml`（Gephi/yEd）/ `--neo4j` / `--mcp`

## 5. 自查清单

- [ ] 多模态提取（代码 AST + 文档 LLM + 图片视觉）
- [ ] 边标签诚实（EXTRACTED/INFERRED/AMBIGUOUS）
- [ ] god nodes / 惊人连接 / 建议问题报告
- [ ] 持久 graph.json（跨会话查询）
- [ ] token 基准（大语料应 >10x 节省）
- [ ] --watch / hook 同步就位

## 边界

- 推断边是猜测——用标签区分，重大结论回原文核实。
- 图的价值随语料规模增长；小文件夹更看重结构清晰而非压缩。
