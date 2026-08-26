---
name: web-scripting
description: |
  Web 脚本语言开发：现代 PHP（8+ 生成器/SPL/类型系统/OOP 模式/
  内存管理）、Ruby（惯用法/DSL/生态）、性能剖析与安全实践。
  当用户写 PHP 应用、优化 PHP 性能、写 Ruby 脚本/
  应用或做 Web 后端时使用。受 wshobson/agents（38k★ MIT）
  启发的中文原创精简版。
---

# Web Scripting — PHP / Ruby Web 开发

现代 PHP 8+ 与 Ruby 惯用法：性能、类型、安全、可维护。

## 何时用

- 写高性能 PHP 应用
- PHP 重构 / 现代特性迁移
- Ruby 脚本与应用开发
- Web 后端开发

## 1. 现代 PHP 8+

**内存高效处理**：
- 生成器/迭代器处理大数据集（避免整批载入内存）
- SPL 数据结构按需用（SplQueue/SplStack/SplHeap/ArrayObject）

**类型与语法**：
- PHP 8+ 特性：match 表达式、enum、attribute、构造器属性提升
- 类型系统：union/intersection/never/mixed 类型全量覆盖
- 严格类型（declare(strict_types=1)）+ 类型推断

**OOP 模式**：traits、late static binding、magic methods；
SOLID 原则；命名空间与 autoloading（PSR 规范）。

**实践**：优先 PHP 标准库与内置函数（少用第三方包）；
错误用异常 + 自定义异常层级；安全（防注入/校验）；
性能先 profile 再优化；日志与监控钩子就位。

## 2. Ruby 惯用法

- 方法链与块（block/proc/lambda）；DSL 式优雅表达
- 约定优于配置（Convention over Configuration）
- 生态：Rails（Web）、Sidekiq（后台任务）
- 内存与性能：注意对象分配；Profile 定位热点
- 测试：RSpec/Minitest；代码风格 RuboCop

## 3. 自查清单

- [ ] PHP：生成器处理大数据集、类型全量、严格模式
- [ ] PHP：优先标准库、异常层级、防注入
- [ ] Ruby：惯用块/DSL、测试覆盖
- [ ] 性能 profile 先行（有数据支撑）
- [ ] 依赖最小化
- [ ] PSR/RuboCop 规范一致

## 边界

- PHP/Ruby 版本差异大（PHP 7 vs 8+），按部署版本写兼容代码。
- 语言选择看团队栈：本技能提供两语言的惯用法，不选型。
