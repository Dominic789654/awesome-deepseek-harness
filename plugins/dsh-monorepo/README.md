# dsh-monorepo

DSH（DeepSeek Harness）技能插件：**Monorepo 管理**。

用单一仓库管理多包/多项目：仓库结构、workspace 依赖管理、增量构建与缓存、CI 策略、变更集发布。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-monorepo
```

## 触发方式

描述中包含"monorepo / 多包仓库 / workspace / turborepo / nx / 怎么组织多项目"等关键词时自动触发。

## 能力

- 包/应用分层仓库结构
- workspace 协议依赖管理与版本策略
- 增量构建 + 缓存（Turborepo/Nx）
- 受影响包 CI + changeset 发布

## 许可

MIT
