---
name: skill-seekers
description: |
  AI 系统的数据层：把文档站/GitHub 仓库/PDF/视频/Notebook/维基等
  18 种来源转成结构化知识资产，导出到 22 种目标（Claude/Gemini/
  OpenAI skills、RAG 管道、编码助手）；AI 驱动项目扫描（读 manifest/
  README/Dockerfile/源码 import 自动生成每框架配置）、社区注册表。
  当用户要把文档/仓库/PDF 变成可用的技能或知识库时使用。
  受 yusufkaraaslan/Skill_Seekers（14k★ MIT）启发的中文原创精简版。
---

# Skill Seekers — 技能数据层

把任意来源变成结构化知识资产，一次准备、到处使用：
"Prepare once, export to 22 targets"。

## 何时用

- 把文档站/框架文档变成可加载的技能
- 把 GitHub 仓库/PDF/视频/Notebook 转成知识资产
- 给 RAG 管道（LangChain/LlamaIndex/Pinecone）准备语料
- 给编码助手（Cursor/Windsurf/Cline）打包技能

## 1. 核心工作流

```
skill-seekers create <source>   # 18 种来源 → 结构化输出
skill-seekers package <dir> --target claude   # 打包到目标平台
```

## 2. 18 种来源

- GitHub 仓库 / 本地代码库
- PDF / Word / EPUB / PPT / Jupyter Notebook
- 文档站（爬取）/ 本地 HTML / OpenAPI/Swagger
- 视频（YouTube/Vimeo/本地，字幕+画面帧提取）
- Confluence / Notion / Slack-Discord 聊天导出
- RSS/Atom / AsciiDoc / Man page

## 3. 22 种导出目标

- AI 技能：Claude / Gemini / OpenAI / 各平台 zip 包
- RAG 管道：LangChain / LlamaIndex / Pinecone
- 编码助手：Cursor / Windsurf / Cline
- 可选 AI 增强：指定 agent（kimi 等）提升技能质量

## 4. AI 驱动项目扫描

`skill-seekers scan ./my-react-app`：AI agent 读 manifest、
README、Dockerfile/CI 和抽样源码 import → 每检测到的框架生成
一个配置 + `<project>-codebase.json`；无预设时 AI 现生成配置，
可发布回社区注册表。

## 5. 自查清单

- [ ] 来源识别正确（18 类之一）
- [ ] 结构化提取（非原样搬运）
- [ ] 目标平台打包正确（claude/gemini/openai/rag…）
- [ ] AI 增强可选（质量提升）
- [ ] 项目扫描：manifest/README/CI/import 全覆盖
- [ ] 配置可复用（社区注册表）

## 边界

- 抓取需尊重站点条款；视频帧提取需 GPU 感知依赖。
- 输出质量取决于源质量——先清洗再增强。
