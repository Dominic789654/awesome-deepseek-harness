---
name: hallmark-design
description: |
  拒绝 AI 味的 UI 设计：为 brief 选宏观结构 + 21 主题之一，
  跑 57 个 slop 测试门 + 预输出自我批评，拒绝所有 LLM 训练成
  的分布默认值——不同 brief 产出不同网站而非同一模板换色。
  四动词：构建 / audit 审计（打分不改）/ redesign 重构（保留
  文案+IA+品牌）/ study 提取 DNA（从欣赏的设计抽取宏观结构/
  字体配对/颜色锚点，拒绝像素克隆）。
  当用户要不像 AI 生成的网页、审计现有界面 AI 味、重构或借鉴
  某设计时使用。受 Nutlope/hallmark（25.8k★ MIT）启发的中文
  原创精简版。
---

# Hallmark Design — 拒绝 AI 味的 UI 设计

一个"拒绝看起来像 AI 生成"的设计技能：21 主题、四个动词、
57 个 slop 测试门 + 预输出自我批评。**拒绝所有 LLM 被训练成
的分布默认值**——两个不同 brief 产出的是不同的网站，不是同一
模板换色。

## 何时用

- 构建新 UI（默认）
- 审计现有代码的 AI 味（audit）
- 重构：扔掉结构、保留文案+IA+品牌、换指纹重建（redesign）
- 从欣赏的设计提取 DNA（study）

## 1. 四动词

| 动词 | 作用 |
|------|------|
| *(默认)* | 建新 UI：选宏观结构 → 应用规则集 → 交付前跑 slop 测试 |
| `audit <target>` | 按反模式给现有代码打分，出整改清单，不改代码 |
| `redesign <target>` | 扔掉结构，保留文案+IA+品牌，用不同指纹重建 |
| `study <screenshot\|URL>` | 提取所欣赏设计的 **DNA**（宏观结构/字体配对/颜色锚点），拒绝像素克隆与付费模板；可输出便携 `design.md` 交接其他 AI 工具 |

## 2. 机制

- **21 主题**：Bubble / Distil / Cold Snap / Cinder / Ferns & Fathom /
  Hollowback / Off-Register / Press Quaternary / modern-minimal /
  atmospheric…按 brief 匹配
- **57 个 slop 测试门**：反 AI 生成反模式逐项检查
- **预输出自我批评**：交付前自审
- **Custom 模式**：brief 带目录主题装不下的创意意图时，从头设计
  （定制调色板/字体/布局，同样 57 门）
- **宏观结构打标**：每页 HTML 的 CSS 注释里盖宏观结构章

## 3. 自查清单

- [ ] 宏观结构匹配 brief（非模板套用）
- [ ] 主题选择贴合内容气质
- [ ] 57 个 slop 门跑过（交付前）
- [ ] 预输出自我批评过一遍
- [ ] study 提取 DNA（拒绝像素克隆）
- [ ] 自包含 HTML + CSS（可独立交付）

## 边界

- study 只提取 DNA 不克隆；尊重版权与模板授权。
- Custom 是安静分支：普通 brief 不会走到。
