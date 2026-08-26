---
name: pptx-engineering
description: |
  PPTX 工程：创建/编辑/分析演示文稿——pptxgenjs 陷阱清单
  （布局尺寸/hex 颜色/阴影偏移/列表/图表原生）、
  编辑用 unzip-edit-zip、读取用 markitdown/缩略图、
  验证脚本（schema/关系/内容类型/图表检查）。
  当用户创建/读取/编辑 .pptx/.potx 演示文稿时使用。
  受 Anthropic 官方 skills 的 pptx（Apache-2.0）启发的中文原创精简版。
---

# PPTX Engineering — PPTX 工程

.pptx 是 ZIP 包裹的 XML。按任务选方法：创建 → pptxgenjs 脚本；
编辑/模板 → unzip 改 XML 再 zip；读取 → markitdown + 缩略图网格。

## 何时用

- 创建/编辑演示文稿（deck/幻灯片/汇报）
- 读取/提取 .pptx 内容（用于摘要等）
- 合并/拆分幻灯片、处理模板/布局/演讲者备注

## 1. pptxgenjs 陷阱清单

- 先设 `pres.layout`（默认 LAYOUT_16x9 = 10"×5.625"，
  坐标越界不会被截断而是直接不在幻灯片上）
- **Hex 颜色永不加 `#`、永不用 8 位**（`"FF0000"`；`#` 或
  带 alpha 会**损坏文件**）；半透明用 `transparency: 0-100`
- pptxgenjs **原地修改**选项对象（首次使用转 EMU）——
  每次 add* 调用新建 shadow/options 对象
- 阴影 `offset` 必须 ≥0（负值损坏文件）；向上阴影用 `angle: 270`
- `letterSpacing` 被静默忽略——真选项是 `charSpacing`
- 列表：每项 `bullet: true`，绝不字面 `•`（双子弹）；
  数组项除最后都设 `breakLine: true`；段间距用 `paraSpaceAfter`
- 每输出文件一个 `new pptxgen()`；`rectRadius` 只对
  ROUNDED_RECTANGLE 有效；不支持渐变填充（用渐变图做背景）
- 文本框有内边距：要对齐设 `margin: 0`
- 演讲者备注用 `slide.addNotes()`（纯文本，每页一次）
- **图表用原生 `addChart()`**（PowerPoint 能画的全用图表对象，
  不用渲染图；Sankey/网络图等原生没有的才用图）
- 默认图表很裸：设标题/数据标签/配色/坐标轴样式

## 2. 编辑与验证

- 编辑：unzip → 改 `ppt/slides/slideN.xml` → zip；
  复制幻灯片用辅助脚本（含包簿记）；清理无引用资源
- 验证：schema/关系/内容类型/图表检查脚本，每个失败点名修复；
  模板派生的 deck 传 `--original` 基线化（模板自身 XSD 错误不算你的）
- 渲染检查：LibreOffice 转 PDF 查看

## 3. 自查清单

- [ ] 陷阱清单过一遍（布局/hex/阴影/列表/图表）
- [ ] 每次 add* 新建选项对象
- [ ] 图表用原生 addChart 并美化
- [ ] 编辑走 unzip-edit-zip + 清理
- [ ] 验证脚本跑过（含 --original 基线）
- [ ] 渲染 PDF 目检

## 边界

- 与演示内容设计（ppt-creator）互补：本技能是文件工程层。
- 工具预装（pptxgenjs）：先直接用，缺了再装。
