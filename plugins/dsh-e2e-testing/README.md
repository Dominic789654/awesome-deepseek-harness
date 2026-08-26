# dsh-e2e-testing

DSH（DeepSeek Harness）技能插件：**端到端测试**。

Playwright/Cypress E2E：测什么/不测什么（测试金字塔）、关键用户旅程、防 flaky 策略（data-testid/自动等待/数据隔离/网络可控）、CI 分片并行、失败 trace 证据、a11y 与响应式验证。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-e2e-testing
```

## 触发方式

描述中包含"E2E 测试 / 端到端 / Playwright / Cypress / flaky / 测试金字塔 / 关键旅程"等关键词时自动触发。

## 能力

- E2E 边界（测关键旅程，不测单测范围）
- Playwright vs Cypress 选型
- 防 flaky 六式
- CI 分片与失败证据（trace/视频）

## 许可

MIT
