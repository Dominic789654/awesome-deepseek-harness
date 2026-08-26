---
name: taste-review
description: |
  审美判断调用：对模糊的决策（UI 打磨/文案/命名/排版），
  启动一个 taste-driven judgment call——列出文件、给几个方案
  权衡、给推荐并列出备选；深度与决策匹配。
  当用户在 UI/文案/命名上拿不定主意、需要"第二双眼"时使用。
  受 bholmesdev/skills（taste-review）启发的中文原创精简版。
---

# Taste Review — 审美判断调用

你碰到一个模糊点，需要一个判断。启动一个审美调用来获得它。

## 何时用

- UI 打磨 / 文案措辞 / 命名 / 排版上有拿不准的
- 需要"第二双眼"式的质量判断
- 想要带权衡的推荐而非单一答案

## 1. 操作流程

1. 陈述你的问题（plainly，不要修饰）
2. 列出相关文件（供 agent 阅读上下文）
3. Agent 权衡几个选项，给推荐 + 列出备选
4. 输出深度与决策匹配——设计决策可能几段，命名决策不用

## 2. 调用模板

```bash
prompt="$(cat <<'EOF'
<your question, stated plainly>

Files to consider: <paths, if any>

Weigh a few options, give your recommendation,
and share others as alternatives considered.
Length is up to you — a design call may warrant
several paragraphs; a naming call may not.
EOF
)"
```

## 3. 自查清单

- [ ] 问题陈述 plain（不要预设答案）
- [ ] 列出相关文件（给上下文）
- [ ] 权衡多个选项
- [ ] 明确推荐 + 备选
- [ ] 深度匹配决策量级

## 边界

- 审美判断带主观性——备选是提供选项而非绝对真理。
- 格式/可访问性等硬约束有客观标准，审美调用不覆盖。
