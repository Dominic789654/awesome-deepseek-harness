# dsh-vector-search

DSH（DeepSeek Harness）技能插件：**向量检索工程**。

Embedding 模型选型、分块策略、向量索引调优、混合检索（向量+关键词融合：RRF/重排）、召回评测。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-vector-search
```

## 触发方式

描述中包含"向量检索 / embedding / 语义搜索 / 向量数据库 / 混合检索 / HNSW / 重排序 / RAG 检索优化"等关键词时自动触发。

## 能力

- Embedding 模型选型（2026 参考对比表）与流水线
- 分块策略与元数据纪律
- 向量索引调优（HNSW/IVF、评测召回）
- 混合检索融合方法（RRF/Linear/Cross-encoder/Cascade）

## 许可

MIT
