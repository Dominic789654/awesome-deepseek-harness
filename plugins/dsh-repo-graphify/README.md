# dsh-repo-graphify

DSH（DeepSeek Harness）技能插件：**仓库知识图谱**。

读代码/PDF/Markdown/截图/白板照片（多模态），提取概念与关系建一张持久知识图谱：god nodes（中心概念）、惊人连接、建议问题、71.5x token 节省、wiki 式导航、--watch 自动同步、git hook 每次提交重建、边标签 EXTRACTED/INFERRED/AMBIGUOUS（诚实区分找到 vs 猜的）。受 [safishamsi/graphify](https://github.com/safishamsi/graphify)（48.7k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-repo-graphify
```

## 触发方式

描述中包含"理解代码库 / 知识图谱 / 概念关系 / 论文集 / 混合语料 / 结构发现"等关键词时自动触发。

## 能力

- 多模态提取（AST + LLM + 视觉）
- 边标签诚实（EXTRACTED/INFERRED/AMBIGUOUS）
- god nodes / 惊人连接 / 建议问题
- 71.5x token 节省（大语料）
- wiki 导航 + Obsidian 导出
- --watch / git hook 自动同步

## 许可

MIT
