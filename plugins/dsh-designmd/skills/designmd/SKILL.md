---
name: designmd
description: |
  DESIGN.md 设计系统格式：给 coding agent 的视觉身份规范——
  YAML 设计 token（颜色/字体/圆角/间距/组件）+ Markdown 设计理由、
  token 引用 {colors.primary}、lint/diff/export 工具链（Tailwind/
  DTCG）、WCAG AA 对比度检查、section 顺序与未知内容处理规则。
  当用户要建立设计系统、给前端项目写设计规范、让 agent 按
  统一视觉身份生成 UI 时使用。受 google-labs-code/design.md
  （27k★ Apache-2.0）启发的中文原创精简版。
---

# Design.md — 给 coding agent 的设计系统格式

DESIGN.md 让 agent 对设计系统有持久、结构化的理解：
YAML front matter 给 agent 精确值（tokens），Markdown 正文讲
"为什么"（rationale）。一次写入，处处一致。

## 何时用

- 建立项目设计系统（颜色/字体/间距/组件）
- 让 coding agent 按统一视觉身份生成 UI
- 设计系统版本对比与回归检测（diff）
- 把 token 导出到 Tailwind / W3C DTCG

## 1. 文件结构（两层）

1. **YAML front matter**（`---` 定界）— 机器可读设计 token（规范值）
2. **Markdown 正文**（`##` 章节）— 人类可读设计理由（应用上下文）

Token 是规范性值；正文解释如何应用。

## 2. Token Schema

```yaml
version: "alpha"          # 可选
name: Heritage
colors:
  primary: "#1A1C1E"
typography:
  h1: { fontFamily: Public Sans, fontSize: 3rem }
rounded:
  md: 8px
spacing:
  md: 16px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"   # token 引用
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.sm}"
    padding: 12px
```

- **Color**：任意 CSS 颜色（hex/rgb()/oklch()/命名色）
- **Dimension**：数字+单位（px/em/rem）
- **Token Reference**：`{path.to.token}`
- **Typography**：fontFamily/fontSize/fontWeight/lineHeight/letterSpacing…
- **组件属性**：backgroundColor/textColor/typography/rounded/padding/size/height/width
- **变体**：hover/active/pressed 用相关键名的独立组件条目

## 3. Section 顺序（可省略，出现则须按序）

1. Overview（别名 Brand & Style）
2. Colors
3. Typography
4. Layout（Layout & Spacing）
5. Elevation & Depth（Elevation）
6. Shapes
7. Components
8. Do's and Don'ts

## 4. lint / diff / export 工具链

- **lint**：结构校验——broken-ref（token 引用解析失败）、
  missing-primary、**contrast-ratio（WCAG AA ≥4.5:1）**、
  orphaned-tokens（定义了没被引用）、missing-typography、
  section-order、unknown-key（拼写错误如 colours→colors）…
- **diff**：对比两个版本，检测 token 级与 prose 级回归
  （errors/warnings delta → regression 布尔）
- **export**：`json-tailwind`（Tailwind v3 theme.extend）、
  `css-tailwind`（Tailwind v4 @theme 块）、`dtcg`（W3C Design
  Tokens Format Module）

## 5. 未知内容处理

| 场景 | 行为 |
|------|------|
| 未知 section 标题 | 保留，不报错 |
| 未知颜色/字体 token 名 | 值合法则接受 |
| 未知组件属性 | 接受 + 警告 |
| 重复 section 标题 | 报错，拒绝文件 |

## 6. 自查清单

- [ ] YAML tokens（colors/typography/rounded/spacing/components）
- [ ] Markdown rationale（Overview 说明设计意图）
- [ ] token 引用用 `{path.to.token}` 且可解析
- [ ] section 顺序合规
- [ ] 组件对比度 ≥ WCAG AA（lint 通过）
- [ ] diff 无回归

## 边界

- 格式处于 alpha，可能演进；导出 DTCG 保持互操作。
- 本技能是格式规范，不替用户决定审美——rationale 由人写。
