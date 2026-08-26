# dsh-virtual-eng-team

DSH（DeepSeek Harness）技能插件：**虚拟工程团队**。

把 agent 变成整套工程团队：CEO 重思产品、工程经理锁架构、设计师抓 AI slop、评审找生产 bug、QA 开真实浏览器、安全官跑 OWASP+STRIDE、发布工程师发 PR；23 专家 + 8 电源工具全 slash 命令。核心流程：/office-hours（6 强制问题产品拷问）→ /autoplan → 实现 → /review → /qa → /ship。受 [garrytan/gstack](https://github.com/garrytan/gstack)（128k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-virtual-eng-team
```

## 触发方式

描述中包含"虚拟团队 / 一个人当团队用 / 产品拷问 / 战略评审 / 发布流程 / 安全审计"等关键词时自动触发。

## 能力

- 23 专家角色分工
- office-hours 6 强制问题
- plan-ceo/eng/design-review
- review/qa/ship 发布流
- cso 安全审计（OWASP+STRIDE）
- retro/investigate 复盘调试

## 许可

MIT
