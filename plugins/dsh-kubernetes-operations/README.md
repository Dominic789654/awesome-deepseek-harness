# dsh-kubernetes-operations

DSH（DeepSeek Harness）技能插件：**Kubernetes 运维**。

Helm Chart 脚手架与模板化部署（helpers/values 文档化/依赖 pin）、K8s 安全策略（Pod Security Standards/NetworkPolicy/RBAC）、多环境部署与排障命令。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-kubernetes-operations
```

## 触发方式

描述中包含"Kubernetes / Helm / Chart / 集群安全 / NetworkPolicy / Pod 安全 / RBAC / K8s 部署"等关键词时自动触发。

## 能力

- Helm Chart 十项最佳实践与排障命令
- Pod 安全标准（privileged/baseline/restricted）
- NetworkPolicy 默认拒绝 + RBAC 最小权限
- 部署失败排障路径

## 许可

MIT
