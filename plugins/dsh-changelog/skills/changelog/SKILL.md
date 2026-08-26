---
name: changelog
description: |
  变更日志自动化：Keep a Changelog 格式 + Conventional Commits + 语义化版本，
  从 commit/PR 生成发布说明。当用户说"生成 changelog"、"写发布说明"、
  "release notes"、"规范 commit 信息"、"版本管理"时使用。受 wshobson/agents
  （38k★ MIT）启发的中文原创精简版。
---

# Changelog — 变更日志自动化

按行业标准从 commit/PR/release 生成变更日志、发布说明，并管理版本。

## 何时用

- 搭建自动化 changelog 生成
- 落地 Conventional Commits 规范
- 创建发布说明工作流
- 统一 commit 信息格式
- 生成 GitHub/GitLab 发布说明
- 语义化版本管理

## 1. Keep a Changelog 格式

```markdown
# Changelog

本项目所有值得记录的变更都会记录在此文件。

格式基于 [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)，
版本遵循 [语义化版本](https://semver.org/spec/v2.0.0.html)。

## [Unreleased]

### Added（新增）
- ...

### Changed（变更）
- ...

### Fixed（修复）
- ...

### Removed（移除）
- ...

## [1.0.0] - 2026-01-01
- ...
```

**原则**：
- 只记录对使用者有意义的变更（新增/修复/破坏性变更），不记内部重构流水账。
- 最新版本放最上面。
- 每个发布版本附日期。
- 破坏性变更必须显著标注。

## 2. Conventional Commits 规范

commit 信息格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **type**：`feat`（新功能）/ `fix`（修复）/ `docs`（文档）/ `style`（格式）/
  `refactor`（重构）/ `perf`（性能）/ `test`（测试）/ `build`（构建）/
  `ci`（CI）/ `chore`（杂务）
- **scope**（可选）：影响范围，如 `feat(auth): ...`
- **破坏性变更**：type 后加 `!` 或在 footer 写 `BREAKING CHANGE: ...`
- subject 用祈使句、小写开头、≤50 字符、不加句号

**自动化联动**：
- `feat` 和 `fix` 自动进 changelog 对应分类。
- `BREAKING CHANGE` 触发 major 版本。
- `feat` 触发 minor，`fix`/其它触发 patch。

## 3. 语义化版本（SemVer）

- **MAJOR**：破坏性变更。
- **MINOR**：向后兼容的新功能。
- **PATCH**：向后兼容的 bug 修复。

## 生成流程

1. **收集变更**：`git log` 从上一 tag 到 HEAD，按 Conventional Commits 过滤。
2. **分类**：Added / Changed / Fixed / Removed / Deprecated / Security。
3. **去噪**：去掉 docs/style/refactor/chore 里对用户无感的内部改动
   （除非影响行为）。
4. **写条目**：每条一行，动词开头、面向用户语言、不写 PR 号堆砌。
5. **定版本**：按 BREAKING/feat/fix 判定 major/minor/patch。
6. **更新 Unreleased → 版本号 + 日期**。

## 边界

- 已有 changelog 约定（如独立发布流程）时遵循项目约定。
- 历史提交不规范时，如实归类，不编造变更。
