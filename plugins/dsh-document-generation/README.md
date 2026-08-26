# dsh-document-generation

DSH（DeepSeek Harness）技能插件：**Office 文档生成**。

Word（.docx/.dotx 创建/编辑/读取，docx-js 陷阱清单）与 Excel（openpyxl/pandas、公式零错误、recalc 重算验证、严格按规格）的生产级生成与编辑。受 [Anthropic 官方 skills](https://github.com/anthropics/skills) 的 docx/xlsx（Apache-2.0）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-document-generation
```

## 触发方式

描述中包含"Word 文档 / docx / 电子表格 / xlsx / 生成报表 / 表格文件 / 清洗数据"等关键词时自动触发。

## 能力

- docx-js 陷阱清单（尺寸/表格/底纹/列表）
- 渲染验证（PDF→图片→检查）
- Excel 公式纪律（零错误/不硬编码）
- recalc 重算与现有文件约定匹配

## 许可

MIT
