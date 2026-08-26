# dsh-systems-programming

DSH（DeepSeek Harness）技能插件：**系统级编程**。

跨语言的内存安全（RAII/所有权/智能指针）、并发与异步模式（goroutine/channel/async）、内存与数据竞争调试工具（ASan/Valgrind/Miri/TSan）。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-systems-programming
```

## 触发方式

描述中包含"系统编程 / 内存安全 / use-after-free / 并发 / goroutine / 数据竞争 / Rust / C++"等关键词时自动触发。

## 能力

- 内存 bug 分类与预防（RAII、所有权、智能指针、边界检查）
- Go 并发模式（goroutine/channel/context/errgroup）
- 调试工具速查（ASan、Valgrind、Miri、TSan）

## 许可

MIT
