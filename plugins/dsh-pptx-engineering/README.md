# dsh-pptx-engineering

DSH（DeepSeek Harness）技能插件：**PPTX 工程**。

创建/编辑/分析演示文稿：pptxgenjs 陷阱清单（布局/hex 颜色/阴影/列表/原生图表）、unzip-edit-zip 编辑流程、markitdown/缩略图读取、schema 验证脚本。受 [Anthropic 官方 skills](https://github.com/anthropics/skills) 的 pptx（Apache-2.0）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-pptx-engineering
```

## 触发方式

描述中包含"PPTX / 幻灯片 / 演示文稿 / deck / 编辑 PPT / 图表"等关键词时自动触发。

## 能力

- pptxgenjs 陷阱清单
- 原生图表与美化
- unzip-edit-zip 编辑与清理
- schema 验证 + 渲染目检

## 许可

MIT
