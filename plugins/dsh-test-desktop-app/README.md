# dsh-test-desktop-app

DSH（DeepSeek Harness）技能插件：**Electron 应用端到端测试**。

通过 Chrome DevTools Protocol（CDP）连接真实 Electron 渲染器——DOM 检查/JS 求值/点击/截图；DPR 乘数、右键需要真实 Input.dispatchMouseEvent、popup DOM 存在但截图缺失检查 stacking、xterm ResizeObserver 延迟几秒。受 [bholmesdev/hubble.md](https://github.com/bholmesdev/hubble.md)（test-desktop-app）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-test-desktop-app
```

## 触发方式

描述中包含"测试 Electron 应用 / CDP 测试 / 桌面应用验证 / 桌面端 E2E"等关键词时自动触发。

## 能力

- CDP 连接真实 Electron 渲染器
- DOM/JS 求值/点击/截图
- DPR/右键/popup 坑处理
- xterm 布局延迟识别
- 测试后进程清理

## 许可

MIT
