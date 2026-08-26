---
name: virtual-eng-team
description: |
  虚拟工程团队：把 agent 变成整套工程团队——CEO 重思产品、
  工程经理锁架构、设计师抓 AI slop、评审找生产 bug、QA 开真实
  浏览器、安全官跑 OWASP+STRIDE、发布工程师发 PR；23 专家 +
  8 电源工具全 slash 命令。核心流程：/office-hours（6 强制问题
  产品拷问）→ /autoplan → 实现 → /review → /qa → /ship；
  /cso 安全审计、/retro 周复盘、/investigate 根因调试。
  当用户要一个人像 20 人团队一样发货、结构化角色替代空白
  prompt 时使用。受 garrytan/gstack（128k★ MIT）启发的中文
  原创精简版。
---

# Virtual Eng Team — 虚拟工程团队

把 agent 变成虚拟工程团队：一个正确的工具化单人，可以比传统
团队更快。Garry Tan 用它：60 天 3 个生产服务、40+ 功能，
2026 年节奏约 2013 年的 810 倍。

## 何时用

- 创始人/CEO 想边跑公司边发货
- 初次用 agent 的人想要结构化角色而非空白 prompt
- 技术负责人要严格评审/QA/发布自动化

## 1. 团队角色（23 专家）

| 角色 | 职责 |
|------|------|
| CEO | 重思产品、战略挑战（4 种范围模式） |
| 工程经理 | 锁定架构 |
| 设计师 | 抓 AI slop |
| 评审 | 找生产 bug |
| QA 负责人 | 开真实浏览器测试 |
| 安全官 | OWASP + STRIDE 审计 |
| 发布工程师 | 发 PR、部署 |

## 2. 核心命令流

```
/office-hours      产品拷问（6 个强制问题：给谁/解决什么/为什么现在…）
/plan-ceo-review   战略挑战（4 种范围模式）
/plan-eng-review   架构锁定
/plan-design-review 设计评审
/autoplan          自动规划
/review            分支评审
/qa <url>          真实浏览器 QA
/ship              发布
/cso               安全审计（OWASP+STRIDE）
/retro             周复盘
/investigate       根因调试
```

## 3. 使用流程（Quick Start）

1. 安装 gstack（30 秒）
2. `/office-hours` 描述在做什么
3. `/plan-ceo-review` 任何功能点子
4. `/review` 有改动的分支
5. `/qa` 你的 staging URL
6. 你自然会知道适不适合

## 4. 自查清单

- [ ] 需求先过 office-hours（6 强制问题）
- [ ] CEO 战略评审（范围模式）
- [ ] 架构锁定（eng-review）
- [ ] review 找生产 bug
- [ ] QA 开真实浏览器
- [ ] 安全审计（cso）在发布前
- [ ] retro 周复盘持续

## 边界

- 角色是提示词分工，不是独立进程——协作在同一会话。
- 安全审计（OWASP/STRIDE）是辅助，关键系统仍需专业评审。
