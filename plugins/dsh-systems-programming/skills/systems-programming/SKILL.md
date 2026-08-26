---
name: systems-programming
description: |
  系统级编程：内存安全模式（RAII/所有权/智能指针）、并发与异步模式
  （goroutine/channel/async）、调试工具（ASan/Valgrind/Miri/TSan）。
  当用户写 Rust/C++/Go/C 系统代码、处理内存问题（use-after-free、
  泄漏、野指针）、做并发/异步设计或排查数据竞争时使用。受
  wshobson/agents（38k★ MIT）启发的中文原创精简版。
---

# Systems Programming — 系统级编程

跨语言的内存安全 + 并发 + 异步模式：写安全系统代码、管好资源、防内存 bug。

## 何时用

- 编写 Rust/C++/Go/C 系统级代码
- 管理资源（文件、socket、内存）
- 防止 use-after-free / 泄漏 / 缓冲区溢出
- 实现 RAII / 所有权 / 智能指针
- 并发与异步程序设计
- 调试内存与数据竞争问题

## 1. 内存 bug 分类与预防

| Bug 类型 | 描述 | 预防 |
|---|---|---|
| Use-after-free | 访问已释放内存 | 所有权 + RAII |
| Double-free | 同一内存释放两次 | 智能指针 |
| 内存泄漏 | 从不释放 | RAII / GC |
| 缓冲区溢出 | 越界写入 | 边界检查 |
| 悬垂指针 | 指向已释放内存的指针 | 生命周期跟踪 |
| 数据竞争 | 并发无同步访问 | 所有权 + Sync |

安全谱系：手动（C）→ 智能指针（C++）→ 所有权（Rust）→ GC（Go/Java）。
越右越安全但控制越少——按场景选语言与风格。

## 2. 内存安全最佳实践

**要**：
- 优先 RAII：资源生命周期绑定作用域（构造获取、析构释放）
- C++ 用智能指针（unique_ptr/shared_ptr），避免裸指针
- 明确所有权：谁拥有、谁释放
- 边界检查：用安全访问方法而非裸索引
- 用工具：AddressSanitizer、Valgrind、Miri（Rust UB 检测）、ThreadSanitizer

**不要**：
- 不用裸指针（除非对接 C）
- 不返回局部引用（悬垂）
- 不忽略编译器警告
- Rust 不随意用 `unsafe`（最小化）
- 不默认线程安全——显式声明

调试工具速查：

```bash
clang++ -fsanitize=address -g source.cpp   # AddressSanitizer
valgrind --leak-check=full ./program        # Valgrind 泄漏检查
cargo +nightly miri run                     # Rust 未定义行为检测
clang++ -fsanitize=thread -g source.cpp     # ThreadSanitizer 数据竞争
```

## 3. Go 并发模式

口决：**不要通过共享内存通信，要通过通信共享内存。**

- goroutine：轻量并发执行；channel：goroutine 间通信；select：多路复用
- sync.Mutex / WaitGroup / errgroup：同步与并发错误聚合
- context.Context：取消与超时——**每个并发路径都要有退出通道**

**要**：
- 用 context 做取消/超时
- 只在发送端 close channel（接收端关闭会 panic）
- 用 errgroup 聚合并发错误
- 已知数量时用有缓冲 channel
- 优先 channel 而非 mutex

**不要**：
- 不泄漏 goroutine（永远有退出路径，检查 ctx.Done()）
- 不从接收端关闭 channel
- 不用共享内存（除非必要）
- 不用 time.Sleep 做同步

## 4. 自查清单

- [ ] 资源生命周期绑定作用域（RAII）
- [ ] 无裸指针/无返回局部引用
- [ ] 所有权与释放点明确
- [ ] 并发路径有取消/退出通道（无泄漏）
- [ ] channel 只在发送端关闭
- [ ] ASan/TSan 跑过一轮

## 边界

- 具体语言语义不同：Rust 所有权编译期强制、C++ 靠纪律 + 工具、Go 靠 goroutine+channel。
- 性能敏感处再权衡"安全 vs 控制"；先用安全写法，profile 后再优化热点。
