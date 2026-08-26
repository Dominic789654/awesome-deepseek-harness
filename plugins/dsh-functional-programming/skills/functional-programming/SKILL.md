---
name: functional-programming
description: |
  函数式编程：不可变性与纯函数、模式匹配、管道组合、
  类型系统（newtype/GADT/类型族）、并发与容错（let it crash/
  监督树/STM）、效应隔离。
  当用户写 Elixir/Haskell/函数式风格代码、重构命令式代码为
  函数式、设计高可靠系统或做类型级编程时使用。
  受 wshobson/agents（38k★ MIT）启发的中文原创精简版。
---

# Functional Programming — 函数式编程

不可变数据 + 纯函数 + 强类型 + 并发容错：写出可预测、可测试、可并行的代码。

## 何时用

- 写 Elixir/Haskell/函数式风格代码
- 把命令式代码重构为函数式
- OTP/监督树设计（Elixir）
- 类型级编程（Haskell）
- 高可靠性并发系统

## 1. 核心原则

- **不可变性**：数据不变，变换产生新值 → 状态可预测
- **纯函数**：同输入同输出、无副作用 → 易测易推理；副作用隔离到显式边界
- **模式匹配优先**：用匹配替代条件逻辑（解构/守卫子句）
- **管道组合**：数据流式变换（`|>` / `>>=`），可读可复用

## 2. Elixir/OTP 实践

- **let it crash + 监督树**：进程崩溃由 Supervisor 重启，不写防御性 catch-all
- 进程即隔离：状态封装在 GenServer，天然并发安全
- Ecto changeset 校验（数据入口校验）；Phoenix 用 context 划边界
- 测试：ExUnit + 属性测试（property-based）；类型：Dialyzer specs
- 性能：`:observer`/`:recon` 分析；BEAM 特性（调度/垃圾回收）合理利用

## 3. Haskell 类型系统

- **newtype/phantom types**：用类型编码不变量（防混淆单位/ID）
- GADT/类型族：类型级编程表达精确约束
- 总函数优先：避免部分函数（head/tail），返回 Maybe/Either
- 类型类按需使用（别为抽象而抽象）；语言扩展克制（逐个说明用途）
- 效应系统/单子栈（Reader/State/IO）隔离副作用；并发用 STM/async

## 4. 迁移纪律

- 从纯函数开始迁移：核心逻辑纯化，IO 留在边界
- 一个模块一次重构，测试先行（行为契约）
- 模块小而职责明确（容易推理）

## 5. 自查清单

- [ ] 数据不可变、函数纯（副作用隔离）
- [ ] 模式匹配替代条件逻辑
- [ ] 类型编码不变量（newtype/总函数）
- [ ] 并发走 let it crash + 监督（无裸进程）
- [ ] 单子/效应边界清晰
- [ ] 属性测试 + 类型检查就位

## 边界

- 函数式风格有学习曲线：团队共识与渐进迁移优于激进重写。
- 语言特性（Elixir 宏/OTP、Haskell GHC 扩展）按实际使用。
