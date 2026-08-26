---
name: html-ppt
description: |
  HTML PPT Studio：纯静态 HTML/CSS/JS 制作专业演示——
  36 主题（token 驱动、换一个 link 整体换肤）、31 页面布局、
  47 动画（27 CSS + 20 canvas FX）、15 全套模板、演讲者模式
  （S 键四磁吸卡：当前页/下一页/逐字稿/计时器，BroadcastChannel
  同步）、键盘导航与 ?preview=N 单页预览。零构建步骤。
  当用户要做 HTML 演示/幻灯片/演讲 deck/小红书图文时使用。
  受 lewislulu/html-ppt-skill（8k★ MIT）启发的中文原创精简版。
---

# HTML PPT — 专业 HTML 演示文稿

纯静态 HTML/CSS/JS 制作专业演示：36 主题 × 31 布局 × 47 动画 ×
15 全套模板 + 演讲者模式。零构建步骤，单 HTML 文件即可交付。

## 何时用

- 技术分享 / pitch deck / 周报 / 课程演示
- 需要演讲者模式（逐字稿 + 计时器）的场合
- 小红书图文（9 张 3:4）等场景化 deck
- 用户说"做一份 N 页的 slides，用 X 主题"

## 1. 核心资产

- **36 主题**：minimal-white / editorial-serif / soft-pastel / dracula /
  tokyo-night / nord / neo-brutalism / glassmorphism / cyberpunk-neon /
  vaporwave / xiaohongshu-white / pitch-deck-vc …每个是纯 CSS token 文件，
  换一个 `<link>` 整体换肤
- **31 布局**：cover / toc / section-divider / two-column / three-column /
  big-quote / stat-highlight / kpi-grid / table / code / diff / terminal /
  flow-diagram / timeline / roadmap / mindmap / comparison / pros-cons /
  gantt / chart-* / arch-diagram / process-steps / cta / thanks…
- **47 动画**：27 CSS（rise-in / glitch-in / typewriter / card-flip-3d /
  kenburns / spotlight…）+ 20 canvas FX（particle-burst / confetti /
  knowledge-graph / neural-net / matrix-rain / word-cascade…，
  `[data-fx]` 进页自动初始化）
- **15 全套模板**：真实 deck 提取（小红书白底杂志风 / 终端 cyberpunk /
  蓝图架构风 / 警示风）+ 场景模板（pitch-deck / product-launch /
  tech-sharing / weekly-report / xhs-post / course-module /
  presenter-mode-reveal 逐字稿全配）

## 2. 演讲者模式（S 键）

- 四张可拖拽磁吸卡：当前页 / 下一页预览 / 逐字稿 / 计时器
- 两窗口 BroadcastChannel 同步；`?preview=N` 单页无 chrome 渲染，
  预览与观众视角同 CSS/字体/视口，像素级一致
- 换页无刷新（postMessage 切 `.is-active`）

**逐字稿三条金律**：
1. 提示信号而非念稿——关键词加粗，过渡句单独成段
2. 每页 150-300 字（约 2-3 分钟/页节奏）
3. 像说话一样写，不是书面语

## 3. 设计哲学

- **Token 驱动**：颜色/圆角/阴影/字体全部在 base.css + 主题文件里，
  改一个变量整份 deck 优雅重排
- **iframe 隔离预览**：主题/布局/showcase 每页独立 iframe 渲染，保证真实
- **零构建**：纯静态，CDN 仅 webfonts / highlight.js / chart.js（可选）
- **资深设计师默认**：有主见的字号阶梯/间距节奏/渐变卡片，拒绝
  "Corporate PowerPoint 2006" 味
- **中英一等公民**：Noto Sans SC / Noto Serif SC 预导入

## 4. 键盘速查

```
← → Space PgUp PgDn Home End  导航
F 全屏 · S 演讲者窗口 · N 笔记抽屉 · R 重置计时器
O 总览网格 · T 循环主题（同步演讲者窗）· A 演示动画
#/N (URL) 深链到第 N 页 · ?preview=N 单页预览
```

## 5. 自查清单

- [ ] 主题选定（token 文件换肤）
- [ ] 布局覆盖内容结构（31 选型）
- [ ] 动画克制（FX 按需，不喧宾夺主）
- [ ] 逐字稿 150-300 字/页 + 提示信号
- [ ] 中英文排版正确（Noto SC 预导入）
- [ ] headless Chrome 渲染验证（56 截图基线）

## 边界

- 纯静态交付；重度数据可视化用 chart.js 或专项技能。
- 主题/模板是弹药不是教条——按内容选，不硬套。
