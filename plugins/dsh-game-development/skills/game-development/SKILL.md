---
name: game-development
description: |
  游戏开发模式：Godot 4 场景/信号/状态机与 GDScript 最佳实践、
  Unity ECS（DOTS/Jobs/Burst）面向数据设计、性能优化。
  当用户做游戏开发（Godot/Unity）、写 GDScript、设计游戏系统、
  优化游戏性能或管理大量实体时使用。受 wshobson/agents（38k★ MIT）
  启发的中文原创精简版。
---

# Game Development — 游戏开发模式

Godot 4 + Unity ECS 双引擎生产级模式：架构、状态管理、数据导向与优化。

## 何时用

- 用 Godot 4 构建游戏
- 用 GDScript 实现游戏系统
- 设计场景架构 / 管理游戏状态
- Unity 高性能开发（DOTS）
- 管理数千实体 / 优化 CPU 密集逻辑
- 把 OOP 游戏代码改造成 ECS

## 1. Godot 架构基础

- **Node**：基础构建块；**Scene**：可复用节点树（.tscn）
- **Resource**：数据容器（.tres）；**Signal**：事件通信；**Group**：节点分类
- 场景树驱动游戏循环：`_ready()` 初始化、`_physics_process(delta)` 物理帧

**GDScript 要点**：
- `signal` 声明事件（`signal died`），`emit()` 发射，`connect` 订阅
- `@export` 暴露 Inspector 可调参数（`@export_range(0,1)` 加范围）
- `@onready` 延迟获取子节点（`$Sprite2D`）
- 私有变量下划线前缀（`_health`）——社区约定
- 类型标注（`-> void`、`:=` 推断）保持可读性

## 2. Godot 状态与架构实践

- 用**状态机**管理玩家/敌人状态（idle/run/attack/death），别用散落布尔
- 节点树与信号解耦：子节点只发信号，父节点决策
- 场景实例化用 `preload`/`load`，动态生成注意释放（`queue_free()`）
- 分层：场景（表现）/ 资源（数据）/ 单例 autoload（全局服务）

## 3. Unity ECS / DOTS（面向数据设计）

| 方面 | 传统 OOP | ECS/DOTS |
|---|---|---|
| 数据布局 | 面向对象 | 面向数据 |
| 内存 | 分散 | 连续 |
| 处理 | 逐对象 | 批量 |
| 扩展 | 数量多时差 | 线性扩展 |
| 适合 | 复杂行为 | 大规模模拟 |

- Entity=轻量 ID（无数据）；Component=纯数据（无行为）；
  System=处理组件的逻辑；Archetype=组件组合；Chunk=同型实体内存块

**要点**：用 ISystem（优于 SystemBase）；Burst 全量编译（大幅提速）；
结构性变更用 ECB 批量；用 Aspects 分组组件；Profiler 定位瓶颈。
**不要**：不用托管类型（破坏 Burst）；不在 Job 里做结构性变更；
不过度架构（先简单）；不忽略 chunk 利用率；不忘记释放 Native 集合。

## 4. 性能优化（通用）

- 先 Profile 再优化：找到真实瓶颈（绘制/物理/逻辑）
- 减少每帧分配（对象池复用）
- 数据驱动优于分支逻辑；批处理同质对象
- 移动端注意 draw call 与内存

## 5. 自查清单

- [ ] Godot：信号解耦、状态机管理状态、@export 参数化
- [ ] 动态节点有释放路径
- [ ] Unity：ECS 组件纯数据、Burst 编译、ECB 批量变更
- [ ] 无托管类型破坏 Burst、Native 集合有释放
- [ ] Profile 定位瓶颈后有针对性优化
- [ ] 对象池/批处理已用

## 边界

- 引擎版本差异大（Godot 3/4、Unity 2021/2022+ DOTS 仍在演进），按版本查文档。
- 小项目别硬上 ECS：OOP 简单直接，实体规模大再迁移。
