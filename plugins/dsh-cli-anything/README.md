# dsh-cli-anything

DSH（DeepSeek Harness）技能插件：**让任何软件 agent 化**。

为任意软件/代码库/API 生成 agent 可用的 CLI 封装：7 阶段流水线（分析→设计→实现→测试→发布）、真实后端集成（禁止玩具实现）、`--json` 结构化输出、REPL 有状态会话 + 子命令双模式、refine 增量补全、输出验证（不轻信 exit 0）。受 [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)（48k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-cli-anything
```

## 触发方式

描述中包含"让 agent 操作软件 / 软件自动化 / CLI 封装 / 给 GUI 软件做命令行 / 统一零散 API / agent-native"等关键词时自动触发。

## 能力

- 7 阶段 CLI 生成流水线（真实后端集成）
- `--json` 输出 + REPL 双模式
- 零配置安装（`pip install -e .` 上 PATH）
- refine 增量补全（broad / focused 差距分析）
- 三层测试（单元 + E2E + 子进程验证）
- 关键教训：rendering gap、滤镜翻译、帧率精度、输出验证

## 许可

MIT
