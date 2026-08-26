---
name: office-cli
description: |
  为 AI agent 设计的 Office 套件：单二进制、无需安装 Office、
  全平台控制 Word/Excel/PowerPoint——路径选择器（/slide[1]/
  shape[1]）精确定位元素、HTML 渲染引擎给 AI 眼睛
  （render→look→fix 闭环）、live preview 实时反馈循环、
  outline/HTML/JSON 多视图、resident session 持久会话。
  当用户要让 agent 创建/读取/编辑 Office 文档时使用。
  受 iOfficeAI/OfficeCLI（28.8k★ Apache-2.0）启发的中文原创
  精简版。
---

# Office CLI — 为 AI 设计的 Office 套件

世界首个为 AI agent 设计的 Office 套件：单二进制、无 Office
安装、无依赖、随处运行。让 agent 完整控制 Word、Excel 和
PowerPoint。

## 何时用

- 让 agent 创建/读取/编辑 .docx / .xlsx / .pptx
- 生成演示文稿、文档、报表（AI 全自动）
- 需要渲染预览验证输出（AI 的眼睛）

## 1. 核心概念：渲染即眼睛

内置 HTML 渲染引擎把 Office 文档渲染成 HTML/PNG——
**render → look → fix** 闭环：agent 生成后渲染看效果，不对就修。

```
officecli create deck.pptx          # 创建
officecli watch deck.pptx           # live preview（浏览器实时）
officecli add deck.pptx / --type slide --prop title="Hello!"
officecli view deck.pptx html       # 渲染预览
officecli view deck.pptx outline    # 结构大纲
officecli get deck.pptx '/slide[1]/shape[1]' --json   # 结构化 JSON
officecli close deck.pptx           # 保存关闭（刷新 resident session）
```

## 2. 路径选择器

精确定位文档元素：`/slide[1]/shape[2]`、`/table[0]/row[3]/cell[1]`…
add / set / remove 都支持。

## 3. 关键命令模式

- `create <file>` — 创建空白文档
- `add <file> <path> --type <kind> --prop k=v` — 添加元素
  （slide/shape/paragraph/table…）
- `set <file> <path> --prop k=v` — 修改属性
- `remove <file> <path>` — 删除元素
- `view <file> outline|html|png` — 多视图查看
- `get <file> <path> --json` — 结构化提取
- `watch <file>` — live preview 实时反馈循环

## 4. 自查清单

- [ ] 用路径选择器精确定位（非全文搜索）
- [ ] 渲染验证（HTML/PNG）——不盲信成功输出
- [ ] live preview 看实时效果
- [ ] outline 检查结构完整性
- [ ] JSON 提取做程序化校验
- [ ] 结束 close 刷新 resident session

## 边界

- 无 Office 安装依赖——纯二进制自渲染。
- 复杂模板/宏场景需专项处理；本技能面向常规文档自动化。
