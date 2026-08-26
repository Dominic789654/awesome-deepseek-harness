---
name: live-docs
description: |
  最新文档注入防幻觉：写库代码/API 调用前先拉取版本化最新文档，
  而不是靠训练数据里的旧示例——ctx7 CLI（library 搜索 + docs 取
  文档）或 MCP 双模式；library ID 直取（/supabase/supabase）、
  版本指定（Next.js 14）、rule 规则自动触发；消灭幻觉 API、
  过期代码、泛化旧版本答案。
  当用户要用库/API 写代码、不确定接口签名、怀疑示例过期时使用。
  受 upstash/context7（61k★ MIT）启发的中文原创精简版。
---

# Live Docs — 最新文档注入

LLM 依赖的库知识常常过期：一年前的训练数据、不存在的幻觉 API、
旧版本的泛化答案。本技能在写库相关代码前把**版本化最新文档**
直接拉进上下文。

## 何时用

- 用库/API 写代码（Next.js/Supabase/Cloudflare Worker…）
- 不确定接口签名、担心示例过期
- 需要某库特定版本的文档

## 1. 双模式

- **CLI + Skills**：`ctx7` 命令引导 agent 取文档（无需 MCP）
- **MCP**：注册 Context7 MCP server，原生调用文档工具

## 2. 工具

CLI：
- `ctx7 library <name> <query>` — 按名搜库，返回匹配库 + ID
- `ctx7 docs <libraryId> <query>` — 用兼容 ID（如 `/mongodb/docs`）取文档

MCP：
- `resolve-library-id` — 把库名解析成兼容 ID
- `query-docs` — 按 ID + 问题取相关文档

## 3. 使用技巧

- **Library ID 直取**：已知库就用 `use library /supabase/supabase for API and docs`
  跳过匹配步骤直接取
- **指定版本**：`Next.js 14 middleware` → 自动匹配对应版本
- **Rule 规则**：装好后自动触发——库相关提问就拉文档，
  "Always use live docs when I need library/API documentation,
  code generation, setup or configuration steps"

## 4. 自查清单

- [ ] 库相关任务先取文档（不凭记忆写 API）
- [ ] 已知库用 library ID 直取
- [ ] 需要特定版本时显式指定
- [ ] rule/规则已配置（自动触发）
- [ ] 示例来自当前版本文档

## 边界

- 文档直取的是"源文档"；仍需结合项目上下文判断。
- API key 提升限流；免费额度内也可用。
