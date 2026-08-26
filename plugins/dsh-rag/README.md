# dsh-rag

RAG 检索增强生成：向量数据库、嵌入策略、文档处理管线、检索与生成、
来源引用、常见问题与评估。构建有依据的 LLM 应用，减少幻觉。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 llm-application-dev/rag-implementation 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-rag
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-rag
# 重启 dsh web 生效
```

## 使用

对 agent 说"做 RAG / 文档问答系统"，`rag` 技能输出
数据管线 + 向量库选型 + 检索策略 + 评估计划。

## 结构

```
dsh-rag/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/rag/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
