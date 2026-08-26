# dsh-designmd

DSH（DeepSeek Harness）技能插件：**DESIGN.md 设计系统格式**。

给 coding agent 的视觉身份规范：YAML 设计 token（颜色/字体/圆角/间距/组件）+ Markdown 设计理由、token 引用 `{colors.primary}`、lint/diff/export 工具链（Tailwind v3/v4、W3C DTCG）、WCAG AA 对比度检查、section 顺序与未知内容处理规则。受 [google-labs-code/design.md](https://github.com/google-labs-code/design.md)（27k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-designmd
```

## 触发方式

描述中包含"设计系统 / 设计 token / 视觉身份 / DESIGN.md / 统一 UI 风格 / 设计规范文件"等关键词时自动触发。

## 能力

- YAML tokens + Markdown rationale 双层结构
- token 引用与组件变体（hover/active/pressed）
- lint：broken-ref / contrast-ratio（WCAG AA）/ section-order 等 11 规则
- diff：token 级与 prose 级回归检测
- export：json-tailwind / css-tailwind / dtcg
- 未知内容容错规则

## 许可

MIT
