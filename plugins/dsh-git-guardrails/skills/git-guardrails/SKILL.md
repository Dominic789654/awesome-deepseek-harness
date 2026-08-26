---
name: git-guardrails
description: |
  Git 安全护栏：拦截危险 git 命令（push/--force/reset --hard/
  clean -f/branch -D/checkout .）在 PreToolUse 钩子层阻止执行，
  项目级或全局安装、授权提示、安全替代命令。
  当用户要防破坏性 git 操作、给 agent 加 git 安全钩子
  或阻止误推/误清时使用。受 mattpocock/skills（223k★ MIT）
  启发的中文原创精简版。
---

# Git Guardrails — Git 安全护栏

在工具执行前拦截危险 git 命令，防止误操作毁掉工作区或误推。

## 何时用

- 阻止破坏性 git 操作（push/reset/clean/branch -D 等）
- 给 agent 工作流加 git 安全钩子
- 保护主分支与工作区

## 1. 拦截清单

- `git push`（所有变体，含 `--force`）
- `git reset --hard`
- `git clean -f` / `git clean -fd`
- `git branch -D`
- `git checkout .` / `git restore .`

被拦时，agent 看到明确消息：无权访问这些命令。

## 2. 安装（钩子机制）

1. **问范围**：本项目（`.claude/settings.json`）还是全局（`~/.claude/settings.json`）
2. **放钩子脚本**到对应 hooks 目录并 `chmod +x`
3. **注册 PreToolUse**：matcher 匹配 Bash/工具执行，
   钩子检查命令是否命中拦截清单 → 命中即拒绝执行
4. 验证：试着跑一条被拦命令，确认被阻止

## 3. 授权与替代

- 确有需要时：临时放行/人工确认后再执行（不静默放行）
- 用**安全替代**完成目标：
  - 需要推送 → 先 review diff，用普通 push（无 force）
  - 需要清理 → 手动确认具体文件，用 `git rm`/逐文件处理
  - 需要放弃改动 → `git stash`（可恢复）优于 `checkout .`

## 4. 自查清单

- [ ] push/reset --hard/clean -f/branch -D/checkout . 全部拦截
- [ ] 钩子按所选范围安装并生效
- [ ] 拦截消息明确（无权访问）
- [ ] 放行需人工确认，不静默放行
- [ ] 安全替代命令已提供
- [ ] 拦截清单验证过（真实命令测试）

## 边界

- 护栏是"最后防线"：正常流程仍靠分支保护规则与评审。
- 具体钩子机制（PreToolUse 等）随 agent 运行时不同，按平台实现。
