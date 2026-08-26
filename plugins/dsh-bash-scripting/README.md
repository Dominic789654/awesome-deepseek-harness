# dsh-bash-scripting

Bash 脚本防御模式：set -euo pipefail、参数校验、错误处理、可调试性、
安全注意、结构与风格。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 shell-scripting/bash-defensive-patterns 技能启发，改编为 DSH
中文原创精简版。

## 安装

```sh
dsh plugin --profile web add dsh-bash-scripting
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-bash-scripting
# 重启 dsh web 生效
```

## 使用

对 agent 说"写个 shell 脚本 / 帮我加固这个脚本"，
`bash-scripting` 技能按防御基线 → 校验 → 错误处理 → 调试 → 安全输出。

## 结构

```
dsh-bash-scripting/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/bash-scripting/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
