---
name: api-scaffolding
description: |
  API 脚手架（FastAPI）：生产级项目结构（api/core/models/schemas/
  services 分层）、异步模式、依赖注入、Pydantic 校验、
  认证与错误处理、测试与部署。
  当用户新建 FastAPI 项目、搭 Python 后端 API 或
  微服务时使用。受 wshobson/agents（38k★ MIT）启发的中文原创精简版。
---

# API Scaffolding — FastAPI 项目脚手架

生产级 FastAPI 模板：清晰分层、异步、DI、校验、测试一步到位。

## 何时用

- 从零建 FastAPI 项目
- 用 Python 实现异步 REST API
- 构建高性能 Web 服务/微服务
- PostgreSQL/MongoDB 异步应用
- 规范项目结构与测试

## 1. 项目结构

```
app/
├── api/            # 路由（v1/endpoints/ 按资源分文件，router 聚合）
│   └── dependencies.py   # 共享依赖（DI）
├── core/           # 核心配置（config/security/database）
├── models/         # 数据库模型
├── schemas/        # Pydantic 校验 schema
├── services/       # 业务逻辑（user_service 等）
└── main.py         # 入口
```

分层：路由薄（只接线）→ 服务层放业务 → 模型/schema 分离（请求/响应独立）。

## 2. 关键实践

- **异步全链路**：async def 路由 + async DB 驱动（asyncpg/motor），
  不阻塞事件循环
- **依赖注入**：FastAPI Depends 统一（认证/DB 会话/权限），可测试
- **Pydantic**：请求/响应 schema 校验（类型/必填/约束）；响应模型过滤泄露字段
- **认证**：OAuth2/JWT（密码哈希、token 过期、scope）
- **错误处理**：统一异常 → HTTP 状态码与错误结构；全局 handler
- **配置**：pydantic-settings 环境变量管理（密钥不落码）

## 3. 测试与部署

- pytest + httpx AsyncClient（覆盖正常/错误/认证路径）
- 迁移（Alembic）管理 schema；启动前跑迁移
- 部署：Uvicorn 多 worker + 反向代理；健康检查端点

## 4. 自查清单

- [ ] 分层清晰（api/core/models/schemas/services）
- [ ] 异步全链路无阻塞调用
- [ ] Depends 统一 DI、可测试
- [ ] Pydantic 校验 + 响应模型
- [ ] 统一错误结构与全局 handler
- [ ] pytest 覆盖 + Alembic 迁移 + 健康检查

## 边界

- FastAPI 版本差异（Pydantic v1/v2），按版本写法。
- 模板是起点：按业务裁剪分层深度，别过度设计。
