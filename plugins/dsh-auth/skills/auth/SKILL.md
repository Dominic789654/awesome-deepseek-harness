---
name: auth
description: |
  认证与授权实现：JWT/OAuth2/会话管理/RBAC/SSO，安全可扩展的访问控制。
  当用户说"做登录"、"认证系统"、"JWT"、"OAuth2"、"RBAC 权限"、
  "SSO"、"会话管理"时使用。受 wshobson/agents（38k★ MIT）启发
  的中文原创精简版。
---

# Auth — 认证与授权实现

用行业标准模式构建安全、可扩展的认证与授权系统。

## 何时用

- 实现用户认证系统
- 保护 REST/GraphQL API
- 添加 OAuth2/社交登录
- 实现 RBAC（角色权限）
- 设计会话管理
- 迁移认证系统
- 调试认证问题
- 实现 SSO/多租户

## 1. 认证（你是谁）

### JWT

- 无状态：签发 token，服务端不存会话。
- **安全要点**：签名算法用 RS256/ES256（不用 HS256 共享密钥分发）；
  `exp`/`iat`/`aud`/`iss` 声明齐全；密钥强且轮换；不把敏感信息放 payload。
- 刷新机制：access token 短（15-60min）+ refresh token 长（可撤销）。
- 撤销：refresh token 黑名单/版本号（无状态 JWT 撤销难，接受权衡）。

### 会话（Session）

- 服务端存储 + cookie（httpOnly/secure/sameSite）。
- 适合传统 Web；需要会话失效控制时比 JWT 简单。

### OAuth2

- 授权码模式（服务端换 token，不暴露给前端）。
- 第三方登录：用成熟库/服务（避免手写 OAuth 流程）。
- PKCE 用于公共客户端（SPA/移动端）。

### 选择

| 场景 | 方案 |
|---|---|
| API/SPA | JWT（access+refresh） |
| 传统 Web | Session + cookie |
| 第三方登录 | OAuth2 授权码 + 成熟库 |

## 2. 授权（你能做什么）

- **RBAC**：角色 → 权限；用户 → 角色。
- **ABAC**（复杂场景）：基于属性策略（用户属性/资源属性/环境）。
- **实施**：
  - 后端强制（前端隐藏不算安全）。
  - 中间件/装饰器统一鉴权，不散落各端点。
  - 权限检查在**资源层**做（防 IDOR：用户 A 访问用户 B 资源）。

## 3. 安全清单

- [ ] 密码 bcrypt/argon2 哈希（不存明文）
- [ ] JWT 用非对称签名 + 完整声明
- [ ] cookie 安全属性齐全
- [ ] 防暴力破解（限流/锁定）
- [ ] 防 IDOR（资源级鉴权）
- [ ] 防 CSRF（同源检查/token）
- [ ] 防注入（登录输入不拼 SQL）
- [ ] 会话/refresh 可撤销
- [ ] 安全日志（登录/登出/失败尝试）

## 边界

- 具体语言/框架有成熟认证库（Passport/Devise/Spring Security 等）优先用。
- 涉及支付/合规认证场景参考 pci-compliance 等专项。

## 与 security-hardening 配合

认证/授权是安全加固的"永远做"清单的一部分；本技能提供实现细节。
