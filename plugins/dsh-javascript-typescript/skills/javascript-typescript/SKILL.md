---
name: javascript-typescript
description: |
  JavaScript/TypeScript 开发模式：现代 JS（ES6+ 最佳实践/异步/
  函数式）、TS 高级类型（泛型/条件类型/映射类型/工具类型）、
  Node 后端与类型安全工程。
  当用户重构遗留 JS、写 TS 复杂类型、做类型安全库/
  API 客户端或 Node 后端时使用。受 wshobson/agents（38k★ MIT）
  启发的中文原创精简版。
---

# JavaScript / TypeScript — JS/TS 开发模式

现代 JS 写法 + TS 高级类型系统：写出干净、可维护、类型安全的代码。

## 何时用

- 把遗留 JS 重构为现代语法
- 实现函数式编程模式
- 写复杂类型逻辑/可复用类型工具
- 构建类型安全库、API 客户端、表单校验
- Node 后端开发
- JS 性能优化

## 1. 现代 JS 最佳实践

1. 默认 `const`，只有需要重赋值才用 `let`
2. 回调优先箭头函数（注意 this 绑定语义）
3. 模板字符串代替拼接
4. 解构对象/数组（更清晰）
5. `async/await` 代替 Promise 链
6. **不修改数据**：用展开运算符与数组方法（map/filter/reduce）
7. 可选链 `?.` 防 undefined 报错；空值合并 `??` 给默认值
8. 数组方法优先于传统循环
9. 模块化组织代码；纯函数（易测易推理）
10. 小函数单一职责；错误用 try/catch 处理

常见坑：this 绑定、Promise 反模式（嵌套/遗漏 catch）、内存泄漏（事件监听未清理）。

## 2. TS 高级类型

**泛型**：可复用且类型安全——约束（`T extends HasLength`）、多参数（`merge<T,U>`）。

**条件类型**：`T extends U ? X : Y`——按类型分支。

**映射类型**：`{ [K in keyof T]: ... }`——批量转换（如 `Readonly<T>`/`Partial<T>`）。

**模板字面量类型**：`\`${K}_id\``——字符串模式类型。

**工具类型**：`Pick/Omit/Record/Exclude/ReturnType/Awaited` 等。

**类型安全工程**：
- API 客户端用泛型 + 响应校验（运行时校验与类型一致）
- 表单校验：类型驱动 schema（zod 等），一处定义双端生效
- 配置对象强类型：`as const` + 推导
- 迁移遗留 JS：先 strict 开起来，再逐模块加类型

## 3. Node 后端要点

- 异步全链路：async/await + 错误传播；顶层错误处理中间件
- 流式处理大文件/响应（不整读内存）
- 模块边界清晰：路由/服务/数据访问分层
- 依赖最小化 + 安全（npm audit）

## 4. 自查清单

- [ ] const 优先、无数据突变、无 Promise 反模式
- [ ] 异步错误有捕获与传播
- [ ] 泛型/工具类型用到位，无 any 泄漏
- [ ] API/表单类型与运行时校验一致
- [ ] Node 后端分层清晰、流式处理大文件
- [ ] 无内存泄漏（监听器清理）

## 边界

- TS 严格度按项目定：库/服务全量严格，脚本可轻量。
- JS 生态演进快（ES202x），按团队 Node 版本选语法。
