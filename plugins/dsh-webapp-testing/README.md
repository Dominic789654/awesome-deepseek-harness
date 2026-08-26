# dsh-webapp-testing

DSH（DeepSeek Harness）技能插件：**Web 应用测试（Playwright）**。

本地 Web 应用交互与测试：决策树（静态直读 vs 动态起服务器）、侦察后行动（等 networkidle → 截图/DOM → 找选择器 → 执行）、服务器生命周期管理、浏览器日志查看。受 [Anthropic 官方 skills](https://github.com/anthropics/skills) 的 webapp-testing（Apache-2.0）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-webapp-testing
```

## 触发方式

描述中包含"测试 Web 应用 / Playwright / 验证前端 / UI 调试 / 截图 / 浏览器日志"等关键词时自动触发。

## 能力

- 静态/动态决策树
- 侦察后行动工作流
- 服务器生命周期辅助脚本
- 交互断言与日志查看

## 许可

MIT
