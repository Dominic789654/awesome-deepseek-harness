# dsh-recsys-pipeline

DSH（DeepSeek Harness）技能插件：**推荐/排序流水线**。

六阶段框架（Source→Hydrator→Filter→Scorer→Selector→SideEffect），适用于一切"为（用户, 上下文）选 Top K"问题：内容流、搜索排序、RAG 重排、任务优先级、通知分流。受 [wshobson/agents](https://github.com/wshobson/agents) 的 recsys-pipeline-architect（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-recsys-pipeline
```

## 触发方式

描述中包含"推荐系统 / 排序流水线 / Top K / 内容流 / RAG 重排 / 通知分流 / 个性化"等关键词时自动触发。

## 能力

- 六阶段流水线框架
- 阶段可组合与并行边界
- 打分与物品分离
- 典型落地（内容流/RAG 重排/通知分流）

## 许可

MIT
