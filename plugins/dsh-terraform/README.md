# dsh-terraform

Terraform 模块库：模块设计、变量/输出约定、版本管理、IaC 最佳实践
（计划评审/state 管理）、安全。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 cloud-infrastructure/terraform-module-library 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-terraform
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-terraform
# 重启 dsh web 生效
```

## 使用

对 agent 说"写 Terraform / 搭 IaC"，`terraform` 技能输出
模块结构 + 变量/输出约定 + 最佳实践清单。

## 结构

```
dsh-terraform/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/terraform/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
