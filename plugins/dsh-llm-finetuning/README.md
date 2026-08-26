# dsh-llm-finetuning

DSH（DeepSeek Harness）技能插件：**LLM 微调路由与配方**。

先判断是否该微调（RAG/提示词出口）、方法路由（SFT/DPO/ORPO/KTO/GRPO+RLVR/CPT）、LoRA/QLoRA 配方、评估先行（eval harness）、量化导出。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-llm-finetuning
```

## 触发方式

描述中包含"微调 / fine-tune / LoRA / QLoRA / DPO / GRPO / RLVR / 偏好优化 / 强化训练 / eval harness"等关键词时自动触发。

## 能力

- 出口优先路由（易变事实→RAG、未定行为→提示词、稳定知识→CPT+SFT）
- 方法选型（SFT/DPO/KTO/GRPO 按数据形态）
- LoRA/QLoRA 配方要点与评估先行纪律
- 量化导出（FP8/NVFP4/AWQ/GGUF）与质量验证

## 许可

MIT
