---
name: document-generation
description: |
  Office 文档生成：Word（.docx/.dotx 创建/编辑/读取，docx-js 陷阱清单）
  与 Excel（.xlsx 创建/编辑/清洗，openpyxl/pandas、公式零错误、
  重算验证）、文档渲染验证。
  当用户要生成/编辑 Word 文档、报表、模板、信函，
  或处理/生成电子表格文件时使用。
  受 Anthropic 官方 skills 的 docx/xlsx（Apache-2.0）启发的中文原创精简版。
---

# Document Generation — Office 文档生成

Word 与 Excel 文件的生产级生成与编辑：选对工具、避开陷阱、验证输出。

## 何时用

- 创建/读取/编辑 .docx/.dotx（Word 文档/模板）
- 报表/备忘录/信函/模板交付为 Word
- 打开/读取/编辑/修复 .xlsx/.csv/.tsv（加列/公式/格式/图表/清洗）
- 从零建电子表格或从数据源生成
- 表格格式互转

**不适用**：交付物是 PDF/HTML 报告/独立脚本/数据库管线/Google Sheets API。

## 1. Word（docx-js）要点

按任务选法：**创建** → docx 脚本；**编辑** → unzip 改
`word/document.xml` 再 zip（docx-js 打不开现有文件）；
**读取** → `pandoc -t markdown file.docx`。

陷阱清单：
- 页面默认 A4——US Letter 需显式尺寸（DXA，1440=1″）
- 横向：传纵向尺寸 + `orientation: LANDSCAPE`
- 表格需双宽度：table `columnWidths` + 每 cell `width`（DXA，
  PERCENTAGE 在 Google Docs 会坏）；列宽和 = 表宽
- 表格底纹用 `ShadingType.CLEAR`（SOLID 渲染成黑）
- 列表永不字面 `•`——用 numbering 配置 BULLET
- `ImageRun` 必须带 `type`；`PageBreak` 必须在 Paragraph 内
- 永不用 `\n`——用独立 Paragraph；TOC 用内置 HeadingLevel
- 不用表格做分隔线——用段落下边框
- 点线/右对齐同行：用 `PositionalTab`（RIGHT + DOT），不用字面点

**验证**：渲染成 PDF → 转图片 → 肉眼检查。

## 2. Excel（openpyxl/pandas）要点

按任务选法：**创建/编辑（带公式格式）** → openpyxl；
**批量数据** → pandas；**快速查看** → markitdown（无坐标，别据此规划编辑）；
**读模型（公式+值）** → 两次 load_workbook。

每个输出的要求：
- 全表专业字体（Arial/Times New Roman 类）
- **零公式错误**：`recalc.py` 报 errors 就修；引入的错误和继承的一样查
- **用公式不用硬编码结果**：写 `=SUM(B2:B9)`，表格要能随输入重算
- **严格按用户规格**：确切表名/列头/公式
- **文档化假设与硬编码数字**：cell 注释或表尾邻格；有真实来源就引
  （如 10-K 报告页码），来自用户的就明说
- 让别人填的模板：附"填哪些 cell"图例 + 一行真实示例；
  编辑现有文件绝不加示例行
- **编辑现有文件匹配其约定**：先找指定输入 cell（字体/填充标记），
  只写那里，公式不动

**重算（有公式必做）**：openpyxl 的公式是字符串无缓存值——
`recalc.py`（LibreOffice 重算并原地重写），检查
status/total_formulas/total_errors；`error` 键 = 没重算。

## 3. 自查清单

- [ ] Word：陷阱清单过一遍（尺寸/表格/底纹/列表/图片/换行）
- [ ] Word 输出已渲染验证
- [ ] Excel：零公式错误、用公式不硬编码
- [ ] Excel：严格按规格、假设已文档化
- [ ] 现有文件编辑匹配其约定、公式未动
- [ ] 有公式的文件已重算验证

## 边界

- 工具已预装（docx/openpyxl/pandas/markitdown）：先直接用，缺了再装。
- 用户规格优先于一切指南；不清楚就问。
