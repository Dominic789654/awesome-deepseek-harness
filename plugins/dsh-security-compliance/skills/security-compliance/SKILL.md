---
name: security-compliance
description: |
  安全审计与合规：DevSecOps 集成（SAST/DAST/依赖/容器扫描）、
  认证授权（OAuth2/OIDC/JWT/零信任/MFA）、OWASP 与漏洞管理、
  云安全态势、合规框架检查（GDPR/HIPAA/SOC2）、
  供应链安全（SLSA/SBOM/密钥管理）。
  当用户做安全审计、加固 CI 安全、实施合规框架或
  评估安全态势时使用。受 wshobson/agents（38k★ MIT）启发的中文原创精简版。
---

# Security Compliance — 安全审计与合规

DevSecOps + 认证授权 + OWASP + 合规框架：把安全建进流程，产出可审计系统。

## 何时用

- 安全审计与漏洞评估
- DevSecOps 集成（安全进 CI）
- 认证/授权加固
- 合规框架实施（GDPR/HIPAA/SOC2）
- 供应链安全（SBOM/密钥管理）

## 1. DevSecOps 与自动化

- **流水线集成**：SAST（SonarQube/CodeQL/Semgrep）+ DAST（ZAP/Burp）+
  IAST + 依赖扫描（Snyk/Dependency-Check）+ 容器扫描
- **Shift-left**：早期发现漏洞、安全编码培训
- **Policy as Code**：OPA 策略自动化
- **供应链**：SLSA 来源证明、SBOM 清单、依赖管理
- **密钥管理**：Vault/云密钥服务 + 自动轮换

## 2. 认证与授权

- 协议：OAuth 2.0/2.1、OIDC、SAML、WebAuthn/FIDO2
- JWT：正确实现（签名/过期/校验/密钥管理）
- **零信任**：身份访问 + 持续验证 + 最小权限
- MFA：TOTP/硬件令牌/风险认证
- 授权：RBAC/ABAC/ReBAC；API 安全（scope/限流）

## 3. OWASP 与漏洞管理

- OWASP Top 10：越权/加密失败/注入/不安全设计等
- ASVS 验证标准（安全需求）；SAMM 成熟度评估
- 漏洞评估：自动化扫描 + 人工测试 + 渗透
- 风险评估：CVSS + 业务影响 → 优先级

## 4. 云与容器安全

- 云态势：Security Hub/Defender/Command Center 类
- 基础设施：安全组/网络 ACL/IAM 策略
- 容器：镜像扫描、运行时安全、K8s 安全策略

## 5. 合规检查（GDPR/HIPAA/SOC2）

- 控制映射：把安全控制映射到合规要求（证据可审计）
- 证据收集：配置/日志/策略文档化
- 差距分析：合规要求 vs 现状 → 修复清单
- 持续合规：定期复查 + 自动化控制验证

## 6. 自查清单

- [ ] SAST/DAST/依赖/容器扫描进 CI
- [ ] JWT/OAuth 实现正确、MFA 启用
- [ ] OWASP Top 10 过了一遍
- [ ] 云态势与 IAM 最小权限
- [ ] 合规控制映射 + 证据可审计
- [ ] 密钥管理 + 自动轮换

## 边界

- 合规是持续过程不是一次通过：证据与复查节奏要有。
- 框架（GDPR/HIPAA/SOC2）要求差异大，按目标框架逐项对照。
