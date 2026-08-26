---
name: bazel-build-optimization
description: |
  Bazel 构建优化：大型 monorepo 构建配置、远程缓存/远程执行、
  细粒度 target、依赖固定、可见性治理、构建问题排查。
  当用户配置 Bazel、优化构建时间、写 BUILD 规则或排查构建问题时使用。
  受 wshobson/agents（38k★ MIT）启发的中文原创精简版。
---

# Bazel Build Optimization — Bazel 构建优化

面向大型 monorepo 的生产级 Bazel 模式：配置、缓存、提速与排查。

## 何时用

- 为 monorepo 搭建 Bazel
- 配置远程缓存 / 远程执行
- 优化构建时间
- 编写自定义 Bazel 规则
- 排查构建问题
- 迁移到 Bazel

## 1. 目录与关键概念

```
workspace/
├── WORKSPACE.bazel       # 外部依赖
├── .bazelrc              # 构建配置
├── .bazelversion         # Bazel 版本
├── BUILD.bazel           # 根构建文件
├── apps/web/BUILD.bazel  # 应用
├── libs/utils/BUILD.bazel# 库
└── tools/bazel/rules/    # 自定义规则
```

| 概念 | 说明 |
|---|---|
| Target | 可构建单元（库/二进制/测试） |
| Package | 含 BUILD 文件的目录 |
| Label | target 标识 `//路径:target` |
| Rule | 定义 target 如何构建 |
| Aspect | 横切构建行为 |

## 2. 最佳实践

**要**：
- 细粒度 target——缓存命中率更高（大 target 一改全重编）
- 固定依赖——可复现构建（WORKSPACE 里 pin 版本/hash）
- 开启远程缓存——跨机器共享构建产物
- 合理用 visibility——用可见性强制架构边界
- 每个目录写 BUILD 文件——标准约定

**不要**：
- 不用 glob 列依赖——显式声明优于通配
- 不提交 bazel-* 产物目录——加进 .gitignore
- 不跳过 WORKSPACE 配置——这是构建的地基
- 不忽略构建警告——欠技术债

## 3. 构建提速

1. 先看 `bazel analyze-profile` / `--profile` 找最慢 target。
2. 缓存命中率低 → 拆分 target、固定 flag（`--config` 统一）。
3. 依赖链深 → 用 `--remote_execution` 或本地并行（`--jobs`）。
4. 变更影响面大 → 用 `bazel query` 看依赖图，收紧可见性。
5. 增量构建慢 → 检查 input 是否过度（避免 glob 与无谓 deps）。

## 4. 排查流程

- 构建失败：读错误里的 target/label，用 `bazel build //... --verbose_failures`
- 缓存未命中：`bazel clean` 后对比 action 哈希；检查 flag 是否漂移
- 版本问题：`.bazelversion` 固定版本，跨机器一致
- 规则问题：最小复现（独立小 package）再改规则

## 5. 自查清单

- [ ] WORKSPACE/.bazelrc/.bazelversion 齐备且依赖固定
- [ ] target 粒度细、无 glob 依赖
- [ ] 远程缓存/执行已配置并验证命中
- [ ] visibility 收敛（架构边界生效）
- [ ] bazel-* 产物已 gitignore
- [ ] 最慢 target 已定位并有优化动作

## 边界

- Bazel 配置面广（rules_* 生态按语言选）；迁移成本高，先小范围试点。
- 远程执行对沙箱/网络有要求，本地小团队可只用远程缓存。
