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
- [Jungod1121/dsh-anchored-standard](https://github.com/Jungod1121/dsh-anchored-standard) —— 两阶段 DeepSeek Harness 预设：先以最小对齐引导（bash + read），首次工具调用或回复后自动切换到完整 Standard 工具集。
- [songoao25/virtual-product-team](https://github.com/songoao25/virtual-product-team) —— 产品团队模式 Agent 预设：以老板视角与虚拟产品团队（PM → 工程师 → QA → 发布）对话，从点子走到成品。


- [AythyaCrispus/dsh-minimal-msys2](https://github.com/AythyaCrispus/dsh-minimal-msys2) —— Windows Minimal 模式：持久 bash + str_replace_editor 插件——注册 agent 预设，在 Windows 上提供可用的持久 bash 后端，并在插件设置区暴露 GUI 可编辑的 bash 路径（通过 credentials 域持久化）。
- [CeilCelia/dsh-eli-mode](https://github.com/CeilCelia/dsh-eli-mode) —— Eli Mode：围绕 wiki 驱动长期记忆与技能构建的 DeepSeek Harness agent 预设，基于极简 Harness 环境。
- [LiFenrir/dsh-scenario](https://github.com/LiFenrir/dsh-scenario) —— 场景管理插件：把「人设 + 模型 + 权限」打包成命名场景（dev / wiki / personal），设置页一键热切换。
- [Saikel-Orado-Liu/dsh-coding-agent-preset](https://github.com/Saikel-Orado-Liu/dsh-coding-agent-preset) —— 适配 Windows 的 DSH 编码 agent 预设：持久 PowerShell 7 (pwsh) + str_replace_editor，镜像官方 minimal 预设。
## Harness 与运行时

_DeepSeek 原生 / DeepSeek 优先的 agent harness、coding agent，以及运行时级基建（诊断、运维、会话管理、审批策略）。_

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
- [wss534857356/dsh-plugin-codex](https://github.com/wss534857356/dsh-plugin-codex) —— 使用本地 Codex 登录态接入 Codex App Server 的模型供应商插件。


- [beijingwahw/dsh-companion-dev](https://github.com/beijingwahw/dsh-companion-dev) —— DeepSeek Companion 开发者版 —— 官方伴侣插件完整功能集：A–J 九大模块（对话导出/交接摘要/成本优化/全局检索 + 执行轨迹分析、Prompt 工程工作台、多模型竞技场、任务编排、安全审计），Cordis 插件化架构。
- [beijingwahw/dsh-companion-enterprise](https://github.com/beijingwahw/dsh-companion-enterprise) —— DeepSeek Companion Enterprise —— 企业级伴侣插件：安全审计与 DLP、团队协作与知识管理、任务编排与断点续跑、多模型竞技场、执行轨迹分析、Prompt 工程工作台。
- [muvuula/DeepSeek-Harness-Core](https://github.com/muvuula/DeepSeek-Harness-Core) —— DeepSeek Harness Core（DHC）· AI 人格核心进化插件。
- [peiyuwang54/deepseek-harness-cli](https://github.com/peiyuwang54/deepseek-harness-cli) —— DeepSeek Harness CLI（非官方）：由 DeepSeek 驱动的开源编码 agent，在本地终端运行。
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
- [Ox0400/dsh-vault](https://github.com/Ox0400/dsh-vault) —— DeepSeek Harness 的加密凭据金庫 —— AES-256-GCM + TOTP，附模型工具与设置 UI。
- [dingge001/dsh-redact](https://github.com/dingge001/dsh-redact) —— DSH 运行时密钥与 PII 脱敏插件：掩码处理、可逆保险库、执行期替换。
- [lukethecat/dsh-plugin-warroom-garak](https://github.com/lukethecat/dsh-plugin-warroom-garak) —— 面向 Garak 风格安全红队测试流程的 DeepSeek Harness 插件包（上游未提供描述）。
- [slywalker2006/dsh-passwords](https://github.com/slywalker2006/dsh-passwords) —— DSH 登录门户：首次运行配置、静态加密、防暴力破解锁定、审计日志、HTTPS。

- [my-dsh-plugin/readonly-security-audit](https://github.com/my-dsh-plugin/readonly-security-audit) —— DeepSeek Harness 只读安全审计模式。


- [GuoMonth/dsh-multi-tenant](https://github.com/GuoMonth/dsh-multi-tenant) —— DeepSeek Harness 多租户 SaaS 扩展：租户身份、会话隔离、授权、租户感知 MCP 与审计。
- [TecFancy/dsh-auth-gate](https://github.com/TecFancy/dsh-auth-gate) —— DeepSeek Harness 网页版登录门插件：账号口令或共享令牌认证、会话 cookie、登录限速，附用户管理 CLI。
## 会话与记忆管理

_跨会话记忆、checkpoint、会话置顶与导航插件。_

- [PerryLink/dsh-memento](https://github.com/PerryLink/dsh-memento) —— 基于 SQLite 的有界跨会话记忆。
- [Spirtxiaoqi7/mindspace-dsh-session-memory](https://github.com/Spirtxiaoqi7/mindspace-dsh-session-memory) —— 会话隔离的个性化记忆。
- [PerryLink/dsh-checkpoint-rewind](https://github.com/PerryLink/dsh-checkpoint-rewind) —— git 快照 checkpoint + `/rewind` 命令回滚。
- [alooshxl/dsh-session-pins](https://github.com/alooshxl/dsh-session-pins) —— 会话置顶菜单。
- [PerryLink/dsh-session-pin](https://github.com/PerryLink/dsh-session-pin) —— 会话置顶。
- [malevrigns/dsh-session-stars](https://github.com/malevrigns/dsh-session-stars) —— 收藏会话。
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
## 插件市场与生态

_插件市场、安装管理器、索引与生态工具。_

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

## 可视化

_把数据 / 结果变成图表、图形、看板的插件。_

- [ZSeven-W/dsh-openpencil](https://github.com/ZSeven-W/dsh-openpencil) —— OpenPencil 设计稿预览与编辑插件。  `⭐33`
- [omdsh-dev/dsh-genui](https://github.com/omdsh-dev/dsh-genui) —— 通过 `dsh-ui` 代码栅栏在回复中内联渲染可交互 UI 组件：布局、图表、绘图、表单、测验、mermaid、3D 场景，并把交互事件回传给模型。  `⭐14`
- [william-jin-cmu/dsh-vision](https://github.com/william-jin-cmu/dsh-vision) —— `view_image` 工具：把任意 OpenAI 兼容 VLM 桥接给纯文本模型。  `⭐10`
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
## 循环（自动研究 / 自我改进等）

_长时运行的循环工作流：自动研究、深度调研、自我精炼、迭代构建。_

- [btspoony/mstar-harness](https://github.com/btspoony/mstar-harness) —— Skill 驱动的 Harness / Loop 工程化工作流 agent 插件。  `⭐39`
- [csyangwen/dsh-memory-evolve](https://github.com/csyangwen/dsh-memory-evolve) —— 纯插件实现的跨会话长期记忆 + 后台自我进化：五轨记忆、回合内自我审查、技能自我进化与技能管理器、四轨待办、会话搜索 —— 零核心修改、零运行时依赖。  `⭐14`
- [vlln/dsh-loop](https://github.com/vlln/dsh-loop) —— 定时循环插件（`/loop` 命令 + loop 工具 + 活动状态条）。
- [william-jin-cmu/dsh-evolve](https://github.com/william-jin-cmu/dsh-evolve) —— 自进化插件：在会话内热挂载/卸载 Cordis 插件。
- [fuhefei/dsh-sentinel](https://github.com/fuhefei/dsh-sentinel) —— 条件驱动唤醒：持久化的文件/命令/HTTP/进程/webhook 监视，触发即唤醒 agent，含 dock 与全局仪表盘。
- [lzszq/dsh-scholar](https://github.com/lzszq/dsh-scholar) —— 面向纯计算研究的 AI 科研工作台：研究资料、项目对话、代码数据、实验运行、证据账本与 TeX 手稿放在同一个可恢复项目中。
- [omdsh-dev/dsh-revive](https://github.com/omdsh-dev/dsh-revive) —— 一键复活：重启后自动给所有被打断的会话发送「继续」（`/revive` 命令 + 工具 + 浏览器按钮）。

## MCP Server

_向 DSH 贡献工具 / prompt / 资源的 Model Context Protocol server。_

<!-- 在此添加条目。 -->
- [taxueseek/argo](https://github.com/taxueseek/argo) —— 为 agent 打造的多语言搜索工具（网页/学术/代码/金融/新闻），附带 DSH 插件包，提供 10 个 `mcp__argo__*` 工具。  `⭐56`
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

## UI / 客户端

_DSH 的桌面、网页、终端或编辑器前端。_

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
## Skill

_打包好的任务能力（基于 markdown 的 skill、工具包）。_

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


- [Solismuchengxue/dsh_plugin_swift_cycle](https://github.com/Solismuchengxue/dsh_plugin_swift_cycle) —— DeepSeek Harness 的 Swift Cycle 治理技能适配器；用户按需调用、版本固定、可离线校验。
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
## 贡献指南

欢迎 PR！添加插件的步骤：

1. 确保你的仓库带有 **`#dsh`** GitHub topic。
2. 在最合适的分类下添加一条，格式：
   `- [名称](https://链接) —— 简洁的一句话描述。`
3. 每个分区内尽量按字母 / 拼音顺序排列。
4. 一次 PR 只做一件事；描述客观、不吹水。

详见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 许可

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

在法律允许的范围内，贡献者已放弃本作品的所有版权及相关权利。
