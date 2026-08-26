---
name: frontend-design
description: |
  Design and build high-quality, accessible, responsive web frontends.
  Use when the user asks to create, redesign, or improve a web page or UI —
  "做一个页面", "设计一个界面", "美化这个前端", "build a landing page",
  "design a dashboard" — or when visual quality matters for the result.
---

# Frontend Design — 前端设计

高质量前端 = 先想清楚"为什么"，再谈"怎么画"。本技能给出设计与实现的工作流与
质量标准。改编自 Anthropic 官方 frontend-design（Apache-2.0）。

## 1. 设计思考（动手前）

- 明确目标：这个页面/界面要达成什么（转化？信息传达？工具效率？）。
- 明确用户：谁在用、在什么设备/场景用、有什么约束（公司风格、品牌色、可访问性要求）。
- 明确内容：真实文案与数据，而不是占位符堆砌；数据驱动布局。
- 明确约束：技术栈（HTML/CSS/JS、框架）、可用图标/字体、交付形态（单文件/组件）。

## 2. 视觉设计原则

- **层级（Hierarchy）**：一次只有一个主角。用尺寸、粗细、颜色对比建立 主→次→辅 的阅读顺序；标题、正文、辅助信息一目了然。
- **布局（Layout）**：网格对齐；留白（whitespace）是设计的一部分，宁可空不可挤；重要操作放在视线路径上（F 型/Z 型）。
- **配色（Color）**：克制。主色 1 个 + 中性色若干 + 强调色 1 个；确保文本对比度 ≥ WCAG AA（正文 ≥ 4.5:1，大字 ≥ 3:1）；不要只靠颜色传达状态。
- **字体（Typography）**：正文 14-16px，行高 1.5-1.6；标题层级清晰；中文字体栈（系统字体回退）；数字用等宽数字更整齐。
- **间距（Spacing）**：用 4px/8px 基准的间距系统，保持一致；组件内距与外距分层。
- **动效（Motion）**：克制、短（150-300ms）、有目的（反馈/过渡）；尊重 `prefers-reduced-motion`。

## 3. 组件与交互

- 用成熟模式（按钮、输入、卡片、表格、弹窗）而不是发明新组件。
- 每个交互状态都要定义：默认 / hover / focus / active / disabled / 错误。
- 表单：清晰的 label、校验信息、错误提示与修复建议；键盘可操作。
- 空状态、加载状态、错误状态都要设计，不只是"理想状态"。

## 4. 响应式与无障碍

- 移动优先：先窄屏布局，再媒体查询增强；触控目标 ≥ 44px。
- 语义化 HTML（header/nav/main/article/aside/footer）；alt 文本；表单 label 关联。
- 键盘可达：焦点可见（focus ring）、Tab 顺序自然、无键盘陷阱。
- 不要禁用缩放；文字可调整。

## 5. 实现与交付

- 先给结构（HTML 骨架/组件树），再给样式；样式优先用设计 token（CSS 变量）。
- 交付时自查清单：层级清晰？对比度达标？响应式 320/768/1280 三档？键盘可用？
- 做完主动说明设计决策：为什么这样布局/配色，用户可据此调整。

## 参考

- [references/design-checklist.md](references/design-checklist.md) — 交付前自查清单
