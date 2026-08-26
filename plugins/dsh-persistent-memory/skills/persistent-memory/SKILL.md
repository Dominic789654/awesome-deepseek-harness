---
name: persistent-memory
description: |
  跨会话持久记忆压缩系统：自动捕获工具使用观察（生命周期 hooks）、
  生成语义摘要、跨会话注入上下文；3 层检索工作流
  （search 紧凑索引 → timeline 时间线 → get_observations 详情，
  ~10x token 节省）；渐进披露、<private> 隐私标签、
  混合搜索（向量 + 关键词）。
  当用户要跨会话记忆、会话上下文延续、项目历史检索时使用。
  受 thedotmack/claude-mem（86k★ Apache-2.0）启发的中文原创精简版。
---

# Persistent Memory — 跨会话持久记忆

无缝跨会话保留上下文：自动捕获工具使用观察 → 生成语义摘要 →
未来会话可用。项目知识在会话结束后依然延续。

## 何时用

- 跨会话记忆（上下文存活）
- 项目历史检索（"上次那个 bug 怎么修的"）
- 长项目上下文延续，避免每次重讲背景

## 1. 核心组件

1. **生命周期 hooks** — SessionStart / UserPromptSubmit / PostToolUse /
   Stop / SessionEnd：自动捕获观察，无需人工干预
2. **Worker 服务** — 本地 HTTP API + 网页查看器
3. **SQLite 数据库** — 存会话/观察/摘要（FTS5 全文检索）
4. **mem-search 技能** — 自然语言查询 + 渐进披露
5. **向量库（Chroma）** — 混合搜索：语义 + 关键词

## 2. 3 层检索工作流（~10x token 节省）

```
① search             紧凑索引（~50-100 tokens/结果）
② timeline           看中结果的时间线上下文
③ get_observations   只取过滤后的 ID 详情（~500-1000 tokens/结果）
```

先过滤再取详情：`search("auth bug", type="bugfix")` → 挑 ID →
`get_observations(ids=[123,456])`（批量取）。

## 3. 渐进披露（Context Priming）

- 分层记忆检索 + token 成本可见
- 先注入紧凑层，按需展开详情——不在每次会话开头全量灌入

## 4. 隐私与配置

- `<private>` 标签：标记敏感内容不入库
- 上下文配置：细粒度控制注入什么
- 引用：观察带 ID 可溯源

## 5. 自查清单

- [ ] 捕获观察（工具使用/关键决策），非全量日志
- [ ] 语义摘要生成（跨会话可检索）
- [ ] 3 层检索：search → timeline → get_observations
- [ ] 渐进披露（先紧凑索引后详情）
- [ ] <private> 隐私标签用上
- [ ] 混合搜索（语义 + 关键词）

## 边界

- 记忆是辅助不是替代：检索结果需结合当前上下文判断。
- 隐私默认本地存储；云同步需显式开启。
