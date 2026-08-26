# dsh-codebase-scanner

DSH（DeepSeek Harness）技能插件：**代码库扫描**。

扫描项目生成 project-doc.md（Tech Stack/依赖/架构/目录/代码风格/数据架构/横切关注点）与 AGENTS.md，首次全量 + 增量 delta 扫描检测漂移，供下游 agent 使用的准确项目文档。受 [wshobson/agents](https://github.com/wshobson/agents) 的 ship-mate scan（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-codebase-scanner
```

## 触发方式

描述中包含"扫描代码库 / 生成项目文档 / AGENTS.md / 架构变更 / 文档漂移 / 新仓库引导"等关键词时自动触发。

## 能力

- 全量/增量扫描模式判定
- 项目文档九章节结构
- 上下文保护（大输出沙箱化）
- 漂移检测与 AGENTS.md 人工确认

## 许可

MIT
