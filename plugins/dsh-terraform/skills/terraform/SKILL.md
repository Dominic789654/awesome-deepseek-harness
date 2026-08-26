---
name: terraform
description: |
  Terraform 模块库：模块设计、变量/输出约定、版本管理、IaC 最佳实践
  （计划评审/状态管理/安全）。当用户说"写 Terraform"、"搭 IaC"、
  "模块怎么设计"、"terraform 最佳实践"时使用。受 wshobson/agents
  （38k★ MIT）启发的中文原创精简版。
---

# Terraform — Terraform 模块库

用 Terraform 管理基础设施即代码（IaC）：模块化、可复用、可评审、可回滚。

## 何时用

- 编写/组织 Terraform 配置
- 设计可复用模块
- 基础设施代码化
- 评审 IaC 变更

## 1. 模块设计

- **模块 = 可复用单元**：一个模块管一件事（一个 VPC、一个数据库、一个集群）。
- **目录结构**（标准约定）：

```
modules/
└── <module-name>/
    ├── main.tf        # 资源定义
    ├── variables.tf   # 输入变量
    ├── outputs.tf     # 输出
    └── README.md      # 用法/输入输出说明
```

- 模块接口（变量/输出）是契约：命名清晰、默认值合理、必填显式。

## 2. 变量与输出约定

- **变量**：声明类型与描述；敏感值（密钥）标记 `sensitive`，走变量注入
  不硬编码。
- **输出**：暴露必要信息（ID/端点/ARN），供上层引用。
- 标签（tags）统一（团队约定：环境/项目/owner）。

## 3. 版本管理

- 模块版本化（tag/registry），引用固定版本不漂移。
- provider/terraform 版本约束明确（`required_version`）。
- 状态（state）用远端（S3/GCS/云）+ 锁定（防并发冲突）。
- 敏感状态加密（state 含密钥时）。

## 4. IaC 最佳实践

- **计划评审**：每次 `terraform plan` 输出人工评审（尤其 destroy 操作）。
- **变更审批**：apply 前评审（CI/PR 集成）。
- **最小变更**：一次改一处资源组，diff 可读。
- **幂等**：配置声明期望状态，反复 apply 结果一致。
- **删除谨慎**：`destroy` 高风险，走审批（参考 deprecation 思路）。

## 5. 安全

- 密钥不入代码/state 明文（用 Secret 管理/变量注入）。
- 权限最小化：运行 Terraform 的凭据只给所需资源权限。
- 政策检查（OPA/sentinel）可选：合规门槛自动化。

## 自查清单

- [ ] 模块单一职责、接口清晰
- [ ] 变量有类型/描述，敏感值标记
- [ ] 版本约束明确、state 远端+锁定
- [ ] plan 有人工评审环节
- [ ] 无硬编码密钥
- [ ] 标签统一

## 边界

- 具体 provider（AWS/Azure/GCP/阿里云）语法按云平台。
- 已有团队 Terraform 约定（目录/模块风格）优先遵循。
