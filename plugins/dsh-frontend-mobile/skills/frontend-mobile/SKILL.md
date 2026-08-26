---
name: frontend-mobile
description: |
  前端与移动开发：React Native（Expo 架构/导航/原生模块/离线优先）、
  Next.js App Router（Server Components/流式渲染/并行路由/Server Actions）、
  渲染模式选型与数据获取。
  当用户做移动 App（React Native/Expo）、Next.js 全栈、
  SSR/SSG/ISR 或优化前端渲染性能时使用。受 wshobson/agents
  （38k★ MIT）启发的中文原创精简版。
---

# Frontend & Mobile — 前端与移动开发

React Native 移动端 + Next.js App Router 全栈：架构、渲染、性能纪律。

## 何时用

- 新建 React Native / Expo 项目
- 实现复杂导航、原生模块、离线优先
- 新建 Next.js App Router 应用 / 从 Pages Router 迁移
- 实现 Server Components、流式渲染、并行路由
- 优化数据获取与缓存

## 1. React Native / Expo

**Expo vs 裸 RN**：Expo 上手快、OTA 更新内建、EAS Build 托管；
裸 RN 可完全控制原生代码。多数新项目选 Expo。

**项目结构**：`app/`（Expo Router 页面，`(auth)/(tabs)` 分组 +
`_layout.tsx` 根布局）、`components/ui` + `features`、hooks/services/stores/types。

**要点**：FlashList（长列表优于 FlatList）；组件 memo 防多余重渲染；
Reanimated 原生线程 60fps 动画；真机测试（模拟器漏真机问题）。
**不要**：不内联样式（StyleSheet.create）；不在 render 里 fetch
（useEffect/React Query）；不忽略平台差异（双端都测）；
密钥不进代码（环境变量）；不省 Error Boundary（移动端崩溃无情）。

## 2. Next.js App Router

**渲染模式选型**：

| 模式 | 位置 | 何时用 |
|---|---|---|
| Server Components | 服务端 | 数据获取/重计算/密钥 |
| Client Components | 浏览器 | 交互/hooks/浏览器 API |
| Static | 构建期 | 少变内容 |
| Dynamic | 请求期 | 个性化/实时数据 |
| Streaming | 渐进 | 大页面/慢数据源 |

**文件约定**：layout.tsx（共享 UI）/ page.tsx（路由 UI）/
loading.tsx（Suspense）/ error.tsx（错误边界）/ not-found.tsx /
route.ts（API 端点）/ template.tsx / default.tsx（并行路由回退）。

**要点**：默认 Server Components，需要交互才加 `'use client'`；
数据在用到的地方取（colocate）；Suspense 边界开流式；并行路由独立加载态；
Server Actions 做变更（渐进增强）。
**不要**：不传不可序列化数据（Server→Client 边界）；
Server Components 不用 hooks（useState/useEffect）；
Client Components 不 fetch（用 Server Components 或 React Query）；
不层层嵌套 layout；不忽略 loading 状态。

## 3. 自查清单

- [ ] RN：Expo 路由分组清晰、长列表用 FlashList、动画走 Reanimated
- [ ] RN：无双端未测、密钥未进代码、Error Boundary 就位
- [ ] Next：默认 Server Components、'use client' 最小化
- [ ] Next：loading/error/not-found 齐备、Suspense 流式开启
- [ ] 渲染模式按内容类型选型（Static/Dynamic/ISR）
- [ ] 数据获取位置正确（colocate / React Query）

## 边界

- Expo/Next 版本迭代快（App Router、Expo SDK），按当前版本文档。
- 移动与 Web 性能指标不同：真机 + 双端分别验证。
