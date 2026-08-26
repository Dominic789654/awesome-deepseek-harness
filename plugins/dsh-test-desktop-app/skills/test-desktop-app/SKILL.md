---
name: test-desktop-app
description: |
  Electron 应用端到端测试：启动 Electron dev 模式（开启 CDP），
  通过 Chrome DevTools Protocol 连接真实渲染器——DOM 检查、
  JS 求值、点击控件、检查 iframe 内容、截图；注意 DPR 乘数、
  右键需要真实 Input.dispatchMouseEvent（合成事件不触发
  base-ui）、popup DOM 存在但截图缺失检查 elementFromPoint、
  xterm ResizeObserver 延迟几秒。
  当用户要测试 Electron 桌面应用、需要端到端验证时使用。
  受 bholmesdev/hubble.md（test-desktop-app）启发的中文原创
  精简版。
---

# Test Desktop App — Electron 应用端到端测试

通过 CDP 连接真实 Electron 渲染器做端到端验证。

## 何时用

- 测试 Electron 桌面应用
- 需要真实 DOM/JS/截图而非模拟
- 交互验证（点击/右键/popup）

## 1. 启动测试

1. `HUBBLE_DESKTOP_ENABLE_CDP=1 pnpm dev:desktop`
2. 读终端输出：
   - `Playground: <path>` → 测试用 playground
   - `DevTools listening on ws://127.0.0.1:9222/...` → CDP 就绪

## 2. CDP 交互

1. `fetch http://127.0.0.1:9222/json/list` 获取页面列表
2. 连接目标页面的 `webSocketDebuggerUrl`
3. 用 DevTools Protocol 命令驱动渲染器

## 3. Gotchas（坑）

- **DPR**：截图 DPR 2，CSS px × 2 = 像素值
- **右键**：需要真实 `Input.dispatchMouseEvent`，合成 `contextmenu`
  事件不触发 base-ui context menu
- **Popup 截图缺失**：DOM 有但截图没有 → 检查 `elementFromPoint`
  看 stacking
- **xterm refit 延迟**：debounced ResizeObserver，布局变化后
  几秒才跟上——再量一遍再报 bug
- **Build 顺序**：先 build `packages/ui` 和 `packages/editor`，
  desktop app 导入它们的 dist

## 4. 自查清单

- [ ] 开启 CDP（HUBBLE_DESKTOP_ENABLE_CDP=1）
- [ ] 用 dev playground 而非 file picker
- [ ] CDP 检查 DOM/JS/iframe/截图
- [ ] DPR × 2 正确
- [ ] 右键用真实 dispatchMouseEvent
- [ ] 测试后停 dev server 确认无残留进程

## 边界

- 这是 Electron 应用测试方法论；非 Electron 桌面需调整 CDP 策略。
- 测试后务必停 dev server，防止进程残留。
