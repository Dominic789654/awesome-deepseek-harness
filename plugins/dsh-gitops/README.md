# dsh-gitops

GitOps 工作流：声明式基础设施、Git 即真源、持续协调、渐进式交付
（ArgoCD/Flux）、安全检查。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 kubernetes-operations/gitops-workflow 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-gitops
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-gitops
# 重启 dsh web 生效
```

## 使用

对 agent 说"搭 GitOps / 声明式部署"，`gitops` 技能输出
仓库结构 + 工具选型 + 接入流程 + 安全检查。

## 结构

```
dsh-gitops/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/gitops/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
