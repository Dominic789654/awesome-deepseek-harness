# 安全策略 / Security Policy

本文件说明 `dsh-public` 的漏洞上报渠道与披露政策。

## 支持的版本

| 版本 | 支持状态 |
|---|---|
| 最新 `main` 分支 | ✅ 接受安全报告 |
| 更早的提交 / 已归档版本 | ⚠️ 不保证修复 |

## 报告方式（请勿公开）

请**不要**通过公开 Issue 或 PR 披露漏洞细节。请使用：

1. **GitHub 私密漏洞报告**（首选）：本仓库 **Security → Report a vulnerability**，
   报告对公众不可见，直达维护者。
2. 邮件：`2695194221@qq.com`（主题前缀 `[SECURITY]`），仅在无法使用 GitHub 时使用。

报告中请尽量包含：

- 受影响组件与版本 / commit
- 复现步骤或最小复现载荷
- 期望行为 vs 实际行为
- 影响评估（能否导致密钥泄露、命令执行、权限越权、数据破坏）

## 响应承诺

- 24 小时内确认收到。
- 72 小时内给出初步判定（可复现 / 需更多信息 / 非漏洞）。
- 修复发布前**不公开披露**；修复发布后随 CHANGELOG 致谢（可匿名）。

## 范围

本仓库为公开仓库。请注意：

- **不要**在 Issue / PR / 截图中提交真实密钥、令牌、`.env` 内容或私有数据。
- 依赖漏洞请优先依赖 Dependabot 告警；如属本项目代码缺陷，按上述渠道上报。

## 披露政策

- 修复发布前：仅维护者与报告者知情。
- 修复发布后：披露摘要（向量类别、影响、修复方式）。

---
For English: report privately via **Security → Report a vulnerability**, or email
`2695194221@qq.com` with the subject prefix `[SECURITY]`. Please do not open a public issue
for vulnerabilities.