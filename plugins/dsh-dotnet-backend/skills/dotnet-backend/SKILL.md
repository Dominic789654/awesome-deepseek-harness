---
name: dotnet-backend
description: |
  .NET 后端开发模式：Clean Architecture 分层、依赖注入生命周期、
  EF Core/Dapper 数据访问、配置（IOptions）、缓存、弹性模式与
  xUnit 测试。
  当用户写 C#/.NET Web API、评审 C# 代码、设计服务架构、
  优化 EF Core 查询或写测试时使用。
  受 wshobson/agents（38k★ MIT）启发的中文原创精简版。
---

# .NET Backend — .NET 后端开发模式

C#/.NET 生产级后端：分层架构、DI、数据访问、配置、缓存与测试。

## 何时用

- 开发新 .NET Web API / MCP 服务器
- 评审 C# 代码质量与性能
- 用依赖注入设计服务架构
- Redis 缓存策略
- 单元/集成测试
- EF Core 或 Dapper 数据访问优化
- IOptions 配置模式
- 错误处理与弹性模式

## 1. 项目结构（Clean Architecture）

```
src/
├── Domain/            # 核心业务逻辑（零依赖：实体/接口/异常/值对象）
├── Application/       # 用例、DTO、校验（服务/验证器）
├── Infrastructure/    # 外部实现（EF Core 仓储/Redis 缓存/HTTP 客户端/DI 注册）
└── Api/               # 入口（Controllers 或 Minimal API、中间件、Program.cs）
```

依赖方向：Api → Application → Domain；Infrastructure 实现接口反向注入。

## 2. 依赖注入生命周期

- **Scoped**：每 HTTP 请求一个实例（服务/仓储）
- **Singleton**：应用生命周期一个（缓存连接、配置服务）
- **Transient**：每次新实例（轻量校验器）
- 注册集中化：`AddApplicationServices(this IServiceCollection, IConfiguration)`

## 3. 数据访问

- EF Core：`AsNoTracking()` 只读查询、Include/ThenInclude 控制加载、
  批量操作用 ExecuteUpdate/ExecuteDelete；注意 N+1（用投影）
- Dapper：手写 SQL 场景高性能；参数化防注入
- 仓储在 Infrastructure 实现、Application 定义接口

## 4. 配置与缓存

- IOptions 强类型配置（`IOptions<T>` 绑定 section，校验配置）
- 缓存：Redis 分布式（Singleton 连接复用）+ 内存缓存分层
- 缓存键规范 + 失效策略（TTL/主动失效）

## 5. 弹性与错误

- 外部调用加弹性：Polly 重试/熔断/超时（幂等重试）
- 全局异常处理中间件：统一错误结构 + 日志
- async/await 全链路（避免 .Result 阻塞）

## 6. 测试（xUnit）

- 单元：纯逻辑 + mock 依赖（Moq/NSubstitute）
- 集成：真实 DB（Testcontainers）或 EF InMemory
- Web 测试：WebApplicationFactory 端到端

## 7. 自查清单

- [ ] 分层依赖方向正确（Domain 零依赖）
- [ ] DI 生命周期选型正确
- [ ] 查询无 N+1、只读用 AsNoTracking
- [ ] IOptions 配置 + 校验
- [ ] 缓存键/失效策略规范
- [ ] 弹性（重试/熔断）+ 统一错误处理
- [ ] 单元/集成测试覆盖关键路径

## 边界

- .NET 版本差异（.NET 8/9 特性），按目标框架。
- Minimal API vs Controllers 按团队习惯；架构纪律本身一致。
