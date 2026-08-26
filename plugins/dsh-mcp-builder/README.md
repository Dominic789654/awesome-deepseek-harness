# dsh-mcp-builder

DSH（DeepSeek Harness）技能插件：**MCP 服务器构建**。

Model Context Protocol 服务器四阶段工作流：深度调研与规划（API 覆盖 vs 工作流工具、命名可发现性、上下文管理、可行动错误信息）、协议与框架研读（TypeScript/FastMCP、streamable HTTP/stdio）、最小起步逐工具扩展、真实 agent 调用验证。受 [Anthropic 官方 skills](https://github.com/anthropics/skills) 的 mcp-builder（Apache-2.0）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-mcp-builder
```

## 触发方式

描述中包含"MCP / Model Context Protocol / MCP 服务器 / FastMCP / 工具集成 / 外部 API 接入"等关键词时自动触发。

## 能力

- 工具设计四原则（覆盖/命名/上下文/错误）
- 协议与传输选型（streamable HTTP/stdio）
- 最小起步逐工具扩展
- 真实调用验证与错误路径测试

## 许可

MIT
