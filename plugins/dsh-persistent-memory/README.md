# dsh-persistent-memory

DSH（DeepSeek Harness）技能插件：**跨会话持久记忆压缩系统**。

自动捕获工具使用观察（生命周期 hooks）、生成语义摘要、跨会话注入上下文；3 层检索工作流（search 紧凑索引 → timeline 时间线 → get_observations 详情，~10x token 节省）、渐进披露、`<private>` 隐私标签、混合搜索（向量 + 关键词）。受 [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)（86k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-persistent-memory
```

## 触发方式

描述中包含"跨会话记忆 / 上下文延续 / 项目历史检索 / 记忆压缩 / 上次怎么修的"等关键词时自动触发。

## 能力

- 生命周期 hooks 自动捕获观察
- 3 层检索工作流（~10x token 节省）
- 渐进披露（token 成本可见）
- <private> 隐私标签
- 混合搜索（语义 + 关键词）

## 许可

MIT
