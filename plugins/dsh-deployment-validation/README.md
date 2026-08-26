# dsh-deployment-validation

DSH（DeepSeek Harness）技能插件：**部署验证与配置管理**。

配置分析（类型安全/一致性/安全扫描）、校验 schema 与 CI 自动化、密钥泄漏扫描、跨环境差异管理、部署后验证清单与回滚决策。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-deployment-validation
```

## 触发方式

描述中包含"验证配置 / 配置 schema / 密钥扫描 / 跨环境一致性 / 部署验证 / 配置检查"等关键词时自动触发。

## 能力

- 配置盘点与三查（类型/一致性/安全）
- 真实密钥识别与轮换
- schema 校验进 CI
- 部署后验证与回滚决策

## 许可

MIT
