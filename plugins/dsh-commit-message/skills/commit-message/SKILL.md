---
name: commit-message
description: |
  Git 提交信息规范化：Conventional Commits（type(scope): subject）、
  提交正文（为什么/如何/引用）、BREAKING CHANGE 标记、
  小提交与语义化日志、Co-authored/脚注。
  当用户要写提交信息、拆分提交、审查提交历史或
  生成变更日志时使用。基于 Conventional Commits 社区规范的中文原创精简版。
---

# Commit Message — Git 提交信息规范化

写清晰、可追溯、可自动生成变更日志的提交信息。

## 何时用

- 写/改写提交信息
- 拆分过大的提交
- 审查提交历史
- 生成变更日志（semantic-release 类）

## 1. Conventional Commits 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

**type**：feat（新功能）/ fix（修复）/ docs / style / refactor /
perf / test / build / ci / chore / revert
**scope**（可选）：模块/包名
**subject**：祈使句、小写开头、不超过 ~50 字符、无句号

## 2. 正文与脚注

- **正文**（需要时）：为什么改 + 怎么改；按行宽 ~72 字符
- **BREAKING CHANGE**：`BREAKING CHANGE: <描述>` 独立脚注
  （或 `!` 后缀 `feat!:`）
- **引用**：`Refs: #123` / `Closes #45`（关联 issue）
- Co-authored-by 脚注（协作归属）

## 3. 纪律

- **一个提交一个逻辑变更**（原子提交）；过大拆分
- subject 讲"做了什么"，正文讲"为什么"（变更历史可读）
- 风格一致：团队统一 type 词表与格式（lint 自动检查）
- 语义化版本：feat → minor、fix → patch、BREAKING → major

## 4. 自查清单

- [ ] type 正确（feat/fix/...）
- [ ] subject ≤50 字符、祈使句、无句号
- [ ] 需要时正文解释了"为什么"
- [ ] BREAKING CHANGE 已标记
- [ ] issue 引用（Refs/Closes）
- [ ] 一个提交一个逻辑变更

## 边界

- 团队可能用自定义规范：以团队约定与 lint 配置为准。
- 信息是历史的一部分：宁可多写一句"为什么"，别只写"修了 bug"。
