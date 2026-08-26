---
name: gitops
description: |
  GitOps 工作流：声明式基础设施、Git 即真源、持续协调、渐进式交付
  （ArgoCD/Flux）。当用户说"搭 GitOps"、"声明式部署"、"K8s 自动部署"、
  "ArgoCD/Flux"、"基础设施即代码"时使用。受 wshobson/agents
  （38k★ MIT）启发的中文原创精简版。
---

# GitOps — GitOps 工作流

用 Git 作为声明式基础设施的**唯一真源**，自动化 K8s 持续交付。
遵循 OpenGitOps 原则。

## 核心原则

- **声明式**：期望状态写进 Git（manifest/Helm values），不手改集群。
- **Git 即真源**：集群状态持续向 Git 收敛；Git 里的就是权威。
- **自动协调**：工具（ArgoCD/Flux）持续对比 Git 与集群，漂移即修正。
- **可审计**：一切变更可追溯（谁、何时、为什么——走 PR）。
- **可回滚**：回滚 = revert Git 提交（集群自动跟随）。

## 何时用

- 为 K8s 集群搭建 GitOps
- 从 Git 自动化应用部署
- 实施渐进式交付
- 管理多集群部署
- 配置自动同步策略

## 落地步骤

### 1. 仓库结构（推荐）

```
gitops-repo/
├── apps/            # 应用清单（每应用一个目录）
│   └── myapp/
│       ├── deployment.yaml
│       ├── service.yaml
│       └── kustomization.yaml / values.yaml
├── infra/           # 基础设施（ingress/命名空间/策略）
└── envs/            # 环境覆盖（dev/staging/prod）
```

### 2. 选择工具

- **ArgoCD**：UI 友好、多集群、App of Apps 模式。
- **Flux**：GitOps Toolkit、可组合、与 Git 深度集成。
- 按团队熟悉度与规模选一，不混用。

### 3. 接入流程

1. 安装工具到集群（或托管版）。
2. 配置 Git 仓库连接（凭据最小权限，走 Secret 管理）。
3. 定义 Application/同步策略：
   - 自动同步（推荐）+ 自愈（漂移自动修正）。
   - 手动同步（严格审批场景）。
4. 应用入库 → 首次同步 → 验证。

### 4. 渐进式交付

- 走 PR：应用变更先 PR → 评审 → 合并 → 自动部署。
- 结合 canary/blue-green（工具支持时）。
- 部署失败 → 快速 revert PR（回滚）。

## 安全检查

- Git 仓库权限：写权限仅限可信（PR 评审）。
- 密钥不进 Git：用 SealedSecrets/External Secrets/云 KMS。
- 同步权限最小化：工具只操作声明内的资源。
- 审计：启动作业/变更事件留痕。

## 边界

- 工具具体配置（ArgoCD/Flux）按版本与集群环境。
- GitOps 管"声明式基础设施"；有状态/数据迁移仍需谨慎流程。
