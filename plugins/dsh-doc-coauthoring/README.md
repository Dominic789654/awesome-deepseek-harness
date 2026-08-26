# dsh-doc-coauthoring

DSH（DeepSeek Harness）技能插件：**文档协作撰写**。

三阶段协同创作：上下文收集（元上下文五问/模板/信息倾倒）→ 细化与结构（逐节头脑风暴）→ 读者测试（无上下文新会话测盲区）。受 [Anthropic 官方 skills](https://github.com/anthropics/skills) 的 doc-coauthoring（Apache-2.0）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-doc-coauthoring
```

## 触发方式

描述中包含"写文档 / 起草提案 / 技术规格 / 决策文档 / PRD / RFC / 协作写作"等关键词时自动触发。

## 能力

- 元上下文五问
- 逐节细化与结构服务读者
- 新会话冷启动读者测试
- 图片 alt-text 检查

## 许可

MIT
