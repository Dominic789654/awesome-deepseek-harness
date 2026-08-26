# dsh-pdf-processing

DSH（DeepSeek Harness）技能插件：**PDF 处理**。

读取/提取文本表格、合并拆分、旋转、加水印、创建新 PDF、填表单、加解密、提取图片、扫描件 OCR（pypdf/pdfplumber/reportlab）。受 [Anthropic 官方 skills](https://github.com/anthropics/skills) 的 pdf（Apache-2.0）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-pdf-processing
```

## 触发方式

描述中包含"PDF / 提取文本 / 合并 PDF / 拆分 / 表单 / 加水印 / OCR / 加密"等关键词时自动触发。

## 能力

- pypdf 基础操作（读/写/加密）
- 表格提取与 OCR
- reportlab 创建与表单填写
- 备份与输出验证纪律

## 许可

MIT
