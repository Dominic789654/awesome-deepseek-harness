# dsh-llm-eval

LLM 评估：忠实度/相关性/正确性/完整性维度、测试集构建、幻觉专项检测、
回归守护。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 llm-application-dev/llm-evaluation 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-llm-eval
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-llm-eval
# 重启 dsh web 生效
```

## 使用

对 agent 说"评估这个 LLM 应用 / 检测幻觉"，`llm-eval` 技能输出
评估报告（维度/测试集/通过率/失败模式）。

## 结构

```
dsh-llm-eval/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/llm-eval/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
