# dsh-skill-seekers

DSH（DeepSeek Harness）技能插件：**技能数据层**。

把 18 种来源（文档站/GitHub 仓库/PDF/视频/Notebook/维基/聊天导出…）转成结构化知识资产，导出到 22 种目标（Claude/Gemini/OpenAI skills、RAG 管道、编码助手）；AI 驱动项目扫描（读 manifest/README/Dockerfile/源码 import 自动生成每框架配置）。受 [yusufkaraaslan/Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers)（14k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-skill-seekers
```

## 触发方式

描述中包含"文档转技能 / 知识资产 / 数据层 / 爬文档站 / 项目扫描 / 打包成 skill"等关键词时自动触发。

## 能力

- 18 种来源 → 结构化提取
- 22 种目标导出（skills/RAG/编码助手）
- AI 驱动项目扫描（每框架一个配置）
- 可选 AI 增强（指定 agent）
- 社区注册表复用配置

## 许可

MIT
