---
name: frontend-slides
description: |
  零依赖 HTML 演示文稿制作：show-don't-tell 视觉风格发现
  （生成 3 个预览让用户选，而非文字描述审美）、PPT 转网页
  （保留全部图片内容）、anti-AI-slop 精选风格（拒绝紫渐变白底
  通用 AI 审美）、bold 模板包渐进加载（先读索引再加载候选预览、
  选中后才加载完整 design.md）。
  当用户要做网页幻灯片/演示文稿/把 PPT 转网页时使用。
  受 zarazhangrui/frontend-slides（27k★）启发的中文原创精简版。
---

# Frontend Slides — 零依赖 HTML 演示文稿

帮非设计师做出好看的网页演示，不需要懂 CSS/JS。
核心是 "show, don't tell"：不让你用文字描述审美偏好，
而是生成视觉预览让你挑。

## 何时用

- 从零创建网页演示（pitch deck / 技术分享 / 周报 / 课程）
- 把现有 PowerPoint 转成网页幻灯片（保留素材）
- 用户说不清风格偏好时（视觉风格发现）

## 1. 工作流（新建演示）

1. 问清内容（slides / 消息 / 图片）
2. 生成 3 个视觉风格预览供对比（从 brief 推断 vibe，除非用户已指名风格）
3. 让用户挑视觉方向
4. 用选定风格创建完整演示
5. 浏览器打开

## 2. 工作流（转换 PPT）

1. 提取全部文字、图片、备注
2. 展示提取内容供确认
3. 让用户选视觉风格
4. 生成含全部原始素材的 HTML 演示

## 3. 风格体系

**内置预设（STYLE_PRESETS）**：
- 暗色：Bold Signal / Electric Studio / Creative Voltage / Dark Botanical
- 亮色：Notebook Tabs / Pastel Geometry / Split Pastel / Vintage Editorial
- 特殊：Neon Cyber / Terminal Green / Swiss Modern / Paper & Ink

**Bold 模板包**（34 个设计系统，如 Neo-Grid Bold / Editorial Tri-Tone /
Creative Mode / Broadside / Signal / Vellum）：
- 渐进加载：先读紧凑索引 → 加载候选的 `preview.md` 小卡 → 用户选定后
  才加载该模板完整 `design.md`
- 自定义通配：用户选 wildcard 时，把预览的 CSS/布局系统扩成整份 deck

**预览集构成**：1 个安全预设 + 至少 1 个 bold 模板 + 1 个通配选项。

## 4. 核心质量要求

- **零依赖**：单 HTML 文件、内联 CSS/JS，无 npm/构建/框架
- **Anti-AI-Slop**：精选差异风格，避免通用 AI 审美（紫渐变白底）
- **生产质量**：可访问、固定 16:9、注释良好的可定制代码
- **素材保真**：PPT 转换保留所有图片与内容

## 5. 自查清单

- [ ] 视觉风格发现（3 预览供选），非文字描述审美
- [ ] 预览集含安全预设 + bold + 通配
- [ ] 单 HTML 零依赖（无构建步骤）
- [ ] 16:9 固定 + 可访问
- [ ] 风格非通用 AI 审美（anti-slop）
- [ ] PPT 转换素材全保留

## 边界

- 面向"内容驱动"的演示；重度数据可视化/动画特效请配合专门技能。
- bold 模板包渐进加载控制上下文成本——不要一次全读。
