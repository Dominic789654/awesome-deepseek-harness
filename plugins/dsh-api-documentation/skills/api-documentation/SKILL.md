---
name: api-documentation
description: |
  API 文档与开发者体验：OpenAPI 3.1 规范编写、交互式文档平台
  （Swagger UI/Redoc/Stoplight）、SDK 生成、示例自动测试、
  开发者门户架构、生命周期文档（设计到弃用）。
  当用户写 API 文档、建开发者门户、生成 SDK、
  做交互式文档或改进开发者接入体验时使用。
  受 wshobson/agents（38k★ MIT）启发的中文原创精简版。
---

# API Documentation — API 文档与开发者体验

用 OpenAPI 标准 + 交互式平台让 API 易用：文档驱动采用、缩短集成时间。

## 何时用

- 编写/维护 API 文档（OpenAPI 3.1）
- 建开发者门户 / 交互式文档
- 生成 SDK 与代码示例
- 契约驱动开发（API-first）
- 生命周期文档（设计到弃用）

## 1. 文档标准

- **OpenAPI 3.1+**：完整规范（路径/参数/请求/响应/schema）
- AsyncAPI：事件驱动/实时 API
- GraphQL：schema/SDL 文档
- JSON Schema：校验与文档联动
- webhook：payload 示例 + 安全说明
- **契约先行**：规范是契约，代码与文档从契约生成

## 2. 交互式平台

- Swagger UI / Redoc：快速展示与定制
- Stoplight：协作式 API 设计与文档
- Postman/Insomnia：集合生成与维护
- Docusaurus 类：自定义开发者门户
- **Try-it-now**：在线测试 + 认证处理（降低试用门槛）

## 3. 文档质量与 AI 工具

- 每个端点：用途一句话 + 示例（多语言代码示例）
- 示例**自动测试**（文档里的代码片段可运行验证）
- AI 辅助：从代码注释自动生成初稿（Mintlify/ReadMe 类），人工审校
- 一致性与术语统一（AI 一致性检查）

## 4. 开发者门户架构

- 结构：快速开始 → 指南 → API 参考 → SDK/示例 → 变更日志
- 认证说明清晰（API key/OAuth 流程带图）
- 错误码表 + 排障指南；版本与弃用策略文档化

## 5. 生命周期文档

- 设计期：契约评审 → 文档骨架
- 发布期：变更日志 + 迁移指南
- 弃用期：弃用时间表 + 替代方案 + 移除通知

## 6. 自查清单

- [ ] OpenAPI/AsyncAPI 规范完整且为单一事实源
- [ ] 交互式文档可在线试用
- [ ] 示例跨语言且自动测试通过
- [ ] 认证/错误/排障文档齐全
- [ ] 门户结构（开始→指南→参考→SDK→日志）
- [ ] 版本与弃用策略文档化

## 边界

- 规范版本差异（OpenAPI 3.0 vs 3.1），按团队栈统一。
- 文档是产品：投入与 API 采用直接相关，别当杂活。
