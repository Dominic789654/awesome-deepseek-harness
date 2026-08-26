---
name: review-agent-governance
description: |
  Agent 审查行为治理：对 PR 审查/评论/合并、issue 处理、发布、
  CI 配置修改等高影响操作设置人工审批门控 + Cedar 策略 +
  Ed25519 签名收据（审批窗口机制）。
  当用户要约束 agent 的审查/发布行为、设人工审批流程或
  审计 agent 操作时使用。受 wshobson/agents（38k★ MIT）
  启发的中文原创精简版。
---

# Review Agent Governance — Agent 审查行为治理

把 agent 的审查/发布等高影响动作关在"人工审批窗口"后面：
每次尝试（批准或拒绝）都产出签名收据，可离线验证。

## 何时用

在 agent 会做以下操作的**项目**里启用：
- 审查/评论/合并 PR（`gh pr review`/`gh pr merge`）
- 处理 issue（评论/关闭）
- 发布版本（`gh release create`）
- 修改 CI 配置（`.github/workflows/` 等）
- 推送到受保护分支（main/release/production）
- 发外部通知（Slack/Discord webhook）

如果 agent 只做本地编辑和跑测试——本技能是多余的，用一般工具策略即可。

## 1. 机制

- **Cedar 策略默认拒绝**审查面动作；要批准某动作先开审批窗口，结束后关闭。
- 每次尝试（allow/deny）都写 **Ed25519 签名收据**（含原因：human_approved）。
- 整链可离线验证：`npx @veritasacta/verify ./review-receipts/*.json`
  （exit 0=完整；1=被篡改；2=格式坏）。

## 2. 审批窗口（最简形态）

```bash
# 动作前开窗口
touch ./.review-approved
# 让 agent 执行审查/评论/合并
# 动作后立即关闭
rm ./.review-approved
```

或斜杠命令 `/approve-review "理由"`——创建带理由的窗口文件 + 写入
human-approved 收据，仍需 `rm` 收尾。

**只读审计模式**：`export REVIEW_APPROVAL_FLAG=./.never-approve`
——所有匹配 forbid 规则的动作一律拒绝，审批窗口无效（CI/锁死审计用）。

## 3. 典型流程

1. 人类看 `/list-pending` 列出的最近 deny（工具名/命令/时间戳）
2. 人类判断合适 → `/approve-review "理由"` 开窗口
3. agent 重试 → 这次 allow（收据 reason=human_approved）
4. 人类 `rm ./.review-approved` 关窗口

每一步都在收据链里，监管/对手方离线可验证：没有任何审查动作绕过人工门。

## 4. 与其他策略叠加

一般工具策略 + 审查治理策略**双钩子同时评估**：任一 Cedar deny 都阻断。

## 5. 自查清单

- [ ] 高影响动作（PR/发布/CI/受保护分支）都在策略范围内
- [ ] 默认拒绝，审批窗口显式开合
- [ ] 每次尝试有签名收据（含原因）
- [ ] 收据链可离线验证（抽查 exit 0）
- [ ] 只读审计模式可用于 CI
- [ ] 密钥不落库、公钥指纹已提交

## 边界

- 这是治理层不是防攻击层：审批窗口的"人"要有权限意识。
- 具体实现（protect-mcp 等）按项目集成；先在试点仓库跑通再推广。
