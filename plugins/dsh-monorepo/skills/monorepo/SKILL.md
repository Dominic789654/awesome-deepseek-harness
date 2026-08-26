---
name: monorepo
description: |
  Monorepo 管理：仓库结构、依赖管理、构建缓存、CI 策略、包发布。
  当用户说"monorepo"、"多包仓库"、"workspace"、"turborepo"、
  "nx"、"怎么组织多项目"时使用。受 wshobson/agents（38k★ MIT）
  启发的中文原创精简版。
---

# Monorepo — Monorepo 管理

用单一仓库管理多包/多项目：统一依赖、原子变更、共享构建。

## 何时用

- 多包/多项目需要共享代码
- 统一版本与依赖管理
- 跨包原子变更（一次 PR 改多包）
- 团队规模增长后保持一致性

## 1. 仓库结构

```
repo/
├── packages/          # 业务包（可发布）
│   ├── core/
│   └── web/
├── apps/              # 应用（不发布）
│   ├── web-app/
│   └── admin/
├── tools/             # 构建/脚本工具
├── package.json       # workspace 定义
└── turbo.json / nx.json  # 任务编排（可选）
```

- 包边界清晰：每个包独立 `package.json`，显式依赖（不隐式跨包引用）。
- 目录按"包/应用"分，不按技术层堆叠。

## 2. 依赖管理

- workspace 协议：`workspace:*` / `file:` 引用本地包（开发时用本地，
  发布时解析为版本）。
- 统一依赖版本：公共依赖在根（避免多版本漂移）。
- 锁文件提交：可复现安装。
- 版本策略：统一版本 or 独立版本（按发布需求选，别混）。

## 3. 构建与缓存

- 任务编排工具（Turborepo/Nx）：
  - 任务依赖图（build 依赖 lint/test）。
  - **增量构建**：只构建受影响包（change detection）。
  - **远程/本地缓存**：未变更包直接取缓存结果。
- 缓存键 = 源码 hash + 依赖 + 环境（缓存失效正确性）。

## 4. CI 策略

- **只跑受影响包的检查**（lint/test/build），CI 快。
- 依赖图影响：改动 core → 依赖它的包都要测。
- 全量检查作为发布前门槛（或夜间全量）。
- 发布：变更包自动发布（changesets 等），版本+changelog 生成。

## 5. 纪律

- 包保持小而单一职责（避免"垃圾桶包"）。
- 跨包共享逻辑进公共包，不在各包复制。
- 包接口稳定（参考 api-design）：公共包变更要兼容。
- 大仓库注意 git 操作/权限（codeowners、路径保护）。

## 自查清单

- [ ] workspace 结构清晰（包/应用分层）
- [ ] 依赖用 workspace 协议，公共依赖统一版本
- [ ] 增量构建 + 缓存已配置
- [ ] CI 只跑受影响包 + 发布门槛全量
- [ ] 包发布有 changeset/版本管理
- [ ] 无隐式跨包引用

## 边界

- 工具选型（pnpm workspace/Turborepo/Nx）按团队规模与语言。
- Monorepo 不是银弹：单仓部署/发布复杂时评估取舍。
