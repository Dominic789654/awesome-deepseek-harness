# dsh-bazel-build-optimization

DSH（DeepSeek Harness）技能插件：**Bazel 构建优化**。

大型 monorepo 的 Bazel 生产级模式：仓库配置（WORKSPACE/.bazelrc）、细粒度 target、远程缓存/远程执行、依赖固定、visibility 治理与构建提速排查。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-bazel-build-optimization
```

## 触发方式

描述中包含"Bazel / 构建优化 / BUILD 文件 / 远程缓存 / 构建太慢 / monorepo 构建"等关键词时自动触发。

## 能力

- Bazel 目录结构与关键概念（target/package/label/rule）
- 构建提速（profile 定位、缓存命中率、远程执行）
- 构建问题排查流程与自查清单

## 许可

MIT
