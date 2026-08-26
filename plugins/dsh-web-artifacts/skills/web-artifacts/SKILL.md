---
name: web-artifacts
description: |
  交互式 Web 组件构建：React 18 + TS + Tailwind + shadcn/ui 搭建
  多组件 HTML 制品——初始化项目、开发、打包单文件、展示；
  防 AI slop 设计准则（避免居中滥用/紫渐变/统一圆角/Inter 字体）。
  当用户要复杂的交互式 HTML 应用/仪表盘/工具组件（非简单单文件）时使用。
  受 Anthropic 官方 skills 的 web-artifacts-builder（Apache-2.0）
  启发的中文原创精简版。
---

# Web Artifacts — 交互式 Web 组件构建

用现代前端技术构建精细的多组件 HTML 制品：React + Tailwind + shadcn/ui。

## 何时用

- 复杂制品：需要状态管理、路由或 shadcn/ui 组件
- 仪表盘/工具/交互式应用
- **不适用**：简单单文件 HTML/JSX 制品

## 1. 工作流

1. **初始化**：脚手架 React 项目（React+TS+Vite、Tailwind + shadcn 主题、
   路径别名、40+ shadcn 组件预装、Parcel 打包配置）
2. **开发**：编辑生成代码
3. **打包**：所有代码打包成**单个 HTML 文件**
4. **展示**给用户
5. **（可选）测试**制品

## 2. 防 AI slop 设计准则

避免这些"AI 味"特征：
- 过度居中布局
- 紫色渐变滥用
- 千篇一律的统一圆角
- Inter 字体标配

替代：克制的视觉系统、有意的布局节奏、匹配内容的色彩与字体。

## 3. 工程要点

- 组件化：shadcn/ui 组件按需用（不重复造）
- 状态管理清晰（复杂交互才需要，别过度）
- 单文件打包：注意体积（懒加载/按需引入）
- 响应式与可访问性（制品要在各种环境可用）

## 4. 自查清单

- [ ] 初始化脚手架完成（React+TS+Tailwind+shadcn）
- [ ] 组件复用（shadcn 预装）
- [ ] 已打包为单个 HTML 文件
- [ ] 无 AI slop 特征（居中/紫渐变/统一圆角/Inter）
- [ ] 状态管理按需（不过度）
- [ ] 响应式 + 可访问性

## 边界

- 简单制品别用重栈：单文件 HTML 直接写。
- 与前端工程互补：本技能聚焦单文件制品打包工作流。
