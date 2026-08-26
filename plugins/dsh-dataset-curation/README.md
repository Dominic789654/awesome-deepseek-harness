# dsh-dataset-curation

数据集整理：清洗、质量筛选、多样性、训练/验证拆分、标注规范。
微调效果的上限由数据决定——数据质量 > 模型技巧。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 llm-finetuning/dataset-curation 技能启发，改编为 DSH 中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-dataset-curation
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-dataset-curation
# 重启 dsh web 生效
```

## 使用

对 agent 说"整理数据集 / 准备微调数据"，`dataset-curation` 技能输出
清洗 → 质量筛选 → 多样性 → 拆分 → 标注规范 全流程。

## 结构

```
dsh-dataset-curation/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/dataset-curation/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
