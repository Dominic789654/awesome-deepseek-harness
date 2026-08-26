---
name: brand-design
description: |
  品牌设计系统：打字回车拿到能交付的设计——品牌资产协议 5 步
  硬流程（问→搜官方品牌页→下载资产→grep 色值绝不从记忆猜→
  固化 brand-spec.md）、设计方向顾问（三套逻辑并行 subagent：
  秒数轮盘/现实参照获奖站/最佳设计师哲学，直接出 3 版真实视觉）、
  Junior Designer 工作流（先 assumptions+placeholders 尽早 show）、
  反 AI slop 规则、5 维度专家评审（雷达图+Keep/Fix/Quick Wins）。
  当用户要做品牌化设计/原型/PPT/信息图/动画/设计评审时使用。
  受 alchaincyf/huashu-design（23k★ MIT）启发的中文原创精简版。
---

# Brand Design — 品牌设计系统

「打字。回车。一份能交付的设计。」给 agent 你的品牌资产
（logo、色板、UI 截图），它读懂品牌气质；什么都不给，
三套逻辑顾问 + 60 种 HTML 原生风格库兜底到不出 AI slop。

## 何时用

- 涉及具体品牌的设计（Stripe / Linear / 自家公司…）
- 交互原型（App/Web，真 iPhone bezel 可点击）
- 演讲幻灯片（HTML deck + 可编辑 PPTX）
- 时间轴动画（MP4/GIF/BGM）、信息图、设计变体
- 需求模糊时的设计方向选择

## 1. 品牌资产协议（最硬的规则，涉及品牌强制执行）

| 步骤 | 动作 | 目的 |
|------|------|------|
| 1 · 问 | 用户有 brand guidelines 吗？ | 尊重已有资源 |
| 2 · 搜官方品牌页 | `<brand>.com/brand` · `brand.<brand>.com` · `<brand>.com/press` | 抓权威色值 |
| 3 · 下载资产 | SVG → 官网 HTML 全文 → 产品截图取色 | 三条兜底，失败立刻走下一条 |
| 4 · grep 提取色值 | 抓所有 `#xxxxxx` 按频率排序，过滤黑白灰 | **绝不从记忆猜品牌色** |
| 5 · 固化 spec | 写 `brand-spec.md` + CSS 变量，HTML 引用 `var(--brand-*)` | 不固化就会忘 |

## 2. 设计方向顾问（需求模糊时触发）

- 先对话澄清 + 主动索要参考（名字/logo/品牌色/喜欢站）
- 取齐内容必需的真图（公共领域/免版权）再开工
- **三套互补逻辑并行 subagent**，各出一版真实视觉：
  ① 秒数轮盘（`date +%S` 20 选 1，打破偷选极简的惯性）
  ② 现实参照（世界级获奖网站/PPT/iOS 原型迁移）
  ③ 最佳设计师（预算无上限时最适合的工作室哲学）
- **绝不让你没看到视觉就盲选风格**——三版摆出来看着选
- 底层 60 种 HTML 原生风格库（网页 20 + PPT 20 + 信息图 20，
  按大胆/中性/安静分级，纯 CSS 无需生图）

## 3. Junior Designer 工作流（默认模式）

1. 开工前 show 问题清单，等批量答完再动手
2. HTML 里先写 assumptions + placeholders + reasoning comments
3. 尽早 show（哪怕只是灰色方块）——理解错了早改比晚改便宜 100 倍
4. 填充实际内容 → variations → Tweaks 三步分别再 show 一次
5. 交付前用 Playwright 肉眼过一遍浏览器

## 4. 反 AI slop 规则

避免一眼 AI 的视觉最大公约数：紫渐变 / emoji 图标 / 圆角+左 border
accent / SVG 画人脸 / Inter 做 display。用 `text-wrap: pretty` +
CSS Grid + 精心选择的 serif display 和 oklch 色彩。

## 5. 5 维度专家评审

哲学一致性 · 视觉层级 · 细节执行 · 功能性 · 创新性 各 0-10 分 ·
雷达图可视化 · 输出 Keep / Fix / Quick Wins 可操作清单。

## 6. 自查清单

- [ ] 品牌协议 5 步走完（色值 grep 提取，不猜）
- [ ] brand-spec.md 固化 + var(--brand-*) 引用
- [ ] 模糊需求走方向顾问（3 版真实视觉再选）
- [ ] Junior Designer 流程（早 show、assumptions 写明）
- [ ] 反 AI slop 自查（无紫渐变/emoji 图标堆砌）
- [ ] 5 维度评审 + Playwright 过一遍

## 边界

- 品牌色绝不从记忆猜——以资产 grep 为准。
- 风格库是弹药不是教条；内容驱动选择。
