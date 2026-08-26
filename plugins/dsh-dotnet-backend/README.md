# dsh-dotnet-backend

DSH（DeepSeek Harness）技能插件：**.NET 后端开发模式**。

Clean Architecture 分层、依赖注入生命周期（Scoped/Singleton/Transient）、EF Core/Dapper 数据访问（防 N+1）、IOptions 配置、Redis 缓存、Polly 弹性与 xUnit 测试。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-dotnet-backend
```

## 触发方式

描述中包含"C# / .NET / ASP.NET Core / EF Core / Dapper / 依赖注入 / xUnit / Web API"等关键词时自动触发。

## 能力

- Clean Architecture 分层与依赖方向
- DI 生命周期选型与集中注册
- EF Core/Dapper 查询优化（AsNoTracking/N+1）
- 配置/缓存/弹性/测试完整纪律

## 许可

MIT
