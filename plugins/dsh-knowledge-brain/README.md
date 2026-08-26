# dsh-knowledge-brain

DSH（DeepSeek Harness）技能插件：**知识大脑层**。

搜索给你原始页面，大脑给你带引用的答案：合成层（实际答案+来源+明确标注不知道什么）+ 自连线知识图谱（零 LLM 调用提取实体边 attended/works_at/invested_in/founded）+ 差距分析 + 24/7 梦境周期（夜间消化/丰富/巩固记忆）+ 公司大脑按登录作用域隔离。受 [garrytan/gbrain](https://github.com/garrytan/gbrain)（29k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-knowledge-brain
```

## 触发方式

描述中包含"知识大脑 / 记住人和公司 / 会议前准备 / 差距分析 / 梦境周期 / 公司记忆"等关键词时自动触发。

## 能力

- 合成答案（带引用+来源）
- 自连线知识图谱（零 LLM 调用）
- 差距分析（标注未知）
- 24/7 梦境周期消化
- 公司大脑登录隔离
- 记忆归你所有（markdown 可导出）

## 许可

MIT
