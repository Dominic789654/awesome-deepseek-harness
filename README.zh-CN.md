<p align="center">
  <img src="./assets/deepseek-logo.svg" alt="DeepSeek" height="48">
</p>

# Awesome DeepSeek Harness [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> 面向 **DeepSeek Harness（DSH）** 的 **插件 / Skill / MCP / Patch（Profile）层 / 编排器 / 聚合器 / UI** 精选清单 —— DeepSeek 官方 agent 运行框架，核心理念 **`Model + Harness = Agent`**。

[English](./README.md) | **简体中文**

DeepSeek Harness（简称 "DSH"）是 DeepSeek 的 agent 运行框架 / harness 层 —— 把模型的推理变成真实行动的那双"手"（上下文管理、工具调用编排、执行沙箱、反馈循环、会话持久化）。它最大的特点是**开放的插件生态**：由社区贡献 plugin、Skill、MCP server、orchestrator、aggregator 和 UI。

本清单收录这个生态里最好的项目。欢迎贡献 —— 见 [贡献指南](#贡献指南)。

> **给作者的提示：** DeepSeek 要求插件仓库带上 **`#dsh`** GitHub topic 以便被发现。给你的仓库加上它，然后来这里提 PR。

![DeepSeek Harness 生态地图](./assets/dsh-ecosystem.svg)

## 快速开始

```bash
# 启动 DSH Web UI
npx @deepseek-ai/dsh web

# 把清单中的社区插件安装到指定 profile
dsh plugin --profile web add "github:owner/repo#main"
```

安装前请确认目标仓库带有 **`#dsh`** GitHub topic，便于社区 hub 收录。

## 目录

- [官方](#官方)
- [Profile 与 Patch 层](#profile-与-patch-层)
- [Harness 与运行时](#harness-与运行时)
- [安全与权限](#安全与权限)
- [会话与记忆管理](#会话与记忆管理)
- [成本与用量统计](#成本与用量统计)
- [Channel / IM 桥接](#channel--im-桥接)
- [插件市场与生态](#插件市场与生态)
- [可视化](#可视化)
- [幻灯片 / PPT](#幻灯片--ppt)
- [写代码](#写代码)
- [Agent](#agent)
- [循环（自动研究 / 自我改进等）](#循环自动研究--自我改进等)
- [MCP Server](#mcp-server)
- [编排器与聚合器](#编排器与聚合器)
- [UI / 客户端](#ui--客户端)
- [Skill](#skill)
- [资源](#资源)
- [贡献指南](#贡献指南)

---

## 官方

- [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) —— DeepSeek 官方 agent 运行框架（`Model + Harness = Agent`），基于 Cordis 的"一切皆插件"架构（TypeScript，MIT）。  `⭐38238`
- [deepseek-ai/awesome-deepseek-integration](https://github.com/deepseek-ai/awesome-deepseek-integration) —— 官方 DeepSeek API 集成清单。  `⭐38654`
- [deepseek-ai/awesome-deepseek-agent](https://github.com/deepseek-ai/awesome-deepseek-agent) —— 官方支持 DeepSeek 的 agent / harness 清单。  `⭐5426`

## Profile 与 Patch 层

_DSH 的核心组合机制：一个 **profile** 叠加各 bundle 的 patch 层，再叠加你自己的 `cordis.patch.yml`（profile 级 → `$DSH_HOME` 级 → `--patch` overlay），无需 fork 就能重新编排整棵插件树。**任务专精的运行时配方**就活在这一层：长程任务 profile、数学推理 profile、幻灯片编辑 profile，本质都只是不同的 bundle 组合 + patch，不是不同的代码库。凡是在这一层操作的工具/harness（分享或导出整套 profile，或用任务专属 patch 把 DSH 跑成专用后端）都归在这里，而不是塞进通用插件堆里。_

- [asdf17128/dshp](https://github.com/asdf17128/dshp) —— 管理 DeepSeek Harness profile：列出、创建、克隆、diff，并把整套 `dsh` 配置（插件版本 + bundle 顺序 + patch）打包成一个可移植文件分享。
- [AMAP-ML/LongHorizon-Harness](https://github.com/AMAP-ML/LongHorizon-Harness) —— 长程 computer-use harness，带 DSH 适配层：在独立 `DSH_HOME` 下运行 `dsh --profile headless`，按角色差异化 patch 权限（执行者 `workspace-write`，Manager/审计者 `read-only`）——一个任务专精 DSH profile 的具体示范。

- [duyanta123/dsh-preset-scaffold](https://github.com/duyanta123/dsh-preset-scaffold) —— DeepSeek Harness Agent 预设：从零搭建标准化、可运行、可验证的项目骨架（架构师人设 + 六套模板资产 + 严格初始化流程）。
- [light051001/dsh-preset-qa-mode](https://github.com/light051001/dsh-preset-qa-mode) —— 基于 Standard 的先问后做 Agent 预设：执行前先进行详尽的结构化澄清提问（九大维度、最多 5 轮、可随时打断），用户确认后才动手，复杂任务先出计划待批准。
- [Jungod1121/dsh-anchored-standard](https://github.com/Jungod1121/dsh-anchored-standard) —— 两阶段 DeepSeek Harness 预设：先以最小对齐引导（bash + read），首次工具调用或回复后自动切换到完整 Standard 工具集。
- [ZRui-C/dsh-minimal-first-turn](https://github.com/ZRui-C/dsh-minimal-first-turn) —— 可安装的 Web bundle：根会话首轮使用 Minimal 兼容条件，首次工具调用或回复后恢复所选预设，带持久 composer 开关。
- [songoao25/virtual-product-team](https://github.com/songoao25/virtual-product-team) —— 产品团队模式 Agent 预设：以老板视角与虚拟产品团队（PM → 工程师 → QA → 发布）对话，从点子走到成品。
- [qwe225380/dsh-omni-router](https://github.com/qwe225380/dsh-omni-router) —— Omni Router 智能编排预设：按复杂度与思维模式（spec/react/balanced）自动路由，自动收集项目上下文，并集成 Plan Mode、TDD、交付门、Git 工作流与验收清单提示；支持 `dsh plugin add dsh-omni-router`。


- [AythyaCrispus/dsh-minimal-msys2](https://github.com/AythyaCrispus/dsh-minimal-msys2) —— Windows Minimal 模式：持久 bash + str_replace_editor 插件——注册 agent 预设，在 Windows 上提供可用的持久 bash 后端，并在插件设置区暴露 GUI 可编辑的 bash 路径（通过 credentials 域持久化）。
- [CeilCelia/dsh-eli-mode](https://github.com/CeilCelia/dsh-eli-mode) —— Eli Mode：围绕 wiki 驱动长期记忆与技能构建的 DeepSeek Harness agent 预设，基于极简 Harness 环境。
- [LiFenrir/dsh-scenario](https://github.com/LiFenrir/dsh-scenario) —— 场景管理插件：把「人设 + 模型 + 权限」打包成命名场景（dev / wiki / personal），设置页一键热切换。
- [Saikel-Orado-Liu/dsh-coding-agent-preset](https://github.com/Saikel-Orado-Liu/dsh-coding-agent-preset) —— 适配 Windows 的 DSH 编码 agent 预设：持久 PowerShell 7 (pwsh) + str_replace_editor，镜像官方 minimal 预设。
- [Scorp1o117/dsh-soul-md](https://github.com/Scorp1o117/dsh-soul-md) — DeepSeek Harness 人设卡插件：用 Soul.md 给 agent 一个稳定的角色设定。
- [delightedMaster/dsh-anchored-standard-windows](https://github.com/delightedMaster/dsh-anchored-standard-windows) —— 面向 DeepSeek Harness 的 Windows Anchored Standard agent 预设，按需加载工具与 Skills。
- [delightedMaster/dsh-subprocess-win32](https://github.com/delightedMaster/dsh-subprocess-win32) —— DeepSeek Harness 的 Windows subprocess Cordis 运行时与 Minimal/Anchored Standard 预设。
- [brunhildzhou/dsh-all-warmup](https://github.com/brunhildzhou/dsh-all-warmup) —— DeepSeek Harness 全局无感热身层插件：任何会话首轮自动热身，第二轮起恢复完整模式。
- [jiatong-lab914/obsidian-knowledge-mode](https://github.com/jiatong-lab914/obsidian-knowledge-mode) —— Obsidian 可携带、AI-native 的知识系统 DSH agent preset：反收藏夹 Layer 0、二八提炼为 Context/Claim、可验证的更新环、四个只读角色代理、外部来源 Gate 钩子与零内容 starter 模板。
- [JingMox/learner-preset](https://github.com/JingMox/learner-preset) —— 面向第一性原理学习的 DeepSeek Harness 智能体预设：知识组件带衰减掌握度、类比生命周期与预测账本。
- [orziz/odai](https://github.com/orziz/odai) —— 面向 DSH 的 profile-wide 治理与路由 bundle，另提供可独立安装、按会话选择的 Agent preset；兼容 DSH 0.1.0-rc.6 与 0.1.0-rc.7。

- [JohnXu22786/hooks-adapter](https://github.com/JohnXu22786/hooks-adapter) — hooks 配置兼容层：读取主流 agent harness 的 hooks 配置文件，把生命周期事件映射到 dsh 扩展点，并执行 shell / webhook / oracle / proxy 四类 handler

## Harness 与运行时

_DeepSeek 原生 / DeepSeek 优先的 agent harness、coding agent，以及运行时级基建（诊断、运维、会话管理、审批策略）。_

- [chiyulogg-commits/deepseek-harness-zh-tw](https://github.com/chiyulogg-commits/deepseek-harness-zh-tw) —— DeepSeek Harness 繁体中文（台湾用语）语系扩展版：新增繁体中文界面选项，25 个 Web UI 套件全量台湾用语中文化。
- [hxs996-beep/deepAct](https://github.com/hxs996-beep/deepAct) —— 为 DeepSeek 打造的终端 AI 编码代理，为每步行动设守卫：歧义检查、设计评审、范围控制，支持团队协作、子代理并行与 MCP 扩展。
- [LaplaceYoung/oh-my-dsh](https://github.com/LaplaceYoung/oh-my-dsh) —— 面向 DSH 的大型插件合集（700+），只通过扩展接缝注册，不修改 agent-loop 骨架。  `⭐24`
- [omdsh-dev/fabric](https://github.com/omdsh-dev/fabric) —— 类似 MC Fabric 的 hook 处理器。
- [omdsh-dev/dsh-session-health](https://github.com/omdsh-dev/dsh-session-health) —— 会话健康检查：对多帧 zstd 会话文件做帧级扫描诊断（torn / 损坏 / 空会话检测），零依赖只读，注册 `session_health` 工具。
- [omdsh-dev/dsh-security-audit](https://github.com/omdsh-dev/dsh-security-audit) —— 本机安全审计插件：覆盖配置、插件来源、会话与网络暴露面，输出只读脱敏风险报告。
- [Zhenyu98/dsh-context-doctor](https://github.com/Zhenyu98/dsh-context-doctor) —— 上下文注入审计：统计 AGENTS.md 指令链 / 技能目录 / 工具 schema 的 token 成本，检测重复与冲突；Web UI 圆环面板 + `context_audit` 工具。
- [coppynight/dsh-doctor](https://github.com/coppynight/dsh-doctor) —— flutter-doctor 风格的诊断与修复：覆盖安装级与 harness 内检查，支持安全的自动修复；repository-plugin 格式。
- [lhh010/dsh-bash-encoding](https://github.com/lhh010/dsh-bash-encoding) —— 自动识别 bash 输出编码（UTF-16LE / UTF-8 / GBK 等）并正确解码，修复 WSL / Windows 下 bash 工具的中文乱码。
- [vlln/plugin-registry](https://github.com/vlln/plugin-registry) —— 插件生态基建：管理 repository 插件的浏览器薄控制台（0 patch）+ 引导插件开发的 `make-dsh-plugin` skill。  `⭐13`
- [Andy8647/dsh-auto-approval](https://github.com/Andy8647/dsh-auto-approval) —— 工具调用自动审批：新增 `auto` 审批档位，用规则 + LLM 分类器对每次工具调用判定放行 / 拒绝，输入框旁带状态芯片。
- [zzh-newlearner/dsh-postmortem](https://github.com/zzh-newlearner/dsh-postmortem) —— 面向 DSH 会话的本地优先故障复盘（postmortem）工具。
- [vibeinging/dsh-trace](https://github.com/vibeinging/dsh-trace) —— 遥测后端：把回合、模型步骤和工具调用通过 HTTP 导出到 yiTrace。
- [omdsh-dev/dsh-hub](https://github.com/omdsh-dev/dsh-hub) —— 社区扩展目录与 Profile 生成管理器：在官方契约之上增加事务式安装、恢复、目录浏览和设置 UI。
- [fakechris/dsh-harness-ops](https://github.com/fakechris/dsh-harness-ops) —— 运维工具箱：快照 A/B 双槽升级（原子切换、一键回滚）、守护进程自动拉起 web / agent、web 全挂时一条命令自救诊断。
- [omdsh-dev/session-teleport](https://github.com/omdsh-dev/session-teleport) —— 多设备 Session 接力：以 PostgreSQL 为唯一在线权威，同一时间只有一台设备持有写入凭据。
- [Tieboyh/dsh-session-search](https://github.com/Tieboyh/dsh-session-search) —— 免索引的跨 agent 会话搜索。
- [ilharp/dsh-tool-approval](https://github.com/ilharp/dsh-tool-approval) —— 工具调用手动审批（DSH 的"手动模式 / Ask 模式"）。
- [blissito/ghostycode](https://github.com/blissito/ghostycode) —— DeepSeek V4 终端编程 agent 与“宪法式”harness（Rust TUI，支持 MCP 与子 agent）。
- [didclawapp-ai/zagens](https://github.com/didclawapp-ai/zagens) —— 面向 DeepSeek V4 的开源 agent harness。  `⭐13`
- [liubf21/ds-forge](https://github.com/liubf21/ds-forge) —— 面向 DeepSeek V4 的轻量 agent harness。
- [Owen718/FlashCoder](https://github.com/Owen718/FlashCoder) —— 面向 DeepSeek 模型的简易 harness。
- [ArtificialNotImbecile/dsh-context-taxonomy](https://github.com/ArtificialNotImbecile/dsh-context-taxonomy) —— DeepSeek Harness 的逻辑调用上下文分类（taxonomy）插件。
- [btspoony/dsh-llm-fallbacks](https://github.com/btspoony/dsh-llm-fallbacks) —— 基于角色的模型重试与备用（fallback）策略插件。
- [Drifter-yh/dsh-tool-policy](https://github.com/Drifter-yh/dsh-tool-policy) —— 声明式默认拒绝（deny-by-default）工具策略插件。
- [LingLambda/dsh-undo](https://github.com/LingLambda/dsh-undo) —— 上下文撤销/重做：把模型上下文回滚到上一个完成步骤，并可再恢复。
- [omdsh-dev/omdsh](https://github.com/omdsh-dev/omdsh) —— 社区实验项目：以可审阅、可复现的形式组织版本化的 DSH 组件集与默认配置。
- [omdsh-dev/omdsh-runtime](https://github.com/omdsh-dev/omdsh-runtime) —— 无头执行层：复用官方 Profile/Bundle/Cordis 操作，增加确定性 plan/apply、候选代次与上一代恢复。
- [wangshunnn/oh-my-dsh](https://github.com/wangshunnn/oh-my-dsh) —— DeepSeek Harness 插件合集。
- [yjh051108/dsh-super-injector](https://github.com/yjh051108/dsh-super-injector) —— BepInEx 式模组注入器：运行时把本地插件包热注入运行中的 DSH web，不改 patch、不重启。
- [yoke233/dsh-openai-codex-auth](https://github.com/yoke233/dsh-openai-codex-auth) —— OpenAI Codex OAuth 登录与用量卡片插件。
- [YYTbit/dsh-plugin-claude-bridge](https://github.com/YYTbit/dsh-plugin-claude-bridge) —— 把 Claude Code 的记忆、技能与配置桥接进 DeepSeek Harness。
- [Gordonynh/dsh-plugin-codex-import](https://github.com/Gordonynh/dsh-plugin-codex-import) —— 导入 Codex 历史对话记录到 DSH。
- [Hu9956/dsh-codex-provider](https://github.com/Hu9956/dsh-codex-provider) —— Codex 供应商接入插件（支持 OAuth 登录）。
- [WSL043/dsh-codex-subscription](https://github.com/WSL043/dsh-codex-subscription) —— 缓存 Codex 订阅/用量状态。
- [kinoward/dsh-plugin-subhub](https://github.com/kinoward/dsh-plugin-subhub) —— 用第三方订阅账户在 DeepSeek Harness 中使用订阅覆盖的模型：文字对话、图片理解、图片生成与图片编辑，可用模型与推理等级随账户自动同步；当前支持 OpenAI / ChatGPT 订阅，更多订阅服务规划中。
- [PerryLink/dsh-output-styles](https://github.com/PerryLink/dsh-output-styles) —— 切换不同的输出风格。
- [Toukaiteio/dsh-effort-tweak](https://github.com/Toukaiteio/dsh-effort-tweak) —— 实时调整 reasoning effort。
- [csiroqa/dsh-backup-sync](https://github.com/csiroqa/dsh-backup-sync) —— 工作区快照备份与 WebDAV 同步。
- [csiroqa/dsh-schedule](https://github.com/csiroqa/dsh-schedule) —— cron 定时任务 + 状态监控。
- [Karuisawa-Mrs/dsh-plugins](https://github.com/Karuisawa-Mrs/dsh-plugins) —— 社区插件合集。
- [BlockRunAI/dsh-clawrouter](https://github.com/BlockRunAI/dsh-clawrouter) —— 为你的 DeepSeek Harness agent 提供“第二大脑”：危险工具调用前的强模型复审，以及一个钱包接入 70+ 模型。
- [gordonlu/dsh-context-lens](https://github.com/gordonlu/dsh-context-lens) —— DeepSeek Harness 的请求上下文分析器：查看每次模型请求间到底变了什么、缓存命中如何变化。
- [green-dalii/dsh-shift-router](https://github.com/green-dalii/dsh-shift-router) —— DeepSeek Harness 的两层模型路由：LLM-Judge 路由、多模型降级链、指数退避失败重试、任务级编排。
- [KitDoesIt/dsh-compaction-instant](https://github.com/KitDoesIt/dsh-compaction-instant) —— 不依赖 LLM 的无损压缩引擎。
- [morlay/session-persistence-rdb](https://github.com/morlay/session-persistence-rdb) —— session 关系型数据库持久化。
- [rainforest888/dsh-plugins-raincode](https://github.com/rainforest888/dsh-plugins-raincode) —— DeepSeek Harness 的模型层：模型池/缓存/重试 + `/skills` 浏览。
- [weijiafu14/dsh-remote-sandbox](https://github.com/weijiafu14/dsh-remote-sandbox) —— 基于 E2B 沙盒的抗崩溃远程执行编星：`ctx.fs`/`ctx.subprocess`，带心跳保活、透明恢复与工作区同步。
- [030611/dsh-telemetry-redactor](https://github.com/030611/dsh-telemetry-redactor) —— 为 DeepSeek Harness 会话遥测数据提供失败即拦截（fail-closed）的导出脱敏。
- [cnyac/dsh-polling](https://github.com/cnyac/dsh-polling) —— 轮询任务/定时任务插件：把 cron 定时任务变成真实会话，支持自然语言创建、模型工具（`polling_*`）与 Web UI。
- [cpj-dev/dsh-plugin-cc](https://github.com/cpj-dev/dsh-plugin-cc) —— 把 DeepSeek Harness 桥接进 Claude Code，用于评审、批判、委派与会话导入。
- [khiqwq/dsh-system-proxy](https://github.com/khiqwq/dsh-system-proxy) —— 智能出站 HTTP(S) 路由 host 插件：命名代理（http/https/socks4/4a/5/5h）、按主机/供应商/插件规则、直连优先 + 健康记忆回退。
- [lire1131/dsh-undo](https://github.com/lire1131/dsh-undo) —— 插件/皮肤/设置配置的快照与回滚：变更自动保存、撤销/重做栈、快照管理面板、快捷键，另附离线 PowerShell CLI 与 GUI，DSH 启动失败时也能用。
- [omdsh-dev/dsh-scout](https://github.com/omdsh-dev/dsh-scout) —— 面向 DeepSeek Harness 的只读环境探测插件，为智能体提供运行环境、软件版本、系统资源、端口、服务、硬件及工作区信息。
- [sleepinginsummer/dsh-rtk-optimizer](https://github.com/sleepinginsummer/dsh-rtk-optimizer) —— DeepSeek Harness 的 RTK 优化插件。
- [weijiafu14/pi2dsh](https://github.com/weijiafu14/pi2dsh) —— 打通 Pi 与 DSH 生态：一个 Pi Host ABI 让未修改的 Pi 扩展作为原生 DSH 插件运行。
- [wenliang9527/dsh-workspace](https://github.com/wenliang9527/dsh-workspace) —— DeepSeek Harness 的工作区插件。
- [biedongbin/dsh-claude-compat](https://github.com/biedongbin/dsh-claude-compat) —— DSH 插件：将 Claude Code 的 `.claude/` 目录（skills、commands、rules）原生桥接进 DeepSeek Harness。
- [revive/dsh-git-credentials](https://github.com/revive/dsh-git-credentials) —— 让 GitLab/GitHub API token 不进入模型上下文——AES-256-GCM 静态加密，按需暴露工具，带 Web 设置面板。
- [SnowAmberX/dsh-role-router](https://github.com/SnowAmberX/dsh-role-router) —— 基于角色的模型路由插件：planner/subagent 角色路由，附设置卡片与输入框摘要。
- [omdsh-dev/dsh-coding](https://github.com/omdsh-dev/dsh-coding) —— DeepSeek Harness 编码相关插件（上游未提供描述）。
- [byhongyu/oh-my-dsh](https://github.com/byhongyu/oh-my-dsh) — 面向 DeepSeek Harness 的精选编程、科研与投资 Agent 配置集合。
- [Bernardxu123/dsh-plugins](https://github.com/Bernardxu123/dsh-plugins) — DeepSeek Harness (dsh) 插件集合：dsh-sensenova-image 生图 + dsh-vision 看图，克隆即装。
- [boxiaolanya2008/dsh-plugin](https://github.com/boxiaolanya2008/dsh-plugin) — deepseek harness 插件工具。
- [cnzgray/dsh-plugins](https://github.com/cnzgray/dsh-plugins) — DeepSeek Harness 插件集合。
- [linqunxun/dsh-plugins](https://github.com/linqunxun/dsh-plugins) — DeepSeek Harness (DSH) 客户端 UI 插件集合。
- [MaimoryLab/dib](https://github.com/MaimoryLab/dib) — DSH-in-Box：DSH 运行时与插件打包工具。
- [NIyueeE/dsh-container](https://github.com/NIyueeE/dsh-container) — DeepSeek Harness (dsh) 容器镜像：通用开发容器基础镜像，启动时自动更新 dsh，含 compose + Quadlet 示例。
- [Saktawdi/ha-orchestrator](https://github.com/Saktawdi/ha-orchestrator) — DSH 动态 Cordis 插件：为 DeepSeek Harness 提供模型高可用容灾切换与子代理编排。
- [wefio/dsh-plugin-audit](https://github.com/wefio/dsh-plugin-audit) — DSH 插件审计工具。
- [Whning0513/deepseek-protocol-doctor](https://github.com/Whning0513/deepseek-protocol-doctor) — 离线 DeepSeek 协议诊断工具，同时是可安装的 DSH 插件，覆盖工具循环、reasoning_content、严格 schema 与 SSE。
- [woshi-Tom/dsh-status-plugin](https://github.com/woshi-Tom/dsh-status-plugin) — dsh status plugin；可以方便地查看宿主机的运行状态，故障时方便排查。
- [wxxb789/dsh-legion](https://github.com/wxxb789/dsh-legion) — 为 DeepSeek Harness 提供可配置的多模型子代理 Profile。
- [ZhengQingJing/dsh-session-tree](https://github.com/ZhengQingJing/dsh-session-tree) — 为 DeepSeek Harness 提供类 Git 的不可变会话分支功能。
- [devmom/dsh-trajectory-debug](https://github.com/devmom/dsh-trajectory-debug) — DeepSeek Harness 轨迹调试插件。
- [mafeis/dsh-net-proxy](https://github.com/mafeis/dsh-net-proxy) — DeepSeek Harness 网络代理插件。
- [PandaColour/dsh-cmd-starter](https://github.com/PandaColour/dsh-cmd-starter) — 为 deepseek-harness 提供一个命令行启动工具，支持 `--append-prompt`、`--resume` 等类 Claude 命令。
- [jiangrz77/DSHLauncher](https://github.com/jiangrz77/DSHLauncher) — DeepSeek Harness 启动器。
- [AndPuQing/dsh-pi](https://github.com/AndPuQing/dsh-pi) — DeepSeek Harness 插件（dsh-pi）。
- [gyyxs88/dsh-subagent-codex](https://github.com/gyyxs88/dsh-subagent-codex) — DeepSeek Harness 插件，将 Codex 作为子代理接入。
- [bujue600-arch/dsh-testgen](https://github.com/bujue600-arch/dsh-testgen) — 为 DeepSeek Harness 提供自动化单元测试生成：`/testgen` 命令 + `generate_tools` 工具，自动搭建、运行并修复单元测试直至通过。
- [yoke233/dsh-prime-agent](https://github.com/yoke233/dsh-prime-agent) — 受 Prime Agent 启发，为 DeepSeek Harness Code Mode 提供持久化 RLM 控制平面。
- [4060415/Deepseek-harness-routing-layer-](https://github.com/4060415/Deepseek-harness-routing-layer-) — DeepSeek Harness 智能模型自动路由插件，根据任务需求自动选择最合适的模型。
- [1na-ko/dsh-hdc-bridge](https://github.com/1na-ko/dsh-hdc-bridge) — DSH 原生鸿蒙开发助手：hdc 设备闭环调试 + 离线官方知识层（Tier-1 随包）+ DevEco CLI 构建通道。
- [StyxNether/dsh-auto-approval](https://github.com/StyxNether/dsh-auto-approval) — Trusted Auto：DeepSeek Harness 中介于 workspace-write 与 danger-full-access 之间的中间权限档，自动批准无害命令与可信区域目标。
- [phelpsyacht/dshmath-manim](https://github.com/phelpsyacht/dshmath-manim) — DeepSeek Harness manim 数学动画插件。
- [saurtone/dsh-tool-somark](https://github.com/saurtone/dsh-tool-somark) — SoMark 文档解析工具（`somark_parse`）插件，用于 DeepSeek Harness。
- [niuniu-869/dsh-plugin-cas-kb](https://github.com/niuniu-869/dsh-plugin-cas-kb) — DeepSeek Harness 插件包：条文级中国会计准则（CAS/ASSE）与税法检索，附带保持引用锚定原文条款的技能。
- [LeslieWylie/dsh-ops-kit](https://github.com/LeslieWylie/dsh-ops-kit) — 可复用的 DeepSeek Harness 插件包：证据驱动的记忆、编排、基准测试运维与插件发布工作流。
- [Mars-Sea/dsh-commandcode-provider](https://github.com/Mars-Sea/dsh-commandcode-provider) — 非官方的 DeepSeek Harness LLM provider 插件，适配 Command Code：实时模型目录、推理强度支持、Models 页面卡片。从 pi-commandcode-provider 移植（MIT）。
- [040822/dsh-gzip](https://github.com/040822/dsh-gzip) — dsh-gzip 插件：为 /api 响应启用 gzip，解决低带宽访问下的历史加载失败（30s 超时）。
- [LyleMi/dsh-codex-app-server](https://github.com/LyleMi/dsh-codex-app-server) — DeepSeek Harness 的 OpenAI Codex App Server agent provider 插件。
- [SeverusZh/dsh-plugin-subagent-director](https://github.com/SeverusZh/dsh-plugin-subagent-director) — Subagent Director：为每个子代理单独选择 LLM 提供商/模型，支持角色模板，DeepSeek Harness 插件。
- [TGYD-helige/dsh-pi](https://github.com/TGYD-helige/dsh-pi) — 通过兼容层在 DeepSeek Harness 内运行受信任的 Pi 扩展。
- [FengHuoLinShan/dsh-plugin-llm-balance](https://github.com/FengHuoLinShan/dsh-plugin-llm-balance) — DSH(DeepSeek Harness) 通用插件：API 余额悬浮球。
- [Niuniu-Sir/dsh-data-ledger](https://github.com/Niuniu-Sir/dsh-data-ledger) — 数据台账：DeepSeek Harness 本地数据统一看板——对话/账本/技能/记忆/日志的来源、位置与内容摘要，支持回收站删除、浏览器存储清理。
- [omdsh-dev/dsh-llm-fallbacks](https://github.com/omdsh-dev/dsh-llm-fallbacks) — 基于角色的模型重试备用策略插件。
- [Bryan-cmf/dsh-infra-observability](https://github.com/Bryan-cmf/dsh-infra-observability) —— 结构可观测层：真实记录工具/技能用量（tools/result）、技能目录审计与看门狗，不依赖模型自报。
- [Gu-ZT/dsh-auxiliary](https://github.com/Gu-ZT/dsh-auxiliary) —— DeepSeek Harness 辅助模型插件：通过专用模型路由提供视觉理解与上下文压缩。
- [xiaohj233/dsh-keepalive](https://github.com/xiaohj233/dsh-keepalive) —— DSH Web 进程的可选独立看门狗：快照校验修复 + 显式补丁恢复。
- [Zhuchen00123/dsh-wsl-modes](https://github.com/Zhuchen00123/dsh-wsl-modes) —— 让 DeepSeek Harness 在 Windows 上使用 WSL Linux bash + bubblewrap 沙箱，并提供两个可直接使用的 Agent preset。
- [sjh9714/dsh-win32](https://github.com/sjh9714/dsh-win32) —— 极简模式的 Windows 补全：补上缺失的 win32 进程探测器（持久 Git Bash）、Ctrl-C 中断注入与安装体检 doctor。
- [strukto-ai/mirage#dsh](https://github.com/strukto-ai/mirage/tree/main/typescript/packages/dsh) —— 把文件系统与 bash 提供者换成 mirage 虚拟工作区：文件工具与 shell 命令作用于挂载的资源（RAM、S3、Redis、Slack、Gmail、Notion、Postgres）而非宿主磁盘，支持按挂载点设置读/写/执行模式、按命令选择沙箱（进程内 monty、pyodide、quickjs；远程 docker、e2b、daytona），并可在虚拟终端中安装 CLI（git、gh、slack、linear、ntn、gws，或自行注册的程序树）作为命令头词。

- [cinob/dsh-plugin-custom-provider-enhancer](https://github.com/cinob/dsh-plugin-custom-provider-enhancer) —— 自定义模型增强插件：配置第三方提供商时，自动从权威模型库补齐上下文大小、Token 上限、视觉多模态输入与思考强度档位。
- [dsh-plugins/dsh-auxiliary](https://github.com/dsh-plugins/dsh-auxiliary) —— DeepSeek Harness 辅助模型：通过专用模型路由提供视觉理解与上下文压缩能力。
- [edynasty/dsh-opencode-go-provider](https://github.com/edynasty/dsh-opencode-go-provider) —— DSH 的 OpenCode Go provider 插件。
- [RoyougiShiki/dsh-restart-systemd](https://github.com/RoyougiShiki/dsh-restart-systemd) —— DSH WebUI 重启按钮（systemd 版）：侧栏一键重启 dsh-web，WSL/Linux systemd 通道 + Windows 分支，/restart 命令，会话自动续接。
- [Sureo0/deepseek-harness-launcher](https://github.com/Sureo0/deepseek-harness-launcher) —— 无需预装 Node.js / Git / pnpm 即可在 Windows 上零依赖部署 DeepSeek Harness；虚拟环境隔离，不污染系统，删除即卸载。
- [zeronesun/dsh-web-manager](https://github.com/zeronesun/dsh-web-manager) —— 便捷 Shell 脚本，用于管理 DeepSeek Harness (DSH) Web 服务的完整生命周期（启动、停止、重启、状态查看）。
- [ZhenHuangLab/dsh-sync](https://github.com/ZhenHuangLab/dsh-sync) —— 策略驱动的 DeepSeek Harness 配置同步：`$DSH_HOME` 下 sidecar Git、命名空间投影设置、密钥扫描、日志化应用与 `/sync` 命令，并带 Web 设置面板。

- [alex04130/dsh-forge](https://github.com/alex04130/dsh-forge) —— DeepSeek Harness 运行时扩展套件：像 Minecraft Forge 一样锻造、安装、路由、编排插件，不 monkey-patch 任何 npm 包。
- [daifuyang/dsh-plugin](https://github.com/daifuyang/dsh-plugin) —— dsh（DeepSeek Harness）社区插件合集：登录、指标等 Cordis 插件包。
- [loongsuite/pilot-dsh](https://github.com/loongsuite/pilot-dsh) —— LoongSuite Pilot 的 DeepSeek Harness 插件：把会话、LLM 与工具事件记录到本地 JSONL，供 OpenTelemetry GenAI 链路追踪。
- [QvShui/dsh-llm-qwen](https://github.com/QvShui/dsh-llm-qwen) —— Qwen（DashScope）LLM 适配器插件。
- [tianxia--/dsh-llm-local-token](https://github.com/tianxia--/dsh-llm-local-token) —— 复用本机 Codex CLI 与 Claude Code 的 OAuth 凭据，为 DeepSeek Harness 提供 LLM 路由，无需单独配置 API key。
- [wss534857356/dsh-plugin-codex](https://github.com/wss534857356/dsh-plugin-codex) —— 使用本地 Codex 登录态接入 Codex App Server 的模型供应商插件。


- [beijingwahw/dsh-companion-dev](https://github.com/beijingwahw/dsh-companion-dev) —— DeepSeek Companion 开发者版 —— 官方伴侣插件完整功能集：A–J 九大模块（对话导出/交接摘要/成本优化/全局检索 + 执行轨迹分析、Prompt 工程工作台、多模型竞技场、任务编排、安全审计），Cordis 插件化架构。
- [beijingwahw/dsh-companion-enterprise](https://github.com/beijingwahw/dsh-companion-enterprise) —— DeepSeek Companion Enterprise —— 企业级伴侣插件：安全审计与 DLP、团队协作与知识管理、任务编排与断点续跑、多模型竞技场、执行轨迹分析、Prompt 工程工作台。
- [muvuula/DeepSeek-Harness-Core](https://github.com/muvuula/DeepSeek-Harness-Core) —— DeepSeek Harness Core（DHC）· AI 人格核心进化插件。
- [peiyuwang54/deepseek-harness-cli](https://github.com/peiyuwang54/deepseek-harness-cli) —— DeepSeek Harness CLI（非官方）：由 DeepSeek 驱动的开源编码 agent，在本地终端运行。
- [alib8b8/aflare](https://github.com/alib8b8/aflare) — 本地优先的自动化 Agent：数据不出本地，连接你自己的 LLM / 数据库 / 知识库，ReAct 推理，300+ 技能模板，确定性工作流执行（DAG/WAL/Saga/幂等），MCP 协议，离线/内网可用。
- [fire-disposal/dsh-mojibake-interceptor](https://github.com/fire-disposal/dsh-mojibake-interceptor) — 乱码拦截插件包：基于特征的乱码检测、先审后放、pwsh 编码审计。
- [fuilyha56-wq/dsh-for-mofox-ada](https://github.com/fuilyha56-wq/dsh-for-mofox-ada) — Neo-MoFox 的 DeepSeek Harness 集成插件。
- [yhlooo/dsh-bridges](https://github.com/yhlooo/dsh-bridges) — 把 DSH 桥接到已配置其它 Harness Agent 的项目：支持 CodeBuddy / Codex / OpenCode / Claude Code 等。
- [kamanager2012/dsh-community](https://github.com/kamanager2012/dsh-community) —— DSH 社区版：官方 @deepseek-ai/dsh 上的终端 / 桌面发行层。独立仓库，不是官方客户端。
- [SparkElf/deepseek-harness-plus](https://github.com/SparkElf/deepseek-harness-plus) —— DeepSeek Harness Plus：上游 bug 的及时修复、早期特性、实用扩展与精选预设。
- [WSL043/DSH-Portable](https://github.com/WSL043/DSH-Portable) —— 在 Windows 与 macOS 之间随身携带 DeepSeek Harness：会话、设置、插件与工作区。

- [cradler-ai/harness](https://github.com/cradler-ai/harness) —— 为 Cradler Router 预配置的 DeepSeek Harness (dsh)——一条命令、一个 key，跑在自己机器上。
- [Miyazawai/dsh-whale](https://github.com/Miyazawai/dsh-whale) —— 🐳 DSH 傻瓜整合包：以 Oh-DSH 为基座的 DeepSeek Harness 发行版外壳——核心 17 组件开箱即用、三界面（webui/gui/tui）一包切换、模型↔预设联动、一切皆插件。
- [Ritard563/dsh-opencode](https://github.com/Ritard563/dsh-opencode) —— 一个本地反向代理以支持 Opencode 免费模型在 DeepSeek Harness 中正常使用。
- [loongsuite/dsh-plugin](https://github.com/loongsuite/dsh-plugin) —— DeepSeek Harness 的 OpenTelemetry 追踪：把每一轮 agent 执行变成 GenAI span 树——步骤、LLM 调用（含 TTFT）、工具执行、token 用量——通过标准 OTLP 导出到 Jaeger / Grafana Tempo / SigNoz / Langfuse 等任意兼容后端。
- [QiE2035/dsh-llm-headers](https://github.com/QiE2035/dsh-llm-headers) —— DeepSeek Harness 自定义 LLM 请求头插件（上游无描述）。
- [lhf6623/dsh-proxy-config](https://github.com/lhf6623/dsh-proxy-config) —— 代理配置插件：把 HTTP/SOCKS 代理注入 process.env，让插件安装（pnpm/git）走代理。
- [moonquake2004/dsh-doctor](https://github.com/moonquake2004/dsh-doctor) —— DSH 诊断/修复插件（上游无描述）。
- [xu-kai-quan/dsh-tool-diagnose](https://github.com/xu-kai-quan/dsh-tool-diagnose) —— DSH 工具诊断插件（上游无描述）。
- [heidi-dang/flowdeck-dsh](https://github.com/heidi-dang/flowdeck-dsh) —— FlowDeck 的原生 DeepSeek Harness 集成：Cordis 插件包、运行时代理与执行宿主。
- [KeKe0904/deepseek-harness-rainyun](https://github.com/KeKe0904/deepseek-harness-rainyun) —— DeepSeek Harness (dsh) Web UI 一键部署镜像：Docker + 雨云云应用(RCA)模板与上架文档。
- [kevin090820/dsh-wsl-bash](https://github.com/kevin090820/dsh-wsl-bash) —— DeepSeek Harness 的 WSL bash 集成插件（上游未提供描述）。
- [royenheart/dsh-plugin-opencode-omo](https://github.com/royenheart/dsh-plugin-opencode-omo) —— deepseek harness opencode + omo (oh-my-openagent) preset。
- [sqs404/dsh-portable](https://github.com/sqs404/dsh-portable) —— DeepSeek Harness 免安装便携版（Windows）：官方 npm 包 + 内置 Node.js，双击 exe 即用，拷贝到任意 64 位 Windows 电脑独立运行。
- [tsrigo/dsh-from-scratch](https://github.com/tsrigo/dsh-from-scratch) —— 一份可运行的 TypeScript 教程：从零构建一个极简的 DeepSeek 风格 agent harness。
- [wormggmm/dsh-booster](https://github.com/wormggmm/dsh-booster) —— deepseek harness 启动器。
- [ai-thinkshare/dsh-workbench](https://github.com/ai-thinkshare/dsh-workbench) — DSH 工作台插件（无描述）。
- [beijingwahw/dsh-proactive](https://github.com/beijingwahw/dsh-proactive) — DSH Proactive — 主动智能调度插件：自主心跳 + 科学家/理论家双心智（贝叶斯实验设计与定律归纳）+ 能量共生经济 + 好奇心探索 + 安全治理，Raft 共识与热更新。
- [Dingpenghui-good/dsh-conversation-language](https://github.com/Dingpenghui-good/dsh-conversation-language) — 用于在中英文之间切换对话语言的 DSH 插件。
- [ipromise2021/dsh-omc-tui](https://github.com/ipromise2021/dsh-omc-tui) — 面向 DeepSeek Harness 的键盘优先终端 TUI Profile。
- [javen-yan/deepseek-harness-fnos](https://github.com/javen-yan/deepseek-harness-fnos) — 面向 fnOS 的 DeepSeek Harness 原生完整 FPK 安装包。
- [karoc/dsh-model-reasoning](https://github.com/karoc/dsh-model-reasoning) — DSH 模型推理插件（无描述）。
- [mario03690/dsh-allrouter](https://github.com/mario03690/dsh-allrouter) — DSH 全能路由插件（无描述）。
- [MichengAI/dsh-agency-agents](https://github.com/MichengAI/dsh-agency-agents) — DSH agency agents 基于 DeepSeek Harness 的全行业智能体。
- [mytianyi0712/dsh-tui-plugin-OhMyPi](https://github.com/mytianyi0712/dsh-tui-plugin-OhMyPi) — 一个 dsh 的终端样式插件，灵感来自 Oh My Pi。
- [noname-iii/dsh-code-checker](https://github.com/noname-iii/dsh-code-checker) — 一个用于检查 AI 完成代码编写后是否存在错误的 DeepSeek Harness 插件。
- [Onenightcarnival/deepseek-harness-desktop](https://github.com/Onenightcarnival/deepseek-harness-desktop) — DeepSeek Harness（dsh）的桌面安装包：Windows exe 和 macOS dmg。本仓库只包含打包用的 Electron 壳和 CI 配置，不包含上游源码——构建时直接安装 npm 发布版 @deepseek-ai/dsh。
- [sdkwork-ai/sdkwork-birdcoder2](https://github.com/sdkwork-ai/sdkwork-birdcoder2) — SDKWork BirdCoder2：deepseek-harness-desktop 的派生 fork，通过上游 git remote 与上游保持同步。
- [Sovea/deepseek-harness-docker](https://github.com/Sovea/deepseek-harness-docker) — 面向 DeepSeek Harness 的最小化 Docker 部署方案。
- [supengpeng/dsh-plugin-quarantine](https://github.com/supengpeng/dsh-plugin-quarantine) — DeepSeek Harness 插件的崩溃隔离与安全启动监督器。
- [Taler97/dsh-rollback](https://github.com/Taler97/dsh-rollback) — DeepSeek Harness 的文件变更回滚插件。
- [TT-Wang/dsh-assembler](https://github.com/TT-Wang/dsh-assembler) — DSH 汇编器插件（无描述）。
- [V1ki/dsh-plugin-subscriptions](https://github.com/V1ki/dsh-plugin-subscriptions) — 把 ChatGPT (Codex)、Claude 与 Grok (X Premium) 订阅作为 DeepSeek Harness 的 LLM 提供方——Web UI 内 OAuth 登录，无需 API key。
- [white-sand-grand/dsh-plugin-doctor](https://github.com/white-sand-grand/dsh-plugin-doctor) — DSH 插件诊断医生插件（无描述）。
- [xjwwjx/dsh-sonic](https://github.com/xjwwjx/dsh-sonic) — DeepSeek Harness Web 的声音提示插件：需要用户确认时播放提示音，任务完成时播放成功音效。
- [YiGeSama/dsh-preset-run](https://github.com/YiGeSama/dsh-preset-run) — dsh-preset-run：DeepSeek Harness 插件——`preset_run` 工具可在任意 agent preset（router-spec/router-standard/minimal）下无头运行一次性任务，用 `dsh plugin add` 安装。
- [ZZKeepCurious/mini-deepseek-harness-python](https://github.com/ZZKeepCurious/mini-deepseek-harness-python) — 用纯 Python 标准库教学式复刻 DeepSeek Harness——事件溯源、插件总线、agent 循环。仅供学习使用。
- [42ch-dev/dsh-rust-sdk](https://github.com/42ch-dev/dsh-rust-sdk) —— DeepSeek Harness (DSH) 的 Rust SDK。
- [dickpy/dsh-cloud-sync](https://github.com/dickpy/dsh-cloud-sync) —— 通过 WebDAV 同步 DeepSeek Harness 便携式配置与本地插件源。
- [loudMore/dsh-launcher](https://github.com/loudMore/dsh-launcher) —— DeepSeek Harness (dsh) 傻瓜式启动器｜一键安装/更新/维护 dsh 与插件，环境检测，小白友好。
- [rouyiemei/dsh-smart-router](https://github.com/rouyiemei/dsh-smart-router) —— DeepSeek Harness 自动模型路由：难/中/易三档难度分级路由，附带视觉路由，直接使用你在设置→模型里已配置好的模型。
- [Yuki-takuya-kun/dsh-claude-code](https://github.com/Yuki-takuya-kun/dsh-claude-code) —— 让 Claude Code harness 作为 DeepSeek Harness 主循环运行，实时轨迹流式接入 DSH web UI。
- [zynieie/dsh-lan-plugin](https://github.com/zynieie/dsh-lan-plugin) —— 官方短期内无法通过 PR 合入的独立 dsh 插件集合，首发 `@zynieie/dsh-lan-fix`：让 dsh web 在 `http://<局域网IP>:3080`（非安全上下文）下加载而不触发 WebSocket 中断风暴。
- [2672243194/dsh-fetch-data](https://github.com/2672243194/dsh-fetch-data) —— 用于拉取远程数据的 DeepSeek Harness 插件（上游无描述）。
- [ARFCON/DSH_Automatic-update-plugin](https://github.com/ARFCON/DSH_Automatic-update-plugin) —— 自用的 DSH 的更新插件。
- [atesahmet0/dh-workspace](https://github.com/atesahmet0/dh-workspace) —— DeepSeek Harness Workspace。
- [CH4ACKO3/dsh-webui-studio](https://github.com/CH4ACKO3/dsh-webui-studio) —— 隔离式 DSH 插件开发环境 Harmony WebUI Studio。
- [Fantasia-Infinity/dsh-agent-society-combo](https://github.com/Fantasia-Infinity/dsh-agent-society-combo) —— 面向 agent-society 式多代理组合的 DeepSeek Harness 插件套件（上游无描述）。
- [HeWhenJay/dsh-provider-hub](https://github.com/HeWhenJay/dsh-provider-hub) —— 原生 DSH 服务商中心：官方账号 OAuth、API 通道、模型发现、故障切换与日志。
- [ipromise2021/dsh-tui-demo](https://github.com/ipromise2021/dsh-tui-demo) —— 为 DeepSeek Harness 提供的键盘优先终端 TUI 方案。
- [KeLearns/dsh-build-diff](https://github.com/KeLearns/dsh-build-diff) —— 面向 DeepSeek Harness Web GUI 的 agent 循环变更审查工具。
- [kirkchinese/claude2dsh](https://github.com/kirkchinese/claude2dsh) —— Claude Code 迁往/桥接到 DeepSeek Harness 的插件（上游无描述）。
- [lance-kanglu/dsh-ssh-bridge](https://github.com/lance-kanglu/dsh-ssh-bridge) —— DeepSeek Harness (DSH) 本地 SSH 桥接插件：浏览器页面输入密码、本地 API 进行 agent 执行、OpenWrt 路由器管理。
- [loeanxi/dsh-cursor-acp](https://github.com/loeanxi/dsh-cursor-acp) —— 通过 ACP 将独立任务委派给本地 Cursor CLI。
- [morphlinglan/dsh-llm-fallback](https://github.com/morphlinglan/dsh-llm-fallback) —— DeepSeek Harness 插件：为 agent 循环提供提供商/模型降级链。
- [OpenTritium/dsh-codex-shim](https://github.com/OpenTritium/dsh-codex-shim) —— DeepSeek Harness 的 Codex shim 插件（上游无描述）。
- [orangeofcarl0-sys/dsh-large-proj-perf](https://github.com/orangeofcarl0-sys/dsh-large-proj-perf) —— DSH 大会话性能插件：零拷贝 fork + 投影预热 + 分块物化。
- [sgsjsgzy-commits/dsh-subagent-rules](https://github.com/sgsjsgzy-commits/dsh-subagent-rules) —— dsh-subagent-rules 子代理模型与思考强度规定：subagent_flash 锁定 flash 模型路由，思考强度默认 max 且可按会话自定义，分发规则自动注入所有对话。零依赖 DSH 宿主平面插件。
- [zhan-tz/dsh-plugin-runbook](https://github.com/zhan-tz/dsh-plugin-runbook) —— DSH 插件：Jupyter 式活体运行本——回合可回放的数据流 DAG，含 git 提交出处节点、子 agent 交接边、持久账本、悬停重跑与 LLM 解释。
- [zhangjunjesse/dsh-claude-code](https://github.com/zhangjunjesse/dsh-claude-code) —— Claude Code 集成插件（上游无描述）。
- [zjcdkj/dsh-plugins](https://github.com/zjcdkj/dsh-plugins) —— DeepSeek Harness (DSH) 插件集：qwen-image 让纯文本编码模型借千问 VL 读图，返回文本；纯 ESM，安装无需构建授权。
- [A-G-guy/dsh-plugins](https://github.com/A-G-guy/dsh-plugins) —— agguy's DSH Plugins —— DeepSeek Harness 自定义插件 monorepo：移动端硇屏适配 / 任务结束邮件通知 / 子代理独立模型 / 自定义 LLM 路由 / ......
- [ChangedenCZD/dsh-minimal-turbo](https://github.com/ChangedenCZD/dsh-minimal-turbo) —— Deepseek Harness 极简模式 Windows 适配，享用满血 Deepseek-V4 系列模型。
- [gfds2005/dsh-timed-goal](https://github.com/gfds2005/dsh-timed-goal) —— DSH（DeepSeek Harness） Web 插件：在任意对话中配置一次性（或每日重复）任务——一个绝对时间加上要执行的提示词。到点时，插件将对话权限固定为 full access（danger-full-access）并创建一个已武装的 goal，让预设提示词以 /goal 语义自动执行。
- [GMH13552/dsh-timer-scheduler](https://github.com/GMH13552/dsh-timer-scheduler) —— 简单的dsh定时任务插件 支持定时列表任务、ui显示，对于长期任务有益。
- [GraySilver/dsh-task-modes](https://github.com/GraySilver/dsh-task-modes) —— 让每一次 Agent 协作都有明确的工作方式。独立的 DeepSeek Harness Web 插件，可组合的 Execute/Plan、Standard/第一性原理、Off/Adversarial/Acceptance 审查控制。
- [jiefing/HDSL](https://github.com/jiefing/HDSL) —— HDSL —— Manage DeepSeek Harness instances like a Minecraft launcher. 像Minecraft 启动器一样管理DeepSeek Harness实例。
- [Letter2025/dsh-model-failover](https://github.com/Letter2025/dsh-model-failover) —— Two-level model circuit breaker with failover for DeepSeek Harness: trip a model or a whole provider after repeated request failures and route the next request to a configured fallback
- [peterliucius/dsh-prompt-optimize](https://github.com/peterliucius/dsh-prompt-optimize) —— DeepSeek Harness 提示词优化插件（上游未提供描述）。
- [RossBool/dsh-plugins](https://github.com/RossBool/dsh-plugins) —— DeepSeek Harness (DSH) 插件合集：协作编排、跨会话、团队模式、计划引擎、话题时间轴、语音、MCP 管理、提示词增强。
- [1710782766/dsh-llm-vision](https://github.com/1710782766/dsh-llm-vision) —— 为 DeepSeek Harness 上的纯文本模型提供可靠的视觉 + OCR 能力：`describe_image`（普通/关键模式）+ `extract_text` 工具，自动预处理、重试机制以及持久化结果缓存。
- [AbdullahElTiby/dsh-vision-bridge](https://github.com/AbdullahElTiby/dsh-vision-bridge) —— 面向纯文本模型（DeepSeek、pi-ai 路线）的视觉桥接插件：在 llm 流接口处由 Gemini Flash 描述附件图像，并提供 `describe_image` 工具。
- [welsione/dsh-mmx-bridge](https://github.com/welsione/dsh-mmx-bridge) —— 为 DeepSeek Harness (DSH) 提供的 MiniMax 全能力桥接中心：图像理解（VLM）、文生/图生视频、语音、音乐、音频封面、网络搜索、额度查询——封装为一个包装 mmx-cli 的 `mmx_multimodal` 模型工具。
- [xinyuehtx/dsh-plugin-hooks-ordering](https://github.com/xinyuehtx/dsh-plugin-hooks-ordering) —— 为 DeepSeek Harness 的 waterfall 和 serial 执行提供确定性的 hooks 监听排序。
- [abhishekgahlot2/pi-dsh](https://github.com/abhishekgahlot2/pi-dsh) — Pi 编程代理 harness 桥接到 DeepSeek Harness：持久会话、因果历史、可逆组件与审批门控的宿主自扩展。
- [Acidmoon/DIzzy-DSH](https://github.com/Acidmoon/DIzzy-DSH) — 个人 DSH 插件合集。
- [A-G-guy/dsh-plus](https://github.com/A-G-guy/dsh-plus) — DSH+ —— DeepSeek Harness 自定义插件 monorepo：移动端窄屏适配 / 任务结束邮件通知 / 子代理独立模型 / 自定义 LLM 路由 / 更多能力持续迭代。
- [arcships/dsh-llm-aimux](https://github.com/arcships/dsh-llm-aimux) — 基于 aimux 的 DeepSeek Harness（dsh）LLM 适配器 —— 一个 Rust 引擎，325+ 供应商作为 dsh 模型路由。
- [hytime/dsh-thinking-effort](https://github.com/hytime/dsh-thinking-effort) — 调整 DeepSeek Harness 模型思考/推理强度的插件。
- [rand0wn/dsh-minimal-anchor](https://github.com/rand0wn/dsh-minimal-anchor) — DeepSeek Harness（dsh）插件：仅在会话首轮裁剪工具 schema 并注入结构化前言。
- [SwainGao/dsh-plugin-ai-bridge](https://github.com/SwainGao/dsh-plugin-ai-bridge) — 面向 DeepSeek Harness 的 AI 桥接插件，聚焦代码评审场景。
- [xiajiajun516/dsh-config-manager](https://github.com/xiajiajun516/dsh-config-manager) — DeepSeek Harness（DSH）配置的备份/导出/导入/迁移 —— 双面 Cordis 插件（宿主引擎 + Web UI）。任意机器一键还原。
- [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) — DeepSeek 原生的终端 AI 编程 Agent，围绕前缀缓存（prefix-cache）稳定性设计——让它保持常驻运行。
- [firedrakeovo/dsh-fix-dsv4p0813-overfit](https://github.com/firedrakeovo/dsh-fix-dsv4p0813-overfit) — DSH Agent 预设：标准工具集 + 极简首轮系统提示词，用于修复 dsv4p0813 过拟合问题。
- [haveanote06/dsh-llm-kimi](https://github.com/haveanote06/dsh-llm-kimi) — Kimi（月之暗面）LLM 适配插件，面向 DeepSeek Harness：三条线路（kimi-code 订阅 / kimi-cn / kimi-global），支持流式、思考模式、工具调用、图片输入，内置 Kimi 设置页。
- [hgy043/dsh-serial](https://github.com/hgy043/dsh-serial) — DSH 插件：内嵌串口调试工具（扫描/发送/监听/日志），基于 pyserial 脚本驱动 COM/UART 工作流。
- [jasen215/dsh-continual-harness](https://github.com/jasen215/dsh-continual-harness) — 面向持续自我演化的 DeepSeek Harness 插件：持久化记忆、周期性复盘优化、跨会话共享知识、自动回滚——由模型可调用的 harness_refine 工具驱动的 plan→validate→apply→rollback 闭环。
- [Jiyr0119/dsh-service-console](https://github.com/Jiyr0119/dsh-service-console) — DeepSeek Harness 本地开发服务控制台：发现监听端口、展示服务归属，并安全地查看/停止/重启服务。
- [pythonshiyi/dsh-compact-standard](https://github.com/pythonshiyi/dsh-compact-standard) — DeepSeek Harness Agent 预设：完整 Standard 工具集 + 极简输出风格专家提示词。
- [dshbox/cordis-rs](https://github.com/dshbox/cordis-rs) — Cordis（DeepSeek Harness 插件框架核心）的运行时无关 Rust 移植版——作用域依赖注入、生命周期绑定的副作用、事件、结构化日志，零依赖。
- [kazecreator/dsh-settings-pro](https://github.com/kazecreator/dsh-settings-pro) — DeepSeek Harness（dsh）设置增强插件。
- [agents-universe/agents-universe](https://github.com/agents-universe/agents-universe) — 让智能体像人一样学习和工作的 Agent 框架，标记为 DeepSeek Harness 生态项目。
- [alibaba/loongsuite-pilot](https://github.com/alibaba/loongsuite-pilot) — 面向 AI 编程 Agent 的本地优先遥测采集器——统一采集 Claude Code、Codex、Cursor、DeepSeek Harness 等的 OpenTelemetry 事件，涵盖 Token 用量、成本、追踪与安全审计，可导出到任意后端。
- [alxshelepenok/grove](https://github.com/alxshelepenok/grove) — 一套正式的工作流协议，通过机器强制的不变式、可验证证据与结构化上下文，让包括 DeepSeek Harness 的 AI 编程 Agent 在长期项目中保持稳定与连贯。
- [534119219/dsh-custom-provider-reasoning](https://github.com/534119219/dsh-custom-provider-reasoning) — dsh 插件：让自定义提供方（pi-ai 手写路由）的所有模型都能选择思考强度（推理等级），选择经原厂适配器真正发往线上。
- [Antony-Jia/deepseek-harness-desktop](https://github.com/Antony-Jia/deepseek-harness-desktop) — 包裹 `@deepseek-ai/dsh` npm 运行时的轻型 Windows/Tauri 壳：管理运行时进程与桓面体验，不修改不重建上游 DSH 代码。
- [beijingwahw/dsh-nuke-plugin](https://github.com/beijingwahw/dsh-nuke-plugin) — DeepSeek Harness 工业级 Nuke 环境清理引擎－事务回滚·崩溃自恢复·审计链·硬链接去重·趋势预测。
- [c-ling/dsh-plugin-newsboard](https://github.com/c-ling/dsh-plugin-newsboard) — DeepSeek Harness 网页端的 AI 与科技快讯看板：内置 RSS/JSON 源驱动的可拖拽浮窗，支持双语翻译、关键词过滤和设置页。
- [CrombastiC/dsh-macos-notify](https://github.com/CrombastiC/dsh-macos-notify) — DeepSeek Harness 的 macOS 原生通知插件。
- [GraySilver/dsh-evolve-modes](https://github.com/GraySilver/dsh-evolve-modes) — 具备可组合任务控制与隔离、人工审核的自我进化能力的 DeepSeek Harness Web 插件。
- [GuoMonth/dsh-isolated-runtime](https://github.com/GuoMonth/dsh-isolated-runtime) — 面向 DeepSeek Harness（DSH）的 Kubernetes 原生隔离运行时：一租户一 Pod，强隔离、可恢复会话、可插拔运行时镜像。
- [hairyf/deepseek-harness-desktop](https://github.com/hairyf/deepseek-harness-desktop) — DeepSeek Harness Tauri 桌面版 | 仅 5MB 安装包，零环境搭建，Windows / macOS / Linux 均可。
- [lkdx0220/Genshin-odette-skin-dsh](https://github.com/lkdx0220/Genshin-odette-skin-dsh) — 原神珠迪皮肤 / 主题插件，适配 DeepSeek Harness。
- [llyyhh0487/desk-harness](https://github.com/llyyhh0487/desk-harness) — DESK HARNESS — DeepSeek Harness 的 Windows 桌面壳：自动部署并拉起本地 dsh 服务，托盘顷留、终端停靠面板、dsh-plugin 插件商店，开箱即用。
- [magian1127/deepseek-harness-zh_pro](https://github.com/magian1127/deepseek-harness-zh_pro) — DeepSeek Harness（DSH）中文增强插件。
- [nightBrise/Oh-My-DSH](https://github.com/nightBrise/Oh-My-DSH) — 为 Deepseek Harness 设计的综合插件包。
- [TinyPanda168/SpecsRelay-DSH](https://github.com/TinyPanda168/SpecsRelay-DSH) — DSH Desktop 的 DeepSeek 对话捕获与需求传递插件。
- [Townrain/dsh-fetch-models-unselect-all](https://github.com/Townrain/dsh-fetch-models-unselect-all) — 为 DSH 设置 > 模型“拉取可用模型”对话框添加一键全不选按钮（仅客户端插件）。
- [ZTCNO0NE/dsh-loom](https://github.com/ZTCNO0NE/dsh-loom) — Loom（织机）— DeepSeek Harness 的外部教练 / 二道验证器：静静演化你的 agent 的工具、技能、配置与模型，具备确定性验证与冷应用。
- [chunsi-w/dsh-trajectory-governor](https://github.com/chunsi-w/dsh-trajectory-governor) —— 面向 DeepSeek Harness 的闭环轨迹策略平面插件。
- [CypherNaught-0x/dsh-subagent-dynamic-model](https://github.com/CypherNaught-0x/dsh-subagent-dynamic-model) —— DeepSeek Harness 插件：根据用户偏好自动把子任务分派给不同模型。
- [kanchengw/dsh-mindseye](https://github.com/kanchengw/dsh-mindseye) —— 为纯文本模型插上视觉能力的 DSH 插件：原生多模态交互、分层记忆缓存与意图路由。
- [litefuse/dsh-litefuse-plugin](https://github.com/litefuse/dsh-litefuse-plugin) —— DeepSeek Harness 的 Litefuse 插件：面向 Agent 的可观测性与评测。
- [monotykamary/dsh-fabric](https://github.com/monotykamary/dsh-fabric) —— 为 DeepSeek Harness 提供 Fabric 风格的确定性压缩、受检代码执行、持久协调与实时拓扑。
- [PerryLink/dsh-click](https://github.com/PerryLink/dsh-click) —— 面向 DeepSeek Harness 的跨平台原生桌面控制（优先支持 Windows）：截图、读屏、点击/输入/滚动/按键、应用列表/启动——全程审批门控，绝不抢占前台焦点。
- [PerryLink/dsh-fast](https://github.com/PerryLink/dsh-fast) —— DeepSeek Harness 只读性能诊断：会话加载（打开/恢复）耗时、溢出命中数、压缩次数与触发原因、上下文注入量（AGENTS.md/skills/工具schema 的 token 占比）与 LLM 缓存命中率，通过 /fast 命令与 fast_report 工具展示，持久化可复原。
- [PerryLink/dsh-local-ai](https://github.com/PerryLink/dsh-local-ai) —— DeepSeek Harness 的本地模型（Ollama）集成：发现、拉取、删除与检视本地模型，按任务类型或关键词路由请求并自动回退到云端，/ollama 一键查看状态总览。
- [PerryLink/dsh-observe](https://github.com/PerryLink/dsh-observe) —— DeepSeek Harness 的 OpenTelemetry 与 Langfuse 可观测性导出器：turn/step/tool/LLM span，token 与成本指标，脱敏的 prompt/completion 采集，异步批处理、有界离线缓冲与退避重试。
- [PerryLink/dsh-score](https://github.com/PerryLink/dsh-score) —— 面向 DeepSeek Harness 插件的多维质量评分：对单个仓库或 npm 包从安装成功率（消费 dsh-test-drive 结果）、维护活跃度、文档完整度、安全扫描与协议合规性打分——每条结论都有真实 CLI 证据与审计时间戳支撑。
- [PerryLink/dsh-test-drive](https://github.com/PerryLink/dsh-test-drive) —— 面向 DeepSeek Harness 插件的隔离式安装+冒烟测试：把仓库或 npm 包安装进一次性 DSH_HOME profile，校验 bundle patch 层与启动日志，输出结构化的通过/失败结果矩阵（JSON/Markdown）供打分流水线使用，并隔离清理自己拥有的所有临时目录。
- [PerryLink/dsh-translate](https://github.com/PerryLink/dsh-translate) —— DeepSeek Harness 的厂商参数转换与确定性 JSON 修复：/translate 在 11 家厂商间映射 temperature/top_p/max_tokens/stop/system 参数，后置修复层（附 fix_json）修复损坏的 JSON 工具输出且绝不臆造数据。
- [Poepon/dsh-image-generation-responses](https://github.com/Poepon/dsh-image-generation-responses) —— DeepSeek Harness 图像生成 provider 插件（responses API）。
- [TuringCorp-net/dsh-boot-restore](https://github.com/TuringCorp-net/dsh-boot-restore) —— DSH 插件：服务重启后自动恢复最后一个活跃（在值）会话，使定时任务能无人值守运行。
- [Zhuchen00123/dsh-compaction-cacheaware](https://github.com/Zhuchen00123/dsh-compaction-cacheaware) —— 面向 DeepSeek Harness (DSH) 的 Reasonix 风格缓存感知压缩后端，模块化 compact 插件，从 esengine/DeepSeek-Reasonix 自动同步。
- [clarknu/dsh-gateway](https://github.com/clarknu/dsh-gateway) —— 面向 DeepSeek Harness Web 面的自包型 HTTPS 远程接入网关——将 Caddy 层封装为 dsh 插件。
- [iceleaf916/dsh-launcher](https://github.com/iceleaf916/dsh-launcher) —— dsh（DeepSeek Harness）系统托盘管理器：launchd 托管 dsh web 常驻，菜单栏控制重启/停止/启动，--patch 零侵入挂载控制面插件。
- [secretxuan/dsh-computer-use-win](https://github.com/secretxuan/dsh-computer-use-win) —— 面向 DeepSeek Harness 的 Windows 电脑操作（computer-use）插件。
- [thirsty5034/dsh-ssh-tunnel](https://github.com/thirsty5034/dsh-ssh-tunnel) —— DSH 社区插件：多主机 SSH 隧道 + SSHManager（better-sidebar）。
- [dsh-io/dsh-arm64](https://github.com/dsh-io/dsh-arm64) —— DeepSeek Harness（dsh）官方 Linux aarch64 部署包——预编译 node-pty，GitHub Releases 分发。
- [EIGHTfs/dsh-test-env-entry](https://github.com/EIGHTfs/dsh-test-env-entry) —— DSH 测试环境入口插件：状态面板 + 正式⇄测试互相跳转 + 启停控制（多测试实例并存）。
- [NOirBRight/dsh-llm-ollama](https://github.com/NOirBRight/dsh-llm-ollama) —— 面向 DeepSeek Harness 的原生 Ollama Cloud 提供商与 Web 配置插件。
- [SpookySandwich/deepseek-harness-windows](https://github.com/SpookySandwich/deepseek-harness-windows) —— 适配 Windows 的 DeepSeek Harness。
- [VitaTsui/deepseek-harness-suite](https://github.com/VitaTsui/deepseek-harness-suite) —— 带桌面应用、插件市场与终端 UI 的 DeepSeek Harness 套件：一切皆插件。
- [flg1217/dsh-llm-agy](https://github.com/flg1217/dsh-llm-agy) —— AGY (Antigravity CLI) 接入 DeepSeek Harness：LLM 适配子代理、深度网络搜索、连通性诊断面板。
- [Gumiho12345/dsh-plugin-net-access](https://github.com/Gumiho12345/dsh-plugin-net-access) —— 为 DeepSeek Harness(dsh) 新增 Net Access 模式，用于解决 Windows 沙箱内 curl.exe 无法访问 HTTPS 的问题，文件写保护不变。
- [HenryZ838978/deepseek-harness](https://github.com/HenryZ838978/deepseek-harness) —— 面向官方 DeepSeek Harness（Node）的 Python 侧见证栈：五个 `dsh doctor --node` 探测项，每一个都能报告 Node 运行时报不出来的问题。
- [KhalilYamber/dsh-envoy](https://github.com/KhalilYamber/dsh-envoy) —— Hana 插件：把 coding 任务外包给本机 DeepSeek Harness，审批同步回 Hana 内决策，结果以原生卡片带回。
- [kolawong/dsh-plugin-j-space](https://github.com/kolawong/dsh-plugin-j-space) —— J-Space Cognition Suite V3.6 - 面向 DeepSeek Harness (DSH) 的推理时认知控制与深度推理插件。
- [MrLukezy/dsh-cloud-gateway](https://github.com/MrLukezy/dsh-cloud-gateway) —— 面向 DeepSeek Harness 云部署的登录墙与公共网关插件。
- [qmy777/cordis-host-runner-inspect-upsert](https://github.com/qmy777/cordis-host-runner-inspect-upsert) —— DeepSeek Harness 兑方补丁：Host Cordis inspect 幂等注册（修复自定义模式切换失败/无法操作会话）。
- [seanwhy/dsh-restart-confirm](https://github.com/seanwhy/dsh-restart-confirm) —— DSH 插件：侧边栏一键重启（WebUI 与后台），强制二次确认，自动重新拉起，跨平台。
- [techysy/deepseek-harness-fnos](https://github.com/techysy/deepseek-harness-fnos) —— DeepSeek Harness（DeepSeek 官方 agent 浏览器 UI）fnOS 应用 —— 本地常驻服务。
- [TencentCloud/tencentcloud-agentobs-sdk-dsh](https://github.com/TencentCloud/tencentcloud-agentobs-sdk-dsh) —— tencentcloud-agentobs-sdk-dsh 是一个 DeepSeek Harness (DSH) 可观测插件，直接将 GenAI trace 数据上报到腾讯云日志服务 (CLS)。它观察 DSH 原生的 session、agent loop、LLM stream 和 tool 生命周期，将其转换为腾讯云 AI Agent 可观测规范的 5 层 span 层级模型（entry → agent → step → chat → tool），并通过 tencentcloud-cls-sdk-js 直接上报到 CLS，无需额外部署 OTLP 收集器或 sidecar。
- [wloops/dsh-git-worktree](https://github.com/wloops/dsh-git-worktree) —— 面向 DeepSeek Harness 的 Domi 级 git worktree 隔离交付方案：永久 worktree、ready-for-review / apply / finish / discard 生命周期、冲突处理、安全清理。
- [xiajingchun/dsh-nebulagraph-v5](https://github.com/xiajingchun/dsh-nebulagraph-v5) —— 面向 deepseek harness 的 nebula v5 插件。
- [xiaoliang2/dsh-compact-after-task](https://github.com/xiaoliang2/dsh-compact-after-task) —— 设置 dsh 自动压缩阈值插件。
- [Zding89/dsh-model-presets](https://github.com/Zding89/dsh-model-presets) —— 在 DeepSeek Harness 中保存并切换模型与推理强度预设。

## 安全与权限

_权限规则、审批复核、安全审计与调用前 policy-check 插件。_

- [PerryLink/dsh-permission-rules](https://github.com/PerryLink/dsh-permission-rules) —— Claude Code 式声明权限规则（allow/deny/ask）。
- [PerryLink/dsh-auto-review](https://github.com/PerryLink/dsh-auto-review) —— 二次模型自动审核 approval 请求。
- [PerryLink/dsh-skill-pack-security](https://github.com/PerryLink/dsh-skill-pack-security) —— 安全审计 skill 包（密钥扫描/依赖审计）。
- [agentic-control-plane/dsh-acp-plugin](https://github.com/agentic-control-plane/dsh-acp-plugin) —— 工具调用前的 policy-check。
- [securstack/securstack-dsh-plugin](https://github.com/securstack/securstack-dsh-plugin) —— 仓库安全扫描适配器。
- [Areium/dsh-fail-logger](https://github.com/Areium/dsh-fail-logger) —— 自动记录工具调用失败原因并沉淀改进建议。
- [lonelymoon87/dsh-guardian](https://github.com/lonelymoon87/dsh-guardian) —— DeepSeek Harness 的运行时工具策略、危险命令拦截与输出脱敏。
- [cyzlmh/dsh-cyber-sec](https://github.com/cyzlmh/dsh-cyber-sec) —— 面向 DeepSeek Harness 的授权安全评估 profile：限范围网络工具、容器化 shell、授权护栏、持久证据、21 个安全 skill 与 7 个专家子 agent。
- [Elaina-real/dsh-tiered-approval](https://github.com/Elaina-real/dsh-tiered-approval) —— DeepSeek Harness 的分档自动复审：静态规则安全网 + LLM 审核员 + 人工兼底 —— 自动放行安全动作、拒绝不可逆动作、其余交给人工。
- [moon09300731/dsh-approval-gate](https://github.com/moon09300731/dsh-approval-gate) —— 自动审批门控：Flash 预判写入/命令是否不可回补，安全操作自动批准、危险操作转人工（fail-safe）。
- [Ox0400/dsh-vault](https://github.com/Ox0400/dsh-vault) —— DeepSeek Harness 的加密凭据金庫 —— AES-256-GCM + TOTP，附模型工具与设置 UI。
- [dingge001/dsh-redact](https://github.com/dingge001/dsh-redact) —— DSH 运行时密钥与 PII 脱敏插件：掩码处理、可逆保险库、执行期替换。
- [lukethecat/dsh-plugin-warroom-garak](https://github.com/lukethecat/dsh-plugin-warroom-garak) —— 面向 Garak 风格安全红队测试流程的 DeepSeek Harness 插件包（上游未提供描述）。
- [slywalker2006/dsh-passwords](https://github.com/slywalker2006/dsh-passwords) —— DSH 登录门户：首次运行配置、静态加密、防暴力破解锁定、审计日志、HTTPS。

- [my-dsh-plugin/readonly-security-audit](https://github.com/my-dsh-plugin/readonly-security-audit) —— DeepSeek Harness 只读安全审计模式。


- [GuoMonth/dsh-multi-tenant](https://github.com/GuoMonth/dsh-multi-tenant) —— DeepSeek Harness 多租户 SaaS 扩展：租户身份、会话隔离、授权、租户感知 MCP 与审计。
- [TecFancy/dsh-auth-gate](https://github.com/TecFancy/dsh-auth-gate) —— DeepSeek Harness 网页版登录门插件：账号口令或共享令牌认证、会话 cookie、登录限速，附用户管理 CLI。
- [cdxiaodong/dsh-guardian](https://github.com/cdxiaodong/dsh-guardian) —— Agent 安全护栏：拦截并审计所有工具调用，命中敏感操作就要求人工确认。

- [abstudio-cn/Harness-totp-authenticator](https://github.com/abstudio-cn/Harness-totp-authenticator) —— DeepSeek Harness 的 TOTP 两步验证安全插件。
- [lin293387-del/dsh-termux-sandbox](https://github.com/lin293387-del/dsh-termux-sandbox) —— 让 DeepSeek Harness 在 Android/Termux 上可运行的沙箱插件：在 bwrap 与 Landlock 均不可用时采用坦诚的全权限策略。
- [pppolf/dsh-webgate](https://github.com/pppolf/dsh-webgate) —— DSH 远程访问插件：内网二维码 / cloudflared 隧道 / frp+自有服务器（含登录门户）。
- [wangyong1972/dsh-auto-approval](https://github.com/wangyong1972/dsh-auto-approval) —— DeepSeek Harness 自动审批插件（上游无描述）。
- [ADWMC/helm-d](https://github.com/ADWMC/helm-d) —— DeepSeek Harness 破甲一体化安全分析插件：Android · Web · Native · Protocol · Malware · AI-Security 全领域聚合（9 bundle + 1 preset）。
- [rice-awa/dsh-lan-gateway](https://github.com/rice-awa/dsh-lan-gateway) —— 把 DeepSeek Harness 的 Web GUI 安全地开放到局域网或公网，支持 TLS。局域网来源免密码，其他来源需登录 + HMAC cookie 校验。
- [xgone/dsh-remote](https://github.com/xgone/dsh-remote) —— 让 DeepSeek Harness 可以被安全地远程访问：账号密码认证 + MFA（TOTP）登录门禁、签名会话 Cookie、角色权限、浏览器内目录选择器、账号管理设置页。
- [1052326311/dsh-plan-lattice](https://github.com/1052326311/dsh-plan-lattice) — DeepSeek Harness 插件：面向长时间 AI 任务的执行期漂移防火墙，区分陈旧基础篡改与合法工作、Plan Lattice 治理下的变更。
- [re-ITRT/dsh-file-fix](https://github.com/re-ITRT/dsh-file-fix) — DeepSeek Harness 插件：统一文件导入——字节级上传存储、文件列表上下文注入、read_attachment/place_attachment 工具、历史文件气泡。
- [534119219/chicheng-gate](https://github.com/534119219/chicheng-gate) —— DSH Web 插件：局域网/远程访问控制、frpc 内网穿透、面板密码门禁与手机端 UI 适配。
- [Hakunm/dsh-approve-for-me](https://github.com/Hakunm/dsh-approve-for-me) —— 为 DeepSeek Harness 添加“代我审核”功能，让 AI 替你审查 DSH 的敏感操作，而不是直接交出全部权限。Fail-closed 自动审核，可选审核模型，可见的 WebUI 决策。
- [MRZHUH/dsh-remote-server](https://github.com/MRZHUH/dsh-remote-server) —— 在 DeepSeek Harness 会话中用 @ 提及一台服务器，通过 SSH 在其上运行命令，两级审批闸门默认失败关闭（fail closed）。
- [raomaiping-hash/dsh-rgate](https://github.com/raomaiping-hash/dsh-rgate) —— Remote access login gate for the DeepSeek Harness Web UI — password wall, full /api gating, scrypt credentials, audit logs.
- [hxy91819/dsh-auth](https://github.com/hxy91819/dsh-auth) —— 为 DeepSeek Harness 提供的开箱即用 Nginx 认证方案：Argon2id 密码哈希、可撤销会话、双语界面，无需 fork 上游。
- [Leeaoyin/dsh-agent-harness-audit](https://github.com/Leeaoyin/dsh-agent-harness-audit) —— 使用 DeepSeek Harness 审计某个 agent harness 的稳定性。
- [AndersOnLin4/dsh-remote-gateway](https://github.com/AndersOnLin4/dsh-remote-gateway) —— DeepSeek Harness 远程控制套件：网页、Windows 桌面端、Android App 三形态，安全网关 + 实时推送 + 多端会话管理，出门在外也能监控、回复、答题。
- [PerryLink/dsh-defend](https://github.com/PerryLink/dsh-defend) —— 面向 DeepSeek Harness 的提示注入、越狱与密钥泄露防护：基于 Aho-Corasick 检测，支持 allow/ask/block 拦截与脱敏审计事件。
- [PerryLink/dsh-mask](https://github.com/PerryLink/dsh-mask) —— DeepSeek Harness 的 PII 掩码中间件：在到达模型前把姓名、电话、邮箱、身份证、银行卡、密钥与地址匿名化为占位符，在展示层还原，还原表仅保存在内存与受控存储域中，绝不记录明文，并提供 /mask 命令与 mask_test 工具。
- [CanGeng/yolo-mode](https://github.com/CanGeng/yolo-mode) —— DeepSeek Harness 的无人看管全权限（yolo）时间窗：人工专属 /yolo 开关、惰性过期自动回滚、灾难性命令红线报警，及桌面/webhook/邮件通知。
- [yauntyour/DSH-Encrypt](https://github.com/yauntyour/DSH-Encrypt) —— DeepSeek Harness 凭据加密插件：通过设密码实现 AES-256-GCM+SHA3-256 全流程加密+校验，运行时临时解密，内存安全。
- [ChaoYuZhang001/dsh-gate](https://github.com/ChaoYuZhang001/dsh-gate) —— 面向 DeepSeek Harness 插件与 Desktop 社区目录的兼容性、来源与权限门禁。
- [myfire2014/dsh-admin-gateway](https://github.com/myfire2014/dsh-admin-gateway) —— dsh-admin-gateway：DeepSeek Harness（dsh）管理员验证网关插件，只需一个绑定在 Cloudflare 的域名。

- [JohnXu22786/safety-net](https://github.com/JohnXu22786/safety-net) — 编码 agent 的破坏性命令拦截闸门：在 rm -rf、git reset --hard、git push --force 等命令落地前解析语义、判定风险，并要求人工确认
- [JohnXu22786/secret-guard](https://github.com/JohnXu22786/secret-guard) — 安全插件：在文件工具执行前拦截对 .env、凭据、密钥文件等敏感文件的读写，防止 API 密钥泄漏，并对工具结果做内容掩码兜底
- [shaoshi20/dshscan](https://github.com/shaoshi20/dshscan) —— DShScan —— 受 NVIDIA SkillSpector 启发的 DSH 插件安全扫描工具。
- [unStone/dsh-xray](https://github.com/unStone/dsh-xray) —— DeepSeek Harness 插件的 X-ray：声明能力与实际行为对比，内建注册表、静态扫描器与徽章。

## 会话与记忆管理

_跨会话记忆、checkpoint、会话置顶与导航插件。_

- [reshuibuduo/TMCRA-Agent-Memory](https://github.com/reshuibuduo/TMCRA-Agent-Memory) —— 面向 DSH 与 Codex 的技术预览版本机图记忆：每轮前召回用户全局与当前项目证据，分别保存 USER 与 ASSISTANT 记录，并保留项目、会话、角色和来源信息。
- [bowenliang123/dsh-context](https://github.com/bowenliang123/dsh-context) —— 上下文洞察面板：一眼看清模型上下文窗口的组成与变化——构成对照窗口大小、按请求历史趋势、压缩/注入事件、消息级 token 统计。
- [PerryLink/dsh-memento](https://github.com/PerryLink/dsh-memento) —— 基于 SQLite 的有界跨会话记忆。
- [Phant0Meow/dsh-meow-memory](https://github.com/Phant0Meow/dsh-meow-memory) —— 跨会话项目记忆：node:sqlite 七层存储（soul/user/project/fact/lesson/topic/rules），首条用户消息缓存友好注入，memory_remember/search/find_similar/read/update/project 工具，逐消息关键词命中，按窗口夜间整理（dream）。
- [Spirtxiaoqi7/mindspace-dsh-session-memory](https://github.com/Spirtxiaoqi7/mindspace-dsh-session-memory) —— 会话隔离的个性化记忆。
- [PerryLink/dsh-checkpoint-rewind](https://github.com/PerryLink/dsh-checkpoint-rewind) —— git 快照 checkpoint + `/rewind` 命令回滚。
- [alooshxl/dsh-session-pins](https://github.com/alooshxl/dsh-session-pins) —— 会话置顶菜单。
- [PerryLink/dsh-session-pin](https://github.com/PerryLink/dsh-session-pin) —— 会话置顶。
- [malevrigns/dsh-session-stars](https://github.com/malevrigns/dsh-session-stars) —— 收藏会话。
- [xiaoshenming/dsh-session-surgeon](https://github.com/xiaoshenming/dsh-session-surgeon) —— 修好打不开的 DSH 会话（seq gap / 损坏的 zstd）。侧栏「会话医生」，默认 dry-run。
- [XiLuovo/dsh-session-timeline](https://github.com/XiLuovo/dsh-session-timeline) —— 会话时间轴 UI。
- [unnnnoooo/dsh-cue-plugin](https://github.com/unnnnoooo/dsh-cue-plugin) —— 跨会话引用/cue。
- [Amengclass/dsh-memory](https://github.com/Amengclass/dsh-memory) —— 持久化、可被模型编辑的记忆/笔记存储：新增 `memory_set`/`get`/`delete`/`search` 工具，基于 `ctx.storageDomain` 跨会话保存事实。
- [Bleed00/dsh-claude-mem](https://github.com/Bleed00/dsh-claude-mem) —— 集成 claude-mem 的 DeepSeek Harness 记忆插件。
- [PerryLink/dsh-claude-move](https://github.com/PerryLink/dsh-claude-move) —— 将 Claude Code 会话、记忆、skills 与 CLAUDE.md 迁移进 DSH，无缝恢复。
- [elementor-i/dsh-agentmemory](https://github.com/elementor-i/dsh-agentmemory) —— 为 DeepSeek Harness 提供 agentmemory 能力：完整 `memory_*` 工具、捕获钩子、基于本地 REST 服务的上下文注入。
- [IAMLieutenant/dsh-tool-user-memory](https://github.com/IAMLieutenant/dsh-tool-user-memory) —— DeepSeek Harness 用户记忆插件。
- [Aloneswork/deepseek-harness-evolving-memory](https://github.com/Aloneswork/deepseek-harness-evolving-memory) — DeepSeek Harness 本地语义演化式长期记忆插件。
- [fengshenx/dsh-recall](https://github.com/fengshenx/dsh-recall) — DSH 插件：recall 工具——模型可搜索并读取自己会话的完整事件日志，包括被压缩（compaction）遮蔽的内容；`dsh plugin add` 一条命令安装。
- [GIT121995/dsh-memory-cbdc-plugin](https://github.com/GIT121995/dsh-memory-cbdc-plugin) — DeepSeek Harness 轻量本地长期记忆插件——基于 SQLite，有界召回，无需额外模型调用。
- [cwbcheng/dsh-knowledge-graph](https://github.com/cwbcheng/dsh-knowledge-graph) — DSH Cordis 插件：将任意源文本转化为 AI 知识图谱（事实/推论/概念/定义/示例/反例/规则），并与原文双向链接。
- [LeslieWylie/dsh-session-search-pro](https://github.com/LeslieWylie/dsh-session-search-pro) — DeepSeek Harness 跨会话全文高级搜索，基于内置 sessionQuery 服务。
- [tsonglew/dsh-workspace-search](https://github.com/tsonglew/dsh-workspace-search) — DeepSeek Harness 中类 VS Code 的工作区关键词搜索：dsh-better-sidebar 中的 Search 标签页。
- [030611/dsh-verification-receipt](https://github.com/030611/dsh-verification-receipt) — DeepSeek Harness 隐私最小化的启发式逐轮验证摘要（"凭证"）。
- [GIT121995/dsh-memory-gate](https://github.com/GIT121995/dsh-memory-gate) — DeepSeek Harness 的 CBDC 门控记忆插件：决定检索到的记忆如何被使用（使用/校验/忽略 + 反馈学习 + 审计），而不只是存储。
- [EveGoodEvening/dsh-llmwiki](https://github.com/EveGoodEvening/dsh-llmwiki) —— 本地优先、证据支持的 Markdown wiki 插件（Karpathy llm-wiki 概念）：源记录按内容哈希不可变保存，合成页面引用源 ID，确定性章节索引支持词法检索。
- [jiayuxuan123/dsh-session-history-fix](https://github.com/jiayuxuan123/dsh-session-history-fix) —— DeepSeek Harness 会话历史修复插件。
- [volcengine/OpenViking (dsh-memory-plugin)](https://github.com/volcengine/OpenViking/tree/main/examples/dsh-memory-plugin) —— 基于 OpenViking 上下文数据库的 DeepSeek Harness 自演化上下文/记忆插件：将会话记忆、知识 RAG 与技能统一在一个存储/检索层，以 DSH 记忆工具的形式暴露。

- [huahai0202/dsh-better-archive](https://github.com/huahai0202/dsh-better-archive) —— DeepSeek Harness Web 插件：归档会话面板，支持取消归档与删除。
- [lmst2/dsh-asc](https://github.com/lmst2/dsh-asc) —— dsh-asc（Agentic Surface Compaction）：DeepSeek Harness 上下文管理与压缩插件。
- [reinocheong/dsh-session-move](https://github.com/reinocheong/dsh-session-move) —— 在 Web UI 中管理 DeepSeek Harness 会话：拖拽/菜单移动至其他文件夹、永久删除、基于对话摘要的 AI 重命名，并附带 agent 工具。
- [xzyonline/dsh-file-attachments](https://github.com/xzyonline/dsh-file-attachments) —— 会话绑定的文件附件插件：安全检测 + 对办公/文本/压缩格式的有界读取器。

- [crwsr124/dsh-memflow](https://github.com/crwsr124/dsh-memflow) —— DeepSeek Harness 记忆框架插件：MEMFLOW 记忆流模式——感知先行、边做边记、会话结束记忆不丢；分布式记忆架构，每个项目独立记忆。
- [haoyuan-sjtu/Deepseek-Harness-Lifelong-Agent](https://github.com/haoyuan-sjtu/Deepseek-Harness-Lifelong-Agent) —— 面向 AI agent 的有治理长期记忆内核，含 DeepSeek Harness 技术预览适配契约。
- [seekerwxy/dsh-session-tabs](https://github.com/seekerwxy/dsh-session-tabs) —— 浏览器式会话标签页导航栏：每个打开的会话一个标签，点击切换、关闭或新建会话。


- [huguangyu666/dsh-plugin-session-import](https://github.com/huguangyu666/dsh-plugin-session-import) —— 把 claude-code / codex / reasonix / zcode 会话导入 DeepSeek Harness。
- [JuneLearn/dsh-session-import](https://github.com/JuneLearn/dsh-session-import) —— 会话导入与校验插件：导入并校验 DSH 会话导出，支持验证、状态同步、回滚保护与应用内 UI。
- [polarskicpl/dsh-codex-migrate](https://github.com/polarskicpl/dsh-codex-migrate) —— DeepSeek Harness 的 Codex 迁移插件（上游未提供描述）。
- [a771853580/dsh-hindsight-plugins](https://github.com/a771853580/dsh-hindsight-plugins) — DSH 的 Hindsight 外部记忆管家：设置页图形界面、官方适配器自动检测与安装、主动同步开关，装完即用无需命令行。
- [DimitriLIAN/dsh-archive-viewer](https://github.com/DimitriLIAN/dsh-archive-viewer) — 在 DeepSeek Harness Web 设置里列出并恢复已归档会话。
- [lileikeji/dsh-auto-compact](https://github.com/lileikeji/dsh-auto-compact) — 自动上下文压缩：token 压力驱动的摘要检查点，默认 LATE 触发，带设置卡片。
- [Saikel-Orado-Liu/dsh-archive-manager](https://github.com/Saikel-Orado-Liu/dsh-archive-manager) — DSH Web GUI 的归档会话管理（查看 / 取消归档 / 永久删除），不改动官方包。
- [scd13150/dsh-cognition](https://github.com/scd13150/dsh-cognition) — 基于 DSH 原生原语构建的项目记忆：约束 / 观察 / 记忆 / 验证。
- [ccch713/deepddw](https://github.com/ccch713/deepddw) —— DeepSeek Harness 的记忆与知识库——局域网内任意设备可访问。
- [genusamblyrhynchusbrunooftoul602/dsh-attachment-formats](https://github.com/genusamblyrhynchusbrunooftoul602/dsh-attachment-formats) —— 扩展 DeepSeek Harness 输入框以 Codex 风格接受 PDF 等更多附件格式，零核心改动、复用原生管线。
- [orangeofcarl0-sys/dsh-fresh-start](https://github.com/orangeofcarl0-sys/dsh-fresh-start) —— DSH `/fresh` 命令：总结对话、开启新会话、归档旧会话。
- [Relistencode/dsh-recall](https://github.com/Relistencode/dsh-recall) —— DeepSeek Harness (DSH) 的对话历史回忆插件——对过往对话做字面/模糊/语义检索，完全本地离线。AI 不再忘记你说过的话。
- [whycantiusemyname/dsh-epoch-reanchor](https://github.com/whycantiusemyname/dsh-epoch-reanchor) —— DSH 插件：对压缩后的 We/Let's 推理做 A/B 测试——Minimal 优先的 epoch，首次工具调用后开放完整工具。
- [z953218350/dsh-archive-manager](https://github.com/z953218350/dsh-archive-manager) —— DSH Web UI 的 Codex 风格归档会话管理器——在设置页查看、搜索、恢复与删除归档会话。
- [z953218350/dsh-history-tree](https://github.com/z953218350/dsh-history-tree) —— DSH Web UI 的 Codex 风格对话轮次时间线与悬停历史概览。

- [bobostudio/dsh-session-lens](https://github.com/bobostudio/dsh-session-lens) —— DSH 会话洞察与脱敏分享插件：一键会话分析 + 隐私安全的单文件 HTML 导出。
- [Rosmarinus-Young/dsh-thinking-summary](https://github.com/Rosmarinus-Young/dsh-thinking-summary) —— 在 deepseek harness 中每一步思考后自动总结思考内容（调用 flash 模型）。
- [Tudo9710/obsidian-dsh](https://github.com/Tudo9710/obsidian-dsh) —— DeepSeek Harness 的 Obsidian 集成插件（上游无描述）。
- [wang-jie-git/dsh-memory](https://github.com/wang-jie-git/dsh-memory) —— DSH 插件：AI-memory 语义记忆系统完整集成（含设置 UI）——14 个记忆管理工具 + 设置页面 + 符合官方规范。
- [xiaohj233/dsh-magic-context](https://github.com/xiaohj233/dsh-magic-context) —— Magic Context 的 DSH 社区移植：跨 harness 共享 SQLite 记忆，harness='dsh' 行隔离。
- [xuy01/dsh-change-trace](https://github.com/xuy01/dsh-change-trace) —— DeepSeek Harness 的变更叙事与指令追溯插件：每条人类指令的卡片展示文件改动、工具调用结果、思考节选，以及子代理工作流树（可点击钻入子代理自己的会话）。
- [0mn1si2i5/dsh-handoff](https://github.com/0mn1si2i5/dsh-handoff) —— 在 DeepSeek Harness 会话之间保存/加载开发交接文档（`/handoff save | load`，含确定性脱敏与 Git 状态捕获）。
- [21hbguo/dsh-session-batch-manager](https://github.com/21hbguo/dsh-session-batch-manager) —— DeepSeek Harness (DSH) Web GUI 插件：批量选择会话进行归档、恢复与删除的管理面板。
- [kagura-agent/dsh-openclaw](https://github.com/kagura-agent/dsh-openclaw) —— OpenClaw → DeepSeek Harness 迁移插件：导入记忆为工作区 Markdown + 索引，导入会话为 DSH 原生会话日志。
- [kusesad-1122/dsh-context-compactor](https://github.com/kusesad-1122/dsh-context-compactor) —— DSH 上下文压缩/总结插件：80% 自动全局详细总结压缩（保留核心任务/决策/待解决问题/重要文件位置，删除调试细节与已解决错误），压缩后验保证 totalTokens 必须真实下降，context-overflow 自动恢复，`/compact` + `/context-status`，输入框上方一键按钮。
- [MimicHunterZ/dsh-agent-compact](https://github.com/MimicHunterZ/dsh-agent-compact) —— Agent 驱动的会话片段压缩插件：把选中的对话片段压缩成自写检查点，而非官方从头锚定的全上下文清扫。
- [songoao25/dsh-auto-compact](https://github.com/songoao25/dsh-auto-compact) —— 增强 DeepSeek Harness agent 预设的自动压缩默认配置。
- [stnt04/dsh-msg-index](https://github.com/stnt04/dsh-msg-index) —— 对话消息索引插件：悬浮球，一键展开当前会话的用户消息索引并点击定位。
- [KLRSL/dsh-biomemory](https://github.com/KLRSL/dsh-biomemory) —— 生物仿生记忆系统插件：DeepSeek Harness 的透明 Markdown 记忆——写入需审批、支持冻结快照注入。
- [wjabanjj/aifp-mcp](https://github.com/wjabanjj/aifp-mcp) —— AiFP 记忆感知系统｜MCP 服务，一套记忆全 AI 共享。面向中文的 Agent 感知记忆，支持叙事链、语义纠错、感知链图扩散。兼容 DeepSeek-Harness、Claude Code、Cursor、Codex 等全部 MCP 客户端，数据完全本地存储。
- [Britneycode/dsh-archive-vault](https://github.com/Britneycode/dsh-archive-vault) —— dsh 插件：在设置面板中查看、恢复与永久删除归档会话。
- [Scorp1o117/dsh-tdai-memory](https://github.com/Scorp1o117/dsh-tdai-memory) —— DeepSeek Harness 记忆插件。
- [wonderfulcode1/dsh-checkpoint-diff](https://github.com/wonderfulcode1/dsh-checkpoint-diff) —— DeepSeek Harness 检查点时间节点间的文件 diff 可视化：只读时间线 + 基于 dsh-checkpoint-rewind 检查点的逐文件行级 diff，提供 `/diff` 命令、JSON HTTP API 与 GUI 面板。
- [Zh-U-hB/dsh-auto-compact](https://github.com/Zh-U-hB/dsh-auto-compact) —— DeepSeek Harness 插件：每个会话与 agent 预设自动阈值触发压缩（默认 256K）。
- [Shiye-10Pages/dsh-memory-porter](https://github.com/Shiye-10Pages/dsh-memory-porter) —— 跨厂商记忆迁移：Claude 导出里的 `memories.json` 零 token 入库、本机 Claude Code 记录免导出直读、历史对话用 DSH 里已配好的模型提纯，每条记忆都带由代码回原文核对的逐字证据。
- [chenkezhen480/dsh-semantic-memory](https://github.com/chenkezhen480/dsh-semantic-memory) — 为 deepseek-harness 添加向量化跨会话记忆插件。
- [tianhao8687/dsh-memoryos](https://github.com/tianhao8687/dsh-memoryos) — 由 MemoryOS 驱动的、面向 DeepSeek Harness (DSH) 的证据优先长期项目记忆插件。
- [tianhao8687/MemoryOS](https://github.com/tianhao8687/MemoryOS) — 面向 AI 编程工作流的本地优先、证据优先记忆基础设施。
- [JohnXu22786/memory-vault](https://github.com/JohnXu22786/memory-vault) — 跨会话持久记忆插件：SQLite 本地存储 + 关键词/语义混合检索 + Web/MCP 界面，供编码代理存取经验与决策。
- [Lisk809/dsh-dream-incubator](https://github.com/Lisk809/dsh-dream-incubator) — 让 DeepSeek Harness 拥有潜意识：后台异步做梦，把日常对话与工具日志酿成梦境报告，呈现在沉浸式 WebUI 中。
- [7A7K/DSH-Timeline-Navigator](https://github.com/7A7K/DSH-Timeline-Navigator) —— 面向 DeepSeek Harness 的分轮对话时间轴：支持书签、历史加载、键盘操作与移动端适配。
- [edfrey0044/dsh-unarchive](https://github.com/edfrey0044/dsh-unarchive) —— 在 DeepSeek Harness 中恢复已归档会话：`/unarchive` 命令 + `unarchive_session` 工具（profile 插件包）。
- [JunNanLYS/dsh-layered-memory](https://github.com/JunNanLYS/dsh-layered-memory) —— L0~L3 分层蒸馏记忆插件 for DeepSeek Harness：对话捕获 → 原子记忆 → 场景整合 → 画像蒸馏，自动召回注入；会话级记忆档位。
- [MichengAI/dsh-archive-manager](https://github.com/MichengAI/dsh-archive-manager) —— 基于 DeepSeek Harness 的归档会话管理插件。
- [warmwine/dsh-memoryleak](https://github.com/warmwine/dsh-memoryleak) —— 基于 dsh 的知识库管理工具。
- [Ycet/dsh-archive-manager](https://github.com/Ycet/dsh-archive-manager) —— DSH 设置新增「归档」页：按工作区分组查看已归档会话，支持筛选/排序、取消归档、二次确认彻底删除。
- [baisama-cloud/dsh-session-mover](https://github.com/baisama-cloud/dsh-session-mover) —— 在 DeepSeek Harness (DSH) Web GUI 中把会话拖拽到其他工作区 —— 完整历史克隆 + 原会话归档。
- [ChenRuoT/dsh-sidebar-qa](https://github.com/ChenRuoT/dsh-sidebar-qa) —— 一个基于 DSH-better-sidebar 的侧边栏提问tab，实现类 codex 的侧边提问或 claude code 的 /btw 功能。
- [kirkchinese/DSH-Session-Move](https://github.com/kirkchinese/DSH-Session-Move) —— 会话迁移插件（上游无描述）。
- [XSJUSTC/dsh-rewind](https://github.com/XSJUSTC/dsh-rewind) —— DSH (DeepSeek Harness) 对话回溯插件：回溯到任何用户消息、中断正在进行的回合、从对话视图和模型上下文中隐藏末尾、发送前可自由取消。
- [SipengXie2024/dsh-memory-hermes](https://github.com/SipengXie2024/dsh-memory-hermes) —— 面向 DeepSeek Harness (dsh) 的 Hermes 风格有界记忆 + 自我整理技能库：双文件精选记忆、后台复盘循环、LLM 库策展人。树外（out-of-tree）Cordis 插件。
- [szx-a/ds](https://github.com/szx-a/ds) —— dsh 记忆体（Memory Body）插件：跨会话记忆，支持多个命名记忆体、按会话挂载、自动总结，以及 FTS5 全文检索（trigram 分词器适配中文）。
- [quicksandznzn/dsh-session-bridge](https://github.com/quicksandznzn/dsh-session-bridge) —— deepseek,deepseek-harness,dsh,dsh-plugin,dsh-plugins。将完整的 DeepSeek Harness 会话树导出/导入为可验证的离线 Capsule，支持本地 ZIP 传输与附件重新映射。
- [SiriLee/dsh-rewind](https://github.com/SiriLee/dsh-rewind) —— DeepSeek Harness 插件：在同一会话窗口内原地回滯对话（Claude Code /rewind 语义）+ 可选文件还原。
- [Bryan-cmf/dsh-vector-memory](https://github.com/Bryan-cmf/dsh-vector-memory) —— DSH 插件：持久化 agent 记忆核心——基于 storageDomain 的 `mem_save`/`mem_search`/`mem_health`（重启后仍保留），并带有“記憶”查看标签页。
- [kingcharleslzy-ai/dsh-honcho-memory](https://github.com/kingcharleslzy-ai/dsh-honcho-memory) —— 为 DeepSeek Harness (DSH) 提供的 Honcho 记忆集成插件。
- [chenproton/dsh-history](https://github.com/chenproton/dsh-history) —— 会话历史消息查看：列出当前会话全部你发送的消息，支持最新在前排序、文本过滤、一键复制，点击可跳转定位（目标未加载时自动加载更早历史）。
- [creativedswork/dsh-expmem](https://github.com/creativedswork/dsh-expmem) — DeepSeek Harness 的经验记忆（Experience Memory）插件。
- [detongz/dsh-client-ui-obsidian-memory](https://github.com/detongz/dsh-client-ui-obsidian-memory) — DeepSeek Harness 插件：Obsidian 记忆集成。
- [gjj-star/dsh-conversation-navigato](https://github.com/gjj-star/dsh-conversation-navigato) — DSH 会话导航。
- [leilei3167/dsh-bookmark](https://github.com/leilei3167/dsh-bookmark) — 面向 DeepSeek Harness Web UI 的 Codex 风格会话导航插件。
- [LianbinZhou/dsh-archive-manager](https://github.com/LianbinZhou/dsh-archive-manager) — DSH Web GUI 归档管理器：列出已归档会话并一键还原（含若干修复）。
- [TangRj-Git/trajectory-graph](https://github.com/TangRj-Git/trajectory-graph) — 面向 DeepSeek Harness 的逐轮（per-Turn）交互式轨迹图与执行可视化插件。
- [Totoro-qaq/dsh-plugin-bridge](https://github.com/Totoro-qaq/dsh-plugin-bridge) — DeepSeek Harness 插件：跨 preset 会话迁移（固定 schema 交接摘要），含 26 组实测 benchmark 与测试/验证集。
- [Cocowwy/dsh-plugin-agents-memory](https://github.com/Cocowwy/dsh-plugin-agents-memory) — 在 DeepSeek Harness Web 设置中直接编辑全局 AGENTS.md 记忆。
- [DDDFXYqiming/dsh-layered-memory](https://github.com/DDDFXYqiming/dsh-layered-memory) — 面向 DeepSeek Harness 的跨会话长期记忆插件。
- [russeell/cross-agent-fork](https://github.com/russeell/cross-agent-fork) — 跨 Agent 会话 fork：将任一 Agent 的完整会话 fork 到另一个（Claude Code ↔ Codex ↔ DeepSeek Harness）——原会话不受影响，可直接恢复。
- [Breeze136/dsh-kb-rag](https://github.com/Breeze136/dsh-kb-rag) —— 面向 DeepSeek Harness 的知识库 RAG 插件：基于 Zotero 文献库的文献检索。
- [songoao25/dsh-song-memory](https://github.com/songoao25/dsh-song-memory) —— 一款原生体验、跨工具的 DeepSeek Harness 记忆插件。
- [mantonlove/dsh-conversation-landmarks](https://github.com/mantonlove/dsh-conversation-landmarks) —— DeepSeek Harness 的对话地标（Conversation Landmarks）插件——为长对话提供固定导航与悬浮预览。
- [PerryLink/dsh-library](https://github.com/PerryLink/dsh-library) —— DeepSeek Harness 的本地文档知识库：library_add/remove/list，语义+关键词混合的 library_search（含多样性重排、相关性过滤与避免『中间遗忘』），支持引用感知注入、library_cite_check 与 library_diagnose——基于存储域的 SQLite 索引、本地 embedding，无需下载模型。
- [PerryLink/dsh-session-sync](https://github.com/PerryLink/dsh-session-sync) —— 跨设备的 DeepSeek Harness 会话同步：专用 git 镜像仓库，采用只追加、双保留的冲突解决策略（分叉文件，绝不静默覆盖），提供 /sync 命令与 sync_* 工具。
- [boyun-zhang/better-session-management](https://github.com/boyun-zhang/better-session-management) —— DeepSeek Harness 会话管理插件：链式上下文视图、可在任意轮次边界分叉的子会话、一次性只读问答 /btw，全部基于会话原语——把长对话拆成并行支线而不污染主上下文，但可手动向主会话注入临时对话内容。
- [i1j/context-assembler-DSH](https://github.com/i1j/context-assembler-DSH) —— 上下文汇编 Context Assembler DSH V0.99 —— DeepSeek Harness (dsh) 上下文汇编插件：话题块汇编、水位压力切割、工具轮压缩/改写、reality 召回注入、handoff 规划。MIT。
- [Qinling-Melon-Farmers/dsh-memoir](https://github.com/Qinling-Melon-Farmers/dsh-memoir) —— DSH 项目持久化记忆插件（TypeScript）：会话归纳 + 经验教训沉淀，写入 PROJECT_MEMORY.md 与全局索引；每轮工作结束自动提醒蒸馏、自动注入未来 AGENTS；附 Web GUI 记忆面板（项目/全局 tab、检索、手动记录/删除）。
- [dream12347/dsh-session-manager](https://github.com/dream12347/dsh-session-manager) —— DSH 会话管理插件：删除（回收站恢复/彻底清除）、统计、继续/暂停、打开日志目录、对话顶部抽屉、工作区分组与排序、上下文压缩阈值设置。

- [JohnXu22786/context-pruner](https://github.com/JohnXu22786/context-pruner) — 会话上下文分诊插件：自动识别并处理过期、重复、失败、超大与低价值消息，节约 token 预算，缓解上下文膨胀
- [JohnXu22786/session-titler](https://github.com/JohnXu22786/session-titler) — 两阶段会话题词（自动命名）：会话进行中先用关键词即时生成标题，空闲后再调用最经济的模型精修，全程后台不打断主流程

## 成本与用量统计

_token 用量、成本看板与预算告警插件。_

- [boNeXY226/dsh-cost-chip](https://github.com/boNeXY226/dsh-cost-chip) —— `/cost` 命令 + 悬浮费用胶囊，展示会话花费。
- [misakimiku2/dsh-cost-display](https://github.com/misakimiku2/dsh-cost-display) —— 成本显示。
- [suimi8/dsh-cost-ledger](https://github.com/suimi8/dsh-cost-ledger) —— 成本账本。
- [csiroqa/dsh-plugin-usage-report](https://github.com/csiroqa/dsh-plugin-usage-report) —— 日/月用量报表（token + 费用 + 预算告警 + 贡献格）。
- [H1a3x/dsh-token-stats](https://github.com/H1a3x/dsh-token-stats) —— 悬浮 token 用量统计面板。
- [xinmo114514/dsh-usage-widget](https://github.com/xinmo114514/dsh-usage-widget) —— 用量悬浮 widget。
- [Han-1413141/dsh-cost-meter](https://github.com/Han-1413141/dsh-cost-meter) —— DeepSeek Harness 会话费用统计插件：本会话费用、当日费用、历史记录与官方价格同步。
- [jelly-000/dsh-balance-monitor](https://github.com/jelly-000/dsh-balance-monitor) —— DeepSeek 账户余额、剩余比例条与今日花费，展示在 dsh 侧边栏底部。
- [hccccc01333/dsh-analytics](https://github.com/hccccc01333/dsh-analytics) —— DeepSeek Harness 的用量分析插件。
- [kissthisrain/token-usage-widget](https://github.com/kissthisrain/token-usage-widget) —— 玻璃拟态深色风格的桌面悬浮小组件，实时展示本机 AI 工具的 token 消耗、额度剩余、使用趋势与活跃天数。
- [yingjunnan/dsh-deepseek-quota](https://github.com/yingjunnan/dsh-deepseek-quota) —— DSH web GUI 的 DeepSeek API 额度（余额）小组件：右下角悬浮卡片展示剩余 DeepSeek API 余额。
- [940842546/dsh-usage-billing](https://github.com/940842546/dsh-usage-billing) —— DeepSeek Harness 用量计费插件（上游未提供描述）。
- [bobcat848/dsh-calculator](https://github.com/bobcat848/dsh-calculator) —— 实时计算 DeepSeek Harness 调用 DeepSeek API 产生的费用。
- [dclichang2022/dsh-green-meter](https://github.com/dclichang2022/dsh-green-meter) —— DeepSeek Harness 能耗与碳排放计量：按轮次/按请求能耗、缓存节碳量、电费成本。
- [juhe291/dsh-token-panel](https://github.com/juhe291/dsh-token-panel) —— 实时 Token 消耗监控插件：用量统计、上下文压力、成本估算、趋势曲线、按日按月报表。
- [1HelloMan1/dsh-usage-dashboard-plus](https://github.com/1HelloMan1/dsh-usage-dashboard-plus) — DeepSeek Harness 用量看板增强插件。
- [Ayaka157/dsh-conversation-cost](https://github.com/Ayaka157/dsh-conversation-cost) — 在 DSH 对话底部统计行实时显示 DeepSeek 用量费用（人民币/美元双币，含缓存命中与峰谷定价）。
- [FantasyStarry/dsh-token-stats](https://github.com/FantasyStarry/dsh-token-stats) — DeepSeek Harness token 用量统计插件。
- [GooodWei/context-vista](https://github.com/GooodWei/context-vista) — 为 DeepSeek Harness 提供右侧悬浮栏以及 `/context` 命令，用环形图实时展示当前上下文 token 用量与分配、compact 指令效果，同时支持估算费用消耗，对标 Claude Code 的 `/context`。
- [ZeroingIn/dsh-provider-billing](https://github.com/ZeroingIn/dsh-provider-billing) — DeepSeek Harness 插件：在每个模型设置行内显示服务商账户余额，通过本地回环 RPC 通道查询，API key 始终保存在主机端。
- [LeemanCheung/dsh-token-usage](https://github.com/LeemanCheung/dsh-token-usage) — DeepSeek Harness 持久化 token 用量记录与看板。
- [zerro-223/dsh-token-usage](https://github.com/zerro-223/dsh-token-usage) — DeepSeek Harness token 用量统计插件（上游无描述）。
- [Cassius0924/dsh-usage-dashboard](https://github.com/Cassius0924/dsh-usage-dashboard) — DeepSeek 额度与用量仪表盘 — DSH (DeepSeek Harness) 动态 Cordis 插件。
- [Make0209/dsh-usage-stats](https://github.com/Make0209/dsh-usage-stats) — DeepSeek Harness 插件：GitHub 风格用量热力图 + Token / 缓存命中 / 账户余额看板 + 工作区别名管理。
- [dfkai/dsh-board](https://github.com/dfkai/dsh-board) —— DeepSeek Harness 用量面板：token 计费、1M 上下文、词勋段位与每日热力。
- [YZz-S/dsh-token-cost-meter](https://github.com/YZz-S/dsh-token-cost-meter) —— 会话 token 费用计量插件：官方动态定价、DeepSeek 与火山引擎计费余额、更新检查；纯 JavaScript 免构建。

- [AFAP/dsh-token-usage](https://github.com/AFAP/dsh-token-usage) —— DeepSeek Harness Web GUI 的 Token 用量展示插件。
- [AKS1st/model-usage-plugin](https://github.com/AKS1st/model-usage-plugin) —— 统计各模型 tokens 消耗并估算费用，显示账户余额。
- [spirits001/dsh-tokensforce-login](https://github.com/spirits001/dsh-tokensforce-login) —— DeepSeek Harness 的 TokensForce 登录接入。
- [Xenia0922/dsh-opencode-go-usage](https://github.com/Xenia0922/dsh-opencode-go-usage) —— DeepSeek Harness 插件：OpenCode Go 用量与花费悬浮仪表盘（配额、逐请求成本、模型/来源分布）。

- [golitter/dsh-deepseek-billing](https://github.com/golitter/dsh-deepseek-billing) —— 在 DSH 中查看 DeepSeek API 账户余额及计费信息。
- [nabin-qq273274877/dsh-model-balance](https://github.com/nabin-qq273274877/dsh-model-balance) —— 为 DeepSeek Harness Web GUI 提供多供应商真实账户余额显示。


- [AlfredChaos/dsh-usage-stats](https://github.com/AlfredChaos/dsh-usage-stats) —— 消耗统计插件：设置页 Token 用量 KPI、半年活跃热力图、按模型堆叠柱状图与模型环形图（dsh-plugin）。
- [beijingwahw/dsh-usage-ledger](https://github.com/beijingwahw/dsh-usage-ledger) —— Token 费用统计 —— 自动记下每笔对话花了多少 Token、多少钱（按对话、按天、累计都能查），价格自动跟着官方最新价走、支持多家国产厂商，低谷时段自动按便宜价算，预算超了自动提醒还能拦下调用，带可视化仪表盘。
- [cuttlefish520/dsh-token-meter](https://github.com/cuttlefish520/dsh-token-meter) —— DeepSeek Harness 实时、与厂商无关的 Token 用量仪表盘。
- [fzlong/dsh-balance-eta](https://github.com/fzlong/dsh-balance-eta) —— 极简余额插件：余额 + 今日消耗 + 可用时长预测 + 低余额告警（仅 CNY，价格无关免维护）。
- [GLFzr/dsh-opencode-go-quota](https://github.com/GLFzr/dsh-opencode-go-quota) —— OpenCode Go 额度圆环 —— 输入框模型选择器左侧的进度圆环，点击切换 5小时/每周/每月用量（适用于 DeepSeek Harness Web）。
- [kirigayakazima/dsh-usage-vendor-stats](https://github.com/kirigayakazima/dsh-usage-vendor-stats) —— DeepSeek Harness 分厂商用量统计插件（上游未提供描述）。
- [moyuer233/dsh-deepseek-monitor](https://github.com/moyuer233/dsh-deepseek-monitor) —— DeepSeek 用量监控 DSH 插件：聊天 UI 内的余额/日-月-累计 token 与费用面板，支持拖拽排序配置，另附可选本地用量代理。
- [TwotwoPiggy/dsh-balance](https://github.com/TwotwoPiggy/dsh-balance) —— 余额插件：实时 Token 追踪与高精度会话费用估算，支持动态峰谷定价。
- [dshworks/dsh-meter](https://github.com/dshworks/dsh-meter) — dsh 的 DeepSeek 分时计价表：会话费用、当前费率与下次调价倒计时，输入框下一行显示。
- [Floating-Dreaming/dsh-minimax-usage](https://github.com/Floating-Dreaming/dsh-minimax-usage) — 在 DSH 设置里显示 MiniMax Token 套餐用量。
- [HABIDSKOFT/dsh-turn-usage](https://github.com/HABIDSKOFT/dsh-turn-usage) — 记录每次请求的 token 与费用并展示。
- [qianTouchFish/deepseek-api-status](https://github.com/qianTouchFish/deepseek-api-status) — DSH 侧边栏“设置”上方常显 DeepSeek API 余额条，点击展开完整面板（余额、累计/当日消费、Tokens、请求次数），每分钟自动刷新。
- [solstice621/dsh_dashboard](https://github.com/solstice621/dsh_dashboard) — Codex 个人主页风格的 Token 用量统计：5 张统计卡 + GitHub 贡献图风格热力图。
- [xiufengsun/TokenTracker](https://github.com/xiufengsun/TokenTracker) — 本地优先的 AI token 用量与费用追踪器，支持 31 款编码工具（含 Claude Code、Codex、Cursor、Gemini 与 DeepSeek Harness），带原生应用，不读取 prompt。
- [Yuuu0109/dsh-cache-hit-decimal](https://github.com/Yuuu0109/dsh-cache-hit-decimal) — DeepSeek Harness Web GUI 的两位小数缓存命中率显示。
- [Inlispwrad/DSH-BalanceHUD](https://github.com/Inlispwrad/DSH-BalanceHUD) —— Balance HUD：小型 DeepSeek Harness 插件，在输入框上方显示剩余有效上下文 (HP)、API 余额与今日 token 和费用消耗。
- [Shiye-10Pages/dsh-whale-meter](https://github.com/Shiye-10Pages/dsh-whale-meter) —— 鲸鱼电表：DeepSeek Harness (DSH) 用量与费用面板——人民币账单、错峰半价计价、可分享的 AI 账单卡片。

- [kunainuo/deepseek_harness_dsh-usage-dashboard](https://github.com/kunainuo/deepseek_harness_dsh-usage-dashboard) —— DeepSeek Harness Web 的实时 DeepSeek API 余额 + 本地 token 用量仪表盘，带图表与自动刷新。
- [lco117/dsh-peak-hours](https://github.com/lco117/dsh-peak-hours) —— 在会话头部显示高峰时段状态徽章的 DeepSeek Harness 插件。
- [mtty-ai/mmx-quota-tool](https://github.com/mtty-ai/mmx-quota-tool) —— DSH Web 的 MiniMax token 套餐额度坞——显示 5 小时用量百分比，点击展开详情面板，非 MiniMax 模型自动隐藏。
- [songoao25/bottom-info-bar](https://github.com/songoao25/bottom-info-bar) —— 底部信息栏插件：一行展示 provider/模型、实时余额、带倒计时的峰谷计价与持久化的每会话花费。
- [KIDLi1412/dsh-session-cost](https://github.com/KIDLi1412/dsh-session-cost) —— DSH web 插件：会话状态栏，按会话估算 token 成本（按模型的 CNY 计价）并实时显示 DeepSeek API 余额；显示模式可配置（独立栏或并入统计行）。
- [lightli369/dsh-llm-usage-stats](https://github.com/lightli369/dsh-llm-usage-stats) —— DSH web 插件：Settings 中按模型统计的 LLM token 用量仪表盘（输入/输出/缓存 token、缓存命中率；日/周/月/自定义区间）。
- [Polar-Lighter/dsh-cost-meter](https://github.com/Polar-Lighter/dsh-cost-meter) —— DSH 成本计量插件（上游无描述）。
- [songoao25/dsh-bottom-info-bar](https://github.com/songoao25/dsh-bottom-info-bar) —— 底部信息栏插件：provider/model、实时余额、峰谷计价与倒计时、真实持久化的每会话花费，一行呈现。
- [xv-chang/dsh-opencode-go-usage-dock](https://github.com/xv-chang/dsh-opencode-go-usage-dock) —— OpenCode Go 用量读取面板，停靠在 composer 下方并与输入栏宽度对齐。
- [Alphazer01214/dsh-usage-dashboard](https://github.com/Alphazer01214/dsh-usage-dashboard) —— DeepSeek Harness 用量仪表盘。
- [kenz1117/dsh-ui-usage-billing](https://github.com/kenz1117/dsh-ui-usage-billing) —— DeepSeek Harness 用量账单仪表盘插件：侧边栏成本指标，基于会话日志聚合真实用量，含多厂商实时价目表。
- [Lateautumns/ds-balance](https://github.com/Lateautumns/ds-balance) —— DeepSeek 余额查询插件（上游未提供描述）。
- [qianTouchFish/dsh-deepseek-balance](https://github.com/qianTouchFish/dsh-deepseek-balance) —— DeepSeek 余额查询插件（上游未提供描述）。
- [Sev7een/ds-api-usage](https://github.com/Sev7een/ds-api-usage) —— DeepSeek API 用量统计插件（上游未提供描述）。
- [y2zyyr/dsh-token-usage-sidebar](https://github.com/y2zyyr/dsh-token-usage-sidebar) —— DeepSeek Harness 的持久化侧边栏：今日/昨日/总计 token 用量。
- [Ycet/dsh-account-usage](https://github.com/Ycet/dsh-account-usage) —— 为 dsh 增加「设置：账户」页面，可快捷查看 deepseek 余额、用量信息，以及 opencode go 额度信息，同时可快速跳转至对应官网。
- [534119219/chicheng-stats](https://github.com/534119219/chicheng-stats) —— dsh 全局用量统计插件：侧边栏展示今日/总请求数与今日/总 Token 数（跨所有会话）。
- [Shiye-10Pages/dsh-whale-meter](https://github.com/Shiye-10Pages/dsh-whale-meter) —— 按本月 token 消耗评 🐟→🐳 五档段位，分位本地估算并附可分享战绩卡；6 家厂商 46 个模型精准计价，含国内按输入长度分档；回填安装前的会话；8·17 调价前后各按各价。
- [eurt-nano/dsh-cache-cost-monitor](https://github.com/eurt-nano/dsh-cache-cost-monitor) — DeepSeek Harness 插件，用于监控前缀缓存命中率、统计 Token 消耗与估算 API 运行成本。
- [ErrorLst/dsh-deepseek-quota](https://github.com/ErrorLst/dsh-deepseek-quota) —— 面向 DeepSeek Harness 的 DeepSeek 额度/用量追踪插件。
- [sjh9714/dsh-lean](https://github.com/sjh9714/dsh-lean) —— 同样的结果，更小的账单：实测将 DeepSeek Harness (DSH) 的 prompt 前缀削减 53%、会话成本降低 18-42%。
- [Yvesgao/dsh-cost-estimate](https://github.com/Yvesgao/dsh-cost-estimate) —— DSH 插件：回答前先预估 token 用量与 DeepSeek API 费用，回答后展示实际账单（Web 聊天内嵌行）。
- [ChrisZhangWG/dsh-codex-meter](https://github.com/ChrisZhangWG/dsh-codex-meter) —— DSH Web GUI 的 Codex 风格紧凑计量小组件：一个小小的等宽字体胶囊，展示实时 token 用量、会话费用与 DeepSeek API 剩余余额。
- [MoyunLee/deepseek-ai-dsh-api-cost](https://github.com/MoyunLee/deepseek-ai-dsh-api-cost) —— DSH 生态的 DeepSeek API 费用监控插件。
- [SoDaZilla-zzz/dsh-liquid-glass-balance-card](https://github.com/SoDaZilla-zzz/dsh-liquid-glass-balance-card) —— DeepSeek Harness (DSH) web GUI 的可拖拽液态玻璃风 DeepSeek API 余额卡片插件。
- [Ychris12138/dsh-usage-stats](https://github.com/Ychris12138/dsh-usage-stats) —— 为 DeepSeek Harness Web GUI（dsh web）提供 Token 用量热力图、按模型明细统计与 DeepSeek 账户余额。
- [ZnonEn/dsh-volcark-quota](https://github.com/ZnonEn/dsh-volcark-quota) —— 火山方舟 Coding Plan / Agent Plan 额度实时查看的 DeepSeek Harness (DSH) 插件：AK/SK 直连官方 API，悬浮小球 + 环形图展示各窗口已用/剩余/重置倒计时（两位小数）。
- [xiaoyi-xx/dsh-peak-indicator](https://github.com/xiaoyi-xx/dsh-peak-indicator) —— DeepSeek Harness Web GUI 的高峰时段指示灯：在会话头部右上角（原生 conversation.session.header.utilities 工具位）显示一个融入界面的小胶囊，实时告诉你当前北京时间是否处于 DeepSeek API 的高峰时段，带秒级时钟、下一转折倒计时和价格提示。
- [jyhn-hunao/dsh-session-cost](https://github.com/jyhn-hunao/dsh-session-cost) —— 为 DeepSeek Harness (DSH) 提供的会话成本与 Token 消耗追踪插件。
- [davidgereb/dsh-plugin-cost-lens](https://github.com/davidgereb/dsh-plugin-cost-lens) — DeepSeek Harness 成本总览：峰谷时段指示、仪表盘余额展示、错峰调度。
- [Enc-hanted/dsh-pulse](https://github.com/Enc-hanted/dsh-pulse) — 面向 DeepSeek Harness Web Profile 的跨会话用量与成本观测台 —— 趋势/热力图仪表盘、按模型峰谷计价（人民币/美元）、官方 DeepSeek 余额与消费对账。
- [bpc-oss/dsh-web-billing](https://github.com/bpc-oss/dsh-web-billing) —— DeepSeek Harness (dsh web) 的人民币/美元 Token 计费插件：按官方峰谷时段自动计价、每消息计账、账户余额、根据地区自动切换货币展示。
- [enchangcui340-cloud/dsh-whale-balance](https://github.com/enchangcui340-cloud/dsh-whale-balance) —— DeepSeek Harness 余额追踪插件。
- [nzz0991999-ai/dsh-usage-dashboard](https://github.com/nzz0991999-ai/dsh-usage-dashboard) —— DeepSeek 平台用量仪表盘插件，适配 DeepSeek Harness。
- [SnowNightt/dsh-token-activity](https://github.com/SnowNightt/dsh-token-activity) —— 展示最近 365 天的每日 Token 使用热力图，悬停任意日期可查看当天使用过的全部模型及其 Token 用量。
- [PerryLink/dsh-budget](https://github.com/PerryLink/dsh-budget) —— DeepSeek Harness 的成本治理：按模型/会话/日聚合 token 与成本计量，预算上限配合阈值告警与超限策略，碳足迹估算，各模型延迟基准，设置页预算标签与 /budget 命令。
- [mmzm0808/dsh-deepseek-usage](https://github.com/mmzm0808/dsh-deepseek-usage) —— DeepSeek API 用量监测 DSH 插件：悬浮球 + 展开面板，展示开放平台真实余额、累计消费、今日消费、请求次数、Tokens 与分模型用量，支持手动登录获取 userToken。
- [philmingdao/dsh-meter](https://github.com/philmingdao/dsh-meter) —— DSH 插件：DeepSeek 用量与余额计量表，位于 DSH 设置面板 —— 账户余额、今日消费（官方统计或余额估算）、API Key 与平台 Token 管理。
- [qsjzqssh/mc-hud](https://github.com/qsjzqssh/mc-hud) —— 面向 DeepSeek Harness 的 Minecraft 风格 Token 消耗 HUD。
- [tsja2001/dsh-token-dashboard](https://github.com/tsja2001/dsh-token-dashboard) —— DeepSeek Harness 用量仪表盘：查看缓存、上下文、请求效率、逐步骤和跨会话统计。
- [tyche66/DSH-money-view](https://github.com/tyche66/DSH-money-view) —— DeepSeek Harness 社区插件：在侧栏实时显示 API 余额、每日基准与剩余进度，按官方缓存节奏智能查询，密钥不进前端。

## Channel / IM 桥接

_把 DSH 桥接到各种聊天平台与消息通道。_

- [PlutoKeating/dsh-lark-bot](https://github.com/PlutoKeating/dsh-lark-bot) —— 飞书桥接。
- [Roy-oss1/dsh-lark](https://github.com/Roy-oss1/dsh-lark) —— 飞书桥接。
- [TtTRz/dsh-wecom](https://github.com/TtTRz/dsh-wecom) —— 企业微信 bot。
- [congchuanling-dot/DSH-Telegram-Relay](https://github.com/congchuanling-dot/DSH-Telegram-Relay) —— Telegram 中继。
- [STARDUSTLC666/dsh-email](https://github.com/STARDUSTLC666/dsh-email) —— 邮件工具。
- [BeAChanger/dsh-openclaw-acp](https://github.com/BeAChanger/dsh-openclaw-acp) —— 适配 OpenClaw 与微信（基于 ACP）的 DeepSeek Harness 插件包。
- [gnulife/dsh-plugin-wechat](https://github.com/gnulife/dsh-plugin-wechat) —— DeepSeek Harness 的微信桥接插件（通过 ClawBot）。
- [sindo-s/dsh-qq-bot](https://github.com/sindo-s/dsh-qq-bot) —— 将 QQ 官方 Bot API 桥接到 dsh agent，无需第三方 bot 框架。
- [wssfk12138/dsh-wechat-notify](https://github.com/wssfk12138/dsh-wechat-notify) —— 为 agent 新增 `wechat_notify` 工具，让 AI 通过本机 ClawBot 微信通道主动发通知（任务完成/需决策时），中文可靠、掉线自提示。
- [xiaoshihou514/dsh-weixin](https://github.com/xiaoshihou514/dsh-weixin) —— DeepSeek Harness 的微信桥接。
- [One1turn/dsh-omnibridge](https://github.com/One1turn/dsh-omnibridge) —— AstrBot 风格的多平台桥接插件：QQ(OneBot)/Telegram/Discord/KOOK/Slack/飞书/企微/钉钉/LINE/网页聊天等 19 个平台一个插件搞定。
- [STARDUSTLC666/dsh-slack](https://github.com/STARDUSTLC666/dsh-slack) —— DeepSeek Harness 的 Slack 桥接插件（上游未提供描述）。
- [hZsFN/dsh-qq-bot](https://github.com/hZsFN/dsh-qq-bot) — DeepSeek Harness (dsh) 的 QQ 官方机器人私聊 (C2C) 桥接：按用户持久化 Agent 会话、图片附件、自动重连。
- [wz-heng/dsh-feishu-bridge](https://github.com/wz-heng/dsh-feishu-bridge) — DeepSeek Harness (dsh) 的飞书 (Lark) 渠道桥接插件——给飞书机器人发消息即触发一轮 dsh Agent 执行并回传结果。
- [YLifeOnlyOnce/dsh-smarthome](https://github.com/YLifeOnlyOnce/dsh-smarthome) — 给 DeepSeek Harness agent 的 Home Assistant 控制插件——审批门控的灯光、开关、空调控制，一键接入智能家居。
- [banana770/dsh-qq-bridge](https://github.com/banana770/dsh-qq-bridge) — QQ 与 DeepSeek Harness 的桥接插件：通过 QQ 机器人与 Harness 智能体对话（Node.js ≥ 22）。
- [hi-wenw/dsh-telegram-channel](https://github.com/hi-wenw/dsh-telegram-channel) — DeepSeek Harness Telegram 移动远程：绑定实时 Web 会话（Codex 风格）。
- [sosojust/dsh-messge-channels](https://github.com/sosojust/dsh-messge-channels) — 将飞书、钉钉、企业微信接入 DeepSeek Harness，支持对话驱动的 Agent、Session 与 Workspace 工作流。
- [TingRuDeng/dsh-feishu-bot](https://github.com/TingRuDeng/dsh-feishu-bot) — 飞书（Lark）私聊前端，用于 DeepSeek Harness：从飞书驱动、监控并审批本地智能体，与 Web GUI 共享会话。
- [MoonGlassKitty/dsh-tailscale-sync](https://github.com/MoonGlassKitty/dsh-tailscale-sync) — DeepSeek Harness 零配置 Tailscale 同步：在手机上继续电脑端的工作。

- [shaobeichen/dsh-im-bridge](https://github.com/shaobeichen/dsh-im-bridge) —— 不用一直在电脑前，远程操控 DeepSeek Harness：在飞书 / 企业微信 / Telegram 里远程派活、结果通知、危险操作审批。


- [Fantasality/astrbot_plugin_dsh_bridge](https://github.com/Fantasality/astrbot_plugin_dsh_bridge) —— AstrBot 插件：桥接 DeepSeek Harness 智能体。
- [ASAKAFENG/dsh-qq-remote](https://github.com/ASAKAFENG/dsh-qq-remote) — 通过 QQ 远程控制 DeepSeek Harness：桥接 OneBot 11 协议（NapCat / Lagrange.OneBot / go-cqhttp / LLOneBot）。
- [caoxiaohu7745-bot/kongmu-im-bridge](https://github.com/caoxiaohu7745-bot/kongmu-im-bridge) — IM 桥接插件族：核心 kongmu-im + 飞书适配器 kongmu-im-feishu（源自 dsh-im-bridge，MIT）——长连接、审批卡片、群 @ 过滤、流式卡片更新、/stop 命令。
- [pan17/dsh-wechat](https://github.com/pan17/dsh-wechat) — 微信桥接插件：微信私聊消息与 DSH 双向传输，支持文本、图片、文件、音视频。
- [ljnljn2005/dsh-wecom-notify](https://github.com/ljnljn2005/dsh-wecom-notify) —— DSH 插件：任务完成 / 报错 / 需要用户选择时，自动通过企业微信群机器人 webhook 发送通知（text 默认，可切换 markdown）。
- [wendayuan/dsh-weixin](https://github.com/wendayuan/dsh-weixin) —— DeepSeek Harness 微信通道插件：手机微信直接对话 DSH agent。

- [minyang2020/dsh-feishu-bridge](https://github.com/minyang2020/dsh-feishu-bridge) —— DeepSeek Harness 的飞书（Lark）桥接插件（上游无描述）。
- [moyu-good/dsh-lark-bridge](https://github.com/moyu-good/dsh-lark-bridge) —— 🕊️ 在飞书/Lark 里跑完整的 DeepSeek Harness 编码 agent——原生思考过程（CoT）、交互式审批卡片、实时表情、斜杠命令、WS 长连接，无需公网回调地址（云鹊桥）。
- [Es1lama/whalemaid](https://github.com/Es1lama/whalemaid) —— 让手机完全接管电脑上的 DeepSeek Harness：原生会话、一次验证、后续安全（AGPL-3.0）。
- [coolbreezecoin/dsh-wechat-mp](https://github.com/coolbreezecoin/dsh-wechat-mp) —— 把 Markdown 排版成微信公众号图文草稿的 DeepSeek Harness 插件。
- [tarraencompassing61/dsh-lark-bot](https://github.com/tarraencompassing61/dsh-lark-bot) —— 把 DeepSeek Harness 桥接进飞书/Lark：在手机、群聊、话题中驱动本地编码 agent，会话、任务、卡片与项目工作区一站式协同。
- [xqicxx/dsh-telegram](https://github.com/xqicxx/dsh-telegram) —— 原生 Telegram 桥接插件：从手机与 dsh agent 聊天、控制会话并管理 harness。
- [zetaluolang-cyber/deepseek-harness-phone-remote](https://github.com/zetaluolang-cyber/deepseek-harness-phone-remote) —— 通过 Tailscale 手机远程控制 DeepSeek Harness——持久化文件/工作区插件——已在 OPPO Find X8 Ultra 上测试。
- [sq8161/dsh-qq-notify](https://github.com/sq8161/dsh-qq-notify) —— DSH（DeepSeek Harness）QQ 通知插件：对话回合结束时经腾讯官方 QQ Bot API 推送私聊提醒，内置扫码绑定、5 个预设与占位变量，零外部依赖。
- [534119219/dsh-messaging](https://github.com/534119219/dsh-messaging) —— DSH 消息平台插件（messaging-core）：27 个消息渠道统一接入，移植自 hermes-agent。
- [DLive/dsh-qqbot-community](https://github.com/DLive/dsh-qqbot-community) —— 为 DeepSeek Harness 提供 QQ 官方机器人的接入能力。
- [bftz22/dsh-openai-bridge](https://github.com/bftz22/dsh-openai-bridge) — 让 Chatbox（或任何 OpenAI 兼容客户端）直接驱动本机 DeepSeek Harness (dsh) 智能体的 OpenAI 兼容桥接服务：支持流式输出、工具调用追踪、持久会话、一键安装。
- [534119219/chicheng-push](https://github.com/534119219/chicheng-push) —— DSH(DeepSeek Harness) Web 消息推送插件：多渠道推送(Server酱/PushPlus/Bark/钉钉/企微/Telegram/飞书/Webhook等)，设置界面提供「推送插件」入口，可被其他插件调用(pushNotifier 服务 / /push/api 接口)。
- [LPX-E5BD8/dsh-plugin-lark](https://github.com/LPX-E5BD8/dsh-plugin-lark) —— 面向 DeepSeek Harness 的飞书/Lark 桥接插件，支持流式卡片 2.0、工具审批与会话路由。
- [zhuiyueya/dsh-im-gateway](https://github.com/zhuiyueya/dsh-im-gateway) —— 把 dsh agent 接入微信、飞书等 20+ 聊天平台的聚合网关插件。
- [Kairos0922/dsh-wechat-bridge](https://github.com/Kairos0922/dsh-wechat-bridge) —— DeepSeek Harness (DSH) 微信渠道：iLink 网关 + 对话桥接 —— 多模式路由、审核、限流感知出片队列、Markdown 策略、Web 设置面板。
- [JxaMe/dsh-telegram-bridge](https://github.com/JxaMe/dsh-telegram-bridge) —— DeepSeek Harness 的 Telegram 桥接插件（上游未提供描述）。
- [codelogickeep/deepseek-harness-plugin](https://github.com/codelogickeep/deepseek-harness-plugin) —— 钉钉 ↔ DeepSeek Harness (DSH) 双向通信桥接器，让 Agent 走进钉钉。采用企业内部应用 + Stream 模式，无需公网域名；含会话管理控制台与 MiniMax 网页搜索接入。
- [keepview/dsh-lark](https://github.com/keepview/dsh-lark) —— Minimal Lark/Feishu gateway plugin for DeepSeek Harness (dsh) — chat with your agent from Feishu, one topic = one session. 极简 DeepSeek Harness 飞书网关插件
- [omdsh-dev/dsh-lark](https://github.com/omdsh-dev/dsh-lark) —— 飞书/Lark IM 机器人频道插件，适配 DeepSeek Harness（DSH）。
- [lubaiUwU/DSH-WeChatClawBot](https://github.com/lubaiUwU/DSH-WeChatClawBot) — DSH 插件：微信悬浮球桥接（扫码登录，消息转发给 agent）。
- [xmanrui/dsh-im](https://github.com/xmanrui/dsh-im) — 通过扫码或机器人凭据把IM机器人接入DeepSeek Harness（支持飞书、微信、钉钉、企业微信、QQ、Telegram、Discord和WhatsApp）。
- [s17179XTY/dsh-mobile](https://github.com/s17179XTY/dsh-mobile) —— dsh-mobile —— 用于 DeepSeek Harness 的手机连接插件。
- [tangwenhao616-netizen/dsh-weixin](https://github.com/tangwenhao616-netizen/dsh-weixin) —— dsh-weixin 增强 fork：多会话、斜杠命令、每会话模型、并发修复。
- [MichengAI/dsh-im-connect](https://github.com/MichengAI/dsh-im-connect) —— DSH IM Connect 基于 DeepSeek Harness 的 IM 链接插件，无缝链接微信、企业微信、钉钉、QQ、飞书等。
- [Gum97/dsh-telegram](https://github.com/Gum97/dsh-telegram) —— DeepSeek Harness 的 Telegram 频道：富文本表格、双向图片、内联键盘提问、会话内模型切换。
- [ringclaw/dsh-ringcentral](https://github.com/ringclaw/dsh-ringcentral) —— 将 RingCentral 接入 DeepSeek Harness (dsh) 的插件。
- [xiaomengxinbb/dsh-qq-bridge](https://github.com/xiaomengxinbb/dsh-qq-bridge) —— 将 QQ（私聊+群聊）接入 DeepSeek Harness 的双向桥插件：每个 QQ 对话一个隔离持久 Agent 会话，支持命令/审批/多媒体/出站文件。

## 插件市场与生态

_插件市场、安装管理器、索引与生态工具。_
- [DSHPlugin.app](https://dshplugin.app/) —— 独立的 DeepSeek Harness 插件目录，提供基于源码的能力摘要、安装信息、仓库活跃度与安全信号。

- [bradeGithub/DSH-Plugins-Marketplace](https://github.com/bradeGithub/DSH-Plugins-Marketplace) —— 插件市场 GUI。
- [LX2000WASD/dsh-web-plugin-manager](https://github.com/LX2000WASD/dsh-web-plugin-manager) —— 网页插件管理器。
- [Toukaiteio/dsh-plugin-installer](https://github.com/Toukaiteio/dsh-plugin-installer) —— 插件安装器。
- [Sunrisepeak/dsh-index](https://github.com/Sunrisepeak/dsh-index) —— 插件索引。
- [akira399/dsh-plugin-publisher](https://github.com/akira399/dsh-plugin-publisher) —— 插件发布工作流。
- [nightwhale-dev/nightwhale](https://github.com/nightwhale-dev/nightwhale) —— 生态聚合。
- [ZK-Andy/dsh-continual-evolve](https://github.com/ZK-Andy/dsh-continual-evolve) —— 自我进化插件。
- [green-dalii/dsh-plugin-dev-skill](https://github.com/green-dalii/dsh-plugin-dev-skill) —— DeepSeek Harness 插件开发 skill：让任何 Agent 都能正确、高效、合规地开发 DSH 插件，含精简参考文档与论文解读。
- [DDDFXYqiming/Agent_Extensions](https://github.com/DDDFXYqiming/Agent_Extensions) —— Agent Skills 与 DeepSeek Harness (DSH) 扩展库：通用智能体技能（General_skills）+ DSH 标准插件（dsh-plugin），开箱即用的 AI Agent 能力增强集合。
- [MicroMilo/upstream-radar](https://github.com/MicroMilo/upstream-radar) —— 面向 DeepSeek Harness 插件生态的持续漏洞与破坏性变更影响监控。
- [plwslpld-arch/deepseek-harness-atlas](https://github.com/plwslpld-arch/deepseek-harness-atlas) —— DeepSeek Harness 中文源码、架构、插件生态与持续更新知识库。
- [DumplingHuman/dsh-plugin-tutorial](https://github.com/DumplingHuman/dsh-plugin-tutorial) —— DeepSeek Harness 插件开发教程（快速上手）：涵盖 Cordis 框架、Tool 开发与 LLM 接入等内容。
- [lvyuchuiyi/dsh-funpack](https://github.com/lvyuchuiyi/dsh-funpack) —— DeepSeek Harness 的一些有趣插件合集。
- [entireyu/dsh-launcher](https://github.com/entireyu/dsh-launcher) — DeepSeek Harness Launcher（DSH 安装启动助手），基于 Tauri 开发。
- [qincaizheng/betterdshlauncher](https://github.com/qincaizheng/betterdshlauncher) — DeepSeek Harness 启动器插件（上游无描述）。
- [zhang66633/dsh-plugin-installer](https://github.com/zhang66633/dsh-plugin-installer) — DeepSeek Harness 插件安装工具（上游无描述）。
- [dshworks/dshworks.github.io](https://github.com/dshworks/dshworks.github.io) — dsh.works 落地页：DeepSeek Harness (dsh) 社区工坊，纯静态单页，零 JS。
- [zebbkira/dsh-skills-mcp-manager](https://github.com/zebbkira/dsh-skills-mcp-manager) — 面向 DeepSeek Harness Web GUI 的正式插件包：在设置页的「Web UI 插件」分组中新增一张「技能与 MCP」卡片，用于在浏览器里管理技能（skills）与 MCP 服务器。
- [meifeisite/plugin-manager](https://github.com/meifeisite/plugin-manager) —— 在 DeepSeek Harness（Web 版）设置 → 插件中提供集中管控界面：启停 / 卸载（含依赖检查）/ 详情 / 操作日志，核心组件受保护。
- [swaylq/dsh-genie](https://github.com/swaylq/dsh-genie) —— 把 agent 现场造的插件变成永久插件：将 `cordis_define` 的动态包固化成能跨重启存活的正式组合包，不用 pnpm、不联网、不需要构建授权。

- [cynch18/plugin-switch](https://github.com/cynch18/plugin-switch) —— DSH Web 插件：在 GUI 中开关插件，无需重启服务。

- [nonmean/dsh-plugin-explorer](https://github.com/nonmean/dsh-plugin-explorer) —— DSH 客户端插件：浏览带 dsh-plugin 标签的 GitHub 仓库（名称/README/统计），支持同步与搜索。
- [Noob-stupid/dsh-plugin-hub](https://github.com/Noob-stupid/dsh-plugin-hub) —— DeepSeek Harness 插件管理面板：一键启用/停用插件 + GitHub dsh-plugin 插件市场，带插件详情与一键安装。

- [Dylan37670/dsh-plugin-panel](https://github.com/Dylan37670/dsh-plugin-panel) — DSH 插件市场面板：全量目录搜索、中文翻译、语义搜索、收藏与生命周期管理。
- [moyang11111/DSH-](https://github.com/moyang11111/DSH-) — DSH Web GUI 自用插件集合：换肤（8 套配色 + 自定义取色器 + 背景壁纸）与插件市场插件等。
- [ghbhiee/dsh-plugins](https://github.com/ghbhiee/dsh-plugins) —— DeepSeek Harness 的终端、文件浏览器与移动端/CLI 插件集。
- [stuarthu/dsh-hot-reload](https://github.com/stuarthu/dsh-hot-reload) —— 不重启 dsh 即可热重载升级后的 DeepSeek Harness (dsh) 插件——原地安全重载，失败的自动回滚并提示重启。
- [winliyou/dsh-plugins](https://github.com/winliyou/dsh-plugins) —— DeepSeek Harness 插件集。

- [1e0zj/dsh-plugin-mall](https://github.com/1e0zj/dsh-plugin-mall) —— DSH 插件市场：搜索 GitHub dsh-plugin 话题插件，一键安装到本地 dsh（agent 工具 + 设置页插件市场 tab）。
- [2160039878-cyber/dsh-plugin-market](https://github.com/2160039878-cyber/dsh-plugin-market) —— DeepSeek Harness 的 GitHub 插件雷达。
- [777-Zen/dsh-capability-index](https://github.com/777-Zen/dsh-capability-index) —— 插件库起飞前检查单：任务型请求时注入 Top-K 适用插件提示（带 use_when/not_for 能力声明），让插件利用率可预期、不靠运气和直觉。
- [apbigking-cell/dsh-plugin-square](https://github.com/apbigking-cell/dsh-plugin-square) —— DeepSeek Harness 插件广场 + 统筹层：实时同步 GitHub dsh-plugin，支持搜索、翻译、事务安装与启停卸载；按 universal/session/dual 分级治理插件，支持单会话按需激活、自动释放与臃肿审计。
- [Casually/deepseek-harness-plugs-manage](https://github.com/Casually/deepseek-harness-plugs-manage) —— DeepSeek Harness 插件管理工具，方便搜索安装官方插件库。
- [jianxx/dsh-cc-plugins](https://github.com/jianxx/dsh-cc-plugins) —— DSH 插件集合（上游无描述）。
- [Jiaoyifu1203/jiaoyifu-dsh-plugins](https://github.com/Jiaoyifu1203/jiaoyifu-dsh-plugins) —— 个人 DSH 插件集合（上游无描述）。
- [leenkcool/Blue-Whale-Harness](https://github.com/leenkcool/Blue-Whale-Harness) —— DeepSeek Harness 插件集。
- [moneka123/deepseek-harness-plugin-dev-guide](https://github.com/moneka123/deepseek-harness-plugin-dev-guide) —— 面向 AI 编程助手的 DSH 插件开发规范。详解扩展点（tools/systemPrompt/agent/llm）、ctx.effect 资源清理、动态 Cordis（define/run/stop）Host/Client 双端沙箱、Bundle Patch 覆盖及 Profile 安装底层实现。
- [RoyDevCh/roycode-dsh-pack](https://github.com/RoyDevCh/roycode-dsh-pack) —— 一键插件包：把 RoyCode Studio 能力移植到 DSH——LSP / 密文扫描 / 浏览器 MCP server、可编程事件钩子（roycode-hooks v2）、团队、4 个 skill、幂等安装/卸载脚本。
- [AwesomeHou/dsh-plugin-marketplace](https://github.com/AwesomeHou/dsh-plugin-marketplace) —— DeepSeek Harness 插件市场：实时同步 GitHub dsh-plugin topic（1800+ 仓库）到可搜索、分页的设置面板，支持一键安装及 agent 工具（market_search / market_install）。
- [edison7009/EchoBird](https://github.com/edison7009/EchoBird) —— 多款编程 agent（Claude Code、Codex CLI、Grok Build、DeepSeek Harness、Kimi Code、Qwen Code、Aider、OpenCode 等）的一键安装与模型切换工具。
- [aust24lzy/dsh-plugin-hub](https://github.com/aust24lzy/dsh-plugin-hub) — DeepSeek Harness (DSH) 开源插件导航站 —— 实时同步 dsh-plugin 生态，按 Stars 动态排行。
- [ywsldxk/dsh-plugin-stars](https://github.com/ywsldxk/dsh-plugin-stars) — DeepSeek Harness（DSH）插件排行榜 / 插件目录，按 GitHub Stars 排序并自动更新。
- [ChengxiuCDP/dsh-plugin-advisor](https://github.com/ChengxiuCDP/dsh-plugin-advisor) —— DeepSeek Harness 插件推荐/顾问工具（上游无描述）。
- [imtanhui/dsh-plugin-butler](https://github.com/imtanhui/dsh-plugin-butler) —— DeepSeek Harness 插件管家工具（上游无描述）。
- [lazyaer/dsh-plugin-manager](https://github.com/lazyaer/dsh-plugin-manager) —— DSH Web 插件：在浏览器中启用/禁用已安装插件，并对每个插件的下载记录（来源与时间）进行审计。
- [linhut/dsh-manager](https://github.com/linhut/dsh-manager) —— ⚡ DeepSeek Harness 安装与管理工具 —— 一键安装、插件市场、版本管理。
- [skillre/dsh-wiki](https://github.com/skillre/dsh-wiki) —— DeepSeek Harness 的 wiki 插件（上游无描述）。
- [ruimin251204/dsh-plugin-surgery](https://github.com/ruimin251204/dsh-plugin-surgery) —— DSH 插件（上游未提供描述）。
- [FeatherHunter/dsh-mattpocock-skills-deck](https://github.com/FeatherHunter/dsh-mattpocock-skills-deck) —— 🧠 MattSkills：Matt Pocock 的 25 个工程技能装好即用——wayfinder 决策地图、triage 分诊、grilling 拷问、handoff 交接，一条安装 Prompt 全装完。
- [honghudavy-star/DSH_plugins_4U](https://github.com/honghudavy-star/DSH_plugins_4U) —— DSH 自建插件集合：微信桥接器 + GUI 微信入口补丁，一键安装。
- [ARFCON/dsh-hub-DSH](https://github.com/ARFCON/dsh-hub-DSH) —— dsh-hub —— DSH 插件中枢：插件更新引擎、全局记忆、记忆图谱挂载、插件市场联动与自身更新检查，在设置页统一查看与管理。
- [DshMarketPlace/dsh-plugins-store](https://github.com/DshMarketPlace/dsh-plugins-store) —— Browse and install DSH plugins from inside DeepSeek Harness. /store, a settings tab, and agent tools — bilingual.
- [nonentity303/dsh-plugin-manager](https://github.com/nonentity303/dsh-plugin-manager) —— deepseek-harness,dsh,dsh-plugin,plugin-management,plugin-manager。
- [wingsky-1/dsh-plugin-hub](https://github.com/wingsky-1/dsh-plugin-hub) —— DSH (DeepSeek Harness) 插件集：npm 分发，可一键装全家桶或单独安装。
- [xDylanLong/dsh-snapmarketing](https://github.com/xDylanLong/dsh-snapmarketing) —— dsh-snapmarketing is a thin DeepSeek Harness surface for discovering, installing, and managing allowlisted plugins.
- [alexchenzl/dsh-plugin-directory](https://github.com/alexchenzl/dsh-plugin-directory) —— 社区维护的 DeepSeek Harness 插件目录。
- [kouyichi/dsh-plugins](https://github.com/kouyichi/dsh-plugins) —— dsh (DeepSeek Harness) 插件家族：31 个插件 / 80+ 工具——learn/profile/dream/tower/kanban + scaffold/guard/xray/cron/bench/pack/a2a/meter + 18 个 TUI 组件。
- [LA7-F/dsh-MyCordis](https://github.com/LA7-F/dsh-MyCordis) —— 可以让你的 dsh 中的“Cordis 插件”变得可管理，可一键生成安装包。
- [MicroSpotlight/openharness-find-plugin](https://github.com/MicroSpotlight/openharness-find-plugin) —— DeepSeek Harness / OpenHarness 插件发现工具：查找带有 `dsh-plugin` 标签的插件。
- [0326/dsh-plugin-market](https://github.com/0326/dsh-plugin-market) — 面向 DeepSeek Harness 的安全可信、精选插件市场。
- [amplifthq/oh-my-dsh](https://github.com/amplifthq/oh-my-dsh) — DeepSeek Harness 的精选分发版——叠加层而非分叉。
- [space-spacee-clamation/dsh-package-manager](https://github.com/space-spacee-clamation/dsh-package-manager) — dsh包管理器中间件，对原有的add的模式进行的封装，支持预设和插件（内容还在迭代!!!!）。
- [Iraryi/deepseek-harness-hub](https://github.com/Iraryi/deepseek-harness-hub) — DeepSeek Harness HUB：发现、验证安装、组件管理与 Windows 发布包一站式处理。
- [saitamahang/dsh-skill-importer](https://github.com/saitamahang/dsh-skill-importer) — 为 DeepSeek Harness（DSH）、Claude Code、Codex 等 AI 编程 Agent 导入、验证、管理和迁移 Agent Skills。
- [yunyunyunyunsuan/dsh-plugin-radar](https://github.com/yunyunyunyunsuan/dsh-plugin-radar) — DeepSeek Harness 插件雷达：定时扫描 GitHub topic:dsh-plugin 新插件，Web 界面左下角卡片推送，支持 README 关键词搜索与一键安装。
- [XINGchi0130/dsh-base-plugin](https://github.com/XINGchi0130/dsh-base-plugin) — DeepSeek Harness（DSH）基础插件：插件市场、MCP、Skills、用量、会话、移动端访问——零修改 harness 源码。
- [AJUbest/dsh-plugin-optimization](https://github.com/AJUbest/dsh-plugin-optimization) —— 一款 DSH 插件，可在 Web 界面区分 DSH 自带插件与自定义插件，并能够收纳管理用户之前创建的全部自定义插件。
- [DshMarketPlace/dshmarketplace](https://github.com/DshMarketPlace/dshmarketplace) —— DeepSeek Harness（DSH）插件双语目录站——收录 1,004 个插件，带图文详情页与公开 API，基于 Next.js 部署在 Cloudflare Workers。
- [qinyre/dsh-plugin-capabilities](https://github.com/qinyre/dsh-plugin-capabilities) —— 在 dsh 设置页管理技能与 MCP 服务器，支持从 Claude Code、Codex 导入。
## 可视化

_把数据 / 结果变成图表、图形、看板的插件。_

- [ZSeven-W/dsh-openpencil](https://github.com/ZSeven-W/dsh-openpencil) —— OpenPencil 设计稿预览与编辑插件。  `⭐33`
- [omdsh-dev/dsh-genui](https://github.com/omdsh-dev/dsh-genui) —— 通过 `dsh-ui` 代码栅栏在回复中内联渲染可交互 UI 组件：布局、图表、绘图、表单、测验、mermaid、3D 场景，并把交互事件回传给模型。  `⭐14`
- [william-jin-cmu/dsh-vision](https://github.com/william-jin-cmu/dsh-vision) —— `view_image` 工具：把任意 OpenAI 兼容 VLM 桥接给纯文本模型。  `⭐10`
- [wang-bool/visual-review](https://github.com/wang-bool/visual-review) —— 在 DSH Web 聊天界面内联渲染粘贴/上传的图片，让纯文本模型获得视觉：云端多模态 API 优先，本机 Qwen3-VL 兜底。
- [omdsh-dev/dsh-ernie-image](https://github.com/omdsh-dev/dsh-ernie-image) —— 百度 ERNIE-Image-Turbo 文生图：宿主端图像生成工具 + 浏览器画廊面板与配置卡。
- [omdsh-dev/dsh-paddle-ocr](https://github.com/omdsh-dev/dsh-paddle-ocr) —— 百度 PaddleOCR-VL 文档版面解析：把 PDF/图片逐页解析为 Markdown，含宿主工具、配置卡与任务面板。
- [PangYiMing/dsh-screenshot-diff](https://github.com/PangYiMing/dsh-screenshot-diff) —— 用 pixelmatch 对两张截图做像素级对比，输出 diff 图与三联图。
- [Kevoyuan/dsh-mac-vision](https://github.com/Kevoyuan/dsh-mac-vision) —— macOS 原生 OCR/Vision 框架集成。
- [MC5lan/dsh-multimodal](https://github.com/MC5lan/dsh-multimodal) —— 视觉转写 + 文生图整合。
- [loudMore/dsh-drop-to-path](https://github.com/loudMore/dsh-drop-to-path) —— 把拖放的图片/文件转为路径，交给纯文本模型。
- [Yuuz12/dsh-vision-helper](https://github.com/Yuuz12/dsh-vision-helper) —— 视觉辅助插件。
- [ysr666/dsh-vision-router](https://github.com/ysr666/dsh-vision-router) —— 为纯文本 Agent 提供视觉能力：内置免 Key 视觉链 + 像素级视觉工具；粘贴图片即可用，无 Python，一条命令安装。
- [pinch-eng/dsh-audio-dub](https://github.com/pinch-eng/dsh-audio-dub) —— 视频/音频配音工具。
- [LuZhouheng/dsh-gen3d](https://github.com/LuZhouheng/dsh-gen3d) —— DeepSeek Harness 3D 角色生成插件：直连 Meshy / Hunyuan3D / Tripo3D / Rodin 官方 API，自配 key，mock 回退。
- [wangyang10/image-vision](https://github.com/wangyang10/image-vision) —— DeepSeek Harness 的图像/视觉 skill 插件。
- [xiaoshihou514/dsh-vision](https://github.com/xiaoshihou514/dsh-vision) —— DeepSeek Harness 的视觉桥接。
- [Hyperionjust/dsh-tool-underseal](https://github.com/Hyperionjust/dsh-tool-underseal) —— 面向 DeepSeek Harness 的封存式工具插件（支持多模型）。
- [hccccc01333/dsh-report-html](https://github.com/hccccc01333/dsh-report-html) —— 从 Markdown、表格、图表、中国地图、流程图、公式与可钻担表格生成自包含交互式 HTML 报告。
- [yumimanji/dsh-ui-spec](https://github.com/yumimanji/dsh-ui-spec) —— 把 UI 截图转化为可用于实现的前端规格：确定性几何解析（sharp）+ 可选视觉模型语义，合并为一份 JSON + Markdown 规格。
- [237229953-create/dsh-vision](https://github.com/237229953-create/dsh-vision) —— DSH 插件：让纯文本模型（如 DeepSeek-V4）通过视觉模型自动识图。官方表面替换、缓存友好，人类转录不受影响。纯文本模型自动识图桥。
- [moon09300731/dsh-vision-tools](https://github.com/moon09300731/dsh-vision-tools) —— DeepSeek Harness 视觉能力全家桶：`vision_understand` 工具 + 粘贴/拖拽/按钮三种识图入口。
- [tdf1995/dsh-plugin-vision](https://github.com/tdf1995/dsh-plugin-vision) —— 为纯文本 LLM 在 DeepSeek Harness 中提供视觉能力：通过免费的 Gemini 与 GLM 视觉 API 实现看图说话 / OCR / VQA。
- [liustack/modlens](https://github.com/liustack/modlens) —— 首个面向 DeepSeek Harness 的视觉插件，也是所有纯文本编码 agent 的视觉桥接层：粘贴图片即可得到结构化 JSON 证据（OCR、布局、语义）。
- [GXX182/dsh-vision-bridge](https://github.com/GXX182/dsh-vision-bridge) — DeepSeek Harness 插件，将会话中的图片桥接到可插拔的视觉 API，同时保持 DeepSeek 作为主模型。
- [hZsFN/dsh-image-bridge](https://github.com/hZsFN/dsh-image-bridge) — DeepSeek Harness (dsh) 纯文本模型的图片消息桥接：图片块转为文本占位符 + 本地路径，通过 qwen 脚本实现视觉理解。
- [wulusai2333/mimo-vision](https://github.com/wulusai2333/mimo-vision) — DeepSeek Harness (DSH) 原生插件——describe_image 工具：基于 ctx.fs / ctx.credentials 接缝实现的视觉桥接（图片 → mimo-v2.5 → 文字描述）。
- [yuqingsh/dsh-image-subagent](https://github.com/yuqingsh/dsh-image-subagent) — DeepSeek Harness 图像处理子代理插件。
- [PixLunaLab/dsh-pixluna](https://github.com/PixLunaLab/dsh-pixluna) — dsh-plugin-pixluna | 让 DSH 自己看涩图！
- [Gcsimple/Emoji_Desktop_Pet](https://github.com/Gcsimple/Emoji_Desktop_Pet) — Emoji Desktop Pet 表情桌面宠物——基于 DSH 动态 Cordis 插件架构的可拖拽 emoji 桌面宠物：待机动画、点击互动、40 个内置角色。
- [Flyvhidbwo/dsh-vision-proxy](https://github.com/Flyvhidbwo/dsh-vision-proxy) — DeepSeek Harness 插件：DeepSeek 大脑 + 自动识图，附加图片自动经 VLM 转译成文字后交给 DeepSeek 作答。
- [re-ITRT/dsh-vision-tool](https://github.com/re-ITRT/dsh-vision-tool) — DeepSeek Harness 视觉插件：提供 `vision_analyze` 工具与 Models 风格设置页（Cordis 插件）。
- [mochgolf/dsh-deepseek-vision-router](https://github.com/mochgolf/dsh-deepseek-vision-router) — DeepSeek Harness 透明图像预处理路由。
- [cyanfish-x/dsh-live2d-pets](https://github.com/cyanfish-x/dsh-live2d-pets) — Live2D 桌宠插件 for DeepSeek Harness：Agent 状态镜像 + 互动陪伴，内置宽松许可预设模型。
- [anneheartrecord/dsh-desk-pet](https://github.com/anneheartrecord/dsh-desk-pet) — 常驻置顶的 DeepSeek Harness 桌宠：默认鲸鱼形象，四种皮肤、四种静默状态。
- [xiaoxianyu-office/dsh-image-tools](https://github.com/xiaoxianyu-office/dsh-image-tools) — DSH bundle 插件：纯文本主模型识图桥接 + read_image 屏蔽 + 对话式 image_recognize 识图工具。
- [CeasarSmj/dsh-vision-mcp](https://github.com/CeasarSmj/dsh-vision-mcp) — DeepSeek Harness 视觉 MCP 插件（无描述）。
- [ZRui-C/dsh-computer-use](https://github.com/ZRui-C/dsh-computer-use) — DeepSeek Harness computer-use 插件（无描述）。
- [clr112409-dot/TK-GMVMAX-DSH](https://github.com/clr112409-dot/TK-GMVMAX-DSH) —— TK-GMVMAX 看板（TikTok 广告素材 + FBT 库存）的 DeepSeek Harness 宿主插件与自动安装脚本。
- [lehhair/dsh-html-artifact](https://github.com/lehhair/dsh-html-artifact) —— DeepSeek Harness 的 HTML artifact 插件。

- [AKS1st/dsh-mermaid](https://github.com/AKS1st/dsh-mermaid) —— 在 DSH Web 会话中把 Mermaid 代码围栏渲染为 SVG 图表。
- [alsj213/local-ocr-cli](https://github.com/alsj213/local-ocr-cli) —— 完全本地的 OCR CLI（面向纯文本 LLM）：PaddleOCR-VL 首选引擎 + tesseract 兜底，附带 dsh 插件，图片不出本机。
- [hige6/imgpost](https://github.com/hige6/imgpost) —— 图邮 (imgpost)：将本地/URL 图片送入 DSH 对话，并可通过 OpenAI 兼容 API 生成图片，经本地 /dsh-img2 路由内联渲染。
- [MoneShadow/dsh-plugin-vision](https://github.com/MoneShadow/dsh-plugin-vision) —— 让没有视觉能力的大模型拥有视觉（通过外挂视觉模型实现）。
- [qing9835/plug](https://github.com/qing9835/plug) —— 给文本模型装眼睛（deepseek-eyes / dsh-eyes）：把图片交给外部视觉大模型（Qwen-VL / DeepSeek-VL2 / DeepSeek-OCR），拿回文字描述喂给主模型。

- [FuzzySoul/dsh-free-vision](https://github.com/FuzzySoul/dsh-free-vision) —— DeepSeek Harness 视觉桥接插件：通过 luma-mcp 让纯文本模型理解图片，默认免费 Qwen3-VL-Flash。
- [JIAQI23333/dsh-visual-plan](https://github.com/JIAQI23333/dsh-visual-plan) —— DeepSeek Harness 可视化计划模式：将 Plan Mode 生成的计划变为可编辑节点图，支持批注、Plan Diff 与版本化回写。
- [Koreyer/easy-vision](https://github.com/Koreyer/easy-vision) —— 让纯文本 agent “看见”本地图片的工具插件：自动识别真实格式，经任意 OpenAI 兼容视觉模型返回详细文字描述。
- [maxwell-feng/dsh-tesseract-ocr](https://github.com/maxwell-feng/dsh-tesseract-ocr) —— 本地 Tesseract OCR 插件：图片在本地识别，仅文本发送给模型——图片字节不出本机。
- [maxwell-feng/dsh-windows-ocr](https://github.com/maxwell-feng/dsh-windows-ocr) —— 本地 Windows OCR 引擎插件（Windows.Media.Ocr）：图片本地识别，仅识别文本发送给模型。
- [YOGEMOW/DeepSeek_Prism](https://github.com/YOGEMOW/DeepSeek_Prism) —— 为纯文本模型按需识图：DSH 零补丁 Cordis 插件（prism_see 工具 + 图片 VEP 降级 + 技能运行时注册）+ Codex Skill；多 Provider 视觉 API，低 Token 视觉证据包。


- [314857493/dsh-vision-free-eyes](https://github.com/314857493/dsh-vision-free-eyes) —— 给纯文本 DeepSeek Harness 免费接入 GLM 视觉：GUI 粘贴图片（自动转写）+ 视觉工具 + skill。
- [chang416/deepsee](https://github.com/chang416/deepsee) —— 为 DeepSeek Harness 提供视觉 + 智能模型路由。Gemini 负责看，DeepSeek 负责写代码。
- [LaplaceYoung/dsh-directorx](https://github.com/LaplaceYoung/dsh-directorx) —— 以 DeepSeek Harness 插件形式集成 DirectorX：AI 视频/图像/音频技能、知识语料库，以及可配置的视觉/图像/视频/音频模型工具。
- [siegfly/dsh-deepseek-vision](https://github.com/siegfly/dsh-deepseek-vision) —— DeepSeek Harness 视觉语言网关插件——粘贴图片，DeepSeek 即获得文本化视觉理解。
- [whitelonng/dsh-plugin-describe-image](https://github.com/whitelonng/dsh-plugin-describe-image) —— describe_image 插件——通过 OpenAI 兼容的 VLM 端点让纯文本模型获得视觉能力。
- [xzyonline/dsh-vision](https://github.com/xzyonline/dsh-vision) —— 为纯文本 DeepSeek 提供视觉：通过任意 OpenAI 兼容 VLM 端点提供 view_image 工具。macOS/Windows/Linux，一键安装。
- [cdxiaodong/dsh-island](https://github.com/cdxiaodong/dsh-island) —— 通过 Unix socket 把 DSH agent 的会话、工具调用与审批实时桥接到 CodeIsland macOS 刘海面板，可直接在面板上批准/拒绝。
- [CaseyTso/analyze_image_tool](https://github.com/CaseyTso/analyze_image_tool) — 给纯文本 DSH 模型加识图能力：`analyze_image` 把图片转发到任意 OpenAI 兼容视觉端点。
- [GHJIVHIDD/dsh-plugin-canvas](https://github.com/GHJIVHIDD/dsh-plugin-canvas) — Canvas 预览插件：HTML 设计原型 Tab + `canvas_preview` 模型工具，带隐私遮蔽与沙箱 iframe 渲染（MIT）。
- [linenxi-ctrl/dsh-vision](https://github.com/linenxi-ctrl/dsh-vision) — 为 DSH 增加外挂识图模型：鲸鱼按钮、发图识图自动回传、模型自主截图 + 识图工具、多协议自动适配、一键安装。
- [WUBING2023/deepsee](https://github.com/WUBING2023/deepsee) — 一条命令装好的识图与模型路由插件。
- [Icestab/dsh-image-vision-bridge](https://github.com/Icestab/dsh-image-vision-bridge) —— DSH 插件：聊天发图自动交给视觉模型 (mimo-v2.5) 分析，把文本描述悄悄喂给纯文本主模型，聊天记录保持原图显示。
- [Mappedinfo/dsh-tool-vision-read](https://github.com/Mappedinfo/dsh-tool-vision-read) —— DSH 插件：`vision_read`——把图片读取路由给专用视觉模型（如 Kimi K3），让纯文本 agent 也能看图。
- [Signalight/codex-to-dsh-pet](https://github.com/Signalight/codex-to-dsh-pet) —— 移植到 DeepSeek Harness 的 Codex 风格桌宠（上游无描述）。
- [spacexun2/dsh-worktime-board](https://github.com/spacexun2/dsh-worktime-board) —— 牛马修仙看板：DeepSeek Harness 工时统计 + 十二境界修仙面板（日/周/月 + 学年年历，炼气→宇宙洪荒）。

- [leozou320-ai/dsh-macos-vision-ocr](https://github.com/leozou320-ai/dsh-macos-vision-ocr) —— DeepSeek Harness 本地离线 OCR 插件（macOS Vision，免 API key）。
- [brokge/gold-monitor](https://github.com/brokge/gold-monitor) —— 黄金实时监控看板：XAU/USD 实时金价、人民币/克折算、会话走势、价格提醒与历史走势；附带 DSH Web 插件（dsh-gold-monitor）。
- [sparkmio/dsh-sfversion](https://github.com/sparkmio/dsh-sfversion) —— SF 视觉桥——给纯文本模型的 DeepSeek Harness 装上眼睛。
- [statem-li/Kr-DSH](https://github.com/statem-li/Kr-DSH) —— DSH 生图插件：`generate_image` 工具调用自定义生图模型（images/generations 接口），含设置页模型选择。
- [uAcharGG/dsh-vision](https://github.com/uAcharGG/dsh-vision) —— DSH 视觉插件（上游无描述）。
- [binsarjr/dsh-codex-media](https://github.com/binsarjr/dsh-codex-media) —— DeepSeek Harness 图像与文档分析工具，基于本地 OpenAI Codex CLI（零依赖，3 种传输方式，可搭配 dsh-drop-to-path 使用）。
- [GOU-GEE/deepseek-vision](https://github.com/GOU-GEE/deepseek-vision) —— DeepSeek Harness 的视觉扩展插件（上游未提供描述）。
- [qq247505/DeepSeek-VisionPlus](https://github.com/qq247505/DeepSeek-VisionPlus) —— DeepSeek VisionPlus —— 官方级 DeepSeek Harness 视觉扩展。图像理解路由到免费视觉模型池（智谱 GLM、SiliconFlow Qwen），自动降级、限流、一键平台测试与实时状态行；文本仍由 DeepSeek 处理。一条命令安装，MIT 协议。
- [Dogwind221/dsh-vision-skill](https://github.com/Dogwind221/dsh-vision-skill) —— 识图 Agent Skill：为纯文本模型补视觉能力（多模型自动降级、DeepSeek Harness web 拖图即识别），基于 claude-vision-skill 改造。
- [lcb522/DSH-BongoCat-Plugin](https://github.com/lcb522/DSH-BongoCat-Plugin) —— Bongo Paw：面向 DeepSeek Harness web 的打字陪伴宠物插件——爪子敲击 + 按键气泡。
- [qing9835/dsh-eyes](https://github.com/qing9835/dsh-eyes) —— DSH 视觉模型插件：为无视觉能力的文本模型提供图片识别。粘贴/拖入/导入的图片自动交给 OpenAI 兼容视觉模型识别为文字并发送进对话，支持多轮复核（vision_ask）、多提供商配置。
- [rison114514/dsh-image-understanding](https://github.com/rison114514/dsh-image-understanding) —— deepseek-harness 原生插件：让纯文本模型(如 DeepSeek)经 agent/pre-step 劫持 + resolveModelInfo 包装自动识别上传图片(qwen-vl)。
- [xiaoyaoPanPan/dsh-photo-pick](https://github.com/xiaoyaoPanPan/dsh-photo-pick) —— DeepSeek Harness (dsh) 插件：基于视觉打分对相似照片排序筛选，需安装 dsh-photo-pick-app。
- [xlight/deepseek-visionary](https://github.com/xlight/deepseek-visionary) —— 使用 DeepSeek 官方多模态视觉模型让你的 Agent 不再眼瞎（支持 DSH、Zed、OpenCode、Codex、Claude Code、Cursor、Claude Desktop）。
- [dhb861832993-star/img-preview](https://github.com/dhb861832993-star/img-preview) — DeepSeek Harness 本地图片内联预览：img_serve 工具 + img 代码块围栏，直接在对话中渲染 PNG/JPG/WebP/GIF/AVIF/BMP/SVG/ICO。
- [shanliuling/dsh-image-gen](https://github.com/shanliuling/dsh-image-gen) — 面向 DeepSeek Harness 的可安装多供应商图像生成插件包（Google Gemini、OpenAI、火山引擎 Seedream）。
- [dream-num/dsh-univer-office](https://github.com/dream-num/dsh-univer-office) — 在 DeepSeek Harness 中预览 Univer 的表格、文档与幻灯片。
- [nlqh7/dsh-vision-router](https://github.com/nlqh7/dsh-vision-router) —— 给 DeepSeek Harness 纯文本模型加视觉：聊天框拖图自动分流给用户配置的视觉模型转文字，v4 不切换模型即可识图。
- [PerryLink/dsh-draw](https://github.com/PerryLink/dsh-draw) —— DeepSeek Harness 的统一静态图像生成路由器：一个标准化参数的 image_generate 工具，配置驱动的引擎路由（OpenAI Images、智谱 CogView、任何兼容端点）及健康感知降级、持久化工作区附件、每会话额度计数、插件设置面板。
- [QCYTSN/dsh-dafeiyu](https://github.com/QCYTSN/dsh-dafeiyu) —— 面向 DeepSeek Harness 的桌面原生大飞鱼伴侣——真实 Agent 状态，Windows 上总在最前。
- [zeroa234/dsh-comfyui](https://github.com/zeroa234/dsh-comfyui) —— ComfyUI 驱动器（AI-first 合同制）：模型只见合同槽位、不见工作流 JSON。文生图/图生图/文生视频/图生视频模板，双重预检防幻觉，官方/自定义节点活体判定。
- [Bob-Bo1/dsh-stock-watch](https://github.com/Bob-Bo1/dsh-stock-watch) —— 面向 DeepSeek Harness 的 A 股持仓追踪插件：读取本地 holdings.json，在侧边栏展示行情与盈亏。
- [nyantused-cpun/gewu-tools](https://github.com/nyantused-cpun/gewu-tools) —— 格物审视面：让 DSH 无视觉模型经视觉子代理完成视觉检验。模型无关的视觉检验流水线：HTML 截图 + 视觉子代理简报 + 源码事实核验。

## 幻灯片 / PPT

_生成演示文稿、幻灯片、导出 PPT。_

- [THU-MAIC/dsh-openmaic](https://github.com/THU-MAIC/dsh-openmaic) —— OpenMAIC for DSH：课堂、幻灯片、交互组件与苏格拉底式教学。

## 写代码

_代码生成、重构、审查、仓库级工程插件。_

- [Code2Skill](https://github.com/leechen298/Code2Skill) —— 从用户授权的现有代码生成 Function、MCP、Agent Skill 与离线测试包，并提供包含生成与审核 Skill 的 DeepSeek Harness Bundle。
- [omdsh-dev/dsh-open-in-vscode](https://github.com/omdsh-dev/dsh-open-in-vscode) —— 从 Web GUI 直接在 VS Code 中打开 DSH 工作区目录。  `⭐33`
- [omdsh-dev/dsh-custom-tool](https://github.com/omdsh-dev/dsh-custom-tool) —— 用 Monaco 编辑器创建和管理沙箱化 JavaScript 工具，工具生命周期由模型驱动。  `⭐18`
- [CanglongCl/dsh-web-review](https://github.com/CanglongCl/dsh-web-review) —— DSH Web GUI 的网页预览与元素批注插件，让 AI 根据可视化反馈直接修改前端源码。
- [omdsh-dev/dsh-plugin-check](https://github.com/omdsh-dev/dsh-plugin-check) —— 插件健康检查：扫描插件仓库的清单协议 / patch 格式 / 构建陷阱 / hub 收录状态，零依赖只读，注册 `plugin_check` 工具。  `⭐11`
- [omdsh-dev/plugin-template](https://github.com/omdsh-dev/plugin-template) —— 基于官方 turtle-ui 插件仓库创建的插件模板。
- [a179-sanae/dsh-code-check](https://github.com/a179-sanae/dsh-code-check) —— 自动类型检查诊断：模型改完代码后后台运行 `tsc --noEmit`，并注册 `code_check` 工具。
- [FlashingChen/dsh-worktree](https://github.com/FlashingChen/dsh-worktree) —— Codex 风格常驻 git worktree：创建/列出/删除工具、`/worktree` 命令与按仓库持久化清单。
- [PangYiMing/dsh-batch-regression](https://github.com/PangYiMing/dsh-batch-regression) —— 批量回归：把命令跑 N 轮，按中位数/分布取统计结论。
- [PangYiMing/dsh-bisect-debug](https://github.com/PangYiMing/dsh-bisect-debug) —— 二分法定位 bug 根因（代码 / 边界 / commit）。
- [PangYiMing/dsh-port-guard](https://github.com/PangYiMing/dsh-port-guard) —— 端口占用处置：复用、换端口或精准杀掉占用进程。
- [PerryLink/dsh-lsp-actions](https://github.com/PerryLink/dsh-lsp-actions) —— LSP 诊断/格式化动作。
- [lonelymoon87/dsh-code-intel](https://github.com/lonelymoon87/dsh-code-intel) —— DeepSeek Harness 的符号感知代码索引与混合检索。
- [lonelymoon87/dsh-gitflow](https://github.com/lonelymoon87/dsh-gitflow) —— DeepSeek Harness 的 git status/diff/commit/PR/worktree 工作流。
- [lonelymoon87/dsh-specflow](https://github.com/lonelymoon87/dsh-specflow) —— DeepSeek Harness 的规格驱动开发工具包。
- [lonelymoon87/dsh-vscode](https://github.com/lonelymoon87/dsh-vscode) —— DeepSeek Harness SDK 运行时的 VS Code 客户端。
- [liuup/dsh-latex-tools](https://github.com/liuup/dsh-latex-tools) —— 在 DeepSeek Harness 中复制与导出 LaTeX：悬停任意公式即可复制 TeX 源码或导出为独立 SVG 文件。
- [MOLAaaaaaaa/dsh-seismicx](https://github.com/MOLAaaaaaaa/dsh-seismicx) —— SeismicX 地震目录 skill 的 DeepSeek Harness 插件。
- [shyboy/dsh-k12-lesson-builder](https://github.com/shyboy/dsh-k12-lesson-builder) —— 生成图文同步的 K12 英语课件 PPTX 与 DOCX 的 DeepSeek Harness 插件。
- [BrambleXu/dsh-annotate](https://github.com/BrambleXu/dsh-annotate) —— DeepSeek Harness 浏览器元素可视化标注插件，捕获 DOM、样式、可访问性数据、评论与视口截图。
- [BrambleXu/dsh-revdiff](https://github.com/BrambleXu/dsh-revdiff) —— DeepSeek Harness 原生交互式 Git diff 审查，支持结构化批注并回传当前 Agent 会话。
- [sleepinginsummer/dsh-hashline-edit-pro](https://github.com/sleepinginsummer/dsh-hashline-edit-pro) —— DeepSeek Harness 的 Hashline 编辑升级版插件。
- [walavave/dsh-git](https://github.com/walavave/dsh-git) —— DeepSeek Harness 的 Git 插件。
- [Blackspace2/dsh-math-copy](https://github.com/Blackspace2/dsh-math-copy) — 在 dsh web 中复制数学公式。
- [lj970926/dsh-plugin-mermaid](https://github.com/lj970926/dsh-plugin-mermaid) — DeepSeek Harness web 客户端插件：渲染 mermaid 代码块，支持图表/源码切换。
- [KevinWen7415/dsh-virtual-workspace](https://github.com/KevinWen7415/dsh-virtual-workspace) — DeepSeek Harness 虚拟工作区：动态 Cordis 插件，将多个项目目录归组为一个名称以支持跨项目读取/搜索/写入，原生侧边栏集成与沙箱一致的权限升级。
- [joejojoking-cloud/dsh-file-explorer](https://github.com/joejojoking-cloud/dsh-file-explorer) — DeepSeek Harness 的全局文件资源管理器插件：在任何会话的标题栏右侧提供文件夹切换按钮，点击后在页面右侧打开可调宽度的文件树面板。
- [Ethanout/computer-use-plus](https://github.com/Ethanout/computer-use-plus) — 低 token、低延迟的 Windows 计算机操作 MCP，支持学习型快捷操作、UIA/CDP/OCR 路由，并支持 DeepSeek Harness。
- [jkcltc/dsh-chat-flow-re-layout](https://github.com/jkcltc/dsh-chat-flow-re-layout) — DeepSeek Harness Web UI 插件：将已完成的工具调用、上下文与推理折叠为紧凑的横向卡片。纯 CSS，无需构建。
- [Monokuna-Hugo/dsh-kaoyan-english](https://github.com/Monokuna-Hugo/dsh-kaoyan-english) — 考研英语阅读命题助手：运行在 DSH 中的动态 Cordis 插件，自动抓取《卫报》《今日心理学》《经济学人》等外刊文章并命制一套完整模拟卷。
- [LeslieWylie/dsh-md-preview](https://github.com/LeslieWylie/dsh-md-preview) — 在 DeepSeek Harness 中将 Markdown 渲染为独立、自包含的 HTML —— 提供可无头运行的 `md_html_render` 工具，以及 Web GUI 中的预览/导出面板，一套渲染器支撑两者，零依赖。
- [chenw2759-wq/dsh-IDE](https://github.com/chenw2759-wq/dsh-IDE) — 一个 SSH 前端插件，让 UI 体现类似 lab 的功能，用于远程 SSH 快速相应，同时可直接在前端操作/查看远程服务器上的信息与代码。
- [LJninse/dsh-open-in-ide](https://github.com/LJninse/dsh-open-in-ide) — DeepSeek Harness Web UI 插件：新增一个 IDE 按钮，自动检测本地 IDE 并打开当前工作区文件夹。
- [Pasumao/dsh-plugin-workbench](https://github.com/Pasumao/dsh-plugin-workbench) — 面向 DSH web GUI 的 VS Code 风格工作区文件浏览器，支持可编辑预览。
- [Zalpha263/dsh-file-explorer](https://github.com/Zalpha263/dsh-file-explorer) — 可以像其他 agent 一样查看当前工作区的文件夹，并且可以预览文件。
- [anoslide/dsh-vscode-layout](https://github.com/anoslide/dsh-vscode-layout) — 把 DeepSeek Harness（dsh）Web 界面改造成 VS Code 式 IDE：三栏布局、文件树、多标签查看器/编辑器、桌面启动器，全部补丁可重放（MIT）。
- [weinibuliu/deepseek-harness-vsc-extension](https://github.com/weinibuliu/deepseek-harness-vsc-extension) — 将 DeepSeek Harness 作为 VS Code 扩展使用。
- [chenw2759-wq/dsh-mindmap](https://github.com/chenw2759-wq/dsh-mindmap) — DSH 思维导图模式插件：课件(PPT/PDF/Word)+电子书 → 打印级复习思维导图 HTML（A3 横向、每主干一页、大括号式横向、宋体、右栏笔记区、封面总览 + 交互式测试题）。
- [SamFirefly096/dsh-docflow-workflow](https://github.com/SamFirefly096/dsh-docflow-workflow) — DSH 文档工作流：上传/解析/生成/修改 docx·pptx·pdf + 真实文献检索核查（PubMed/Crossref）+ GB/T 7714 引文格式。
- [TT432/dsh-mcmcp](https://github.com/TT432/dsh-mcmcp) —— omp mcmcp 扩展到 dsh 插件体系的移植：MC 客户端调试驱动，读取项目 `.mcmcp` 启动配置，驱动 clientsmoke mod 内的 AIDebugServer，提供 `mcmcp_*` 工具与同名 runtime skill。
- [zoahdev/dsh-plugin-template](https://github.com/zoahdev/dsh-plugin-template) —— 简洁且经过验证的 DeepSeek Harness 插件模板：bundle manifest、一个工具、测试与 CI 冒烟加载（dsh 0.1.0-rc.6）。


- [temotee2103/dsh-ci-co-pilot](https://github.com/temotee2103/dsh-ci-co-pilot) —— DeepSeek Harness 的 GitHub CI 副驾：PR 审查、CI 失败修复、Issue 分流与发布说明。一切皆插件。
- [cdxiaodong/dsh-llm-inspector](https://github.com/cdxiaodong/dsh-llm-inspector) —— 统一 LLM 请求/响应检查器：调 reasoning effort、外部思考(think)导出、流量与包分析。
- [hawk2048/dsh-openwolf](https://github.com/hawk2048/dsh-openwolf) — 紧凑的代码地图“第二大脑”：预索引项目地图、逐文件摘要与 AGENTS.md 注入（wolf_map / wolf_file / wolf_refresh）。
- [LSAI2023/dsh-ide-context](https://github.com/LSAI2023/dsh-ide-context) — 通过 Claude Code IDE 集成桥，把 IDE 当前打开的文件与选中内容带进每一轮模型调用。
- [zsxh1990/pr-genius](https://github.com/zsxh1990/pr-genius) — PR Genius——提交前改进顾问 + 大型开源项目 PR 知识库。
- [Starfie1d1272/dsh-github-skills](https://github.com/Starfie1d1272/dsh-github-skills) —— DeepSeek Harness 的 Skill 优先 GitHub 工作流：PR 分诊、评审反馈、CI 诊断与安全发布。
- [Younthing/dsh-notebook](https://github.com/Younthing/dsh-notebook) —— DeepSeek Harness 的开源 Jupyter notebook 插件：agent 工具、Python 内核与 Web UI。

- [HarcoChen/dsh-vsc-integration](https://github.com/HarcoChen/dsh-vsc-integration) —— DeepSeek Harness 的 VS Code 集成。
- [taontech/dsh-git](https://github.com/taontech/dsh-git) —— DeepSeek Harness 的 Git 插件（上游无描述）。
- [TYEclipse/dsh-color](https://github.com/TYEclipse/dsh-color) —— DSH 颜色转换工具箱：解析/转换任意 CSS 颜色（hex、rgb、hsl、hwb、命名色），WCAG 对比度 AA/AAA 判定，命名色查询——零运行时依赖，纯数学。
- [chenshutian9610/deepseek-harness-mermaid-plugin](https://github.com/chenshutian9610/deepseek-harness-mermaid-plugin) —— deepseek-harness mermaid 支持。
- [chiro2001/dsh-dcp](https://github.com/chiro2001/dsh-dcp) —— DeepSeek Harness 动态上下文管理插件（Dynamic Context Pruning for dsh），对标 opencode-dcp。
- [uckkk/dsh-api-contract](https://github.com/uckkk/dsh-api-contract) —— 接口契约助手：解析 OpenAPI 3.x，生成 TypeScript/Python 类型化客户端并检测破坏性变更。
- [uckkk/dsh-license-guard](https://github.com/uckkk/dsh-license-guard) —— 依赖许可证合规：扫描 node_modules 许可证、归一化 SPDX、分类并做发布前合规校验。
- [uckkk/dsh-test-coverage](https://github.com/uckkk/dsh-test-coverage) —— 测试覆盖率分析：解析 LCOV/Cobertura/Istanbul/Go 覆盖率报告，输出结构化覆盖数据与未覆盖行区间。
- [luoyuejun9/dsh-cinematic-workflow](https://github.com/luoyuejun9/dsh-cinematic-workflow) —— DeepSeek Harness 影视工作流插件（上游无描述）。
- [Noob-stupid/dsh-github-login](https://github.com/Noob-stupid/dsh-github-login) —— DeepSeek Harness 生态的 GitHub 可视化登录工具（零终端）：设备码流程，令牌同步 gh CLI。
- [chenkezhen480/dsh-multimodal](https://github.com/chenkezhen480/dsh-multimodal) — 添加 deepseek harness 多模态能力插件。
- [huangrx6/dsh-plugin](https://github.com/huangrx6/dsh-plugin) — DeepSeek Harness (DSH) 插件合集：Skill 管理（导入/详情/多格式文件预览）、MCP 服务器管理（补丁层读写/测试连接/工具明细）、布局设置。
- [ilps2/dsh-video-understand](https://github.com/ilps2/dsh-video-understand) — 低成本视频理解 dsh 插件：B站/本地视频 → AVIS 信息层 → 摘要+问答（token 压缩 99.95%+）。
- [JohnXu22786/codegraph](https://github.com/JohnXu22786/codegraph) — 面向 agent harness（dsh）的代码知识图谱插件：将符号、调用点与导入关系索引进 SQLite，通过 CLI 或 stdio MCP 工具服务器回答调用/依赖问题。
- [JohnXu22786/docgen](https://github.com/JohnXu22786/docgen) — dsh 插件：文档工坊技能包。纯提示词（Agent Skills）的文档生成技能：README 生成、PR 描述、changelog 与代码审查；零第三方依赖。
- [JohnXu22786/snippet-expander](https://github.com/JohnXu22786/snippet-expander) — Steno - dsh 插件：发送前内联 #tag 速记扩展（多库、别名、{{变量}}、递归防护）。
- [JohnXu22786/spec-driven](https://github.com/JohnXu22786/spec-driven) — keel（龙骨）：规格驱动开发纪律技能包——先立规格、验证假设、防过度工程与范围蔓延，为 dsh 等插件化 harness 提供技能+工具+模板。
- [omicverse/dsh-omicos](https://github.com/omicverse/dsh-omicos) — 在 DeepSeek Harness (dsh) 内的持久 Python kernel 中运行 OmicVerse/OmicOS 生物信息学分析，带能力目录搜索与账户面板。
- [SCSpotato/dsh-remote](https://github.com/SCSpotato/dsh-remote) — 从手机远程控制 DeepSeek Harness (DSH) 的原生 Android 客户端。
- [XHR666/dsh-mpkg-wallpaper](https://github.com/XHR666/dsh-mpkg-wallpaper) — 浏览器内直接加载壁纸引擎 mpkg 作为 DSH 网页背景：内嵌视频、多时段切换、统一磨砂虚化、镜头缩放。
- [wuyh/dsh-workspace-files](https://github.com/wuyh/dsh-workspace-files) — DSH Web 工作区文件管理器插件：面包屑目录浏览、全工作区搜索、浏览器式多标签预览、highlight.js 语法高亮与 Markdown 渲染。
- [yoli-mi/dsh-client-ui-custom](https://github.com/yoli-mi/dsh-client-ui-custom) — 可配置的 DSH web 界面插件：壁纸与磨砂玻璃主题、强调色、自定义快捷键、应用使用面板、历史条、消息 Markdown——无需改动 shell。
- [clackken-vni/dsh-file-manager](https://github.com/clackken-vni/dsh-file-manager) —— 面向 DeepSeek Harness 的文件管理器插件。
- [CyanoOrg/dsh-norm-spec](https://github.com/CyanoOrg/dsh-norm-spec) —— norm-spec 插件：会话级 `.norm` 规范注入、编辑后校验，以及原生 norm 工具。
- [hccccc01333/dsh-excel-chat](https://github.com/hccccc01333/dsh-excel-chat) —— dsh-excel-chat —— 在 DeepSeek Harness 中对话操作 Excel：创建、编辑、修复并校验表格（单元格、公式、样式、筛选、表格、图表），每次编辑均自动校验。
- [nexpeakcore/deepseek-harness-pr-review](https://github.com/nexpeakcore/deepseek-harness-pr-review) —— 面向 DeepSeek Harness 的无头 PR 审查自动化：逐条 claim 描述核验、文档真实性核查、需求影响分析、人机协同、自动审查轮询、Web 仪表盘。
- [uckkk/dsh-markdown-table](https://github.com/uckkk/dsh-markdown-table) —— Markdown 表格生成：JSON 数组/二维数组转 Markdown 表格。
- [truelove-dreamer/dsh-plugin-git-workflow](https://github.com/truelove-dreamer/dsh-plugin-git-workflow) —— DeepSeek Harness 插件：为模型提供一等 Git 工作流工具——仓库状态、diff、带校验的提交创建、最近历史与分支管理。不直接裸调用 shell git，每次调用都是无 shell 的 execFile，并对路径与提交信息做校验。
- [SakalioLabs/dsh-code-ide](https://github.com/SakalioLabs/dsh-code-ide) —— DeepSeek Harness 的 IDE 插件，以最小破坏性的方式增加代码审阅能力。
- [balcoz/dsh-ocr-local](https://github.com/balcoz/dsh-ocr-local) —— DeepSeek Harness 本地 OCR 插件（上游未提供描述）。
- [syncable-dev/dsh-plugin-memtrace](https://github.com/syncable-dev/dsh-plugin-memtrace) —— 🧠 Local-first code intelligence graph for DeepSeek Harness. Structural search, blast radius, temporal memory, and 27 agent skills.
- [Viger1/dsh-preview](https://github.com/Viger1/dsh-preview) —— 👁 Eyes for your DeepSeek Harness agent — it opens, sees, and fixes what it builds. Headless-browser verification tools + a bundled self-check skill.
- [CC19990113/dsh-plugin-codegraph](https://github.com/CC19990113/dsh-plugin-codegraph) —— 为 DeepSeek Harness (dsh) 提供结构化代码智能——赋予 agent `codegraph` 与 `codegraph_index` 工具，基于自建的 tree-sitter 索引查找符号声明位置、调用方以及某次改动会影响到的范围，兼容 codegraph CLI 的磁盘格式。
- [web-casa/dsh-plugin-pkgseek](https://github.com/web-casa/dsh-plugin-pkgseek) —— 将 PkgSeek 的 Linux 软件包、命令与 CVE 情报能力，以原生 DeepSeek Harness (dsh) 工具的形式提供。
- [duyanta123/arch-doc](https://github.com/duyanta123/arch-doc) — 分析代码仓库并生成架构文档（模块职责、依赖关系、入口点、运行方式）。
- [duyanta123/dsh-data-insight](https://github.com/duyanta123/dsh-data-insight) — 将 CSV 数据转化为洞察报告——数据集画像、运行 DuckDB 查询，并生成图表与结构化报告模板。
- [chengganping-ship-it/dsh-tool-codereview](https://github.com/chengganping-ship-it/dsh-tool-codereview) —— 面向 DeepSeek Harness 的专业代码评审与安全扫描插件——SARIF 输出、OWASP Top 10、AI 增强分析、自动修复。
- [PerryLink/dsh-doublecheck](https://github.com/PerryLink/dsh-doublecheck) —— 发布前的二次核验：拷问需求、测试实现、证明交付——面向 DeepSeek Harness 的工程纪律插件包。
- [kelai141/local-git-4-llm](https://github.com/kelai141/local-git-4-llm) —— 模拟git的多llm同工作区协作dsh插件。
- [Lab-sku/dsh-vision-bridge](https://github.com/Lab-sku/dsh-vision-bridge) —— 明眸 VisionBridge - 自研视觉桥：瞎子模型收图时自动调用视觉模型识别。
- [leaveimagination/dsh-qwen-voice](https://github.com/leaveimagination/dsh-qwen-voice) —— 基于 Qwen Audio Agent 的 DeepSeek Harness 语音控制与多会话任务调度。
- [JohnXu22786/command-scout](https://github.com/JohnXu22786/command-scout) — 发现项目已声明的构建命令——Makefile 目标、package.json 脚本（npm/yarn/pnpm/bun）、just 配方、deno 任务——并作为可调用工具暴露给 agent
- [JohnXu22786/file-planning](https://github.com/JohnXu22786/file-planning) — 磁盘持久化执行规划插件：把多步骤任务的计划、执行状态、考察笔记与复盘纪要全部落在工作区 .trail/ 目录，会话中断、上下文压缩也不丢方向
- [JohnXu22786/adversarial-review](https://github.com/JohnXu22786/adversarial-review) — 对抗式多视角代码审查：多个独立审查视角并行攻击式审查，仲裁层合并去重、按严重度分级，输出带证据与修复建议的报告，全程只读
- [JohnXu22786/docs-retriever](https://github.com/JohnXu22786/docs-retriever) — 面向编码 agent 的版本化文档检索：维护库文档目录索引，让 agent 写代码时按需拉取准确、带版本、可溯源的 API 文档片段
- [JohnXu22786/worktree-mgr](https://github.com/JohnXu22786/worktree-mgr) — 为 dsh 提供任务隔离工作区（git worktree）能力：并行任务互不干扰
## Agent

_可在 DSH 内运行的可复用子 agent / 专用 agent 包。_

- [hewzhew/dsh-agent-rp](https://github.com/hewzhew/dsh-agent-rp) —— SillyTavern 迁移与新一代 Agent 角色扮演（RP）。  `⭐67`
- [whiteguo233/dsh-openbiliclaw](https://github.com/whiteguo233/dsh-openbiliclaw) —— 把本地个性化内容推荐 Agent OpenBiliClaw 装进 DSH：界面常驻第四栏，注册 22 个 Agent Bridge 工具，让 Agent 读推荐、答探测、闭环学习。
- [omdsh-dev/dsh-data-agent](https://github.com/omdsh-dev/dsh-data-agent) —— 让 AI 帮你连数据库、写 SQL 的插件。
- [omdsh-dev/dsh-mnemon](https://github.com/omdsh-dev/dsh-mnemon) —— Mnemon 深度集成插件：提供三层本地记忆能力 —— Runtime Memory、可检索 Documents 与受监督 Memory Spaces。
- [nowledge-co/nowledge-mem-deepseek-harness](https://github.com/nowledge-co/nowledge-mem-deepseek-harness) —— Nowledge Mem 社区插件包。
- [btspoony/dsh-advisor](https://github.com/btspoony/dsh-advisor) —— 搭配一个副模型，被动审查每轮对话并注入见解。
- [fakechris/dsh-track](https://github.com/fakechris/dsh-track) —— 嵌入式任务管理引擎：决策点协议、念头捕获墙、Linear 形 issue 存储，供 AI 与人共用。
- [Fisfzy/ego-browser](https://github.com/Fisfzy/ego-browser) —— 把 ego-lite（面向 AI Agent 的 Chromium 浏览器）接入 DSH：13 个结构化 `ego_*` 工具（文本语义快照、语义定位点击、表单填充、截图、CDP 控制），内置运行时开箱即用。
- [omdsh-dev/dsh-longbridge](https://github.com/omdsh-dev/dsh-longbridge) —— 长桥（Longbridge）OpenAPI 港美股接入：行情、账户与交易工具 + 设置页凭据管理。
- [omdsh-dev/dsh-tool-browser](https://github.com/omdsh-dev/dsh-tool-browser) —— 官方 `dsh-tool-browser` 浏览器控制工具的静态 Cordis overlay 与集成指南。
- [PangYiMing/dsh-browser-control](https://github.com/PangYiMing/dsh-browser-control) —— 操控浏览器插件（CDP/Playwright）。
- [PangYiMing/dsh-mobile-control](https://github.com/PangYiMing/dsh-mobile-control) —— 操控手机设备插件（ADB/iOS）。
- [titanwings/dsh-better-browser](https://github.com/titanwings/dsh-better-browser) —— 通过 13 个 Kimi WebBridge 工具，让 Agent 操作用户已登录的真实浏览器。
- [UynajGI/dsh-ssh](https://github.com/UynajGI/dsh-ssh) —— SSH 远程执行插件：ProxyJump 链、SFTP 文件系统、基于 ssh2 的子进程与 PTY。
- [whiteguo233/OpenBiliClaw](https://github.com/whiteguo233/OpenBiliClaw) —— 本地优先的跨平台内容发现 Agent（B站/小红书/YouTube/X 等），并提供 DSH 客户端插件。  `⭐1926`
- [zenx0x/allinluna](https://github.com/zenx0x/allinluna) —— 面向 Codex 与 DeepSeek Harness 的资源感知式多代理编排（“All in Flash” DSH 插件）。  `⭐22`
- [zcx369658780/governed-workflow-for-dsh](https://github.com/zcx369658780/governed-workflow-for-dsh) —— 面向 DeepSeek Harness agent 的策略强制、证据优先的受治工作流。
- [ciceroyang/dsh-report-studio](https://github.com/ciceroyang/dsh-report-studio) —— 把一个 DeepSeek Harness 会话变成可交付的工作报告（日报/周报/交接/文章），带可验证凭据。
- [mario03690/dsh-netcafe](https://github.com/mario03690/dsh-netcafe) —— 一键安装将 AI NetCafé 的托管结果工具（带对账的语录提取、SQL 方言转换、内地可达性检测、跨会话记忆、定时 agent）加入 dsh profile。
- [MicroHEROX/dsh-Kimi-WebBridge](https://github.com/MicroHEROX/dsh-Kimi-WebBridge) —— DeepSeek Harness 的 Kimi WebBridge 插件包：把本地 Kimi WebBridge 守护进程变成 15 个原生 `kimi_webbridge_*` 浏览器工具（导航、点击、填写、快照、截图、执行、网络、上传、PDF）。
- [kunjinkao-os/dsh-mobile-gui-agent](https://github.com/kunjinkao-os/dsh-mobile-gui-agent) —— 面向 DeepSeek Harness 的 Android 移动端 GUI Agent 插件：ADB 控制、迭代验证、审批流程与 Web 移动端视图。
- [sherconan/dsh-entity-dd](https://github.com/sherconan/dsh-entity-dd) —— 出海交易对手尽调 · DeepSeek Harness 插件：先确认你在跟哪个法人签约，再判断这份登记资料能不能作为决策依据，免费官方数据源，无需密钥。
- [sakikoTGW/pack-agent](https://github.com/sakikoTGW/pack-agent) —— Agent 整合包 — 像装 MC 整合包一样，装你的 agent。
- [OrinVoss/dsh-math-team](https://github.com/OrinVoss/dsh-math-team) — DeepSeek Harness 数学建模团队插件包：2 套岗位 Agent 预设（建模编程 + 论文），Gitee 三文件夹协同 + 识图子代理(视觉模型)，含 2023 国赛 C 题全流程跑通示例。
- [Socialist-Sister/dsh-collaboration](https://github.com/Socialist-Sister/dsh-collaboration) — DeepSeek Harness 多智能体协作套件：按需调度的专家名录、圆桌讨论、模型对比与多模态视觉桥接——模型均通过官方 provider 流程接入。
- [TecFancy/dsh-deeptutor](https://github.com/TecFancy/dsh-deeptutor) — DeepTutor 桥接插件包，为 DeepSeek Harness 提供学习能力、知识库与笔记归档工具。
- [omdsh-dev/dsh-advisor](https://github.com/omdsh-dev/dsh-advisor) — 搭配一个会在每轮对话被动注入见解和审查的副模型。
- [yhny1001/dsh-rp-distribution](https://github.com/yhny1001/dsh-rp-distribution) — 面向 DeepSeek Harness 的插件优先开源角色扮演分发包。
- [superboy911/dsh-model-router](https://github.com/superboy911/dsh-model-router) — DSH 关键词路由与隔离生图插件。
- [omdsh-dev/dsh-office](https://github.com/omdsh-dev/dsh-office) — 办公三件套！DeepSeek Harness (dsh) 的 Office 文档工具：生成、读取和编辑表格(.xlsx)、PDF 及演示文稿(.pptx)。
- [AbnerAI/dsh-monitor](https://github.com/AbnerAI/dsh-monitor) — 常驻后台监视器（文件收件箱/命令输出）：新消息一到即唤醒 Agent，是 Claude Code Monitor 工具的 Harness 对应实现。

- [1149784810/jayhe-dsh-gamemaker](https://github.com/1149784810/jayhe-dsh-gamemaker) —— 游戏开发角色子代理：planner=minimal 预设、executor=hard PTC 代码模式、reviewer=minimal，附带 game-dev/game-minimal agent 预设。
- [fenglufa/dsh-board](https://github.com/fenglufa/dsh-board) —— 按工作区/项目隔离、支持多看板、持久化存储的任务看板插件，供多 agent/subagent 协作：AI 通过工具操作，人在 Web 界面可视化查看。


- [didclawapp-ai/DSH-Office](https://github.com/didclawapp-ai/DSH-Office) —— DeepSeek Harness 办公插件：PPTX / DOCX / XLSX / PDF 读写编辑。
- [ivwumupy/dsh-better-codex-subagent](https://github.com/ivwumupy/dsh-better-codex-subagent) — 内置 `codex` 子代理的即插即用替代：把 Codex app-server 流镜像到 harness 子会话。
- [jcs130/dsh-minecraft-agent](https://github.com/jcs130/dsh-minecraft-agent) — 让 AI agent 在 Minecraft 里自主生活与行动：本地 LLM 感知、决策、行动（移动/采集/建造），零 API 成本。
- [gengyueworks/dsh-zhihu](https://github.com/gengyueworks/dsh-zhihu) —— DeepSeek Harness 插件：让 agent 读取、抓取并解析知乎（回答、专栏、搜索）。知乎 DSH 插件套件核心。
- [JinPLu/dsh-plugin-discussion-intent](https://github.com/JinPLu/dsh-plugin-discussion-intent) —— DSH 讨论模式：让复杂 AI 对话与目标保持一致，并转化为基于证据的下一步行动。
- [my-dsh-plugin/thinking-level-override](https://github.com/my-dsh-plugin/thinking-level-override) —— 自主覆盖与调整第三方模型的思考等级，修复工具内置预设缺失或不匹配的问题。

- [A3Boy/dsh-web-tools](https://github.com/A3Boy/dsh-web-tools) —— DeepSeek Harness 多提供商 Web 搜索与抓取工具——Tavily / Exa / Firecrawl / Brave / You.com / Jina / SearXNG，带 fallback 与原生设置界面。
- [nyantused-cpun/folio](https://github.com/nyantused-cpun/folio) —— Folio（兰亭）：咨询文档生成引擎，五阶段流水线（信息收集、记忆、方法论、交付物、证据）。原生 DSH 插件栈：15 个工具、会话协议事件、L0 守卫、agent 预设。方法论包可替换，零 key 启动。
- [rj-jiangyichen/dsh-rules](https://github.com/rj-jiangyichen/dsh-rules) —— DeepSeek Harness 规则插件（上游无描述）。
- [songoao25/dsh-contract-drafting-agent](https://github.com/songoao25/dsh-contract-drafting-agent) —— 专业合同起草 agent 模式：11 阶段律师工作流、5 路并行 AI 审查、决策闸门与领域包（通用合同 / 劳动雇佣 / 股权投资）。
- [songoao25/dsh-virtual-product-team](https://github.com/songoao25/dsh-virtual-product-team) —— 产品团队模式 agent 预设：用户主导与虚拟产品团队（PM → 工程师 → QA → 发布）对话，从想法一路走到产品上线。
- [ytfh44/dsh-rptc](https://github.com/ytfh44/dsh-rptc) —— RPTC（可复用程序-工具组合）agent 预设——标准模式与 PTC 模式的全集，支持把工具链固化为可复用工具并在用户明确命令后持久化。
- [af2000-tech/dsh-taskboard-plugin](https://github.com/af2000-tech/dsh-taskboard-plugin) —— DeepSeek Harness (DSH) 任务板插件：issue 看板，含侧边栏面板、13 命令 agent 工具，以及自托管本地服务。
- [derek2035/dsh-social](https://github.com/derek2035/dsh-social) —— DeepSeek Harness 社交插件：AI 代笔、默认匿名、逐条过审的观点交换网络。
- [MaxHou-infinity/dsh-scout](https://github.com/MaxHou-infinity/dsh-scout) —— 司察 Scout —— 面向 DeepSeek Harness 的证据驱动公司尽调与岗位背调插件（HR tech）。
- [XKLMY-hi/dsh-synthv-bridge](https://github.com/XKLMY-hi/dsh-synthv-bridge) —— DeepSeek Harness 的 SynthV 桥接插件（上游未提供描述）。
- [Jamailar/beav-deepseek-harness](https://github.com/Jamailar/beav-deepseek-harness) —— Beav Creator ：面向小红书与社交媒体的 AI 运营、研究、文案、图文与视频制作，集成在 DeepSeek Harness 里。
- [pengpengyi92/dsh-quant](https://github.com/pengpengyi92/dsh-quant) —— dsh 量化工具插件：行情数据（Binance 公共 API）、技术指标（SMA/EMA/RSI/MACD/Bollinger/ATR）与均线金叉回测。
- [maddogfinance/dsh-trading](https://github.com/maddogfinance/dsh-trading) — 只读交易研究工作台：类型化行情数据接缝（可自带数据源）、多周期指标快照、带溯源与价格校验标注的交互式 K 线卡、以及在 pre-execute 层拦截下单类调用的 risk-guard。
- [kentleenot/dsh-trading-toolkit](https://github.com/kentleenot/dsh-trading-toolkit) —— DSH agent 的 A股/美股交易工具箱：实时行情、OHLCV K线、ADX 三状态市场分类信号与简易回测预览，数据源东方财富。只读设计，永不下单。
- [PerryLink/dsh-github](https://github.com/PerryLink/dsh-github) —— DeepSeek Harness 的 GitHub 集成：创建 PR、在后台任务中评审 PR、读取 issue——每项写操作都需人工审批。
- [Scorp1o117/dsh-tool-vision](https://github.com/Scorp1o117/dsh-tool-vision) —— DeepSeek Harness 外置视觉模型插件。
- [uckkk/dsh-video-creator](https://github.com/uckkk/dsh-video-creator) —— 视频号创作助手：内置模板，调用中国境内大模型生成内容并适配主流平台发布。
- [qt4399/Ds-Harness](https://github.com/qt4399/Ds-Harness) —— 基于 deepseek-harness 的扩展版本。
- [lusipad/RocketX](https://github.com/lusipad/RocketX) —— 以原版 Rocket.Chat 为内核、集成 Codex App Server、Deepseek Harness、Azure DevOps、体验对标飞书的团队协作客户端。
- [Lhy723/dsh-agent-canvas](https://github.com/Lhy723/dsh-agent-canvas) —— 面向 DSH Web 的 Agent / Subagent / Workflow 画布标签页。
- [KCNyu/clawock](https://github.com/KCNyu/clawock) —— AI 争论，代码定案，盈亏都留在纸面上：由多智能体在每笔交易前必须辩论、由模型碰不到的代码来结算的真实港美股经纪账户。可把同一套决策工作流装进你自己的 agent：OpenClaw、Claude Code、Codex 或 DeepSeek Harness。
- [gyyxs88/dsh-subagent-code-agents](https://github.com/gyyxs88/dsh-subagent-code-agents) —— Multi-channel coding-agent subagents for DeepSeek Harness: Codex, Claude Code, Grok Build and configurable ACP agents, with strict roles and durable runs.
- [FuncWei/dsh-kanban](https://github.com/FuncWei/dsh-kanban) —— deepseek-harness,dsh,dsh-plugin,kanban,multi-agent,task-board。
- [Viger1/dsh-pilot](https://github.com/Viger1/dsh-pilot) —— ✋ Hands for your DeepSeek Harness agent — autonomous browser operation by accessibility refs, with a permission model that follows your dsh session.
- [dshworks/dsh-crew](https://github.com/dshworks/dsh-crew) —— 在 dsh 中围观 Claude Code 和 Codex 工作：每个都会在你会话的工作区里获得一个可以直接输入的真实终端窗格，外加五个工具让 dsh agent 安排任务给它们、分配工作并读取它们的屏幕内容。
- [KannaKuron/dsh-deepseek-vision-bridge](https://github.com/KannaKuron/dsh-deepseek-vision-bridge) — 为纯文本 DSH Agent 提供“眼睛”：打通 chat.deepseek.com 视觉模式到 DeepSeek Harness——deepseek_vision 工具、对话中图片转录、设置中的微信扫码登录。
- [NormanFxxkingRockwell/dsh-auto-vision](https://github.com/NormanFxxkingRockwell/dsh-auto-vision) — DeepSeek Harness 视觉桥：自动发现你已配置的多模态模型，给纯文本主模型装上 vision 工具，识别结果以纯文本形式返回。零配置，一条命令安装。
- [SiriLee/dsh-edit-approval](https://github.com/SiriLee/dsh-edit-approval) — DeepSeek Harness 插件：在 write/edit/str_replace_editor 前展示红绱行 diff，逐次审批（通过 / 拒绝 / 永久允许）。
- [eightHundreds/dsh-plannotator](https://github.com/eightHundreds/dsh-plannotator) — 在 Plannotator 中审阅 DeepSeek Harness 计划——标注、通过或退回。
- [Yuanlang3/dsh-netease-music-plugin](https://github.com/Yuanlang3/dsh-netease-music-plugin) — 面向 DeepSeek Harness 的网易云音乐插件。
- [PerryLink/dsh-background-agents](https://github.com/PerryLink/dsh-background-agents) —— DeepSeek Harness 的交互式长会话后台代理：启动一个持久可续跑的子代理，在 Web UI 侧边栏观察其进度，随时给它发消息或中断——全部通过官方子代理接口实现。
- [stuarthu/dsh-crew](https://github.com/stuarthu/dsh-crew) —— dsh 插件：以一支小型角色代理团队（产品经理、工程师、代码评审员）协作，通过磁盘文件共享工作成果。

- [JohnXu22786/computer-control](https://github.com/JohnXu22786/computer-control) — 让 agent 直接操作电脑桌面：截屏观察、鼠标/键盘注入、可访问性树语义操作，内置急停、允许/拒绝规则、确认流与空闲待机等安全护栏

## 循环（自动研究 / 自我改进等）

_长时运行的循环工作流：自动研究、深度调研、自我精炼、迭代构建。_

- [btspoony/mstar-harness](https://github.com/btspoony/mstar-harness) —— Skill 驱动的 Harness / Loop 工程化工作流 agent 插件。  `⭐39`
- [csyangwen/dsh-memory-evolve](https://github.com/csyangwen/dsh-memory-evolve) —— 纯插件实现的跨会话长期记忆 + 后台自我进化：五轨记忆、回合内自我审查、技能自我进化与技能管理器、四轨待办、会话搜索 —— 零核心修改、零运行时依赖。  `⭐14`
- [vlln/dsh-loop](https://github.com/vlln/dsh-loop) —— 定时循环插件（`/loop` 命令 + loop 工具 + 活动状态条）。
- [william-jin-cmu/dsh-evolve](https://github.com/william-jin-cmu/dsh-evolve) —— 自进化插件：在会话内热挂载/卸载 Cordis 插件。
- [fuhefei/dsh-sentinel](https://github.com/fuhefei/dsh-sentinel) —— 条件驱动唤醒：持久化的文件/命令/HTTP/进程/webhook 监视，触发即唤醒 agent，含 dock 与全局仪表盘。
- [lzszq/dsh-scholar](https://github.com/lzszq/dsh-scholar) —— 面向纯计算研究的 AI 科研工作台：研究资料、项目对话、代码数据、实验运行、证据账本与 TeX 手稿放在同一个可恢复项目中。
- [omdsh-dev/dsh-revive](https://github.com/omdsh-dev/dsh-revive) —— 一键复活：重启后自动给所有被打断的会话发送「继续」（`/revive` 命令 + 工具 + 浏览器按钮）。
- [jingzhao-l/iterate-plugin](https://github.com/jingzhao-l/iterate-plugin) —— DeepSeek Harness (dsh) 插件：把 iterate 技能落成自治闭环代码迭代——多轮并行审查、确定性去重收敛、原子修复+验证自停、meta-review 一致性审计、dry-run 只读审查。由 iterate-skill 主仓库统一维护。
- [lmzhen/dsh-evolution](https://github.com/lmzhen/dsh-evolution) —— 受 Hermes 启发的 agent 自进化插件族谱，专为 DeepSeek Harness 打造。
- [timwhitez/dsh-self-evolving](https://github.com/timwhitez/dsh-self-evolving) —— 证据优先、可崩溃恢复的自进化引擎：有界 Cordis 候选生成、一次性真实 Loader 准入、Harbor 评估，以及可审计的日志化谱系。
- [WayneJin0918/dsh-wm](https://github.com/WayneJin0918/dsh-wm) —— 世界模型研究插件：看帧、认 3D / pixel / latent 路线、给 pred vs GT 打分，并对 skill / wm.yaml 做 RSI。
- [zhao-wuyan/dsh-maestro-runtime](https://github.com/zhao-wuyan/dsh-maestro-runtime) —— DSH host plugin for maestro-flow: guard, context, KG sync, delegate/team/coordinator runtime.

## MCP Server

_向 DSH 贡献工具 / prompt / 资源的 Model Context Protocol server。_

<!-- 在此添加条目。 -->
- [Chhlafiu4312/dsh-mcp-bridge](https://github.com/Chhlafiu4312/dsh-mcp-bridge) —— DSH 的零依赖 MCP 客户端桥接：连接 stdio/HTTP MCP server 并把其工具自动注册为 `mcp_<server>_<tool>`；纯 JSON-RPC 2.0 实现、断线自动重连，声明 dsh.bundle 可经 `dsh plugin add` 安装。
- [taxueseek/argo](https://github.com/taxueseek/argo) —— 为 agent 打造的多语言搜索工具（网页/学术/代码/金融/新闻），附带 DSH 插件包，提供 10 个 `mcp__argo__*` 工具。  `⭐56`
- [chenyinrusi/dsh-repo-health](https://github.com/chenyinrusi/dsh-repo-health) —— 面向 DeepSeek Harness 的只读仓库健康扫描器：多来源定义漂移、未接线模块可达性、提示词膨胀、证据门禁校准与注册完整性检查；提供 CLI 与 MCP server。
- [chenyinrusi/dsh-kanban-mcp](https://github.com/chenyinrusi/dsh-kanban-mcp) —— 文件系统驱动的四泳道看板（todo / doing / blocked / done），以只读 MCP server 与 Python API 形式提供，兼容 DeepSeek Harness 与任意 MCP 客户端。
- [chushixixin/dsh-harness-mcp-server](https://github.com/chushixixin/dsh-harness-mcp-server) —— 把 DSH 本身暴露为 MCP server。
- [f0909172434/dsh-plugin-verified-search](https://github.com/f0909172434/dsh-plugin-verified-search) —— 验证式搜索插件。
- [qwased/dsh-web-search-duckduckgo](https://github.com/qwased/dsh-web-search-duckduckgo) —— DuckDuckGo 网页搜索 MCP 工具。
- [gxpppp/dsh-search-mcp](https://github.com/gxpppp/dsh-search-mcp) —— 用搜索 MCP server（Tavily/Brave/Exa/Perplexity/DuckDuckGo/自定义）替换 dsh 内置的网页搜索，在 Web 设置页配置。
- [anweat/dsh-web-search-pro](https://github.com/anweat/dsh-web-search-pro) —— DeepSeek Harness 的强化持久化网页搜索插件：多引擎搜索、SQLite+LRU 缓存、平台后端与 Playwright 渲染。
- [lmcsh9527/dsh-search-free](https://github.com/lmcsh9527/dsh-search-free) —— 免费的多层网页搜索 + fetch 提供商（Exa → Tavily → Bing + web_fetch）。
- [MicroHEROX/dsh-exa-mcp](https://github.com/MicroHEROX/dsh-exa-mcp) —— DeepSeek Harness 的 Exa Search MCP：通过内置的 `@deepseek-ai/dsh-mcp-client` 桥接挂载远程 Exa MCP endpoint。
- [labmimors/dsh-mcp-lens](https://github.com/labmimors/dsh-mcp-lens) —— DeepSeek Harness 的渐进式披露 MCP 网关：保持两个面向模型的工具，按需返回排序后的远端精确 inputSchema，再调用明确的 server/tool。
- [PerryLink/dsh-mcp-panel](https://github.com/PerryLink/dsh-mcp-panel) —— 官方 DeepSeek Harness MCP 客户端的只读运行时管理面板：`/mcp` 命令 + 设置页 MCP 标签，展示状态、工具、错误、重连次数、脱敏展示与可控补丁建议。
- [Nichts0v0/dsh-mcp-manager](https://github.com/Nichts0v0/dsh-mcp-manager) —— 在 DeepSeek Harness 设置页管理 MCP 服务器：运行时添加/编辑/启停/重连/删除，实时状态、自动重连，中英双语界面。
- [xwh-01/dsh-mediacrawler](https://github.com/xwh-01/dsh-mediacrawler) —— 面向有边界 MediaCrawler 采集任务的 MCP 适配器和可安装 DSH profile bundle，支持隔离浏览器资料目录、二维码登录、任务监督、脱敏预览和安全导出。
- [Piccolo123/url-manager](https://github.com/Piccolo123/url-manager) —— Agent 先行链接收藏与知识管理：从任意平台保存链接，自动分类/打标签、全文搜索、共享分类、魔法链接卡片交付。零配置——Agent 首次使用自动注册。可作为 dsh skill 或通过其 MCP server 使用。
- [Piccolo123/url-manager-mcp](https://github.com/Piccolo123/url-manager-mcp) —— URL Manager 配套 MCP 服务端：21 个工具（mcp__url_manager__*）支持收藏/搜索/分类/共享与魔法链接交付，支持 stdio 与 streamable-http，可用 uvx 安装。
- [KYinCode/dsh-project-mcp-bridge](https://github.com/KYinCode/dsh-project-mcp-bridge) — DeepSeek Harness 按项目加载 MCP：在项目中放置 `.dsh/mcp.json`，该项目的会话即自动获得对应 MCP 服务器工具，并支持配置热重载。是客户端桥接器，非 MCP 服务器本身。

- [wly8691-jpg/knowlp-rag](https://github.com/wly8691-jpg/knowlp-rag) —— 面向 Markdown 笔记的双知识图谱 RAG：DeepSeek Harness 与 Claude Code 的 MCP + 原生 Cordis 插件。

- [DDDMUC/dsh-free-search](https://github.com/DDDMUC/dsh-free-search) —— DeepSeek Harness 免费网页搜索 provider：DuckDuckGo 后端，无需 API key。
- [2nd1st/open-mcp-apps](https://github.com/2nd1st/open-mcp-apps) —— MCP Apps 引擎：模型自己建、保存并复用交互式 UI app（看板、追踪器、仪表盘），背后是跨会话存续的数据集合。可通过 MCP 客户端在 DSH 中使用，自带 22 个 app 的 App Store。
- [jcaiagent7143-ui/sendpage-mcp](https://github.com/jcaiagent7143-ui/sendpage-mcp) —— 把 HTML 文档变成一键打开、在聊天里显示预览卡的分享链接的 MCP 服务;支持发布、更新,以及导出 PNG/PDF/Word。免费 key,无需注册。

- [GitRuozhi/dsh-github-mcp](https://github.com/GitRuozhi/dsh-github-mcp) — GitHub 官方 MCP server 桥：通过 @deepseek-ai/dsh-mcp-client 注册 `mcp__github__*` 原生工具（远程模式，api.githubcopilot.com/mcp/）。
- [huey1in/trio](https://github.com/huey1in/trio) — DSH 全家桶：浏览器自动化 + MCP Server + GitHub 集成，一次安装三种超能力。
- [6aemi/dsh-mcp-admin](https://github.com/6aemi/dsh-mcp-admin) —— 用 `/mcp` 查看 MCP 状态，并通过设置页管理 MCP 服务器，改动写入 `cordis.patch.yml`。
- [Andrietteprotective835/dsh-mcp-lens](https://github.com/Andrietteprotective835/dsh-mcp-lens) —— 把海量 MCP 目录压缩成两个工具，让 DeepSeek Harness 高效搜索并调用 1000+ 远程 API。
- [siddhartha-yz/dsh-mcp-gateway](https://github.com/siddhartha-yz/dsh-mcp-gateway) —— 通过 OAuth + MCP 把 ChatGPT Web 接入 DSH，暴露 DSH 原生工具、技能、策略与社区扩展。
- [BaihaWhite/mcp-ds-ocr](https://github.com/BaihaWhite/mcp-ds-ocr) —— 面向 DeepSeek Harness 的 OCR MCP 服务器（上游未提供描述）。
- [royenheart/dsh-plugin-mcp-support](https://github.com/royenheart/dsh-plugin-mcp-support) —— deepseek harness mcp support。
- [helibeiqi/dsh-quant-data-mcp](https://github.com/helibeiqi/dsh-quant-data-mcp) —— 面向 DeepSeek Harness (dsh) 的零依赖 MCP stdio 服务器模板 + 即用型 A 股数据工具，无需 API key，全环境变量路径，标准 NDJSON 协议。
- [Heath96/dsh-heath-mcp](https://github.com/Heath96/dsh-heath-mcp) —— MCP server bridge for DeepSeek Harness: stdio / streamable-http / legacy-SSE transports, web settings UI (form + JSON), tools as mcp__<server>__<tool>. Burp Suite ready out of the box.
- [wuhobin/dsh-mcp-manage](https://github.com/wuhobin/dsh-mcp-manage) —— dsh plugin: Settings > MCP 服务 management page for DeepSeek Harness (DSH). List/add/edit/delete MCP servers registered in cordis.patch.yml and run a real MCP initialize connection handshake per server.
- [Biogod2020/dsh-bing-search](https://github.com/Biogod2020/dsh-bing-search) —— DSH 网络搜索：优先 DuckDuckGo，按地区智能回退 Bing，附带质量评分帮 agent 自动跳过低质内容。
- [chenyuhao0628/dsh-web-search-router](https://github.com/chenyuhao0628/dsh-web-search-router) —— 面向 DeepSeek Harness (DSH) 的免费多供应商网络搜索路由器。
- [1624318455/dsh-plugin-tavily](https://github.com/1624318455/dsh-plugin-tavily) —— 面向 DeepSeek Harness (dsh) 的 Tavily 网络搜索提供商插件——把 tavily 搜索提供商注册进 ctx.web，并在 Web GUI 提供设置卡片。

- [JohnXu22786/browser-automation](https://github.com/JohnXu22786/browser-automation) — Web Bridge 真实浏览器自动化 MCP server：无障碍树快照把页面渲染成结构化文本树并给可交互元素编号，agent 无需视觉模型即可精确操作页面
- [JohnXu22786/github-mcp](https://github.com/JohnXu22786/github-mcp) — repogate GitHub 工作台：把 REST API 封装成 MCP 工具，让 agent 直接完成仓库查询、issue 管理、PR 创建与合并、代码审查与搜索
- [jiewaigongxing/dsh-jiey-browser](https://github.com/jiewaigongxing/dsh-jiey-browser) —— DeepSeek Harness 插件：通过 MCP 驱动 Jiey Browser。
- [X-C1811/dsh-web-search-plugin](https://github.com/X-C1811/dsh-web-search-plugin) —— 面向 DeepSeek Harness (ctx.web) 的 Tavily 网络搜索提供商：支持无密钥或 API-key 两种模式，附可配置 UI 卡片；provider 框架设计上可扩展到更多搜索 API。
- [xxxyz/DeepSeekHarness-MCP-Manager](https://github.com/xxxyz/DeepSeekHarness-MCP-Manager) —— DSH 持久化 MCP 服务器管理插件 —— Settings UI + HTTP API + mcp_manager_* 模型工具，跨平台安装器。

## 编排器与聚合器

_多步 / 多 agent 调度器与输出聚合器。_

- [icetomoyo/dsh_workflow](https://github.com/icetomoyo/dsh_workflow) —— 把 DSH 的一次性多 Agent 调度升级为可生成、可保存、可治理、可观察、可恢复的 Workflow 层（UltraCode 风格）。  `⭐35`
- [NanmiCoder/dsh-agent-teams](https://github.com/NanmiCoder/dsh-agent-teams) —— AgentTeams 多 agent 团队插件。  `⭐72`
- [Chinesezjc/dsh-interconnect](https://github.com/Chinesezjc/dsh-interconnect) —— DSH 跨实例消息 / 事件接力插件（互联服务 + 工具）。  `⭐15`
- [titanwings/dsh-automation](https://github.com/titanwings/dsh-automation) —— 自动化插件：让 Coding 任务按计划在全新 Agent Session 中运行，定时任务可由用户或 Agent 创建和管理。
- [Buyi-wsgzg/dsh-sidechain](https://github.com/Buyi-wsgzg/dsh-sidechain) —— 侧会话插件：`/side` 持续性侧会话（Codex 风格）与 `/btw` 一次性侧问（Claude 风格），在临时 fork 中运行、不写入主会话历史，Web UI 右侧面板内嵌对话。
- [omdsh-dev/dsh-hub-workshop](https://github.com/omdsh-dev/dsh-hub-workshop) —— OMDSH 生态的公共 catalog、评审投影与不可变 feed 权威源。
- [TtTRz/dsh-gatedflow](https://github.com/TtTRz/dsh-gatedflow) —— 人机协同工作流引擎。
- [franksong2702/dsh-codex-connect](https://github.com/franksong2702/dsh-codex-connect) —— 为 DeepSeek Harness 提供 ChatGPT OAuth 与 Codex 模型接入。
- [ropon/dsh-plugin-clawrouters](https://github.com/ropon/dsh-plugin-clawrouters) —— DeepSeek Harness 的一键 ClawRouters 插件：对话、图像、视频与网页搜索。
- [Frost-Reed/blocker-notify](https://github.com/Frost-Reed/blocker-notify) —— dsh-blocker-notify —— DeepSeek Harness 实时注意力提醒：当 agent 被阻塞（审批请求/沙盒拒绝）时，全局横幅提升 + 闪烁工作区条目。
- [superslash-rico/dsh-plugin-slashx-gateway](https://github.com/superslash-rico/dsh-plugin-slashx-gateway) —— SlashX 请求/响应/富媒体/异步回调与完整 token 计量的 DeepSeek Harness host 插件包。
- [Uddoo/dsh-dashboard](https://github.com/Uddoo/dsh-dashboard) —— 兼容 Symphony 的 Linear issue 编排器与 DeepSeek Harness 原生运维仪表盘。
- [writeCasually/deepseek-harness-plugins](https://github.com/writeCasually/deepseek-harness-plugins) — deepseek harness plugins view。

- [lileikeji/dsh-crosstalk](https://github.com/lileikeji/dsh-crosstalk) —— dsh-crosstalk：DSH 跨会话消息（Claude Code 风格）+ 事件驱动的自动协作协调。
- [omdsh-dev/dsh-cron](https://github.com/omdsh-dev/dsh-cron) —— DeepSeek Harness 定时任务（cron）：模型与人都可调度的任务，可向 agent 会话触发 followup/inject。
- [toolclub/dsh-agent-team-gui](https://github.com/toolclub/dsh-agent-team-gui) —— DeepSeek Harness 多智能体小队 GUI：按 agent 配置 provider/模型路由与工具策略，支持串/并行 spawn/fork/chain 编排。

- [olicesx/kixparadigm](https://github.com/olicesx/kixparadigm) —— AI 自编排最小范式（认知层常驻）× kixpower 多智能体编排；npm 一键导入 DeepSeek Harness。
- [svmlearn/dsh-monkey-desk](https://github.com/svmlearn/dsh-monkey-desk) —— 面向 DeepSeek Harness (DSH) Web 的可视化多智能体工作台。
- [7bder/orchd-core](https://github.com/7bder/orchd-core) —— orchd 引擎最小可移植核心套件：跨 AI agent 平台的任务编排 CLI（事件溯源 + 文件锁 + DAG 就绪池 + 两阶段审查）。
- [horizon0514/firstmate-dsh](https://github.com/horizon0514/firstmate-dsh) —— 面向 DeepSeek Harness 的以 Manager 为中心的多任务编排。
- [OpenNekoPaw/codex-dsh-web](https://github.com/OpenNekoPaw/codex-dsh-web) —— 用于把工作委派给 DSH Web 并独立核验结果的 Codex 插件。

- [1264459640/dsh-trellis](https://github.com/1264459640/dsh-trellis) —— DSH / Cordis 的自包含 Trellis 工作流触发器。
- [cxxy161/dsh-collab-sync](https://github.com/cxxy161/dsh-collab-sync) —— DeepSeek Harness 协作同步插件（上游无描述）。
- [hetu-altas/hetu-hammurabi](https://github.com/hetu-altas/hetu-hammurabi) —— hetu 系列「宪章编程」harness 模块。通过 dsh 和 opencode 的 Commands / Agents / Skills / Plugins 将研发流程固化为可自动执行的节点流水线：输入任务书路径或一句话需求，自动完成任务书生成（按需）→ 分析 → 编码 → 单元测试（硬门禁）→ 代码评审 → 研发日志 → 资产沉淀 → 钉钉通知。
- [Leo-Ayh-Oday/dsh-orcana](https://github.com/Leo-Ayh-Oday/dsh-orcana) —— DeepSeek Harness 运行时治理：进度管控、证据时效、完成守卫、能力路由（同一模型、同一 DSH、一次运行时干预）。
- [songoao25/dsh-chatgpt-subscription](https://github.com/songoao25/dsh-chatgpt-subscription) —— 通过官方 OAuth 绑定 ChatGPT 账号，在 DSH 内用 Plus/Pro 订阅额度与 ChatGPT 模型对话。
- [TaxolYang0000/agent-federation-platform](https://github.com/TaxolYang0000/agent-federation-platform) —— 通过共享 kanban 队列把任意 AI 编码 agent（DSH、Codex、Claude Code、自定义驱动）统一到一个编排层：跨 agent 审查、分级多 agent 辩论、人在回路审批。
- [a903067276-rgb/dsh-hud](https://github.com/a903067276-rgb/dsh-hud) — HUD status panel plugin for DeepSeek Harness (dsh) web: git status, MCP servers, skills, model & token usage in a floating panel。
- [a903067276-rgb/dsh-plan-switch](https://github.com/a903067276-rgb/dsh-plan-switch) — 输入框一键进/出 Plan 模式（/plan 的快捷点击），DSH web 小插件。
- [Harzva/harness-flow-hub](https://github.com/Harzva/harness-flow-hub) —— 面向 DeepSeek Harness 的原生 Flow 与插件枢纽。
- [huxint/dsh-team](https://github.com/huxint/dsh-team) —— Agent teams for DeepSeek Harness: named long-lived teammates over ctx.subagents, a shared task list, a member-to-member mailbox, virtual workspaces, and a live team room in the conversation view.
- [ToxicantX/dsh-multi-model-orchestrator](https://github.com/ToxicantX/dsh-multi-model-orchestrator) —— 为 DeepSeek Harness 提供的、与模型厂商无关的双子代理编排器 preset。
- [kevin-luo/dsh-org-panel](https://github.com/kevin-luo/dsh-org-panel) — deepseek harness 纯牛马 —— 多智能体数字员工指挥台插件。
- [liu3734/jira-tasks-dsh-plugin](https://github.com/liu3734/jira-tasks-dsh-plugin) — 面向 DeepSeek Harness 的 Jira 任务管理插件。
- [WenhongPan/dsh-projects](https://github.com/WenhongPan/dsh-projects) — 受 Codex 启发的 DeepSeek Harness 项目与会话管理插件。
- [huangjuhua-aigc/dsh-a2a](https://github.com/huangjuhua-aigc/dsh-a2a) —— 面向 DeepSeek Harness 的 Agent2Agent（A2A）协议插件，基于 Cordis 构建。
- [Linxiushen/dsh-subagent-cassette](https://github.com/Linxiushen/dsh-subagent-cassette) —— 面向 DeepSeek Harness 一次性子代理的确定性、拓扑感知 VCR 录制与离线回放。
- [Enderfga/claw-orchestrator](https://github.com/Enderfga/claw-orchestrator) —— 将 Claude Code、Codex、Antigravity、Cursor Agent 与 OpenCode 作为同一运行时统一驱动——持久会话、多代理议事会、OpenAI 兼容端点、MCP 服务器，以及任意编辑器都能驱动的 ACP 代理。
- [xingyingyuzhui/dsh-agent-registry](https://github.com/xingyingyuzhui/dsh-agent-registry) —— DeepSeek Harness 的 Claw Agent 注册表：绑定、隔离、归档。工作区 Agent 登记/隔离/归档。

## UI / 客户端

_DSH 的桌面、网页、终端或编辑器前端。_

- [dgadelha1/dsh-explorer-plugin](https://github.com/dgadelha1/dsh-explorer-plugin) —— 面向 DSH Web GUI 的 VS Code 风格工作区文件浏览器与 Monaco 编辑器：真实 TextMate 语法高亮、多标签页、文件实时监听，并支持"分析/修复"快捷操作。
- [EthanYoQ/AI-Novel-Writer](https://github.com/EthanYoQ/AI-Novel-Writer) —— 本地优先的长篇小说桌面工作台，并提供 DeepSeek Harness 插件开发预览，用于修订式小说项目编辑。
- [opencues/opencues](https://github.com/opencues/opencues/tree/master/integrations/dsh) —— 输入框内的同义词提示与下划线补全：行尾输入 `_` 即自动填充，拼写错误随打随标；直接使用 dsh 已配置的模型，无需自备 API key。
- [zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) —— DSH Web UI 插件与皮肤合集：任务看板、git graph、右侧面板、远程移动端 UI、宠物、实时 token 统计与皮肤中心。  `⭐506`
- [huiliyi37/dsh-tianshu-tui](https://github.com/huiliyi37/dsh-tianshu-tui) —— DeepSeek Harness 终端 UI（天枢 TUI）。  `⭐73`
- [omdsh-dev/DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) —— 侧边栏完整工作台：支持三方扩展注册新 Tab，内置文件渲染编辑 / 终端 / Git / 子代理。  `⭐127`
- [ccch1mneyyy/dsh-cc-tui](https://github.com/ccch1mneyyy/dsh-cc-tui) —— Claude Code 风格全屏交互终端：像素鲸鱼顶栏、思考流式展开、双击 Esc 回滚、上下文进度条 + TPS 仪表。  `⭐197`
- [Small-tailqwq/dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) —— DSH Web 鲸鱼娘皮肤系列（深海女仆工坊 maid-atelier），CC BY-NC-SA 4.0。  `⭐119`
- [hust-open-atom-club/oh-dsh-desktop](https://github.com/hust-open-atom-club/oh-dsh-desktop) —— 可扩展的 macOS 工作台：原生 PTY、工作区工具、双语实时插件、隔离预览的插件市场。
- [baiyuscc13724-max/deepseek-harness-desktop](https://github.com/baiyuscc13724-max/deepseek-harness-desktop) —— 官方 DSH Web UI 的 Windows Electron 桌面壳，提供中文安装包、便携版、SHA-256 校验更新、可持久化主题和自定义背景。
- [omdsh-dev/dsh-at-file](https://github.com/omdsh-dev/dsh-at-file) —— Codex 风格 `@file` 引用：在输入框中搜索工作区文件并把内容附加到 prompt。  `⭐25`
- [omdsh-dev/dsh-notification](https://github.com/omdsh-dev/dsh-notification) —— 回合完成桌面通知：按结果分别控制，支持关键词包含 / 排除规则。  `⭐25`
- [alingalingling/ui-status-label](https://github.com/alingalingling/ui-status-label) —— 把思考时的 "deep diving" 状态文案自定义成任意你想要的样子。  `⭐21`
- [Anionex/dsh-turn-rewind](https://github.com/Anionex/dsh-turn-rewind) —— 对话回退插件：回退对话与工作区状态，基于持久化 Change Ledger。  `⭐23`
- [bobleer/dsh-acp-for-bitfun](https://github.com/bobleer/dsh-acp-for-bitfun) —— BitFun 与 DSH 的 ACP 交互对接插件。
- [Moeblack/dsh-message-edit](https://github.com/Moeblack/dsh-message-edit) —— 基于分支的消息编辑、重roll、重试与版本时间线。  `⭐11`
- [Lum1104/dsh-browser](https://github.com/Lum1104/dsh-browser) —— Chrome 侧边栏扩展：用 DSH 直接操作浏览器，0 视觉能力依赖。  `⭐26`
- [hellodigua/dsh-share](https://github.com/hellodigua/dsh-share) —— 对话分享插件，一键分享你的对话。  `⭐11`
- [openma-ai/deepseek-harness-acp](https://github.com/openma-ai/deepseek-harness-acp) —— ACP profile 插件与独立 server，把完整 DSH agent 接入 Zed 等 ACP 客户端，并共享 DSH 凭据、会话与 MCP 配置。
- [chen-001/dsh-grok-tui](https://github.com/chen-001/dsh-grok-tui) —— 通过 grok-build 的 TUI 使用 DSH。
- [ccq1/dsh-side-panel](https://github.com/ccq1/dsh-side-panel) —— DSH 侧边栏：集成文件浏览器、终端和 Git 审查，方便预览文件。
- [lhh010/dsh-ui-whale](https://github.com/lhh010/dsh-ui-whale) —— 全手绘像素鲸鱼伙伴：会话标题栏常驻，平时眨眼摆尾、思考时持续动起来、回合完成头顶喷水，零核心改动。  `⭐16`
- [lhh010/dsh-ui-progress](https://github.com/lhh010/dsh-ui-progress) —— 会话进度插件：输入框停靠区常驻进度条（todos 真实进度 / 实时 token 生成速率 / 中断状态 / 待办提醒），零核心改动。
- [omdsh-dev/dsh-annotation](https://github.com/omdsh-dev/dsh-annotation) —— Web 选中批注插件：选文字 → 批注 → 随消息发送，回复按批注逐条对照。  `⭐18`
- [Ruler4396/dsh-launcher](https://github.com/Ruler4396/dsh-launcher) —— 轻量 Windows 启动器：登录时静默自启 + 极简 WebView2 窗口，替代完整浏览器。  `⭐21`
- [renat3u/dsh-web-archive](https://github.com/renat3u/dsh-web-archive) —— 折叠对话中的"无用消息"（如 Think、Bash 输出等）。
- [renat3u/dsh-paseo](https://github.com/renat3u/dsh-paseo) —— 把 DSH 注册为 Paseo 的 ACP provider：在 Paseo 桌面 / Web / 手机客户端里并行运行和管理多个 DSH agent。
- [Small-tailqwq/dsh-deepcel](https://github.com/Small-tailqwq/dsh-deepcel) —— 一款模仿 Excel 的 DSH 皮肤。
- [titanwings/dsh-plannotator](https://github.com/titanwings/dsh-plannotator) —— 计划批注插件：选中计划原文、逐条批注，并把结构化反馈送回 Agent。
- [vibeinging/dsh-work](https://github.com/vibeinging/dsh-work) —— 本地优先的 Electron 工作台：整合 Agent 会话、项目文件、数据分析、网络调研、MCP 与 Office 产物。
- [whiteguo233/dsh-cc-connect](https://github.com/whiteguo233/dsh-cc-connect) —— 通过 CC Connect 远程使用 DSH。
- [dbydd/dsh-onlyne](https://github.com/dbydd/dsh-onlyne) —— 通过 Onlyne（工作区本地 IM 通道守护进程）给 DSH agent 一个真正的 IM 收发件箱：Telegram、飞书、QQ 机器人、微信。
- [LaplaceYoung/dsh-qq2006](https://github.com/LaplaceYoung/dsh-qq2006) —— QQ2006 皮肤插件：注册 `qq2006` 主题、全局皮肤表与完整素材。
- [vlln/whale-girl](https://github.com/vlln/whale-girl) —— Web GUI 桌面宠物插件（QQ 宠物形态）：右下角悬浮、可拖拽 / 投喂 / 玩耍的积累型伙伴。  `⭐27`
- [swaylq/dsh-digipet](https://github.com/swaylq/dsh-digipet) —— 数码宝贝式养成：孵一颗吃真实工作长大的蛋（回合、工具、报错都是营养），按工作方式走四条进化路线；纯命令交互，零 token，无模型可见面。
- [swaylq/dsh-wildmon](https://github.com/swaylq/dsh-wildmon) —— 宝可梦式捕捉收集：真实工作就是草丛（回合、工具调用、报错刷出野外遭遇），投球捕捉、集 28 格图鉴、组 6 只队伍；纯命令交互，零 token，无模型可见面。
- [ccch1mneyyy/dsh-working-activity](https://github.com/ccch1mneyyy/dsh-working-activity) —— 实时模型工作状态行：俏皮思考文案、运行中的工具、回合总结、自我叙述，用于 TUI 提示栏与 Web UI。
- [orriduck/dsh-tui](https://github.com/orriduck/dsh-tui) —— 小巧的、会话感知的 DeepSeek Harness 终端 UI。
- [openma-ai/deepseek-harness-tui](https://github.com/openma-ai/deepseek-harness-tui) —— Rust/ratatui 终端客户端，直接使用 DSH SDK JSON-RPC 协议，支持独立运行或作为 profile bundle 加载。
- [bill9109/dsh-conversation-share](https://github.com/bill9109/dsh-conversation-share) —— 分享 DSH 对话的任意段落。
- [bruc3van/dsh-desktop](https://github.com/bruc3van/dsh-desktop) —— 独立 Electron 桌面客户端：集成官方 Web UI，支持会话共享、本地工作区、远程连接与系统托盘。
- [Moresyl/dsh-studio](https://github.com/Moresyl/dsh-studio) —— 跨平台 Rust/Tauri 桌面外壳：托管 `dsh web`、回收进程树、自动选择空闲端口，并发布 Windows/Linux/macOS 安装包，无需 fork 上游 UI。
- [chen-001/dsh-chat-width](https://github.com/chen-001/dsh-chat-width) —— 调整 DSH 回复区域宽度。
- [dingyi222666/dsh-session-notification](https://github.com/dingyi222666/dsh-session-notification) —— 会话完成等四种状态的通知响应，支持浏览器提示与提示词。
- [hellodigua/dsh-emoji](https://github.com/hellodigua/dsh-emoji) —— 为 AI 回复自动添加表情。
- [icodesign/orbis](https://github.com/icodesign/orbis) —— DeepSeek Harness 远程控制的移动端客户端。
- [lhh010/dsh-input-history](https://github.com/lhh010/dsh-input-history) —— Web 输入历史：Ctrl+Up / Ctrl+Down 像终端一样召回已发送消息，零核心改动。
- [lhh010/dsh-minigames](https://github.com/lhh010/dsh-minigames) —— Web UI 右侧小游戏面板：18 款离线小游戏（俄罗斯方块/扫雷/2048/数独等），可扩展游戏注册表。
- [lhh010/dsh-paste-input](https://github.com/lhh010/dsh-paste-input) —— WebUI 文件输入增强：Ctrl+V 粘贴、拖拽与选择文件，发送时复制进会话工作区。
- [Moeblack/deepseek-manners](https://github.com/Moeblack/deepseek-manners) —— 在每次消息后注入感谢语。
- [Moeblack/dsh-prompt-studio](https://github.com/Moeblack/dsh-prompt-studio) —— Prompt Studio：带实时预览地编辑用户与内置系统提示词分节。
- [Nwflower/dsh-chat-import](https://github.com/Nwflower/dsh-chat-import) —— 从 Claude Code / Codex / ChatGPT / Cursor / Gemini / Reasonix / opencode 导入历史消息，在 DSH 中继续对话。
- [omdsh-dev/7d7d](https://github.com/omdsh-dev/7d7d) —— 7k7k 风格游戏门户：模型生成/上传 HTML5 与 Flash 小游戏，在 Web UI 里直接游玩（Flash 用固定版本、摘要校验的 Ruffle）。
- [omdsh-dev/dsh-auto-chess](https://github.com/omdsh-dev/dsh-auto-chess) —— Web 里的自走棋：人机对战或双 AI 对弈。
- [omdsh-dev/dsh-daily-fortune](https://github.com/omdsh-dev/dsh-daily-fortune) —— 每日运势插件：观音签、塔罗牌阵与每日一句。
- [omdsh-dev/dsh-daily-progress](https://github.com/omdsh-dev/dsh-daily-progress) —— 每日进度成就系统：完成率、连续天数（streak）与周指标。
- [omdsh-dev/dsh-fun-ticker](https://github.com/omdsh-dev/dsh-fun-ticker) —— 行情跑马灯：加密/汇率/A股/指数/港美股自选标的，免 key 数据源，宿主代理 + 缓存。
- [omdsh-dev/dsh-fun-typewriter](https://github.com/omdsh-dev/dsh-fun-typewriter) —— WebAudio 打字机氛围音，插件自有设置 API，零音频资源。
- [omdsh-dev/dsh-fun-weather](https://github.com/omdsh-dev/dsh-fun-weather) —— 基于 Open-Meteo 的天气页签与随天气变化的主题。
- [omdsh-dev/dsh-gomoku](https://github.com/omdsh-dev/dsh-gomoku) —— 在 DSH 中与 AI 下五子棋，也可让两个 AI 对局。
- [omdsh-dev/dsh-pet-corner](https://github.com/omdsh-dev/dsh-pet-corner) —— 悬浮宠物：免 key 宠物图片代理、收藏夹与插件自有设置 API。
- [omdsh-dev/dsh-voice-funasr](https://github.com/omdsh-dev/dsh-voice-funasr) —— Web UI 本地离线语音输入：按住说话，本地 FunASR 引擎转写，可选 LLM 两段式润色。
- [omdsh-dev/toybox](https://github.com/omdsh-dev/toybox) —— DSH 插件玩具箱：收藏有趣的技能、古怪的 MCP 服务器等整活插件。
- [qyw233/dsh-deeplink](https://github.com/qyw233/dsh-deeplink) —— WebUI 深链：通过 `?session=`/`?workspace=` 直接打开指定项目对话。
- [renat3u/tonghuashun-webui](https://github.com/renat3u/tonghuashun-webui) —— 仿同花顺（股票终端）风格的 Web UI 皮肤插件。
- [SenmuuuuW/dsh-group-photo](https://github.com/SenmuuuuW/dsh-group-photo) —— 内测收官合影墙：GitHub OAuth 零权限登录 + 白名单校验的拍立得合影站，附 DSH Skill 包装。  `⭐12`
- [Small-tailqwq/dsh-tps](https://github.com/Small-tailqwq/dsh-tps) —— 一个简单的 TPS（每秒 token 数）插件。
- [SnowCrescenter-tech/dsh-launcher](https://github.com/SnowCrescenter-tech/dsh-launcher) —— Windows 便携一键启动器（免 Node.js / pnpm / CLI）。
- [vlln/dsh-navbar](https://github.com/vlln/dsh-navbar) —— 对话节点导航条：右缘节点串快速跳转 user 消息。
- [urzeye/dsh-outline](https://github.com/urzeye/dsh-outline) —— DSH Web 会话页实时大纲面板：用户问题 + Markdown 标题（1~6 级）大纲树，流式生成实时更新，点击节点定位高亮，支持展开层级调节、搜索与会话级收藏。
- [vlln/dsh-task-status](https://github.com/vlln/dsh-task-status) —— 后台任务状态条：对话页任务进度 + 实时输出 tail。
- [yuezengwu/dsh-explain](https://github.com/yuezengwu/dsh-explain) —— 本地优先学习模式：跨会话全局学习线程、按来源讲解与可诊断设置界面。
- [yuxino/dsh-blue-whale-maid](https://github.com/yuxino/dsh-blue-whale-maid) —— 运行在 DSH Web GUI 里的「蓝鲸女仆」桌面像素宠物。
- [MashedPotato817/dsh-tui](https://github.com/MashedPotato817/dsh-tui) —— 终端客户端（Vim 模式）。
- [NEXTINDIE/DeepSeek-Harness-for-VS-Code](https://github.com/NEXTINDIE/DeepSeek-Harness-for-VS-Code) —— VS Code 集成。
- [luo-ross/dsh-desktop](https://github.com/luo-ross/dsh-desktop) —— 非官方桌面版。
- [Missher12/deepseek-harness-desktop](https://github.com/Missher12/deepseek-harness-desktop) —— 非官方桌面版。
- [ningbainb/deepseek-harness-desktop](https://github.com/ningbainb/deepseek-harness-desktop) —— 非官方桌面版。
- [xccElephant/deepseek-harness-desktop](https://github.com/xccElephant/deepseek-harness-desktop) —— 非官方桌面版。
- [Tom6814/dsh-web](https://github.com/Tom6814/dsh-web) —— Docker 网页部署。
- [skitse/dsh-dev-actions](https://github.com/skitse/dsh-dev-actions) —— 常用命令一键化。
- [Wine-Red/dsh-prompt-stash](https://github.com/Wine-Red/dsh-prompt-stash) —— prompt 暂存。
- [crystalWinter666/dsh-header-status](https://github.com/crystalWinter666/dsh-header-status) —— 信息栏移到标题旁。
- [Luaphes/dsh-web-attention-badge](https://github.com/Luaphes/dsh-web-attention-badge) —— 网页注意力徽章。
- [01Virex/dsh-status-rotator](https://github.com/01Virex/dsh-status-rotator) —— 将"Deep diving…"回合状态标签换为阶段感知、打字机动画、彩虹渐变的文案，可通过 JSON 文件配置。
- [cakeni/harness-whale](https://github.com/cakeni/harness-whale) —— DeepSeek Harness 的非官方社区宠物插件，原生 DSH Web 插件。
- [Carleo10032/deepseek-harness-mac](https://github.com/Carleo10032/deepseek-harness-mac) —— 非官方的 SwiftUI macOS 外壳，连接 DeepSeek Harness 本地 Web UI。
- [causebefore/dsh-pomodoro](https://github.com/causebefore/dsh-pomodoro) —— DeepSeek Harness Web 番茄钟插件：可配置专注与休息时长，提供侧栏入口与可拖动悬浮面板。
- [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) —— 解决 DSH 官方尚无终端 TUI 痛点的补位之作，献给偏爱 CLI 的极客：Claude Code 风格全屏交互终端插件——像素鲸鱼顶栏、实时工作状态行、思考流展开、双击 Esc 回滚、上下文进度条 + TPS 仪表。
- [CCMu04/DSHDesktop](https://github.com/CCMu04/DSHDesktop) —— 非官方 Windows 桌面客户端，连接未修改的 DeepSeek Harness Web UI。
- [cyberlieflife/dsh-model-thinking](https://github.com/cyberlieflife/dsh-model-thinking) —— 面向自定义 OpenAI 兼容模型的思考强度/reasoning effort 设置。
- [czzzlq/deepseek-harness-desktop](https://github.com/czzzlq/deepseek-harness-desktop) —— DeepSeek Harness 桌面客户端。
- [FreeCodeCampXYG/starline-dsh-desktop](https://github.com/FreeCodeCampXYG/starline-dsh-desktop) —— 基于 Go 与 Wails 的跨平台 DeepSeek Harness 桌面宿主，带代理控制与原生打包。
- [Han-1413141/dsh-sticky-disclosure](https://github.com/Han-1413141/dsh-sticky-disclosure) —— 将滚出屏幕外的展开折叠标签（Think / 工具卡）吸顶在对话视口上方，支持折叠快捷键。
- [lynkas/dsh-think-flow-flow](https://github.com/lynkas/dsh-think-flow-flow) —— 回复与思考内容的匀速打字机式输出，支持按模型区别开关。
- [pingfanfan/hello-dsh](https://github.com/pingfanfan/hello-dsh) —— 从零开始，看懂 DeepSeek Harness 的"万物皆可插件"——零基础插件开发教程（含 22 个中文技能实例）。
- [qingchunnh/dsh-desktop](https://github.com/qingchunnh/dsh-desktop) —— DeepSeek Harness 的桌面客户端，自动检测本机运行环境，启动并连接 dsh Web UI。
- [sleep2agi/DeepSeek-Harness-Desktop](https://github.com/sleep2agi/DeepSeek-Harness-Desktop) —— 面向公开 DeepSeek Harness 运行时的非官方社区桌面外壳。
- [tttnny/DSH-Launcher](https://github.com/tttnny/DSH-Launcher) —— macOS 菜单栏应用，通过 launchd 管理 DeepSeek Harness Web 服务。
- [xiaoshihou514/dsh-tui](https://github.com/xiaoshihou514/dsh-tui) —— DeepSeek Harness 的终端 UI。
- [xing-shuyin/ds-web-ui](https://github.com/xing-shuyin/ds-web-ui) —— DeepSeek Harness 的 Web UI 插件。
- [zimzaza4/dsh-bash-win](https://github.com/zimzaza4/dsh-bash-win) —— 在 Windows 上为 DeepSeek Harness 提供 Git Bash 与 WSL2 bash 工具，含 bwrap 沙箱、审批模式与后台任务。
- [arcmosin/dsh-wordbox](https://github.com/arcmosin/dsh-wordbox) —— DSH Web GUI 常用词箱子，方便项目常用词的存储和粘贴。
- [bill9109/dsh-101](https://github.com/bill9109/dsh-101) —— DSH 文档阅读模式。
- [BrambleXu/dsh-prompt-profile](https://github.com/BrambleXu/dsh-prompt-profile) —— DeepSeek Harness 可复用 Markdown Prompt Profile，支持单轮模型选择、参数替换和状态恢复。
- [ChengChe106/dsh-web-auto-open](https://github.com/ChengChe106/dsh-web-auto-open) —— DeepSeek Harness 的 web 自动打开插件。
- [ChisaAlter/Deepseek-Harness-Desktop](https://github.com/ChisaAlter/Deepseek-Harness-Desktop) —— DeepSeek Harness web UI 的 Electron 壳子。
- [dancingmemory/dskin](https://github.com/dancingmemory/dskin) —— DSKIN · DeepSeek Harness（DSH）卡通像素皮肤插件 —— 原始界面不动，像素宠物会散步、眨眼、跳跃。
- [Easyhoov/deepseek-harness-desktop](https://github.com/Easyhoov/deepseek-harness-desktop) —— DeepSeek Harness 的非官方内进程桌面应用：宿主组合在 Electron 主进程内启动，零端口 + IPC 桥接。
- [Eveerme/deepseek-harness-desktop](https://github.com/Eveerme/deepseek-harness-desktop) —— DeepSeek Harness（dsh web）的非官方 Electron 桌面壳子。
- [jiangnanquan/dsh-ux](https://github.com/jiangnanquan/dsh-ux) —— DSH web UI 增强插件 + 无边框 Electron 桌面壳。
- [KevPH2026/deepseek-harness-desktop](https://github.com/KevPH2026/deepseek-harness-desktop) —— 面向 DeepSeek Harness 的原生 macOS 桌面体验 —— 多模态生成、社区插件发现、安全更新与双语文档。
- [LodyAI/acp-extension-dsh](https://github.com/LodyAI/acp-extension-dsh) —— DeepSeek Harness 的 ACP 扩展。
- [lukethecat/mdPresenter](https://github.com/lukethecat/mdPresenter) —— Markdown 驱动的 macOS 演讲工具：iA Presenter 兼容、Liquid Glass 视觉 —— 由 DeepSeek Harness vibe 出来。
- [luoyu-xingu/dsh-background](https://github.com/luoyu-xingu/dsh-background) —— DeepSeek Harness Web 背景图片插件：本地图片路径替换网页背景，外观设置行 + 实时预览。
- [orxz/deepseek-harness-themes](https://github.com/orxz/deepseek-harness-themes) —— 面向 deepseek-harness 的 UI 主题合集。
- [phper666/dsh-hull-desktop](https://github.com/phper666/dsh-hull-desktop) —— 围绕 DeepSeek Harness 的桌面开发工具：原生壳、壳内升级、永不修改官方代码。
- [realchenwenqiao/dash](https://github.com/realchenwenqiao/dash) —— DASH —— 面向 DeepSeek Harness 的 pi-tui 终端前门，以 dsh bundle 插件形式安装。
- [sorsama/deepseek-harness-mobile](https://github.com/sorsama/deepseek-harness-mobile) —— DeepSeek Harness 的 Android 伴侣应用：通过局域网在手机上聊天、查看目标、审批与通知（Kotlin + Jetpack Compose）。
- [suzike/freestyle-dsh-theme](https://github.com/suzike/freestyle-dsh-theme) —— DeepSeek Harness 主题体验插件：OKLCH 主题提案 + 主题设计器（跨重启持久化）。
- [xiaoshihou514/dsh-desktop-pet](https://github.com/xiaoshihou514/dsh-desktop-pet) —— DeepSeek Harness：鲸鱼娘桌宠！
- [xuender/dsh-history](https://github.com/xuender/dsh-history) —— 在 DSH Web 输入框中用 ↑/↓ 键回想并重新运行当前会话的命令历史。
- [xydadada/adhd-one](https://github.com/xydadada/adhd-one) —— 面向 DeepSeek Harness 的非官方、固电全套的 Windows 桌面应用。
- [zprolab/WhaleKit](https://github.com/zprolab/WhaleKit) —— 面向 DeepSeek Harness 定制的 Superpowers。
- [a903067276-rgb/dsh-file-mentions](https://github.com/a903067276-rgb/dsh-file-mentions) —— 让 DSH 回复中的文件路径可点击：Codex 风格内联打开、文件管理器中显示、被提及文件的芯片列表。零依赖 DSH 网页插件。
- [Asaiuta/dsh-session-hub](https://github.com/Asaiuta/dsh-session-hub) —— 多服务器 DSH 会话聚合与原生操控：一个官方 Web UI 聚合网关，桥接多台远程 DSH 服务器的会话。
- [asukasec/dsh-message-preview](https://github.com/asukasec/dsh-message-preview) —— DeepSeek Harness Web UI 的右侧用户消息导航器。
- [beijingwahw/dsh-conv-search](https://github.com/beijingwahw/dsh-conv-search) —— dsh-conv-search（对话内文本搜索）— DeepSeek Harness 对话内文本搜索插件（Ctrl+F、大小写匹配、全词匹配、支持流式输出）。
- [Blaczz/dsh-soundscape](https://github.com/Blaczz/dsh-soundscape) —— DeepSeek Harness Web UI 音效系统：轮次完成庆祝音效（合成提示音+彩带动画）、阻塞/审批提醒、错误蜂鸣、打字环境音，零音频素材、零核心改动，附带 `ctx.soundscape` 服务。
- [blue-a11y/dsh-client-shortcuts](https://github.com/blue-a11y/dsh-client-shortcuts) —— DeepSeek Harness 网页 GUI 全局键盘快捷键插件：`ctx.shortcuts` 注册服务，附带 mod+l/mod+k/mod+shift+c 默认绑定。
- [forrestahha/dsh-voice-input](https://github.com/forrestahha/dsh-voice-input) —— DeepSeek Harness Web UI 的语音转文字输入插件。
- [heartmove/dsh-side-chat](https://github.com/heartmove/dsh-side-chat) —— 一个 DSH 网页插件：在对话中选中部分内容后，即可在侧边聊天里提问 —— 侧边聊天是位于右侧面板、按发起它的主会话隔离的独立聊天。
- [JasonJin2006/dsh-sound-effects-plugin](https://github.com/JasonJin2006/dsh-sound-effects-plugin) —— DeepSeek Harness 音效插件：环境工作音乐、成功提示音、提醒音。
- [jilian-dsh/dsh-rules-manager](https://github.com/jilian-dsh/dsh-rules-manager) —— DeepSeek Harness 规则与命令管理器：`/rules` 命令、设置面板与自定义命令。
- [ouyangyipeng/dsh-desktop](https://github.com/ouyangyipeng/dsh-desktop) —— 非官方的 DeepSeek Harness 桌面启动器与运行时监督进程。
- [qzhqzh/dsh-quickstart](https://github.com/qzhqzh/dsh-quickstart) —— DeepSeek Harness 桌面启动器：无控制台窗口启动 dsh web 并自动打开浏览器，已在 Windows 测试，macOS/Linux 支持中。
- [rirko/dsh-melody-launcher](https://github.com/rirko/dsh-melody-launcher) —— dsh-旋律启动器：DeepSeek Harness 桌面启动器与插件管理器。
- [sakurarain1213/deepseek-harness-lite](https://github.com/sakurarain1213/deepseek-harness-lite) —— 轻量、本地优先的 DeepSeek Harness 分发版与已验证插件包。
- [slicenferqin/dsh-whale-tui](https://github.com/slicenferqin/dsh-whale-tui) —— grok-build 风格的 DeepSeek Harness 终端 UI：以 dsh 插件包形式发布的 Rust/ratatui TUI。
- [TheChengXi/opendsh](https://github.com/TheChengXi/opendsh) —— 在 VS Code 内打开 DeepSeek Harness Web UI，一条命令即可为当前工作区启动/停止。
- [VickylastShao/deepseek-harness-desktop](https://github.com/VickylastShao/deepseek-harness-desktop) —— 非官方的跨平台 Electron 桌面启动器，支持分阶段后台运行时更新。
- [wenliang9527/dsh-eye](https://github.com/wenliang9527/dsh-eye) —— DeepSeek Harness 插件（上游未提供描述）。
- [zasSYJ/deepseek-harness-desktop](https://github.com/zasSYJ/deepseek-harness-desktop) —— 非官方的 DeepSeek Harness (dsh) Windows 桌面封装。
- [zealot00/dsh-pet](https://github.com/zealot00/dsh-pet) —— DeepSeek Harness Web UI 桌宠：精灵动画、agent 状态联动、拖拽、闹钟与番茄钟组件、皮肤分离设计。
- [ZgblKylin/dsh-gui](https://github.com/ZgblKylin/dsh-gui) —— 集成 DeepSeek Harness 的 Tauri GUI，附带插件包。
- [SamXiaBing/dsh-adb](https://github.com/SamXiaBing/dsh-adb) —— DeepSeek Harness 的 ADB 相关插件（上游未提供描述）。
- [610la/dsh-notification-center](https://github.com/610la/dsh-notification-center) — DSH 通知中心插件：对话/任务完成、报错、等待批准等事件触发浏览器通知 + 21 种匹配音效。
- [beijingwahw/dsh-conv-export](https://github.com/beijingwahw/dsh-conv-export) — dsh-conv-export（对话导出）— 将当前 DeepSeek Harness 对话导出为 Markdown、PDF 或长图 PNG。
- [Dbi-Eshuh/dsh-thinking-status-customizer](https://github.com/Dbi-Eshuh/dsh-thinking-status-customizer) — 使用生命周期安全的 CSS 自定义 DSH Web 可见的思考状态文案。
- [FlowerWater1019/Angelina-dsh-plugin](https://github.com/FlowerWater1019/Angelina-dsh-plugin) — DeepSeek Harness UI 插件（Angelina）。
- [JingkaiTang/dsh-client-ui-slingshot](https://github.com/JingkaiTang/dsh-client-ui-slingshot) — dsh web GUI 的互动弹弓玩具插件：击碎 UI 元素、看它们飞出屏幕后再恢复。dsh.client 插件，零依赖。
- [kouyichi/dsh-tui-app](https://github.com/kouyichi/dsh-tui-app) — DeepSeek Harness 终端 UI 插件（基于 Ink/React）。
- [LAN-TINA-WS/dsh-gui-customization](https://github.com/LAN-TINA-WS/dsh-gui-customization) — DeepSeek Harness 时装工坊：给 DSH 界面换装——Nous 蓝配色 / 氛围光 / 背景图预设，中英双语。
- [lco117/dsh-think-any-lang](https://github.com/lco117/dsh-think-any-lang) — DeepSeek Harness 插件：在「设置 → 通用」中选择模型推理思考（chain of thought）使用的语言。基于系统提示词实现，零额外调用、零延迟，支持 12 种语言。
- [lire1131/dsh-undo-plugin](https://github.com/lire1131/dsh-undo-plugin) — DSH 插件：为插件/皮肤/设置配置提供快照与回滚。变更自动保存、撤销/重做堆栈、快照管理面板、键盘快捷键，另附离线 PowerShell CLI 与 GUI，即使 DSH 无法启动也能用。
- [TQSY114514/dsh-ui-appearance](https://github.com/TQSY114514/dsh-ui-appearance) — DeepSeek Harness 外观自定义插件：主题配色、背景图、透明度/模糊、玻璃拟态效果。
- [urzeye/dsh-outline](https://github.com/urzeye/dsh-outline) — DeepSeek Harness（DSH）Web GUI 的实时大纲插件。
- [wuwuzhige-sudo/dsh-terminal-panel](https://github.com/wuwuzhige-sudo/dsh-terminal-panel) — DeepSeek Harness (dsh) web UI 的手动终端面板：在主机上执行命令，持久化工作目录，sudo 密码提示，命令历史。现在可以在 web 界面内直接执行命令行了。
- [xtxo/dsh-ui](https://github.com/xtxo/dsh-ui) — DeepSeek Harness 桌面端 UI。
- [zhuquan7237/zhuquan7237.github.io](https://github.com/zhuquan7237/zhuquan7237.github.io) — DeepSeek Harness Desktop (dsh 桌面版)：Windows/Linux/macOS 安装包，Codex 风格 GUI，基于官方 @deepseek-ai/dsh，自动从 npm 更新 harness。
- [yyh-001/dsh-expression](https://github.com/yyh-001/dsh-expression) — 找得到、发得出 —— DSH 表情包插件：语义搜图，只发真实文件，走 companion QQ 通道。
- [chentao326/dsh-gui](https://github.com/chentao326/dsh-gui) — macOS 原生桌面 GUI for DeepSeek Harness — 双击图标即用的 DSH 桌面客户端（Swift + WKWebView，零依赖）。
- [antinomie1/deepseek-harness-desktop](https://github.com/antinomie1/deepseek-harness-desktop) — 基于 Tauri 的 DeepSeek Harness 极简桌面外壳（dsh）。
- [EDMOK/deepseek-harness-desktop](https://github.com/EDMOK/deepseek-harness-desktop) — DeepSeek Harness 桌面版：基于 Electron 的 Windows x64 Web UI、CLI 运行时与可扩展插件生态。
- [W117C/deepseek-forge](https://github.com/W117C/deepseek-forge) — DeepSeek Harness 客户端工具（上游无描述）。
- [x118111/prompt-optimizer](https://github.com/x118111/prompt-optimizer) — 一个 DeepSeek Harness (DSH) 动态插件，在聊天输入框添加 ✨ 优化提示词按钮 —— 具备上下文感知的 LLM 重写，支持模型回退与错误可见。
- [kongxiangyiren/dhs-theme-plugin](https://github.com/kongxiangyiren/dhs-theme-plugin) — dsh 主题管理插件。
- [leavestring/awesome-dsh-background-plugin](https://github.com/leavestring/awesome-dsh-background-plugin) — DSH Web 背景个性化插件：上传自己的图片或一键切换极光、余烬、宣纸三种预设氛围；实时预览所见即所得，支持细调图像存在感、暗色遮罩、柔焦与适配方式；全程本地处理，内置中英文双语界面。
- [qjcnmd/dsh-reasoning-slider](https://github.com/qjcnmd/dsh-reasoning-slider) — DeepSeek Harness 推理强度滑块插件（上游无描述）。
- [ystyle/dsh-tool-terminal-search](https://github.com/ystyle/dsh-tool-terminal-search) — DeepSeek Harness 终端搜索工具插件（上游无描述）。
- [mervyn-teo/dsh-plugin-qr-connect](https://github.com/mervyn-teo/dsh-plugin-qr-connect) — DeepSeek Harness 动态插件：侧边栏二维码按钮，用于将移动设备连接到 Web UI。
- [SenmuuuuW/dsh-whale-report](https://github.com/SenmuuuuW/dsh-whale-report) — 🐋 鲸鱼记事本 — 你的 Agent 年度报告：从会话事件日志生成日报/周报/月报/年报，任意区间、只读不改写。
- [silencieuxzero/Better_Deepseek_Harkness](https://github.com/silencieuxzero/Better_Deepseek_Harkness) — 更好的 DeepSeek Harness，为 Web UI 进行了一些拓展。
- [YTxue/dsh-skill-manager](https://github.com/YTxue/dsh-skill-manager) — DSH Web 插件：设置侧栏中的技能管理器 —— 列表/启用/禁用，文件夹批量导入并提示冲突，状态驱动的一键 DSH 规范检查与自动修复，系统/项目范围标签。
- [AcidGr/dsh-web-lan-access](https://github.com/AcidGr/dsh-web-lan-access) — DeepSeek Harness (dsh) Web 局域网访问插件。
- [AcidGr/dsh-web-mobile-fix](https://github.com/AcidGr/dsh-web-mobile-fix) — DeepSeek Harness (dsh) Web 移动端修复插件。
- [ayuanwong/deepseek-harness-ux](https://github.com/ayuanwong/deepseek-harness-ux) — 长任务，不刷屏：关键进度清晰可见，完成后自动折叠，详情随时展开。
- [CH4ACKO3/dsh-ui-container](https://github.com/CH4ACKO3/dsh-ui-container) — 面向 DeepSeek Harness 的可远程能力递归 UI 容器。
- [CH4ACKO3/dsh-ui-workbench](https://github.com/CH4ACKO3/dsh-ui-workbench) — 面向 DeepSeek Harness UI 插件的可组合工作台基础组件。
- [CZX2244/dsh-bilibili](https://github.com/CZX2244/dsh-bilibili) — DeepSeek Harness 哔哩哔哩集成插件（无描述）。
- [edabchann/dsh-neotui](https://github.com/edabchann/dsh-neotui) — Neo-TUI：面向 DeepSeek Harness 的鼠标驱动终端 UI 客户端。
- [great-man2096/dsh-launcher](https://github.com/great-man2096/dsh-launcher) — DSH (DeepSeek Harness) 一键启动器：后台拉起 web 服务并自动打开浏览器。
- [LambProgrammer/dsh-desktop-zero](https://github.com/LambProgrammer/dsh-desktop-zero) — 非官方 DeepSeek Harness 桌面封装版 | 自包含 Windows GUI | 零配置，开箱即用。
- [Lu-Yu-Zhen/deepseek-harness-custom-skin](https://github.com/Lu-Yu-Zhen/deepseek-harness-custom-skin) — DeepSeek Harness web UI 自定义背景皮肤插件——上传背景图，调整透明度/对比度，管理多套命名皮肤。
- [MichengAI/deepseek-harness-desktop](https://github.com/MichengAI/deepseek-harness-desktop) — Desktop for DeepSeek Harness 跨平台桌面版，无需提前安装任何环境。
- [Myoontyee/deepseek-harness-desktop](https://github.com/Myoontyee/deepseek-harness-desktop) — DeepSeek Harness 桌面端：下载即用，自动保持最新版。Tauri + WebView2 shell，内置 Node/pnpm，自动同步 deepseek-ai/deepseek-harness 更新。
- [nevertoday/dsh-theme-plugin](https://github.com/nevertoday/dsh-theme-plugin) — DeepSeek Harness 主题插件（无描述）。
- [PAKIKNOWLEDGE/dsh-client-ui-skin-claude](https://github.com/PAKIKNOWLEDGE/dsh-client-ui-skin-claude) — DeepSeek Harness (dsh) Web GUI 的 Claude 风格皮肤——暖黑画布、Anthropic 陶土色点缀、衬线字体 UI。
- [rxh1999/dsh-jingle](https://github.com/rxh1999/dsh-jingle) — DeepSeek Harness 插件（无描述）。
- [sgzxs/dsh-global-task-list](https://github.com/sgzxs/dsh-global-task-list) — DeepSeek Harness 全局任务列表插件（无描述）。
- [skr311/dsh-codex-pet](https://github.com/skr311/dsh-codex-pet) — dsh-codex-pet · DSH 桌面宠物插件 — 导入精灵图序列帧宠物，悬浮浮层渲染 + Agent 状态联动。
- [Starmadebydata/deepseek-harness-macos](https://github.com/Starmadebydata/deepseek-harness-macos) — DeepSeek Harness Web UI 的原生 macOS 封装。
- [Yuuz12/dsh-webui-auth](https://github.com/Yuuz12/dsh-webui-auth) — WebUI 身份认证：HTTP/传输层强制登录（资源、插件 bundle、/api、WebSocket 四层防护），服务端会话 + HttpOnly Cookie。
- [zhangzheng25/dsh-timeline](https://github.com/zhangzheng25/dsh-timeline) — DSH 插件：极简提问时间线——每条提问一个圆点，点击跳转，悬停预览。
- [zhijun-dai/Catppuccin-dsh-theme](https://github.com/zhijun-dai/Catppuccin-dsh-theme) — 🐱 DeepSeek Harness 的舒缓粉彩 Catppuccin 主题。
- [Boliban/dsh-enter-customizer](https://github.com/Boliban/dsh-enter-customizer) —— 允许自定义输入模式的 DSH 插件。
- [cindyguyuehu123/dsh-webchatlike](https://github.com/cindyguyuehu123/dsh-webchatlike) —— 网页聊天风格的 DeepSeek Harness 消息操作：编辑 prompt、重新生成回答、以 deepseek.com 风格 `<i/N>` 翻页切换版本。
- [Half-xingle/dsh-notify-sounds](https://github.com/Half-xingle/dsh-notify-sounds) —— DeepSeek Harness 通知音效插件。
- [hsy-1234/dsh-remote](https://github.com/hsy-1234/dsh-remote) —— DeepSeek Harness 远程访问管家：从任何设备（同一 WiFi 或千里之外）访问 Web UI，常驻侧边栏、一键登录 Tailscale、二维码分享，重启不丢。
- [miracle-ai-studio/deepseek-harness-desktop](https://github.com/miracle-ai-studio/deepseek-harness-desktop) —— DeepSeek Harness 原生 macOS 桌面端。
- [RevolutionLA/dsh-dream-skin](https://github.com/RevolutionLA/dsh-dream-skin) —— DeepSeek Harness 换肤 / 壁纸 / 主题包插件：8 套 Mirage 主题、每用户强调色、壁纸 2.0、主题包导入导出/分享链接、收藏与随机，纯原生 token 系统实现。
- [xiake595/touhou-hakurei](https://github.com/xiake595/touhou-hakurei) —— 灵梦（Reimu）· 博丽神社（东方 Project）美化版皮肤：神社昼夜实景背景、灵梦立绘、画框侧边栏与输入框、纸白透明界面。
- [xuboboo/dsh-gui](https://github.com/xuboboo/dsh-gui) —— DeepSeek Harness 桌面版客户端（GUI）：品牌启动动画 + DeepSeek 设计语言界面 + rc.5 启动崩溃修复。第三方非官方项目。
- [zouyuxuan122/Deepseek-Harness-EAC](https://github.com/zouyuxuan122/Deepseek-Harness-EAC) —— DeepSeek Harness Windows 桌面客户端：内置 Node.js + dsh CLI、一键启动、10 套内置 UI 皮肤。EAC：揽尽万象。

- [237229953-create/uiopt](https://github.com/237229953-create/uiopt) —— uiopt —— DSH WebUI 显示增强：实时余额、上下文环、缓存命中率、provider 图标与扩展插件管理器。
- [AKS1st/dsh-cyber-particle](https://github.com/AKS1st/dsh-cyber-particle) —— 为 DeepSeek Harness Web 界面添加动态粒子网络背景。
- [AlexCHONG8/dsh-viewboost](https://github.com/AlexCHONG8/dsh-viewboost) —— aionui 预览工具栏增强：Finder 显示 / 全屏 / 复制路径 / 复制文件 + token 用量卡片。
- [Chance-Wu/dsh-task-capsule](https://github.com/Chance-Wu/dsh-task-capsule) —— 把 Harness 的执行过程收敛成一个始终可见、几乎不打扰的任务状态指示器。
- [ChocoLZS/dsh-plugin-chat-menu](https://github.com/ChocoLZS/dsh-plugin-chat-menu) —— 在 DSH 会话输入框输入 `@`，呼出工作目录文件浏览菜单：名称搜索、递归查找、多格式引用，全程无需离开键盘。
- [Highjobop/dsh-gadgets](https://github.com/Highjobop/dsh-gadgets) —— 轻量 DeepSeek Harness 增强：dsh-skin（外观）+ dsh-tidy（会话折叠与导航栏）。
- [kc0ed/dsh-bottom-bar](https://github.com/kc0ed/dsh-bottom-bar) —— 提供更丰富的 DeepSeek Harness 底栏信息显示。
- [Links2008/DeepSeek-Harness-Desktop](https://github.com/Links2008/DeepSeek-Harness-Desktop) —— DeepSeek Harness 非官方 Windows 桌面发行版：原生通知、顺滑窗口控制、内置运行时与自动更新，跟随官方 master 分支。
- [Melosic/dsh-invoke](https://github.com/Melosic/dsh-invoke) —— DeepSeek Harness 提示词库与调用器：管理、分类、快速调用提示词，支持侧边栏 GUI 与复制粘贴。
- [mengyun233/dsh-codex-pet](https://github.com/mengyun233/dsh-codex-pet) —— 将 Codex 桌宠皮肤自动迁移到 DeepSeek Harness：动画、多会话对话框、设置面板，一键迁移即插即用。
- [MoneShadow/DeepSeek-Harness-linux-](https://github.com/MoneShadow/DeepSeek-Harness-linux-) —— 基于官方 WebUI 二改的 Linux 桌面端，内置外挂视觉插件（需手动接入 API Key），已迭代四个版本。
- [penguin-oo/dsh-pathlink](https://github.com/penguin-oo/dsh-pathlink) —— 在 DeepSeek Harness 聊天中 Ctrl+点击文件路径与链接：路径在系统文件管理器中打开所在文件夹，链接在新标签页打开。
- [wangjicheng2004/dsh-desktop](https://github.com/wangjicheng2004/dsh-desktop) —— 将 DeepSeek Harness 的 Web UI 封装为桌面应用：双击启动本地服务并打开界面，关闭窗口后服务可继续在后台运行。
- [xiekai886/dsh-MusicPlayer](https://github.com/xiekai886/dsh-MusicPlayer) —— 边对话边听歌的 DeepSeek Harness 插件：折叠/展开两种可自由拖动的悬浮窗口，利用 Meting API 接入网易云音乐，支持歌单导入和按歌名/歌手搜索导入。
- [XMoon/dsh-pi-tui](https://github.com/XMoon/dsh-pi-tui) —— 基于 pi-tui 分支构建的 DeepSeek Harness 第三方 TUI 模式。
- [yimeng-dev/dsh-traffic-light](https://github.com/yimeng-dev/dsh-traffic-light) —— DeepSeek Harness 多会话 agent 状态监控（红绿灯）。
- [yunxiiQwQ/dsh-maid-whale-webUI](https://github.com/yunxiiQwQ/dsh-maid-whale-webUI) —— DeepSeek Harness Web UI 鲸鱼女仆主题插件。
- [ZichengGurrr/dsh-window](https://github.com/ZichengGurrr/dsh-window) —— 把 DeepSeek Harness Web UI 装进 Windows 原生独立窗口（WebView2，即 Edge 内核）的极简启动器。

- [988hj7tczd-oss/harness-desktop](https://github.com/988hj7tczd-oss/harness-desktop) —— 开箱即用的 DeepSeek Harness 桌面客户端。
- [A-BigDog/Gandalf](https://github.com/A-BigDog/Gandalf) —— 中土魔幻风主题插件：甘道夫朝阳背景 + 霞鹭文楷等宽字体 + 中土风控件定制。
- [AshModeling/dsh-light-theater](https://github.com/AshModeling/dsh-light-theater) —— DSH Web UI 输入框皮肤插件：跟随当前皮肤主题，给输入框加一套「科技风灯光剧场」。
- [Cheyeah/dsh-drop-preview](https://github.com/Cheyeah/dsh-drop-preview) —— 拖拽文件预览插件：全屏预览图片/Markdown/文本，图片放大旋转，文件盒持久化，一键附带给 AI。
- [hellosz/dsh-pets](https://github.com/hellosz/dsh-pets) —— 把 Codex Pets 的宠物陪伴体验带进 DeepSeek Harness Web GUI：宠物行为动画展示 agent 正在思考、等待确认还是已完成。
- [JayZz210l/deepseek-harness-for-ide](https://github.com/JayZz210l/deepseek-harness-for-ide) —— 把 DeepSeek Harness 完整搬进 JetBrains IDE：智能体对话、工具审批、目标与计划、子智能体与 Workflow。装插件、配一次 API Key，即可对话。
- [LeemanCheung/dsh-qq2007-skin](https://github.com/LeemanCheung/dsh-qq2007-skin) —— QQ 2007 复古聊天皮肤，适用于 DeepSeek Harness Web GUI。
- [linkingoscar/dsh-attachment-formats](https://github.com/linkingoscar/dsh-attachment-formats) —— 为 DeepSeek Harness Web GUI 提供 Codex 式附件格式处理：PDF 文本层提取、Office 文本提取、扫描 PDF OCR、长文档拆分 + 索引卡、图片转 PNG。
- [liveqte/dsh-lan-proxy](https://github.com/liveqte/dsh-lan-proxy) —— 把 dsh 的回环 Web UI 通过 0.0.0.0 反代暴露到局域网，开关/状态/日志嵌入设置页（官方 bundle 插件）。
- [MarcoG-h/DSH-Launcher](https://github.com/MarcoG-h/DSH-Launcher) —— 离线一键部署 DeepSeek Harness 桌面启动器 & 第三方插件管理。
- [Mystery-God/dsh-chime](https://github.com/Mystery-God/dsh-chime) —— 任务完成提示音插件：音量控制、自定义音频，集成在 Plugins 设置页。
- [myYangyunfan/dsh_desktop](https://github.com/myYangyunfan/dsh_desktop) —— DeepSeek Harness (dsh) Windows 桌面客户端：内置 Node.js + dsh CLI，一键启动。
- [nirvanaslash/dsh-artifact-preview](https://github.com/nirvanaslash/dsh-artifact-preview) —— Codex 式工件预览：聊天中产物文件卡片行 + 分屏侧边预览（Markdown/代码/CSV/JSON/图片/HTML）。
- [QinLuza/dsh-rollback-visual](https://github.com/QinLuza/dsh-rollback-visual) —— dsh /rollback 可视化插件：轨迹锚点徽章，点击即可回滚。
- [RAFOLIE/dsh-desktop-windowos](https://github.com/RAFOLIE/dsh-desktop-windowos) —— DeepSeek Harness 桌面壳：Tauri v2，托盘 + 原生 webchat + 任务完成通知，单文件便携 exe。
- [RizenHNT/dsh-skin-digital-arcade](https://github.com/RizenHNT/dsh-skin-digital-arcade) —— 数字街机 HUD 风格皮肤：霓虹青/紫/品红、像素字体、动画 HUD 精灵、自定义光标。
- [s3yf1337/dsh-desktop](https://github.com/s3yf1337/dsh-desktop) —— DeepSeek Harness 桌面 profile：Tauri 原生窗口包裹 web 界面——托盘、单实例、系统通知、仅建议更新器、原生对话框、拖放、应用内设置页。
- [sperictao/codex-pro-max](https://github.com/sperictao/codex-pro-max) —— Tauri v2 桌面启动器：任务板服务管理、Codex CDP 面板注入、~/.codex 配置保护、FastCtx MCP 集成、DeepSeek Harness 远程访问与自更新。
- [sundusk/dsh-waterball-pet](https://github.com/sundusk/dsh-waterball-pet) —— DeepSeek Harness Web UI 漂浮水球桌宠插件。
- [Venus-Gan/dsh-console](https://github.com/Venus-Gan/dsh-console) —— DeepSeek Harness 桌面客户端：插件化桌面界面，含托盘、GUI 管理器（MCP/技能/偏好）与 Codex 式「已安排」面板，Tauri v2 构建。
- [xituisuany-max/dsh-client-ui-pet](https://github.com/xituisuany-max/dsh-client-ui-pet) —— DSH web GUI 鲸鱼娘桌宠插件：23 个序列帧动作、多吸附点、坐姿专属动作套、token 汇报、滑动选择器。
- [Xizhi1024/dsh-vs-sidebar](https://github.com/Xizhi1024/dsh-vs-sidebar) —— DeepSeek Harness 的 VS Code 侧边栏扩展。
- [xxccdl/deepseek-harness-desktop](https://github.com/xxccdl/deepseek-harness-desktop) —— DeepSeek Harness 桌面版：Electron 壳层封装 dsh web，集成记忆查看、电脑控制、桌面设置、定时任务、快捷对话、预算血条等桌面插件。
- [zhxqc/dsh-oh-my-theme](https://github.com/zhxqc/dsh-oh-my-theme) —— DeepSeek Harness (dsh) web 插件：主题、全局排版、@file 提及、项目文件树与 Markdown 预览。
- [2nd1st/dsh-plugin-open-app](https://github.com/2nd1st/dsh-plugin-open-app) —— 把 open-mcp-apps 带进 DeepSeek Harness：每个 MCP app 都是侧边栏里自己的容器（workspace + 会话 + App mode），带 agent 状态条、聊天内行内渲染与 App Store。


- [Asaiuta/dsh-custom-header](https://github.com/Asaiuta/dsh-custom-header) —— DeepSeek Harness 自定义请求头插件（上游未提供描述）。
- [baka-world/dsh-sidebar-modes](https://github.com/baka-world/dsh-sidebar-modes) —— 侧边栏模式插件：紧凑模式、右侧边栏、可折叠导轨。
- [boxeryao/dsh-mini-tui](https://github.com/boxeryao/dsh-mini-tui) —— DSH-TUI：轻量快速的终端插件，直连 DSH 运行时。
- [cdllang/dsh-about](https://github.com/cdllang/dsh-about) —— 关于页插件：版本卡片 + 一键更新服务端，外形像官方 dsh 客户端插件。
- [chiro2001/dsh-oc](https://github.com/chiro2001/dsh-oc) —— DeepSeek Harness 的 OpenCode TUI 前端：以官方 OpenCode TUI 作为终端前端，dsh 作为后端。
- [ChongYep/DSH-Remote](https://github.com/ChongYep/DSH-Remote) —— 在手机上远程操控电脑上的 DeepSeek Harness——通过局域网或 Tailscale 安全组网走公网。仅回环、令牌门控。
- [Cnkore007/dsh-Desktop-Client](https://github.com/Cnkore007/dsh-Desktop-Client) —— DeepSeek Harness (dsh) 现代化桌面客户端，完整运行时 i18n 与生态支持。
- [cucen066/dsh-file-ref](https://github.com/cucen066/dsh-file-ref) —— DeepSeek Harness 文件引用插件（上游未提供描述）。
- [dragons96/dsh-client-ui-settings-skills](https://github.com/dragons96/dsh-client-ui-settings-skills) —— 为 DeepSeek Harness 客户端定制的 Skill 设置 UI 插件。
- [Fallen0543/dsh-sidebar-files](https://github.com/Fallen0543/dsh-sidebar-files) —— 侧边栏文件树插件：会话/文件标签栏 + 懒加载文件树，按扩展名彩色图标、复制路径、发送给 Agent。
- [haoku123/dsh-voice](https://github.com/haoku123/dsh-voice) —— DeepSeek Harness 全双工语音模式：流式 ASR → LLM → TTS，支持打断。本地 whisper 转写、Edge TTS 播放、零 API key。
- [ingleav626-art/dsh-native-launcher](https://github.com/ingleav626-art/dsh-native-launcher) —— 以「零额外安装」为设计原则：仅凭一个官方插件与 Windows 原生机制，让 DeepSeek Harness Web UI 获得桌面 App 式的一键启动体验。
- [JesmonX/dsh-web-shell](https://github.com/JesmonX/dsh-web-shell) —— DeepSeek Harness 右侧停靠 Web Shell 插件，帮助在 web 对话同时进行用户的 shell 操作。
- [kanneiren/dsh-windows-manager](https://github.com/kanneiren/dsh-windows-manager) —— 轻量级 DeepSeek Harness Windows 托盘管理器。
- [L-0915/dsh-desktop](https://github.com/L-0915/dsh-desktop) —— DeepSeek Harness 桌面客户端（上游未提供描述）。
- [Lindong-K/voice-input-plugin](https://github.com/Lindong-K/voice-input-plugin) —— DeepSeek Harness Web UI 语音输入插件（Web Speech API）（上游未提供描述）。
- [NattoCB/dsh-plugin-petdex-market](https://github.com/NattoCB/dsh-plugin-petdex-market) —— 宠物市场插件：petdex.dev 伴侣宠物市场，带原生 macOS 桌面宠物渲染器。
- [rongzi5/dsh-whale-pet](https://github.com/rongzi5/dsh-whale-pet) —— DeepSeek Harness 鲸鱼桌面宠物插件（上游未提供描述）。
- [shaobeichen/dsh-pocket](https://github.com/shaobeichen/dsh-pocket) —— 把 DeepSeek Harness 装进你的口袋：电脑上跑 dsh web，手机扫码即同步访问（局域网 + 公网，实时同屏）。
- [stushansusu/dsh-miku-skin](https://github.com/stushansusu/dsh-miku-skin) —— 初音未来主题皮肤，用于 DeepSeek Harness (DSH) Web GUI —— 蓝紫洋红渐变、毛玻璃面板、可自定义背景图、亮暗双主题。
- [szh1007/dsh-changes-panel](https://github.com/szh1007/dsh-changes-panel) —— DeepSeek Harness 变更面板插件（上游未提供描述）。
- [TaoZhiZhuang/deepseek-desk-pet](https://github.com/TaoZhiZhuang/deepseek-desk-pet) —— DeepSeek Harness 桌面宠物插件（上游未提供描述）。
- [TheMcSwift/DeepSeek-TUI](https://github.com/TheMcSwift/DeepSeek-TUI) —— DeepSeek Harness 的终端交互客户端（out-of-tree profile bundle）。
- [TTH23/DSH_DESK](https://github.com/TTH23/DSH_DESK) —— DeepSeek Harness 桌面托盘程序：首次启动自动部署、内嵌启动 dsh web、多窗口并行、无命令行窗口、最小化到系统托盘。
- [WEP-56/DSH-Launcher](https://github.com/WEP-56/DSH-Launcher) —— DeepSeek Harness 启动器：非 webui 二次打包而是 webui 内嵌，可适配所有 webui 强化插件。额外提供 dsh 包管理、配置文件管理、插件管理、浏览器标签页、多窗口等功能。
- [wx-yss/dsh-message-rail](https://github.com/wx-yss/dsh-message-rail) —— Codex 风格左侧消息导航轨道：等距刻度 + 悬停预览 + 点击跳转用户消息 · DSH Web 插件。
- [ZMJJKK123-hub/dsh-plugin](https://github.com/ZMJJKK123-hub/dsh-plugin) —— 从 dsh 源码树提取的独立 DSH 插件：变更监控（host 服务 + 浏览器变更面板）与语音输入（输入框麦克风）。
- [zrt-ai-lab/dsh-desktop-windows](https://github.com/zrt-ai-lab/dsh-desktop-windows) —— DeepSeek Harness 非官方 Windows 桌面版——一个安装包，无需任何前置依赖。
- [BillionSeniors/dsh-project-file-explorer](https://github.com/BillionSeniors/dsh-project-file-explorer) — 项目文件浏览器：右侧停靠文件树 + 一键预览（代码/文本/图片/音视频/PDF），新工作区自动停靠，窄屏响应式抽屉。
- [Dantezcx/DeepSeek-Harness-Desktop](https://github.com/Dantezcx/DeepSeek-Harness-Desktop) — DSH 的 Windows 桌面客户端，开箱即用：集成 dsh-web-ui 皮肤插件，并带云端同步、归档恢复、概览监测。
- [GLFzr/dsh-drop-file-to-path](https://github.com/GLFzr/dsh-drop-file-to-path) — Codex 式拖拽：把文件拖进输入框自动插入其路径。
- [GammaChineYov/dsh-collapsed-assistant](https://github.com/GammaChineYov/dsh-collapsed-assistant) — DSH web 客户端插件：把每条助手消息的工具调用折叠成内嵌圆角开关，正文始终完整显示，带彩色文件变更统计 footer。
- [Happy2Git/dsh-compass](https://github.com/Happy2Git/dsh-compass) — 上下文与文件面板插件：目录浏览器、注入上下文与只读 git graph，一个可安装 bundle。
- [THEWOLFWALKER/dsh-coyote](https://github.com/THEWOLFWALKER/dsh-coyote) — Agent 与 GUI 双控的 DG-LAB Coyote 电刺激插件：安全限幅、可编程波形、DSH 风格 Web 面板。
- [U1s1-king/dsh-gbc-ui](https://github.com/U1s1-king/dsh-gbc-ui) — 适用于 DeepSeek Harness Web GUI 的 GirlsBangCry 皮肤。
- [arvin-xiao/dsh-desktop](https://github.com/arvin-xiao/dsh-desktop) — DSH 跨平台桌面外壳（Electron + React）：支持 Windows / macOS / Linux。
- [gooosie/dsh-whale-bg](https://github.com/gooosie/dsh-whale-bg) — 粒子鲸鱼背景插件：带光标点亮与主题支持。
- [onchainyaotoshi/dsh-plugins](https://github.com/onchainyaotoshi/dsh-plugins) — DSH 插件 monorepo：dsh-file-explorer——面板文件树 + Web UI 查看器工作区。
- [rbelem/dsh-tui](https://github.com/rbelem/dsh-tui) — Rust 编写的 dsh 终端客户端：通过 RPC + host frames 驱动运行中的网关，功能与 Web UI 对等。
- [silencieuxzero/Better_Deepseek_Harness](https://github.com/silencieuxzero/Better_Deepseek_Harness) — Better DeepSeek Harness：对 webui 和 DeepSeek Harness 进行功能扩展。
- [spacecat398/dsh-tray](https://github.com/spacecat398/dsh-tray) — dsh web 的 Windows 托盘开关与看门狗：中/英菜单、UI 自动化驱动的新会话、仅生命周期的看门狗。
- [twinkle10010/dsh-rokid-aiui](https://github.com/twinkle10010/dsh-rokid-aiui) — Rokid AIUI 开发套件：host 插件 + Agent 预设，在 Harness GUI 里开发并实时预览 AIUI（Ink 框架）应用。
- [wowayou/mydsh](https://github.com/wowayou/mydsh) — 基于 DSH 的个人 Agent 系统——万物皆插件：完成通知、纯文本模型识图、回复批注、多会话标签、视频支持、沙箱补丁。
- [Ayase34/gal-view](https://github.com/Ayase34/gal-view) —— 把 dsh 会话界面切换成 galgame 游戏界面的插件。
- [fan56/dsh-tui-pi](https://github.com/fan56/dsh-tui-pi) —— DeepSeek Harness (dsh) 的 pi 风格终端 UI——pi-tui 外观、dsh 斜杠命令、GitHub 明暗主题、powerline 底栏。
- [grunmin/dsh-acp-enhanced](https://github.com/grunmin/dsh-acp-enhanced) —— DeepSeek Harness (dsh) 的增强版 ACP (Agent Client Protocol) 服务器——Zed 编辑器的即插即用桥接：块级流式、用量/统计遥测、模型与思考强度切换、权限预设、会话恢复与归档。安装：`dsh plugin add`。
- [huyansheng3/dsh-skin](https://github.com/huyansheng3/dsh-skin) —— DeepSeek Harness Web 的原生 Cordis 主题插件。
- [JAdpp/dsh-whale-galgame](https://github.com/JAdpp/dsh-whale-galgame) —— DeepSeek Harness Web 的多模型角色 Galgame 对话界面与可选桌宠插件。
- [Jensen-Yao/deepseek-harness-android-app](https://github.com/Jensen-Yao/deepseek-harness-android-app) —— DeepSeek Harness 安卓通用控制端：Termux 引导、一键部署、内置浏览器与存储管理（dsh-plugin 生态）。
- [jifeng15/dsh-web-restart](https://github.com/jifeng15/dsh-web-restart) —— 让 dsh web 实现真·热装载：装插件/改配置/升级本体后自动安全重启，不用再手动去命令行重启。
- [kexuejin/dsh-zhihu-dashboard](https://github.com/kexuejin/dsh-zhihu-dashboard) —— DeepSeek Harness 的知乎面板：热点趋势、关注流、帖子追踪与 app 创意提炼——UI + 原生 agent 工具。
- [majiayu000/dsh-desk](https://github.com/majiayu000/dsh-desk) —— DeepSeek Harness 的可安装 Tauri 桌面发行版：内置运行时、可信插件审查与每日兼容性检查。
- [Max-Null/seek-soul-in-darkness](https://github.com/Max-Null/seek-soul-in-darkness) —— Seek Soul in Darkness (SSiD)——基于 DSH 的桌面 AI：在黑暗中寻找硅基生命的灵魂。
- [Nagi-ovo/voyager](https://github.com/Nagi-ovo/voyager) —— 面向 Gemini、AI Studio、Claude 与 ChatGPT 的增强套件；提示词管理器可用于任意 Web UI，含 DeepSeek Harness。
- [peiyucn/dsh-launcher](https://github.com/peiyucn/dsh-launcher) —— 在 VS Code 内启动 DeepSeek Harness (dsh)，并在内置浏览器中打开其 Web UI。
- [Laplace-bit/dsh-bell-notify](https://github.com/Laplace-bit/dsh-bell-notify) —— DeepSeek Harness 生命周期铃声与状态点：启动、工具调用、命令、等待确认、轮次完成、回到空闲等每个环节都有专属提示音，Web Audio 实时合成（零音频文件），右下角呼吸状态点显示工作状态。
- [stvlynn/dsh.fish](https://github.com/stvlynn/dsh.fish) —— DeepSeek Harness 的 fish shell 集成（上游无描述）。
- [wallpap/dsh-compact-activity](https://github.com/wallpap/dsh-compact-activity) —— 让 DeepSeek Harness Web 的思考与工具活动分组更紧凑。
- [ZYar-er/dsh-notify-bell](https://github.com/ZYar-er/dsh-notify-bell) —— DeepSeek Harness 的语义化通知音：完成/审批/提问/阻塞/错误，支持 BEL 或 WAV，带 Web UI 铃铛开关。

- [a179-sanae/dsh-auto-collapse](https://github.com/a179-sanae/dsh-auto-collapse) —— DSH Web UI 自动折叠插件（上游无描述）。
- [citrusli2026/dsh-mobile-shell](https://github.com/citrusli2026/dsh-mobile-shell) —— 自托管 DeepSeek Harness 的社区移动端外壳（WebView 瘦客户端）+ token-guard 代理——支持 Android & iOS，非官方产品。
- [edwardyang0011/dsh-ui-skins](https://github.com/edwardyang0011/dsh-ui-skins) —— DeepSeek Harness 换肤插件。
- [feely0208/deepwhale-desktop](https://github.com/feely0208/deepwhale-desktop) —— DeepSeek Harness 的 Electron 桌面客户端（上游无描述）。
- [fufankeji/deepseek-harness-studio](https://github.com/fufankeji/deepseek-harness-studio) —— DeepSeek Harness Studio：面向 DeepSeek Harness 的现代化桌面开发环境，内置插件中心、视觉增强与本地 Host。
- [FuzzySoul/dsh-chatvoice](https://github.com/FuzzySoul/dsh-chatvoice) —— ChatVoice——DSH 免费语音输入 + AI 回复朗读插件，零配置 / 零成本 / 免 API key。
- [hellosky983/dsh-mc-launcher](https://github.com/hellosky983/dsh-mc-launcher) —— 基于 DeepSeek Harness 的 Minecraft 启动器：全屏启动器 UI（root slot），支持版本下载、微软 device-code 登录并从 DSH 宿主进程启动游戏（非官方开源）。
- [iMMIQ/dsh-code-server](https://github.com/iMMIQ/dsh-code-server) —— 在 DeepSeek Harness Web 中嵌入打包好的 code-server VS Code 工作台。
- [InkWord01/DeepSeekHarness----Desktop](https://github.com/InkWord01/DeepSeekHarness----Desktop) —— DSH 桌面客户端：双击即用、内置后端、常驻托盘、与官方发布同步。
- [isomoes/ikanban](https://github.com/isomoes/ikanban) —— DeepSeek Harness 的 iKanban 浏览器界面 fork 的 monorepo。
- [leozou320-ai/dsh-web-speech-input](https://github.com/leozou320-ai/dsh-web-speech-input) —— DeepSeek Harness 网页语音输入——实时、可编辑、绝不自动发送。
- [linhx1999/dsh-writing-pad](https://github.com/linhx1999/dsh-writing-pad) —— DeepSeek Harness Web GUI 的 Markdown 写作板：按会话编辑、预览与会话内 AI 辅助改写。
- [pjy-20051012/dsh-file-preview](https://github.com/pjy-20051012/dsh-file-preview) —— DeepSeek Harness 文件预览插件（上游无描述）。
- [Ricketts-Guo/dsh-shortcuts](https://github.com/Ricketts-Guo/dsh-shortcuts) —— DeepSeek Harness WebUI 键盘快捷键插件（34 个预置功能、一键录制自定义、静默权限切换）。
- [sundusk/dsh-moodball](https://github.com/sundusk/dsh-moodball) —— DeepSeek Harness 心情球插件（上游无描述）。
- [sundusk/dsh-moodball-web](https://github.com/sundusk/dsh-moodball-web) —— DeepSeek Harness Web UI 的浮动水球宠物插件。
- [veritas501/dsh-chatflow-rail](https://github.com/veritas501/dsh-chatflow-rail) —— dsh Web GUI 的会话流导航栏——每条用户消息一个节点，悬停预览、平滑跳转，外加停靠的「上一条消息」卡片。
- [Very12345/sai](https://github.com/Very12345/sai) —— 由官方 DeepSeek Harness 驱动的本地优先 Android 编码 agent。
- [yuanliangxiannan/dsh-hud](https://github.com/yuanliangxiannan/dsh-hud) —— DeepSeek Harness 的游戏风 HP / MP / TIME HUD。
- [a735624258/dsh-skill-picker](https://github.com/a735624258/dsh-skill-picker) —— DSH 实现 workbuddy 同款选择 skill 功能：在 composer 中选择 skill，插入官方 `/skill-name` 手势，DSH 随消息加载。
- [baobaolaodie/dsh-tui-vscode](https://github.com/baobaolaodie/dsh-tui-vscode) —— dsh-tui 的 VS Code companion 扩展：在集成终端中运行 dsh-TUI（Path A MVP，ccch1mneyyy/dsh-TUI#161）。
- [DocJlm/dsh-arknights](https://github.com/DocJlm/dsh-arknights) —— DSH Web 明日方舟主题皮肤合集，支持社区创作者提交 PR。
- [dsh-mixxed/dsh-client-ui-filesystem](https://github.com/dsh-mixxed/dsh-client-ui-filesystem) —— 定制版 DeepSeek Harness 文件系统 UI 插件。
- [emberff/dsh-plugin-origin-split](https://github.com/emberff/dsh-plugin-origin-split) —— 把 DeepSeek Harness Web 插件设置拆分为原生（内置）与自定义（用户安装）两个标签页。
- [EmbOriented/DeepSeek-Thinking-CN](https://github.com/EmbOriented/DeepSeek-Thinking-CN) —— 汉化 DSH 思考过程显示。
- [Gamitrd6316/dsh-launcher](https://github.com/Gamitrd6316/dsh-launcher) —— 用对新手友好的桌面 GUI 管理和启动 DeepSeek Harness——无需命令行。
- [Hearingimpaired-conversion320/DSH-Transparent-UI-Plugin](https://github.com/Hearingimpaired-conversion320/DSH-Transparent-UI-Plugin) —— 把 DeepSeek Harness 的 Web UI 变成可定制的毛玻璃：Mica / 兼容模式、可调模糊与动态壁纸。
- [hyqibot/DeepSeek-Harness-Token-Free](https://github.com/hyqibot/DeepSeek-Harness-Token-Free) —— 为 DeepSeek Harness (DSH) 生态打造的全免 Token 费的桌面端。
- [Isanti2016/dsh-console](https://github.com/Isanti2016/dsh-console) —— DSH 控制台插件（上游无描述）。
- [Isilsolme/dsh-anthropic-fonts](https://github.com/Isilsolme/dsh-anthropic-fonts) —— DSH UI 的 Anthropic 风格字体插件（上游无描述）。
- [jokerwen666/dsh-bili-taskmaster](https://github.com/jokerwen666/dsh-bili-taskmaster) —— 等你的小鲸鱼跑任务时随机播放 B 站视频，愉快做监工。
- [Kassimo4628/dsh_desktop](https://github.com/Kassimo4628/dsh_desktop) —— 把 DeepSeek Harness 封装为开箱即用的 Windows 桌面客户端（支持便携版与安装版），无需命令行即可快速使用。
- [lilwhich/my_better-dsh](https://github.com/lilwhich/my_better-dsh) —— 定制版 DeepSeek Harness（上游描述：for better dsh）。
- [Myoontyee/deepseek-harness-desktop-plugin](https://github.com/Myoontyee/deepseek-harness-desktop-plugin) —— DeepSeek Harness 桌面版一键安装插件：dsh 生态分发入口（平台检测 → 下载最新安装包 → 启动安装，含进度卡片与已安装检测）。
- [No-PRM/dsh-explorer](https://github.com/No-PRM/dsh-explorer) —— VS Code 风格文件树浏览器（git 装饰、预览、diff、拖拽引用）；通过 `dsh plugin --profile web add` 安装。
- [qinyre/dsh-Desktop](https://github.com/qinyre/dsh-Desktop) —— DSH 桌面客户端（上游无描述）。
- [RogueServitor-495/dsh-desktop](https://github.com/RogueServitor-495/dsh-desktop) —— DSH 桌面客户端（上游无描述）。
- [Ttkt2086/deepseek-harness-desktop](https://github.com/Ttkt2086/deepseek-harness-desktop) —— 一键在本地运行 DeepSeek Harness——无需 Node.js、pnpm 或 Docker。
- [uAcharGG/dsh-manager](https://github.com/uAcharGG/dsh-manager) —— DSH 管理插件（上游无描述）。
- [uAcharGG/dsh-ui-chime](https://github.com/uAcharGG/dsh-ui-chime) —— DSH UI 提示音插件（上游无描述）。
- [XXLxhPLMM/deepseek-harness-webview](https://github.com/XXLxhPLMM/deepseek-harness-webview) —— 基于 webview 的 DeepSeek Harness 桌面程序。
- [yellpoliovirusvaccine37/dsh-launcher](https://github.com/yellpoliovirusvaccine37/dsh-launcher) —— Windows 上双击即可启动 DeepSeek Harness：开机自启 + 紧凑独立窗口——无需命令行。
- [aokamoaki/dsh-notify](https://github.com/aokamoaki/dsh-notify) —— DeepSeek Harness 对话完成通知：回合结束、报错、目标完成或需审批时弹出 Windows 通知+提示音，前台自动抑制，仅后台提醒。
- [c-v-c-v/dsh-chat-nav](https://github.com/c-v-c-v/dsh-chat-nav) —— DeepSeek Harness 聊天快捷导航插件（ChatGPT 式悬停滑出）。
- [Hua1Q1nG/dsh-prompt-self](https://github.com/Hua1Q1nG/dsh-prompt-self) —— 个人 Prompt 画像引擎（DSH 双面客户端插件）：消息级 prompt 自动改写 + 自动学习 + 可视化开关与画像 UI。
- [huasheng33991/dsh-power-button](https://github.com/huasheng33991/dsh-power-button) —— DeepSeek Harness 一键启停按钮，固定在窗口右下角。
- [jhonden/my-dsh-plugins](https://github.com/jhonden/my-dsh-plugins) —— DeepSeek Harness (dsh) 社区插件合集：Web UI 工作区文件浏览器（Files 标签页——树状视图、Markdown 预览、沙盒化只读）。
- [Misaki14987/dsh-theme-taffy](https://github.com/Misaki14987/dsh-theme-taffy) —— 我不是雏草姬（自用）—— 个人 DSH 主题插件。
- [nekocode/dsh-desktop](https://github.com/nekocode/dsh-desktop) —— 官方 DeepSeek Harness 的桌面应用封装。
- [Nyasers/dsh-hanako](https://github.com/Nyasers/dsh-hanako) —— DSH for Hanako —— 个性化定制的 DSH 客户端变体。
- [Starlight-bananice/dsh-status-bar](https://github.com/Starlight-bananice/dsh-status-bar) —— 一眼看清你的 agent 正在做什么：17 段可配置 DSH 会话状态栏（状态/模型/上下文/tokens/TPS/花费/任务）。
- [WYH66666666/DSH-Transparent-UI-Plugin](https://github.com/WYH66666666/DSH-Transparent-UI-Plugin) —— 是一层高自由度的玻璃质感主题，套在 DeepSeek Harness 网页端。顶栏、侧边栏、输入框、统计行、轨迹视图都成了磨砂玻璃片。玻璃模糊度、磨砂度、背景（流体或自定义壁纸，壁纸还能单独调模糊和磨砂）全都能在设置卡片里自由调节。关掉开关就回到原生界面，不改 DSH 任何一行源码。
- [zhanggeng0806/dsh-ui-plugins](https://github.com/zhanggeng0806/dsh-ui-plugins) —— DeepSeek Harness Web GUI 插件：对话跳转导航条 + 交互式星空背景。
- [zink-ning/dsh-desktop](https://github.com/zink-ning/dsh-desktop) —— DeepSeek Harness (dsh) 的 Windows 桌面壳。
- [Zlyraz/dsh-ballute](https://github.com/Zlyraz/dsh-ballute) —— DeepSeek Harness (dsh) 插件（上游未提供描述）。
- [2768651338/dsh-effort-slider](https://github.com/2768651338/dsh-effort-slider) —— 仲 Claude Code 推理等级滑块的 DSH 插件。
- [Andyqwe44/dsh-notify-win](https://github.com/Andyqwe44/dsh-notify-win) —— DeepSeek Harness 任务完成或需要输入时的 Windows 原生浮窗提醒 + 任务栏闪烁。
- [ink5897/dsh-theme-kit](https://github.com/ink5897/dsh-theme-kit) —— DeepSeek Harness Web GUI 外观套件：32 个预设主题、动态/静态壁纸、纸张质感、分区文字深度，还有一只键盘桌宠。
- [jie0708/dsh-hover-ai](https://github.com/jie0708/dsh-hover-ai) —— DeepSeek Harness 插件：hover 到 AI 知识弹框。
- [lehhair/dsh-app](https://github.com/lehhair/dsh-app) —— DeepSeek Harness 桌面 + Android 壳（Tauri 2）：内嵌 dsh 运行时、远程网关节点、启动器自动升级。
- [lovejavacore/dsh-minecraft-pet](https://github.com/lovejavacore/dsh-minecraft-pet) —— DeepSeek Harness（DSH）网页界面的桌面宠物——Steve、Creeper 和 Ultraman 会根据代理的工作状态做出反应。
- [Nacocx/dsh-ui-context-menu](https://github.com/Nacocx/dsh-ui-context-menu) —— 替换浏览器右键菜单为 DSH 功能菜单。
- [nzl153/dsh-pet-whale](https://github.com/nzl153/dsh-pet-whale) —— 桌宠小鲸鱼：DSH（DeepSeek Harness）Web 桌宠插件，随 agent 状态切换动画，纯 DOM 零依赖。
- [PuLuShen/DSH-end-notify](https://github.com/PuLuShen/DSH-end-notify) —— DSH 任务结束提醒音。
- [Q04291/dsh-ambient-ui](https://github.com/Q04291/dsh-ambient-ui) —— DeepSeek Harness 氛围主题 UI 插件（上游无描述）。
- [renpengfei1027/dsh-web-notify](https://github.com/renpengfei1027/dsh-web-notify) —— DSH Web GUI 待处理提醒插件：待审批/计划审阅/提问告警（铃声、标题栏与favicon 徽标、PWA 徽标、审批中心 dock、系统提醒），外加完成、任务失败、断连与 429 运行时错误提醒。
- [shenmy-git/dsh-weather-plugin](https://github.com/shenmy-git/dsh-weather-plugin) —— DSH 插件：天气工具 + 沉浸式天气主题 + FishLogo 鲸鱼宠物（主题/氛围/声音/HUD）。
- [skyhancloud/dsh-client-ui-quote](https://github.com/skyhancloud/dsh-client-ui-quote) —— DeepSeek Harness 网页端引用插件：在 AI 回复中券选文字，将其以引用横幅附在下一条消息中。
- [xiaokang6/dsh-admin](https://github.com/xiaokang6/dsh-admin) —— DeepSeek Harness Web GUI 管理插件：手动重启 + 自动检查新版本（面板按钮 + 设置页）。
- [yxccai/dsh-desktop](https://github.com/yxccai/dsh-desktop) —— 非官方 DeepSeek Harness Windows/macOS 桌面应用，内建运行时，自动复用已有 DSH 环境。
- [ZJUZhiyuCai/dsh-ivory](https://github.com/ZJUZhiyuCai/dsh-ivory) —— DeepSeek Harness 的清雅可审计 Claude 风主题——浅色/深色/移动端、安全 Markdown 预览、零遥测、零运行时依赖。
- [zhu168/dsh-save-money](https://github.com/zhu168/dsh-save-money) —— DSH 省钱插件：自定义“暂停/恢复”时间段，暂停时间到时自动暂停长任务（不是停止），时间段结束时自动恢复。
- [feiyang-dev/DeepSeek-Harness-Desktop](https://github.com/feiyang-dev/DeepSeek-Harness-Desktop) —— 内嵌官方 DeepSeek Harness Web UI 的 Electron 桌面壳：启动时引导选择安装模式，自动完成环境检测、安装、服务拉起，并以百分比进度条展示各阶段，服务就绪后打开主界面。
- [mecoren/deepseek-harness-launcher](https://github.com/mecoren/deepseek-harness-launcher) —— DeepSeek Harness 启动器（上游无描述）。
- [cupen/dsh-workbench](https://github.com/cupen/dsh-workbench) —— DeepSeek Harness 工作台插件。
- [lee259/dsh-workbench](https://github.com/lee259/dsh-workbench) —— DeepSeek Harness Web 的右侧文件工作区。
- [Laplace-bit/dsh-smooth-stream](https://github.com/Laplace-bit/dsh-smooth-stream) —— 丝滑流式渲染：字跟着模型到达走、换行滑入、不闪，滚动归用户，尊重 prefers-reduced-motion。
- [Z-6354/dsh-mobile-hanui](https://github.com/Z-6354/dsh-mobile-hanui) —— DSH Web 界面的移动端适配：窄屏下把桌面三栏布局改造成触屏友好的手机布局（覆盖式抽屉、可拖拽悬浮按钮、全屏弹窗、上滑加载历史），1024px 断点内生效，桌面端零影响。
- [SpookySandwich/dsh-plugin-smooth-stream](https://github.com/SpookySandwich/dsh-plugin-smooth-stream) —— 以淡入的段落批次呈现助手回复，而非逐字输出；流式过程中平滑跟随滚动，思考块显示实时摘要行，并尊重 prefers-reduced-motion。
- [FlashingChen/dsh-desktop-hub](https://github.com/FlashingChen/dsh-desktop-hub) —— 官方 DSH Web UI 的 Electron 桌面中枢：内置 MCP 配置转换器（Claude Code / Cursor JSON 一键转 DSH YAML）与 Skills / Plugin 管理台，捆绑 Node.js + DSH 运行时，免安装、免终端。
- [baihejiangnan/dsh-session-context-menu](https://github.com/baihejiangnan/dsh-session-context-menu) —— 为 DeepSeek Harness 桌面壁纸/wrapper 提供原生质感的右键上下文菜单。
- [baisama-cloud/dsh-stt-input](https://github.com/baisama-cloud/dsh-stt-input) —— DeepSeek Harness (DSH) Web GUI 语音输入插件：点击输入框麦克风图标将语音转文字。基于浏览器 Web Speech API + OpenAI 兼容 Whisper（OpenAI/Groq），模型可选。
- [buzhimingLF/dsh-desktop-grayscale](https://github.com/buzhimingLF/dsh-desktop-grayscale) —— 面向 DeepSeek Harness 的桌面灰度主题插件。
- [daetz-coder/dsh-multi-chat](https://github.com/daetz-coder/dsh-multi-chat) —— 面向 DeepSeek Harness 的多会话聊天插件。
- [EricXu20266/dsh-gui](https://github.com/EricXu20266/dsh-gui) —— DeepSeek Harness (DHS) Electron GUI 客户端 —— webui 转 gui，内核不变。
- [imkingjh999/dsh-shorts-wall](https://github.com/imkingjh999/dsh-shorts-wall) —— DSH 插件：面向 dsh-better-sidebar 的竖屏短视频墙 —— YouTube Shorts + Bilibili 竖屏，双源轮播加关键词包。
- [tomowang/dsh-tui](https://github.com/tomowang/dsh-tui) —— 面向 DeepSeek Harness (dsh) 的开源终端前端。
- [xinspark/DSH-Basic-Right-Sidebar](https://github.com/xinspark/DSH-Basic-Right-Sidebar) —— Basic Right Sidebar —— 面向 DeepSeek Harness 的右侧边栏插件：二级导航（功能/会话）、工作区/会话面包屑、带日志下载的会话概览、原生轨迹视图，以及可配置的顶栏精简。
- [yang19997/dsh-live-backdrop](https://github.com/yang19997/dsh-live-backdrop) —— DSH Web GUI 动态背景 + UI 主题接管插件：静态图/GIF/MP4 壁纸、三视觉方向预设、六色六形参可调，完全独立于 dsh-web-ui。
- [djt889/dsh-drag-to-attachment](https://github.com/djt889/dsh-drag-to-attachment) —— DSH（DeepSeek Harness）Web UI 插件：把本地任意文件/文件夹拖入或粘贴为附件（图片、任意文件、整个文件夹）或定位真实路径——一个开关，两种模式。
- [dsh-mixxed/dsh-client-ui-git-branch](https://github.com/dsh-mixxed/dsh-client-ui-git-branch) —— 定制化的 DeepSeek Harness git 分支 UI 插件。
- [stopchewing/dsh-mcp-view](https://github.com/stopchewing/dsh-mcp-view) —— MCP 工具清单面板：侧边栏一键悬浮面板，按服务器分组展示全部 MCP 工具（传输方式、端点、JSON Schema、最近使用时间），默认折叠、支持搜索与实时刷新。
- [Final-LX/dsh-ui-customizer](https://github.com/Final-LX/dsh-ui-customizer) —— DeepSeek Harness 自定义主题插件。
- [JeffioZ/dsh-desktop](https://github.com/JeffioZ/dsh-desktop) —— DeepSeek Harness (dsh) 的跨平台桥接插件，基于 Tauri v2。
- [jinhuang712/dsh-survey](https://github.com/jinhuang712/dsh-survey) —— DeepSeek Harness 问卷式批量提问插件：一次处理 10+ 个问题（单选/多选/是否开关/对比/开放式），支持单题跳过、全屏遮罩层与提交后双栏回顾。
- [Lan-zk/dsh-at-mention](https://github.com/Lan-zk/dsh-at-mention) —— DeepSeek Harness 的 @-mention 上下文引用：Web 输入框中的工作区文件搜索与跨会话引用。
- [lbl61/dsh-drop-in](https://github.com/lbl61/dsh-drop-in) —— 把文件拖入/粘贴到 DeepSeek Harness Web GUI：输入框原生引用气泡，随消息发送（含绝对路径），气泡渲染文件卡片。
- [MIOYULIN/dsh-m-ui](https://github.com/MIOYULIN/dsh-m-ui) —— DeepSeek Harness UI 插件（上游无描述）。
- [MichengAI/dsh-notify](https://github.com/MichengAI/dsh-notify) —— DeepSeek Harness 通知插件（上游无描述）。
- [Plocr/dsh-desktop](https://github.com/Plocr/dsh-desktop) —— DeepSeek Harness 桌面工作台：Electron 原生壳 + 内嵌 harness 运行时（离线、免装 Node），壳层仅保留桌面原生能力，与 harness 之间以 bridge 插件通信。
- [ShanHaiFish/sent-msg-locator](https://github.com/ShanHaiFish/sent-msg-locator) —— DSH 插件：对话区左缘轮次图标列，点击定位到每轮用户输入文本。
- [sweven-tears/DshDesktop](https://github.com/sweven-tears/DshDesktop) —— DeepSeek Harness 桌面壳（WinForms + WebView2）。
- [syncended/deepseek-harness-picture-in-picture](https://github.com/syncended/deepseek-harness-picture-in-picture) —— DeepSeek Harness 画中画插件（上游无描述）。
- [TonyWang-hub/deepseek-harness-desktop](https://github.com/TonyWang-hub/deepseek-harness-desktop) —— 针对官方未修改 DeepSeek Harness Web 应用的非官方 macOS 桌面壳。
- [WD-CHINA/deepseek-harness-desktop](https://github.com/WD-CHINA/deepseek-harness-desktop) —— 将 DeepSeek Harness Web UI 封装为安全、原生、跨平台的桌面应用。支持 macOS Apple Silicon、macOS Intel 和 Windows x64 原生构建。内置插件市场。
- [xiaoweidotnet/dsh-desktop](https://github.com/xiaoweidotnet/dsh-desktop) —— DeepSeek Harness 的跨平台桌面启动器，无需安装 Node.js。
- [yueker/dsh-lan-access](https://github.com/yueker/dsh-lan-access) —— DeepSeek Harness 局域网访问插件（上游无描述）。
- [yuluofengsu/dsh-launcher](https://github.com/yuluofengsu/dsh-launcher) —— DeepSeek Harness 一键启动/退出插件：隐藏启动服务+应用窗口、静默退出、内存防泄漏看门狗。
- [zhengjy01/dsh-settings-nav-fold](https://github.com/zhengjy01/dsh-settings-nav-fold) —— 将 DSH 设置面板中的插件/扩展设置条目折叠为一个可收展的“插件条目”分组行。
- [ZSLsherly/DSH-remote-console](https://github.com/ZSLsherly/DSH-remote-console) —— DeepSeek Harness 远程控制台插件（上游无描述）。
- [zoahdev/dsh-artifacts](https://github.com/zoahdev/dsh-artifacts) —— DeepSeek Harness 的 Claude-Artifacts 风格渲染：Markdown + JSON → 自包含的精美 HTML 文档、卡片、仪表盘与画廊。零运行时依赖。
- [Anestis271/dsh-desktop](https://github.com/Anestis271/dsh-desktop) —— 把官方 DeepSeek Harness WebUI 变成自然的桌面体验。
- [april-jk/dsh-mobile](https://github.com/april-jk/dsh-mobile) —— DeepSeek Harness 的 Flutter 移动端远程控制客户端。
- [april-jk/dsh-mobile-suite](https://github.com/april-jk/dsh-mobile-suite) —— 通过仅出站的 Relay，从配对的移动设备远程操控 DeepSeek Harness。
- [charrywhite/dsh-sticky-notes](https://github.com/charrywhite/dsh-sticky-notes) —— DeepSeek Harness 便签插件：可拖拽，支持文字与图片、9 款皮肤，AI 可读写。
- [chengzhi43/dsh-file](https://github.com/chengzhi43/dsh-file) —— DeepSeek Harness 的 VS Code 风格文件管理器插件。
- [crack-time/dsh-client-ui-skin-cottage](https://github.com/crack-time/dsh-client-ui-skin-cottage) —— DeepSeek Harness web GUI 的田园小屋皮肤：4K 壁纸 + 磨砂玻璃面板（纯 UI dsh.client 插件）。
- [daboge-beach/dsh-skin-studio](https://github.com/daboge-beach/dsh-skin-studio) —— DeepSeek Harness 皮肤工作室：内置精选皮肤 + 用户上传皮肤中心，让每个 agent 都有专属面孔。
- [EachSheep/dsh-mario-pixel-skin](https://github.com/EachSheep/dsh-mario-pixel-skin) —— 非官方马里奥风格像素冒险皮肤，适配 DeepSeek Harness。
- [iceleaf916/dsh-tray](https://github.com/iceleaf916/dsh-tray) —— dsh（DeepSeek Harness）系统托盘管理器：launchd 托管 dsh web 常驻，菜单栏控制重启/停止/启动，--patch 零侵入挂载控制面插件。
- [Jiyr0119/dsh-workspace-explorer](https://github.com/Jiyr0119/dsh-workspace-explorer) —— DeepSeek Harness 工作区文件资源管理器：右侧目录树面板，点击/拖拽文件引用进输入框，UI 对齐 DSH 原生风格。
- [licat2023/dsh-session-tabs](https://github.com/licat2023/dsh-session-tabs) —— 会话标签页插件（上游未提供描述）。
- [liuyuelintop/dsh-conversation-exporter](https://github.com/liuyuelintop/dsh-conversation-exporter) —— 将 DeepSeek Harness 对话导出为整洁、易读的 Markdown。
- [MagicCrazyMan/dsh-password-prompt](https://github.com/MagicCrazyMan/dsh-password-prompt) —— DeepSeek Harness 插件：Web GUI 中的密码遮罩面板（password_prompt 工具）——bundle + 双面插件。
- [PicGo/dsh-plugin](https://github.com/PicGo/dsh-plugin) —— 借助 PicGo，把图片和文件上传到你的图床，直接从 DeepSeek Harness 里完成。
- [realMisakaMikoto/dsh-skin-studio](https://github.com/realMisakaMikoto/dsh-skin-studio) —— DeepSeek Harness 自定义皮肤工作室，支持全界面配色、组件图片/视频背景与皮肤包分享。
- [springbrand-lab/dsh-skin-universe](https://github.com/springbrand-lab/dsh-skin-universe) —— 皮肤宇宙插件（上游未提供描述）。
- [yanglongyun/dsh-ramify](https://github.com/yanglongyun/dsh-ramify) —— Ramify 是 DeepSeek Harness 的创意分支画布插件，用树状工作区生成、对比和迭代多个可交互方案。
- [yangweigao/dsh-header-clock](https://github.com/yangweigao/dsh-header-clock) —— DeepSeek Harness 头部时钟插件：页面顶部动态显示 YYYY年MM月DD日 星期X HH:MM:SS。
- [yuloong07-star/dsh-usb](https://github.com/yuloong07-star/dsh-usb) —— DSH USB：DeepSeek Harness 便携版（U盘友好，兼容 exFAT）。
- [zoyluoblue/deepseek-harness-desktop](https://github.com/zoyluoblue/deepseek-harness-desktop) —— DeepSeek Harness 桌面壳（上游未提供描述）。
- [PerryLink/dsh-talk](https://github.com/PerryLink/dsh-talk) —— DeepSeek Harness 的语音优先会话循环：输入框麦克风按钮支持浏览器/本地语音转文字（Web Speech、FunASR、whisper.cpp），一个用于文字转语音回复的 speak 工具（浏览器、edge-tts、piper），带静音选项的事件播报，以及语音打断。
- [zhaimingyou/aisync](https://github.com/zhaimingyou/aisync) —— aisync.club 多电脑统一入口：SSH 反向隧道 + nginx + Authelia 把多台电脑的 DeepSeek Harness Web GUI 聚合到一个域名下（含 ECS 控制面/机器侧 agent/一键部署脚本）。
- [13071301808/dsh-composer-expand](https://github.com/13071301808/dsh-composer-expand) —— Composer expand/collapse toggle for DeepSeek Harness (dsh): a ⬆/⬇ button in the composer tool row grows the input to a tall 70vh writing view for long drafts.
- [cookiesheep/whale-on-desk](https://github.com/cookiesheep/whale-on-desk) —— A pixel-art whale companion for DeepSeek Harness — it swims while your agents work and taps the glass when an approval is waiting.
- [cuteG41cute/dsh-desktop](https://github.com/cuteG41cute/dsh-desktop) —— DeepSeek Harness Desktop - WebView2 desktop app with multi-session detached windows, system tray and an adaptive MSI installer.
- [Dely0/dsh-personal-workbench](https://github.com/Dely0/dsh-personal-workbench) —— DSH 个人工作台：日历 + 任务列表 + AI 澄清/拆解/执行/复盘 | Personal workbench for DeepSeek Harness Web: calendar + task list + AI assistant
- [dushaobindoudou/dsh-acp](https://github.com/dushaobindoudou/dsh-acp) —— Agent Client Protocol (ACP) server plugin for the DeepSeek Harness (dsh) - drive dsh agents from Zed and any ACP v1 client
- [flyhigao/dsh-sticky-notes](https://github.com/flyhigao/dsh-sticky-notes) —— dsh-plugin。
- [gxx950224/ggame](https://github.com/gxx950224/ggame) —— DSH 插件整合包（monorepo）：背包（物品栏/袋子/货币/全会话费用记账）、任务（任务面板/追踪条/Agent 联动/到期提醒）——可安装整合包，也可单独安装。
- [lixun910/dsh-share](https://github.com/lixun910/dsh-share) —— Access your DeepSeek Harness (dsh) workspace over a secure public tunnel — from your phone, or from anywhere with a public URL.
- [luis1232023/dsh-workspace-enhance](https://github.com/luis1232023/dsh-workspace-enhance) —— 增强dsh左侧工作区区侧栏——每个工作区文件夹下提供 会话/文件/Git 子 Tab，含文件树与右侧预览、Git 的 Changes/Graph 双视图、搜索、视图切换与添加工作区，界面样式对齐默认插件。
- [luocuiyu/deepseek-harness-manager](https://github.com/luocuiyu/deepseek-harness-manager) —— DeepSeek Harness Windows 桌面管理器：一键启动并内嵌 DSH，支持外部插件与代理预设管理、软件回收站、会话观察、API 切换、托盘控制及应用内更新。
- [miiaowuwu/dsh-event-sounds](https://github.com/miiaowuwu/dsh-event-sounds) —— 语音控制插件（安洁莉娜「hirari do～」）
- [NoNameLeGo/dsh-catppuccin-theme](https://github.com/NoNameLeGo/dsh-catppuccin-theme) —— DeepSeek Harness Web GUI 的 Catppuccin 主题插件：Latte / Frappé / Macchiato / Mocha 四种主题一键切换，内置可开关的玻璃质感（Glassmorphism）
- [Suef-666/dsh-pet](https://github.com/Suef-666/dsh-pet) —— deepseek-harness,desktop-pet,desktop-widget,utools-plugin。
- [Yui-Little/dsh-mobile-shell](https://github.com/Yui-Little/dsh-mobile-shell) —— Mobile shell UI plugin for DeepSeek Harness web: overlay drawer, full-width conversation, settings sheet, marketplace with hot-load installs.
- [1MLightyears/dsh-theme-synthwave](https://github.com/1MLightyears/dsh-theme-synthwave) —— 一款霓虹波普（synthwave）风格的 DeepSeek Harness (dsh) 主题。
- [abaicaia/dsh-tray-launcher](https://github.com/abaicaia/dsh-tray-launcher) —— Windows 系统托盘版 DeepSeek Harness 启动器：双击秒开、异常自动清理旧进程并重启、全程日志排障。
- [Cocowwy/dsh-plugin-task-notification](https://github.com/Cocowwy/dsh-plugin-task-notification) —— DeepSeek Harness agent 会话完成时的桌面通知。
- [jasondu/dsh-ui-mobile](https://github.com/jasondu/dsh-ui-mobile) —— 面向 DeepSeek Harness Web 端的移动客户端插件：侧滑抽屉式侧栏/详情面板、底部导航栏，768px 以下触屏优先的响应式布局。
- [jaxxchen003/foliodrop-dsh-publish](https://github.com/jaxxchen003/foliodrop-dsh-publish) —— 将 DeepSeek Harness agent 的输出发布为可分享的 FolioDrop 链接。
- [limbo947/dsh-recall-plugin](https://github.com/limbo947/dsh-recall-plugin) —— DSH 消息撤回插件：回到发送该消息时的状态。
- [l-s-c/dsh-workspace-labels](https://github.com/l-s-c/dsh-workspace-labels) —— 从现有侧边栏三点菜单打开 DeepSeek Harness 工作区。
- [MochiNek0/dsh-desktop](https://github.com/MochiNek0/dsh-desktop) —— 基于 Tauri 构建的跨平台 DeepSeek Harness（dsh web）桌面客户端——在原生窗口中运行 CLI 的 Web UI，共享同一份会话数据。
- [mux9056-bot/dsh-theme](https://github.com/mux9056-bot/dsh-theme) —— DeepSeek Harness 主题插件 · 30 款即插即用主题（零依赖 DSH 客户端插件 + 独立 CSS）。
- [nicolas-zhao-4/dsh-reply-nav](https://github.com/nicolas-zhao-4/dsh-reply-nav) —— 为 DeepSeek Harness 提供的历史消息导航器。
- [PRTSPro/dsh-read-aloud](https://github.com/PRTSPro/dsh-read-aloud) —— DeepSeek Harness 对话实时朗读插件：流式朗读 AI 回复（OneCore 即时 / edge-tts 神经语音），支持文本清洗与关键词控制。
- [QianziTech/dsh-trellis-dashboard](https://github.com/QianziTech/dsh-trellis-dashboard) —— 支持在 DeepSeek Harness (dsh) 中，通过对话 tab 查看 Trellis 任务状态、工作区信息等，需配合 Trellis 使用。
- [Rain-Shuoyu/dsh-client-deep-sneak](https://github.com/Rain-Shuoyu/dsh-client-deep-sneak) —— DeepSneak（深度摸鱼）：专门为 DeepSeek Harness 设计的插件，在 agent 工作时播放 B 站视频，并在 agent 需要操作时暂停并提醒用户，方便摸鱼的同时避免因为没有发现 agent 被阻塞而影响效率。
- [tangbohu2017/TangDSH-Desktop](https://github.com/tangbohu2017/TangDSH-Desktop) —— 开箱即用的 DeepSeek Harness 桌面客户端：零命令行、双击即用，自动部署运行环境，内置工作区文件面板与 @ 文件引用，为开发者而生。
- [tscodeplus/deepseek-harness-desktop](https://github.com/tscodeplus/deepseek-harness-desktop) —— 体积小速度快的 DeepSeek Harness 桌面端。
- [vic276344-dotcom/dsh-plugins](https://github.com/vic276344-dotcom/dsh-plugins) —— DeepSeek Harness (DSH) 插件：聊天内文件预览与双模型视觉。右键文件路径即可在侧面板预览代码/图片/PDF；配合纯文本主模型，用视觉 LLM 分析图片。兼容 OpenAI 接口。
- [ymh0000123/dsh-theme-endfield](https://github.com/ymh0000123/dsh-theme-endfield) —— 终末地官网风格的 DSH Web 主题：奶油纸底、墨黑文字、信号黄强调、全直角工业编辑风。
- [zzyyyds88/dsh-solo-leveling](https://github.com/zzyyyds88/dsh-solo-leveling) —— DeepSeek Harness（DSH）插件集：访问门禁（登录 + HTTPS 反代）、默认值、手机端适配、桌宠、任务套件（看板 / 统计 / Git 图谱 / 皮肤）。Linux 服务器部署 DSH，浏览器 / 手机 / 局域网公网随时调用。
- [AlienHub/dsh-menubar](https://github.com/AlienHub/dsh-menubar) — 原生 macOS 菜单栏应用，托管 DeepSeek Harness（DSH）：内置 Node.js，一键启停，支持 *.localhost 访问。
- [d-dev0101/open-sea-skin](https://github.com/d-dev0101/open-sea-skin) — 面向 DeepSeek Harness、Chrome 与 Edge 的 WebGPU 海洋皮肤——原生插件、静态安装器与新标签页扩展。
- [feitangyuan/neko-dsh](https://github.com/feitangyuan/neko-dsh) — DeepSeek Harness 的复古 desktop 客户端。内置 Node、dsh、pnpm，运行时一行没改，插件热插拔与 MCP 原样保留。开箱即用。
- [Hope-Phenom/DshNotifyicon](https://github.com/Hope-Phenom/DshNotifyicon) — DSH 托盘助手 — DeepSeek Harness 的 WPF 托盘扩展：一键配置 Node.js/npm/dsh 环境，托盘启停 Web UI。
- [kangjinghang/dsh-xueqiu](https://github.com/kangjinghang/dsh-xueqiu) — 雪球 mini 行情面板 — DeepSeek Harness 免登录 A股/港美股实时行情、K线、分时、热榜、7x24快讯。可拖拽悬浮面板，交易时段智能刷新。
- [Renakoni/dsh-desk](https://github.com/Renakoni/dsh-desk) — DeepSeek Harness 的桌面宠物伴侣与本地用量工作台。
- [saya-ch/dsh-mobile](https://github.com/saya-ch/dsh-mobile) — DeepSeek Harness 移动端适配与安全局域网访问插件，支持 Android App 和手机浏览器。
- [Sutera-Diffusus/dsh-whale-musume](https://github.com/Sutera-Diffusus/dsh-whale-musume) — DeepSeek Harness 桌宠插件：元气鲸鱼娘陪你写代码 🐋
- [tpmoonchefryan/dsh-joi-channel-theme](https://github.com/tpmoonchefryan/dsh-joi-channel-theme) — 轴伊 Joi 双衣装主题 for DeepSeek Harness — unofficial, non-commercial fan theme plugin 🍊
- [YRN-playmaker/dsh-wallpaper_share](https://github.com/YRN-playmaker/dsh-wallpaper_share) — 挂载在 DeepSeek Harness 上的“壁纸引擎”同步插件，可同步静态壁纸。
- [zdx8637-gitdog/dshmobile](https://github.com/zdx8637-gitdog/dshmobile) — 手机远程控制 DeepSeek Harness：Android App + 云端 relay + PC 插件，常驻二维码一码三用（扫码下载/配对/登录授权）。有服务器可以自行部署。
- [0928OYX/dsh-free-skins](https://github.com/0928OYX/dsh-free-skins) — DeepSeek Harness (DSH) 界面皮肤插件：7 款原创免费皮肤 + 皮肤画廊 + 一键应用免重启 + 皮肤不透明度 + 自定义对话区背景（CC BY-NC-SA 4.0）。
- [Braidy-Wu/dsh-conversation-minimap](https://github.com/Braidy-Wu/dsh-conversation-minimap) — DSH Web GUI 对话迷你地图（鱼眼悬停、边缘渐隐、点击跳转），ChatGPT 风格。
- [Horizon215/dsh-plugins](https://github.com/Horizon215/dsh-plugins) — DeepSeek Harness (dsh) 社区插件：输入框提示词模板库 + 每轮 Token 用量统计，含设置页汇总仪表盘、使用趋势图（今天/近7天/近30天）和供应商价格预设。
- [lzbaclz/dsh-conversation-outline](https://github.com/lzbaclz/dsh-conversation-outline) — DeepSeek Harness Web 的 Codex 风格对话大纲：右侧边栏悬停预览 + 点击跳转。
- [Ran-sh/dsh-splash-launcher](https://github.com/Ran-sh/dsh-splash-launcher) — DeepSeek Harness 的启动器。
- [riesbri/dsh-tui](https://github.com/riesbri/dsh-tui) — DeepSeek Harness 的终端界面：基于 Cordis 的进程内零依赖渲染器。
- [rongyishuaige7/dsh-stats](https://github.com/rongyishuaige7/dsh-stats) — DeepSeek Harness (DSH) 插件：项目级 Token 消耗、开发时间线与消费金额统计面板。
- [xccpddym/dsh-bubble-nav](https://github.com/xccpddym/dsh-bubble-nav) — DSH（DeepSeek Harness）泡泡导航：可拖拽的加速球，列出你的所有问题（编号 + 时间），加上带分类筛选的完整对话大纲面板。点击即可跳转到对话任何位置。

- [zhengjy01/dsh-start](https://github.com/zhengjy01/dsh-start) —— macOS 上 DSH Web GUI 的一键启停启动器：前台/后台启动、停止、状态、防重复启动、自动打开浏览器，并可用脚本构建程序坞版 DSH.app。
- [Buktal/deepseek-desktop](https://github.com/Buktal/deepseek-desktop) —— 跨平台的 DeepSeek Harness (dsh) 桌面客户端。提供系统托盘常驻、平滑启动 Web UI、全自动依赖管理与无缝应用升级体验。
- [ccch1mneyyy/working-activity](https://github.com/ccch1mneyyy/working-activity) —— 为 pi CLI 与 DSH 提供的生动工作状态行扩展。
- [Er1c0v0/dsh-whale-pet](https://github.com/Er1c0v0/dsh-whale-pet) —— DeepSeek Harness Web UI 的可爱鲸鱼娘桌宠插件。
- [FeatherHunter/dsh-opencode-palette](https://github.com/FeatherHunter/dsh-opencode-palette) —— 看腻了 DSH 默认皮肤？34 款 opencode 经典配色一键换上——tokyonight、dracula、gruvbox、matrix、rose-pine……即点即换，重启不丢。
- [futrime/webdsh](https://github.com/futrime/webdsh) —— 在浏览器中运行 DeepSeek Harness。
- [iobee/dsh-desktop](https://github.com/iobee/dsh-desktop) —— 面向 DeepSeek Harness 的轻量级 macOS 桌面宿主，支持基于 npm 的安全运行时更新。
- [lencx/Minke](https://github.com/lencx/Minke) —— DeepSeek Harness 桌面客户端。
- [linhut/dsh-stock-terminal](https://github.com/linhut/dsh-stock-terminal) —— 股市行情皮肤+功能插件：DSH Web GUI 全局交易终端视觉 + 实时行情面板（A股/港股/美股/加密/外汇），自选跑马灯、首字母模糊搜索、持仓盈亏管理。
- [alcohol-101/dsh-gif-background](https://github.com/alcohol-101/dsh-gif-background) —— DeepSeek Harness（DSH）Web GUI 自定义背景（图片/GIF/动态壁纸）插件——开关开启加本地资产库，官方主题与皮肤中心皮肤采用分开的展示机制。
- [Bob-Bo1/obsidian-workbench](https://github.com/Bob-Bo1/obsidian-workbench) —— 面向 DeepSeek Harness 的 Obsidian 风格工作台插件。
- [code-newbie-1/dsh-wallpaper](https://github.com/code-newbie-1/dsh-wallpaper) —— Wallpaper Engine 壁纸联动插件。
- [crack-time/dsh-web-ui-skin](https://github.com/crack-time/dsh-web-ui-skin) —— DeepSeek Harness web GUI 的田园小屋皮肤：4K 壁纸 + 磨砂玻璃面板（纯 UI 的 dsh.client 插件）。
- [dmz2922990/dsh-thinkmeter](https://github.com/dmz2922990/dsh-thinkmeter) —— DeepSeek Harness（DSH）客户端插件：将聊天视图中流式的 Think 思考预览替换为实时 Token 数量显示。
- [GHJIVHIDD/dsh-plugin-vm-sandbox](https://github.com/GHJIVHIDD/dsh-plugin-vm-sandbox) —— 原生UI界面。面向 DeepSeek Harness Web 的虚拟机沙箱插件：它基于 OrbStack 为每个会话提供独立的 debian/alpine 沙箱虚拟机，在会话视图环中新增「虚拟机」页签，支持查看/启动/休眠/删除和详细配置展示，同时为模型提供 vm_list、vm_create、vm_exec、vm_delete 工具，并内置全局运行上限、闲置自动休眠、归档/删除自动清理等资源治理能力。
- [cnskycn/deepseek-harness-desktop](https://github.com/cnskycn/deepseek-harness-desktop) —— DeepSeek Harness (dsh) Web UI 的桌面应用包装器——Windows 一键安装包。
- [HanLoney/Deepseek-harness-desktop](https://github.com/HanLoney/Deepseek-harness-desktop) —— 高度可定制的 DeepSeek Harness Electron 桌面版。
- [keleus/deepseek-pet](https://github.com/keleus/deepseek-pet) —— 在你的deepseek-harness上养一只吃白饭的大蓝鲸。
- [wisdomriver/dsh-desktop](https://github.com/wisdomriver/dsh-desktop) —— DeepSeek Harness 桌面客户端插件（上游未提供描述）。
- [xiaohaozi12138/dsh-desktop-win32](https://github.com/xiaohaozi12138/dsh-desktop-win32) —— 超轻量dsh(DeepSeek Harness)插件，安装创建启动器，双击默认打开浏览器跳转，并附带可爱小鲸鱼图标，超小无依赖。
- [Zalpha263/dsh-archived-sessions](https://github.com/Zalpha263/dsh-archived-sessions) —— dsh管理归档会话困难？用它就对了！
- [Zalpha263/dsh-ui-beautify](https://github.com/Zalpha263/dsh-ui-beautify) —— 用于dsh界面美化，内置四种颜色主题，并且可上传自定义背景。
- [thirsty5034/dsh-floor-nav](https://github.com/thirsty5034/dsh-floor-nav) —— 面向 DeepSeek Harness 的 LiveAgent 风格楼层导航栏（折叠刻度、悬停面板、跳转）。
- [Rewmington/deskwhale-harness](https://github.com/Rewmington/deskwhale-harness) —— DeskWhale：基于 DeepSeek Harness 的桌宠改造版：悬浮鲸鱼、磨砂窗口、审批与提问提醒。
- [vdnight89/InfiniteDSH](https://github.com/vdnight89/InfiniteDSH) —— 诸天万界：DeepSeek Harness 文学插件。一个会话就是一本书。封面开书，只写正文。誊出精排 Markdown。
- [1321928757/dsh-prompt-polish](https://github.com/1321928757/dsh-prompt-polish) —— 输入栏提示词优化插件：6 种策略 × 3 种语言一键重写草稿，可选会话上下文，带确认弹窗、最近 5 次历史与三级设置持久化。
- [boogoo619/dsh-focus-overlay](https://github.com/boogoo619/dsh-focus-overlay) —— 专注模式，面向 DeepSeek Harness (DSH)：全屏阅读视图，折叠 AI 工具调用为摘要。
- [dphmoblie/deepseek-harness-android](https://github.com/dphmoblie/deepseek-harness-android) —— 一个独立的 Capacitor Android 应用，用于管理本机 DeepSeek Harness Ubuntu 用户空间。它提供运行时安装与重置、Ubuntu 终端、可选的 Shizuku 设备 Shell 访问、设置，以及仅限回环地址的内嵌 Harness Web 界面。
- [FleetingEcho/dsh-powerdesk](https://github.com/FleetingEcho/dsh-powerdesk) —— 面向 DSH 的 IDE 工作台插件：基于 Rust PTY 的快速终端（restty/WebGPU）、CodeMirror 6 编辑器、文件浏览器、Markdown 笔记、沙箱浏览器与 ripgrep 搜索——全部作为右侧与底部可停靠面板中的标签页，并可用自定义 React 组件扩展。
- [JUANWANG-BUAA/dsh-full-remote](https://github.com/JUANWANG-BUAA/dsh-full-remote) —— 面向远程访问的 DeepSeek Harness 插件：支持通过公网隧道或局域网，在手机等设备上远程使用 DeepSeek Harness，设置、凭据与文件访问等功能保持可用，按设备维护独立会话。
- [Tasihi89/dsh-talk-map](https://github.com/Tasihi89/dsh-talk-map) —— DSH 可视化对话地图：把会话当作白板上的卡片——拖拽排布、双击进入对话、拉一条边即可带着注入的上下文分叉。对 ADHD 友好的空间化记忆。
- [241793/DSH-Win-GUI](https://github.com/241793/DSH-Win-GUI) —— Deepseek Harness桌面版，为用户提供便捷安装操作，无需输入命令。内置QQBot、Wxclaw渠道连接功能，还有插件市场以及插件安装界面，添加cc-tui兜底插件。
- [acebang0303/dsh-quick-launch](https://github.com/acebang0303/dsh-quick-launch) —— DSH 桌面快捷方式插件：一键创建/更新/删除 DeepSeek Harness 桌面快捷方式，图标可自定义上传切换（蓝白金鲸鱼悬浮按钮，可拖动）。
- [hahaha-taotao/dsh-browser-launcher](https://github.com/hahaha-taotao/dsh-browser-launcher) —— Tabbit / Chromium 扩展：在浏览器里启动、停止、重启本机 DeepSeek Harness。
- [KhalilYamber/dsh-ux-simple](https://github.com/KhalilYamber/dsh-ux-simple) —— DSH 界面两档模式插件：简化/原生一键切换，工具卡片白话化，降低上手门槛。
- [leeclouddragon/dsh-all-in](https://github.com/leeclouddragon/dsh-all-in) —— 面向 DeepSeek Harness 的本地六人德州扑克插件——一边用 Token 玩牌，一边看 agent 思考。
- [omdsh-dev/deepseek-harness-desktop](https://github.com/omdsh-dev/deepseek-harness-desktop) —— DSH 桌面应用打包器。
- [wanghaonan3333-web/dsh-idea-jar](https://github.com/wanghaonan3333-web/dsh-idea-jar) —— 面向 DeepSeek Harness Web 的悬浮式常驻创意点子罐。
- [webkubor/dsh-bloom-theme](https://github.com/webkubor/dsh-bloom-theme) —— DeepSeek Harness (DSH) 主题插件：Bloom 莫兰迪配色 4 变体，OKLCH 调色，明暗双主题，顶栏一键切换，全部达 WCAG AA。
- [willwang0098/dsh-side-chat](https://github.com/willwang0098/dsh-side-chat) —— Codex 风格的 DeepSeek Harness Better Sidebar 独立侧边对话。
- [Yuuhann1999/dsh-bloub-mood](https://github.com/Yuuhann1999/dsh-bloub-mood) —— 动态心情图标 · DeepSeek Harness 插件 —— bloub 表情随会话状态切换 favicon 与 logo，形状/颜色/文字可配置（8 shapes × 12 colors, animated SVG, MIT）。
- [yuzhounh/dsh-windows-tray-launcher](https://github.com/yuzhounh/dsh-windows-tray-launcher) —— 面向 DeepSeek Harness (dsh) 的非官方 Windows 系统托盘启动器。
- [deepseek-harness-portable](https://github.com/kali-suroot/deepseek-harness-portable) —— 一键安装的 Windows 便携版 DSH，自带 Node.js 运行时，支持自定义安装路径，零 C 盘写入。
## Skill

_打包好的任务能力（基于 markdown 的 skill、工具包）。_
- [sfeng49/ashare-agent](https://github.com/sfeng49/ashare-agent) —— A 股研究与复盘工作台：基于 AKShare 的数据获取、每日晨报、交易复盘三大技能，另附回测与选股脚本骨架，只做分析，不做交易。
- [chenyinrusi/dsh-engineering-skills](https://github.com/chenyinrusi/dsh-engineering-skills) —— 面向 AI 编程 agent（DeepSeek Harness / Claude Code / Codex）的五个工程纪律技能：18 维度代码审查、CI 故障分流修复、shell 安全、冗余/边界审计与跨仓库模式吸收——纯 markdown，零安装。
- [write-chinese-long-screenplay](https://github.com/mudden2380078550-creator/write-chinese-long-screenplay) —— 中文长剧本写作 skill（SKILL.md）：双输入板块 + 因果—价值内核，内置去 AI 味审查与连续性台账，支撑 100 场以上长篇幅项目。

- [MartinDelophy/dsh-timeline-studio-plugin](https://github.com/MartinDelophy/dsh-timeline-studio-plugin) —— Timeline Studio Bundle：让 DSH 检查、预演、事务式编辑并渲染可移植的 `.timeline` 视频工程。
- [Anionex/dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) —— 让纯文本模型更好地做视觉任务：带意图的图片问答、长截图 OCR、UI 还原、grounding、像素 diff、Artifacts 与 Web UI。  `⭐150`
- [omdsh-dev/dsh-toolkit](https://github.com/omdsh-dev/dsh-toolkit) —— 零依赖确定性工具包：time / encoding / json / calculator / csv / regex / markdown / diff / stat / schema 十个工具，统一入口一键安装。  `⭐10`
- [Anionex/dsh-computer-use](https://github.com/Anionex/dsh-computer-use) —— 电脑控制插件（目前支持 macOS）：新鲜 Accessibility 观测、过期状态拒绝、作用域权限与安全输入。  `⭐12`
- [omdsh-dev/dsh-plugin-dev](https://github.com/omdsh-dev/dsh-plugin-dev) —— DSH 插件开发踩坑与做法档案（skill + 文档）：cordis 双副本、tsconfig 三件套、Windows junction、多帧 zstd 等实测记录。
- [omdsh-dev/dsh-tool-csv](https://github.com/omdsh-dev/dsh-tool-csv) —— CSV 数据工具（RFC 4180）：解析 / 查询 / 统计 / 转换 CSV 文本，零依赖状态机解析器。
- [emredeveloper/deepseek-harness-huggingface](https://github.com/emredeveloper/deepseek-harness-huggingface) —— 只读的 Hugging Face Hub 模型检索插件：注册无需 API key 的 `hf_search_models` 工具。
- [omdsh-dev/dsh-plugin-skills](https://github.com/omdsh-dev/dsh-plugin-skills) —— 构建和测试 DSH 插件的 agent skill：从脚手架新插件包到选择测试层级，全程在 agent 会话内完成。
- [omdsh-dev/dsh-book2skill](https://github.com/omdsh-dev/dsh-book2skill) —— 书籍转技能流水线：抓取、解析、理解、生成、安装五阶段长任务，含 3 个人工闸口与浏览器时间线面板。
- [omdsh-dev/dsh-github-integration](https://github.com/omdsh-dev/dsh-github-integration) —— 结构化 GitHub issue / PR 战役的静态技能源：批量调研、分诊、隔离修复与追踪表更新。
- [omdsh-dev/dsh-tool-calculator](https://github.com/omdsh-dev/dsh-tool-calculator) —— 计算器工具：安全数学表达式求值，零依赖递归下降解析器。
- [omdsh-dev/dsh-tool-diff](https://github.com/omdsh-dev/dsh-tool-diff) —— Diff 工具：文本/JSON/CSV/Markdown 结构化比较与 unified diff，零依赖只读。
- [omdsh-dev/dsh-tool-encoding](https://github.com/omdsh-dev/dsh-tool-encoding) —— 编码/哈希工具：base64/base64url/url/hex 编解码、md5/sha1/sha256/sha512 哈希与 UUID 生成，零依赖。
- [omdsh-dev/dsh-tool-json](https://github.com/omdsh-dev/dsh-tool-json) —— JSON 查询工具：JMESPath 子集查询，零依赖递归下降解析器。
- [omdsh-dev/dsh-tool-markdown](https://github.com/omdsh-dev/dsh-tool-markdown) —— Markdown 工具：HTML 与 Markdown 互转、GFM 表格规范化与目录生成，轻量解析器。
- [omdsh-dev/dsh-tool-regex](https://github.com/omdsh-dev/dsh-tool-regex) —— 正则工具：测试匹配、提取捕获组、安全替换与静态解释（不执行代码），零依赖。
- [omdsh-dev/dsh-tool-schema](https://github.com/omdsh-dev/dsh-tool-schema) —— JSON Schema 验证工具：validate/paths/explain/normalize，零网络零动态执行。
- [omdsh-dev/dsh-tool-stat](https://github.com/omdsh-dev/dsh-tool-stat) —— 统计工具：描述统计、百分位数、频数分布与相关性，零依赖纯函数。
- [omdsh-dev/dsh-tool-time](https://github.com/omdsh-dev/dsh-tool-time) —— 时间工具：严格 ISO 8601 解析、IANA 时区转换、UTC 日历运算与固定时长差，零依赖。
- [cyanseek/dsh-native-playbook](https://github.com/cyanseek/dsh-native-playbook) —— native 能力使用指南 skill。
- [cui-stack/dsh-workspace-digest](https://github.com/cui-stack/dsh-workspace-digest) —— DeepSeek Harness bundle，提供 workspace_digest 工具。
- [LayneChai/superpowers-dsh](https://github.com/LayneChai/superpowers-dsh) —— 面向 DeepSeek Harness 的 Superpowers skill：从 obra/superpowers 改编的 TDD、调试、规划与协作技能。
- [xiaoxiaosrm/dsh-mattpocock-skills](https://github.com/xiaoxiaosrm/dsh-mattpocock-skills) —— mattpocock/skills 的非官方 DSH 移植版 —— 工程类（18 个）+ 生产力类（7 个）技能打包为 DeepSeek Harness bundle 插件。
- [addxing/conservative-code-edits](https://github.com/addxing/conservative-code-edits) —— 面向各类 AI 编程代理的保守代码修改守则 Skill，用于约束代理在已有项目中进行最小必要改动，避免无关重构，保护公共基础代码，并在支持深色模式的项目中优先使用动态颜色资源。
- [addxing/function-extraction](https://github.com/addxing/function-extraction) —— 面向 AI 编程代理的功能链路提取 Skill：从项目代码中提取某个具体功能的完整实现链路，生成包含业务逻辑、数据流、异常处理、模块依赖和 Mermaid 图表的技术开发文档。
- [addxing/function-testing](https://github.com/addxing/function-testing) —— 面向各类 AI 编程代理的功能测试用例生成 Skill：根据 PRD、Git 提交记录或用户故事生成功能测试用例，并输出 Excel 风格测试报告。
- [addxing/replicate-android-feature](https://github.com/addxing/replicate-android-feature) —— 面向 AI 编程代理的 Android 功能复刻 Skill：以 Android 源项目的实际实现为依据，将指定功能完整迁移到其他项目或平台，并保持功能链路、业务行为、UI 和可复用资源一致。
- [Equinox7379/dsh-skill-search](https://github.com/Equinox7379/dsh-skill-search) —— DSH 按需技能检索：零预加载，关键词检索共享技能库。
- [liuqh16/dsh-processes](https://github.com/liuqh16/dsh-processes) — 从 DeepSeek Harness 管理后台进程：process 工具、/ps 命令、输出查看、退出/日志匹配通知，pi-processes 的 DSH 移植版。
- [dhicoc/dsh-wuyun-liuqi](https://github.com/dhicoc/dsh-wuyun-liuqi) —— 五运六气（运气学）AI Agent 技能包的 DeepSeek Harness（dsh）Cordis 插件：31 个 SKILL.md 技能原样封装，一行 dsh plugin add 安装。
- [riffkit/skill](https://github.com/riffkit/skill) —— 短视频生成技能：把一条已验证爆款的公式复刻成你自己的产品视频，可选数字人、产品植入与 9 种输出语言。任何能读 SKILL.md 的 agent 都可用。

- [pakco77/dsh-daqi.skill](https://github.com/pakco77/dsh-daqi.skill) —— dsh-daqi.skill 是一个点子孵化器：你随口说的每个痛点、每个想法，达奇都在营地帮你记下。牛仔，开始你的荒野之旅吧！
- [xmutfyh/dsh-plugin-writing-guard](https://github.com/xmutfyh/dsh-plugin-writing-guard) —— AI 写作纪律守卫：扫描文稿中的修改残留、防御性写作与 AI 痕迹（滥用破折号、not-X-but-Y、LLM 高频词、三段式）；提供 writing_audit + writing_rules 工具，论文文件写入时自动审计。

- [ch1bug/dsh-skill-fuzzy](https://github.com/ch1bug/dsh-skill-fuzzy) —— Codex 式模糊技能搜索：内置 '/' 技能菜单只匹配名称前缀，本插件让搜索像 Codex 一样支持模糊匹配。
- [MichengAI/dsh-skills-manager](https://github.com/MichengAI/dsh-skills-manager) —— 基于 DeepSeek Harness 的 Skills 管理插件。
- [sandbaseai/sandbase-skills](https://github.com/sandbaseai/sandbase-skills) —— 88 个可安装的开源 Agent Skills：研究、社交智能、营销与商务工作流，兼容 Codex / Claude Code / Cursor / Gemini CLI / DeepSeek Harness。
- [xu-jin-cs/dsh-skills](https://github.com/xu-jin-cs/dsh-skills) —— DeepSeek Harness 生态技能包：parallel-dispatch 并行调度规则 + archmap 架构测绘 Agent（零 LLM 确定性 diff 影响面，节约 tokens）。
- [xulelenlp/dsh-web-artifact-designer](https://github.com/xulelenlp/dsh-web-artifact-designer) —— 面向 DSH 的设计稿生成 skill（改编自 Anthropic canvas-design / web-artifacts-builder）：把设计需求做成可直接打开的自包含 HTML/SVG 设计稿（海报、信息图、落地页、图表、组件稿），内置交付前硬性质量清单与「去 AI 味」反模式清单。


- [Solismuchengxue/dsh_plugin_swift_cycle](https://github.com/Solismuchengxue/dsh_plugin_swift_cycle) —— DeepSeek Harness 的 Swift Cycle 治理技能适配器；用户按需调用、版本固定、可离线校验。
- [Ikalus1988/MisakaNet](https://github.com/Ikalus1988/MisakaNet) — 零依赖、git 支撑的微型课程库：让 AI Agent 异步分享与检索经过验证的调试经验（仅 Python 标准库）。
- [TYEclipse/dsh-webfetch](https://github.com/TYEclipse/dsh-webfetch) —— DeepSeek Harness (dsh) 的网页阅读器：抓取任意 URL 并提取干净的 Markdown / 纯文本及链接清单——零运行时依赖，只读。
- [Wangxian111/convertible-bond-intel](https://github.com/Wangxian111/convertible-bond-intel) —— 可转债知识科普与信息整理技能（支持 DeepSeek Harness / Codex / Claude Code / Coze 多平台）：每日市场信息梳理、转债条款解读、配债概念讲解。仅做科普，不构成投资建议。
- [chenyinrusi/dsh-engineering-skills](https://github.com/chenyinrusi/dsh-engineering-skills) —— 面向 AI 编程 agent（DeepSeek Harness、Claude Code、Codex）的五个工程规范技能：18 维代码评审、CI 失败分类、Shell 安全、冗余/边界审计、跨仓库模式吸收——纯 markdown，免安装。
- [gongyijie85/dsh-ecc](https://github.com/gongyijie85/dsh-ecc) —— 面向 DeepSeek Harness 的 ECC（227k star 运营系统）技能移植版，v0.1.0 收录 20 个精选技能；改编自 affaan-m/ECC（MIT）。
- [LIU20030725/dsh-skill-manager](https://github.com/LIU20030725/dsh-skill-manager) —— DSH（DeepSeek Harness）技能分类管理器：对 agent 技能进行分类/打标/整理到集合，带设置面板。
- [JarryK/dsh-ai-notes](https://github.com/JarryK/dsh-ai-notes) —— DeepSeek Harness AI 笔记插件（上游无描述）。
- [DeLightor/dsh-depguard](https://github.com/DeLightor/dsh-depguard) —— DeepSeek Harness 依赖守卫插件（上游无描述）。
- [Dis2017/dsh-run-guard](https://github.com/Dis2017/dsh-run-guard) —— DeepSeek Harness 运行守卫插件（上游无描述）。
- [Mr-remon219/dsh-search-boost](https://github.com/Mr-remon219/dsh-search-boost) —— 为 dsh 提升模型搜索能力的入口插件。
- [WJNCT55555/dsh-achievements](https://github.com/WJNCT55555/dsh-achievements) —— DeepSeek Harness 成就/游戏化插件（上游无描述）。
- [MeganeOnly/meganeonly-dsh-plugins](https://github.com/MeganeOnly/meganeonly-dsh-plugins) —— MeganeOnly 的持久化 DSH 插件合集。
- [JohnXu22786/model-catalog](https://github.com/JohnXu22786/model-catalog) — dsh 插件：模型目录自动发现——从 OpenAI 兼容 API host 拉取模型列表、定价与能力，归一化为可直接使用的配置。
- [JohnXu22786/skill-manager](https://github.com/JohnXu22786/skill-manager) — dsh 插件：面向 DeepSeek Harness 的多区域技能发现、渐进式展开、创建向导、审计与统计。
- [JohnXu22786/statusline](https://github.com/JohnXu22786/statusline) — 面向 agent harness 的实时终端状态行：模型、上下文用量、子代理、速率限制与会话时长汇于一行（零依赖）。
- [Jupiter1949/dsh-plugins](https://github.com/Jupiter1949/dsh-plugins) — DSH 插件 monorepo：cot-smart 以及未来的 DeepSeek Harness 插件。
- [winterhuan/dsh-skills-viewer](https://github.com/winterhuan/dsh-skills-viewer) — DeepSeek Harness Web 只读 Skills 设置页插件。
- [xsoc1/math-research-dsh](https://github.com/xsoc1/math-research-dsh) —— math-research Codex 插件集市在 DSH 上的适配：rigorous-open-math-research、manage-math-research-program、math-research-workflow、lean-verify 均作为 DeepSeek Harness skills。
- [AmethystLuna/embedded-workbench](https://github.com/AmethystLuna/embedded-workbench) —— 嵌入式 C/C++ 工程 AI 插件：固件技能（FreeRTOS、Keil、HardFault、状态机）+ 1% Rule / Plan Verification Gate 纪律，适用于 Claude Code、Codex、Cursor、Kimi、OpenCode、ZCode 和 DeepSeek Harness。
- [AmethystLuna/logicprobe](https://github.com/AmethystLuna/logicprobe) —— AI 编程助手声明核查插件：对设计文档与重构计划做逻辑原语验证（7 结构 + 7 对抗探针），适用于 Claude Code、Codex、Cursor、Kimi、OpenCode、ZCode 和 DeepSeek Harness。
- [uckkk/dsh-jwt-uckkk](https://github.com/uckkk/dsh-jwt-uckkk) —— JWT 解码：解析 header/payload，判断过期（不验签）。
- [uckkk/dsh-motion-design](https://github.com/uckkk/dsh-motion-design) —— 动效设计原则参考。
- [uckkk/dsh-number-words](https://github.com/uckkk/dsh-number-words) —— 数字转大写：阿拉伯数字转中文大写（金额/票据场景），支持小数与负数。
- [uckkk/dsh-paper-sizes](https://github.com/uckkk/dsh-paper-sizes) —— 纸张尺寸标准参考。
- [uckkk/dsh-photography](https://github.com/uckkk/dsh-photography) —— 摄影基础参考。
- [uckkk/dsh-roman](https://github.com/uckkk/dsh-roman) —— 罗马数字转换：阿拉伯数字与罗马数字互转。
- [uckkk/dsh-storyboard](https://github.com/uckkk/dsh-storyboard) —— 分镜脚本：分镜术语、镜头类型与分镜模板知识库，辅助视频与短片创作。
- [uckkk/dsh-string-similarity](https://github.com/uckkk/dsh-string-similarity) —— 字符串相似度：Levenshtein/Jaccard 等算法计算文本相似度。
- [uckkk/dsh-text-diff](https://github.com/uckkk/dsh-text-diff) —— 行级文本 diff。
- [uckkk/dsh-text-wrap](https://github.com/uckkk/dsh-text-wrap) —— 文本换行工具。
- [uckkk/dsh-ux-writing](https://github.com/uckkk/dsh-ux-writing) —— UX 文案写作：微文案规范与按钮、错误提示文案指南，辅助界面文案撰写。
- [minivv/dsh-agent-skills](https://github.com/minivv/dsh-agent-skills) —— Discover and manage Agent Skills inside DeepSeek Harness
- [mrk-king/dsh-paper-reading](https://github.com/mrk-king/dsh-paper-reading) —— DeepSeek Harness 论文阅读伴侣插件——论文窗口(pdf.js 阅读器)/文件夹管理/按论文记忆的笔记问答/预设门控
- [mrk-king/dsh-preset-literature](https://github.com/mrk-king/dsh-preset-literature) —— 文献精读 · Router Paper — DeepSeek Harness 文献阅读预设(渠道自适应路由 + 论文工具门控)
- [Thhoho/reSanity](https://github.com/Thhoho/reSanity) —— reSanity 散修 — 散户的认知组合管理：查证、避坑、记忆、复盘。一份 SKILL.md，零依赖。
- [WonderfulEdge/dsh-publish-skill](https://github.com/WonderfulEdge/dsh-publish-skill) —— dsh h0 发版技能。
- [linhut/gongwen-skill](https://github.com/linhut/gongwen-skill) — 中文公文全流程处理工具——基于 GB/T 9704《党政机关公文格式》国家标准，支持格式检查与修复、内容优化（Word 原生修订+批注/差异对比版）、模板生成、Markdown 转公文、版头版记页码注入、事实核验、风格增强等完整能力。原生支持 DeepSeek Harness (DSH) 技能系统，打包为可被 AI Agent 直接调用的 Skill，完全自包含，克隆即用。
- [nanjingya/agent-diagram](https://github.com/nanjingya/agent-diagram) — 别再交付 Mermaid 方块图了。面向编辑级 HTML/SVG 技术图表的 Agent Skill —— 适用于 DeepSeek Harness、Claude Code、Cursor。
- [PHoenixs57/deepseek-aix](https://github.com/PHoenixs57/deepseek-aix) — Q-Q: 面向学术文献的对话式 AI 研究助手。支持多源搜索（PubMed、arXiv、Semantic Scholar、Crossref）、论文卡片去重及带文件夹功能的收藏夹——基于 DeepSeek Harness 构建。
- [satan9394/dsh-contract-review](https://github.com/satan9394/dsh-contract-review) —— DSH skill：合同风险识别器，中文合同风险条款扫描与分级审查报告。
- [satan9394/dsh-frontend-design](https://github.com/satan9394/dsh-frontend-design) —— DSH skill：前端设计技能，改编自 Anthropic frontend-design (Apache-2.0)。
- [satan9394/dsh-grill-me](https://github.com/satan9394/dsh-grill-me) —— DSH skill：苏格拉底式追问 grill-me，用结构化提问打磨方案直至共识。
- [satan9394/dsh-hot-trends](https://github.com/satan9394/dsh-hot-trends) —— DSH tool+skill：中国实时热点采集器，微博/百度/B站/知乎热搜、App Store、QQ音乐榜，免 API Key。
- [satan9394/dsh-meeting-minutes](https://github.com/satan9394/dsh-meeting-minutes) —— DSH skill：会议纪要自动生成，转写稿→结构化纪要（决策/行动项/负责人/截止时间）。
- [satan9394/dsh-skill-creator](https://github.com/satan9394/dsh-skill-creator) —— DSH skill：技能创作器，按 agentskills.io 规范编写 SKILL.md，改编自 Anthropic skill-creator (Apache-2.0)。
- [SIMON-WORLD/dsh-journal-monitor](https://github.com/SIMON-WORLD/dsh-journal-monitor) —— 基于 RSS 的经济学期刊监控技能，适配 DeepSeek Harness。
- [Wang-Lin-Chang/dsh-story](https://github.com/Wang-Lin-Chang/dsh-story) —— 面向 DeepSeek Harness 的长篇小说创作助手：故事账本 + 章节锚点 + 伏笔债审计 + 14 条叙事不变式硬规则（零误杀）。AI 审阅可能漏诺，账本不会。
- [allentnetus/dsh-job-hunting](https://github.com/allentnetus/dsh-job-hunting) —— 面向本地求职情报工作流的 DeepSeek Harness 求职插件与运行时技能。
- [lusblead/dsh-Kingdom](https://github.com/lusblead/dsh-Kingdom) —— 独立 dsh 插件：安装后在 DSH 会话中初始化/接入本地王国（Phase 1+2 FROZEN，Claim != Fact 治理闭环）。
- [amphilagus/dsh-literature](https://github.com/amphilagus/dsh-literature) —— 面向科学文献检索与跟踪的 out-of-tree DSH 插件包，附带一个文献跟踪助理 agent 预设。
- [cocofhu/skillhub](https://github.com/cocofhu/skillhub) —— deepseek-harness 的技能中心（skillhub）。
- [pqkisvery666/dsh-basic-office](https://github.com/pqkisvery666/dsh-basic-office) —— DSH 办公文件插件：阅读 PDF/DOCX/XLSX/PPTX，生成 DOCX/XLSX/PPTX/PDF/CSV。
- [Ral6224/dsh-aseprite-skill](https://github.com/Ral6224/dsh-aseprite-skill) —— 让 dsh 的 agent 能够使用 Aseprite 的技能。

- [JohnXu22786/skill-framework](https://github.com/JohnXu22786/skill-framework) — Praxis 工程方法论技能库：把资深工程师工作流（设计对话、写计划、执行计划、测试先行、代码评审等）固化成符合 Agent Skills 标准的 SKILL.md 技能
- [cheshireez/dsh-skill-hub](https://github.com/cheshireez/dsh-skill-hub) —— DeepSeek Harness（dsh）Web GUI 技能中枢：浏览/搜索完整本地技能目录、启用/禁用、查看正文、排查诊断、新建技能，基于官方 ctx.skills 注册表。
- [HB123X/dsh-ponytail](https://github.com/HB123X/dsh-ponytail) —— Ponytail for DSH —— 懒散资深程序员规则集，支持实时强度切换。
- [poplarity/dsh-science-workbench](https://github.com/poplarity/dsh-science-workbench) —— 面向 DeepSeek Harness 的可复现科学工作台插件：agent 驱动的单元格、带反馈/重跑的内嵌图表、清单溯源与环境快照；含 9 个 bio_* 工具、工作台 UI 与发表级图表技能。

## 资源

- [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) —— 官方源码仓库。  `⭐38238`
- [DeepSeek Harness 概览（ai-bot.cn）](https://ai-bot.cn/deepseek-harness) —— 第三方解读。
- [flaqai/deepeseek-harness-guide](https://github.com/flaqai/deepeseek-harness-guide) —— DeepSeek Harness 开发指南；为 DeepSeek Harness 项目构建插件。
- [sandbaseai/deepseek-harness-handbook](https://github.com/sandbaseai/deepseek-harness-handbook) —— Agent-first 多语言手册，覆盖架构、快速入门、MCP、Skills、Subagents、沙箱和基于源码的故障排查。
- [zoahdev/dsh-tutorials](https://github.com/zoahdev/dsh-tutorials) —— DeepSeek Harness 双语教程：快速上手、架构、插件开发与贡献者路线图。

- [ljsysfurryACE/dsh-plugin-story](https://github.com/ljsysfurryACE/dsh-plugin-story) —— 入选 DeepSeek Harness 官方精选列表的三个插件（记忆/压缩/主动调度）完整技术文章。
- [wold9168/dotdsh](https://github.com/wold9168/dotdsh) —— 个人 DeepSeek Harness dotfiles（配置参考）。
- [yangl326-Dylan/learning-dsh](https://github.com/yangl326-Dylan/learning-dsh) —— 带版本的双语（中/英）DeepSeek Harness 源码学习页，以 dsh 插件形式在 /learning 提供。


- [hlxstc-create/challenge-project-methodology](https://github.com/hlxstc-create/challenge-project-methodology) —— 高难度 AI agent 项目的实战方法论：分级关卡、证据驱动验证与自我进化。提供 OpenClaw 与 DSH 版本。
- [zoahdev/dsh-docs](https://github.com/zoahdev/dsh-docs) —— DeepSeek Harness 的 PR-ready 文档提案：插件发布指南、包教程、故障排查——每条命令均经实测验证。

- [OwenZhao9/inside-deepseek-harness](https://github.com/OwenZhao9/inside-deepseek-harness) —— 《深入浅出 DeepSeek Harness》／Inside DeepSeek Harness——21 篇，7.7 万字，截图与数字均来自真实运行。
- [Mochasu123/deepseek-harness-config](https://github.com/Mochasu123/deepseek-harness-config) —— 如何配置 DeepSeek Harness：安装 Anchored Standard 预设，让 DeepSeek-V4-Pro-0813 发挥接近社区顶尖水平（背景、做法、安装细节与来源信源）。
- [diguike/book-deepseek-harness](https://github.com/diguike/book-deepseek-harness) —— 《一切皆插件》— DeepSeek Harness 源码精读、Mini 实现与插件开发实战。21 章 + 可运行的 mini-dsh + 真实插件案例，全部数据实测。
- [godcreator02/dsh-mechanics-lab](https://github.com/godcreator02/dsh-mechanics-lab) —— DeepSeek Harness 插件系统原理的独立研究项目：一套可复跑的实验，判定写在用例 docstring 里。

## 贡献指南

欢迎 PR！添加插件的步骤：

1. 确保你的仓库带有 **`#dsh`** GitHub topic。
2. 在最合适的分类下添加一条，格式：
   `- [名称](https://链接) —— 简洁的一句话描述。`
3. 每个分区内尽量按字母 / 拼音顺序排列。
4. 一次 PR 只做一件事；描述客观、不吹水。

详见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## Star 趋势

<a href="https://star-history.com/#Dominic789654/awesome-deepseek-harness&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Dominic789654/awesome-deepseek-harness&type=Date&theme=dark">
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Dominic789654/awesome-deepseek-harness&type=Date">
    <img alt="Star 趋势图" src="https://api.star-history.com/svg?repos=Dominic789654/awesome-deepseek-harness&type=Date" width="600">
  </picture>
</a>

## 许可

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

在法律允许的范围内，贡献者已放弃本作品的所有版权及相关权利。
