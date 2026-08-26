---
name: kubernetes-operations
description: |
  Kubernetes 运维：Helm Chart 脚手架与模板化部署、
  K8s 安全策略（NetworkPolicy/Pod Security Standards/RBAC）、
  清单生成、多环境部署与排障。
  当用户写 Helm Chart、加固集群安全、做网络隔离、
  生成 K8s 清单或排障部署失败时使用。
  受 wshobson/agents（38k★ MIT）启发的中文原创精简版。
---

# Kubernetes Operations — Kubernetes 运维

Helm 模板化部署 + 纵深防御安全策略：可复用、可审计、可排障。

## 何时用

- 从零创建 Helm Chart
- 打包/分发 Kubernetes 应用
- 多环境部署管理
- 实现网络分段（NetworkPolicy）
- 配置 Pod 安全标准 / RBAC 最小权限
- 加固多租户集群

## 1. Helm Chart 脚手架

**要点**：
- Chart 与 app 版本用语义化版本
- values.yaml 全量文档化（注释说明每个值）
- 重复逻辑用 template helpers（`_helpers.tpl`）
- 打包前验证（`helm lint` / `helm template --debug`）
- 依赖版本显式 pin；可选资源用 conditions
- 命名规范（小写、连字符）；含 NOTES.txt 使用说明
- labels 统一用 helpers 生成；所有环境都测安装

**排障**：
- 模板渲染错误：`helm template my-app ./my-app --debug`
- 依赖问题：`helm dependency update` / `helm dependency list`
- 安装失败：`helm install ... --dry-run --debug` + `kubectl get events --sort-by='.lastTimestamp'`

## 2. K8s 安全策略（纵深防御）

**Pod 安全标准**（按命名空间标签强制）：
- privileged（不限制）/ baseline（最小限制）/ **restricted（最严格，生产默认）**
- 标签：`pod-security.kubernetes.io/enforce: restricted`

**NetworkPolicy**：默认拒绝 + 显式放行（按标签选择器定义
入/出站规则）；命名空间间隔离。

**RBAC**：最小权限（ServiceAccount 按需授权）；避免集群级
admin 滥用；定期审计角色绑定。

**其他**：镜像来源校验（签名/私有仓库）、准入控制
（Admission Controller）、多租户隔离（namespace + quota + 策略）。

## 3. 自查清单

- [ ] Chart 结构规范、values 全文档化、helpers 复用
- [ ] 依赖 pin 版本、打包前 lint/template 验证
- [ ] 生产命名空间 enforce restricted
- [ ] NetworkPolicy 默认拒绝 + 显式放行
- [ ] RBAC 最小权限、角色绑定定期审计
- [ ] 多环境安装已验证 + 部署失败有排障路径

## 边界

- K8s 版本/发行版差异（PodSecurityPolicy 已废弃 → Pod Security Standards），按当前版本。
- 安全是分层工程：策略之外还有镜像、运行时、审计日志。
