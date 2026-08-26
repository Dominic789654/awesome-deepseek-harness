---
name: mcp-builder
description: |
  MCP（Model Context Protocol）服务器构建：四阶段工作流——
  深度调研与规划（API 覆盖 vs 工作流工具、命名与可发现性、
  上下文管理、可行动错误信息）、协议文档研读、
  框架选型（TypeScript/FastMCP、streamable HTTP/stdio）、
  实现与测试迭代。
  当用户要建 MCP 服务器集成外部 API/服务时使用。
  受 Anthropic 官方 skills 的 mcp-builder（Apache-2.0）启发的中文原创精简版。
---

# MCP Builder — MCP 服务器构建

创建让 LLM 通过精心设计的工具与外部服务交互的 MCP 服务器。
MCP 服务器的质量 = 它在多大程度上让 LLM 完成真实任务。

## 何时用

- 构建 MCP 服务器集成外部 API/服务
- Python（FastMCP）或 Node/TypeScript（MCP SDK）

## 1. 阶段一：深度调研与规划

**API 覆盖 vs 工作流工具**：平衡端点覆盖与专用工作流工具。
工作流工具对特定任务更方便；全覆盖给 agent 组合操作的灵活性。
不确定时优先**全覆盖**。

**命名与可发现性**：清晰描述性名称 + 一致前缀
（`github_create_issue`/`github_list_repos`）+ 动作导向。

**上下文管理**：工具描述简洁；结果支持过滤/分页；
设计返回聚焦相关数据的工具。

**可行动错误信息**：错误要引导 agent 走向解决方案——
具体建议与下一步。

## 2. 阶段一续：协议与框架文档

- 研读 MCP 规范（modelcontextprotocol.io，页面加 .md 取 markdown）：
  架构、传输（streamable HTTP/stdio）、工具/资源/prompt 定义
- **推荐栈**：TypeScript（SDK 支持好、AI 生成 TS 质量高）；
  传输：远程用 streamable HTTP（无状态 JSON，易扩展维护），
  本地用 stdio
- 读框架文档与最佳实践（MCP Best Practices）

## 3. 阶段二-四：实现与迭代

- 从单一工具的最小服务器起步，逐工具扩展
- 每个工具：清晰 name/description/参数 schema/输出
- 用真实场景测试：让 agent 实际调用，观察是否容易理解与使用
- 错误信息迭代：失败时 agent 能否自行修复
- 覆盖测试：正常路径 + 错误路径 + 边界

## 4. 自查清单

- [ ] API 覆盖优先（不确定时）
- [ ] 工具命名前缀一致、动作导向、描述简洁
- [ ] 结果过滤/分页、错误信息可行动
- [ ] 传输选型合理（远程 streamable HTTP/本地 stdio）
- [ ] 最小服务器起步逐工具扩展
- [ ] 真实 agent 调用验证 + 错误路径测试

## 边界

- 客户端差异：有的客户端受益于代码执行组合基础工具，
  有的更适配高层工作流——按目标客户端调。
- 协议在演进：以 modelcontextprotocol.io 当前规范为准。
