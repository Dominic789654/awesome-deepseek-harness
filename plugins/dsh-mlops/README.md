# dsh-mlops

ML 管线工作流：数据→训练→评估→注册→部署→监控的 MLOps 工程，
可复现、可回归、可回滚。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 machine-learning-ops/ml-pipeline-workflow 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-mlops
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-mlops
# 重启 dsh web 生效
```

## 使用

对 agent 说"搭 ML 管线 / 模型怎么上线"，`mlops` 技能输出
管线全流程 + 工程纪律 + 交付清单。

## 结构

```
dsh-mlops/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/mlops/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
