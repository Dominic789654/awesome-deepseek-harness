# dsh-live-docs

DSH（DeepSeek Harness）技能插件：**最新文档注入防幻觉**。

写库代码/API 调用前先拉取版本化最新文档，而不是靠训练数据里的旧示例：ctx7 CLI（library 搜索 + docs 取文档）或 MCP 双模式、library ID 直取（`/supabase/supabase`）、版本指定（Next.js 14）、rule 规则自动触发——消灭幻觉 API、过期代码、泛化旧版本答案。受 [upstash/context7](https://github.com/upstash/context7)（61k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-live-docs
```

## 触发方式

描述中包含"用某库写代码 / API 文档 / 接口签名 / 示例过期 / 版本化文档 / use context7"等关键词时自动触发。

## 能力

- 版本化最新文档直取
- CLI + MCP 双模式
- library ID 直取（跳过匹配）
- 版本显式指定
- rule 自动触发规则

## 许可

MIT
