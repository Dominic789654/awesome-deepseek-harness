# dsh-auth

认证与授权实现：JWT（access+refresh）、会话管理、OAuth2 授权码 + PKCE、
RBAC/ABAC、安全清单（防 IDOR/CSRF/暴力破解）。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 developer-essentials/auth-implementation-patterns 技能启发，改编为
DSH 中文原创精简版（与 dsh-security-hardening 互补）。

## 安装

```sh
dsh plugin --profile web add dsh-auth
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-auth
# 重启 dsh web 生效
```

## 使用

对 agent 说"做登录认证 / RBAC 权限"，`auth` 技能输出
方案选型（JWT/会话/OAuth2）+ 授权设计 + 安全清单。

## 结构

```
dsh-auth/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/auth/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
