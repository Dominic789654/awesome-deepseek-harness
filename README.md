<p align="center">
  <img src="./assets/deepseek-logo.svg" alt="DeepSeek" height="48">
</p>

# Awesome DeepSeek Harness [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of **plugins, skills, MCP servers, patch/profile layers, orchestrators, aggregators & UIs** for **DeepSeek Harness (DSH)** — DeepSeek's official agent runtime built around the idea **`Model + Harness = Agent`**.

**English** | [简体中文](./README.zh-CN.md)

DeepSeek Harness ("DSH") is DeepSeek's agent runtime / harness layer — the "hands" that turn the model's reasoning into real actions (context management, tool-call orchestration, execution sandbox, feedback loop, session persistence). Its defining feature is an **open plugin ecosystem**: the community contributes plugins, skills, MCP servers, orchestrators, aggregators, and UIs.

This list collects the best of that ecosystem. Contributions welcome — see [Contributing](#contributing).

> **Tip for authors:** DeepSeek asks plugin repositories to carry the **`#dsh`** GitHub topic so they can be discovered. Add it to your repo, then open a PR here.

![DeepSeek Harness ecosystem map](./assets/dsh-ecosystem.svg)

## Quick Start

```bash
# Launch the DSH Web UI
npx @deepseek-ai/dsh web

# Install a community plugin (from this list) into your profile
dsh plugin --profile web add "github:owner/repo#main"
```

Before installing, confirm the target repo carries the **`#dsh`** GitHub topic so the community hub can index it.

## Contents

- [Official](#official)
- [Profiles & Patch Layers](#profiles--patch-layers)
- [Harnesses & Runtimes](#harnesses--runtimes)
- [Security & Permissions](#security--permissions)
- [Session & Memory Management](#session--memory-management)
- [Cost & Usage Tracking](#cost--usage-tracking)
- [Channel / IM Bridges](#channel--im-bridges)
- [Plugin Marketplaces & Ecosystem](#plugin-marketplaces--ecosystem)
- [Visualization](#visualization)
- [Slides / PPT](#slides--ppt)
- [Coding](#coding)
- [Agents](#agents)
- [Loops (Auto-Research, Self-Improve, etc.)](#loops-auto-research-self-improve-etc)
- [MCP Servers](#mcp-servers)
- [Orchestrators & Aggregators](#orchestrators--aggregators)
- [UI / Clients](#ui--clients)
- [Skills](#skills)
- [Resources](#resources)
- [Contributing](#contributing)

---

## Official

- [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) — DeepSeek's official agent runtime framework (`Model + Harness = Agent`); an "everything is a plugin" architecture built on Cordis (TypeScript, MIT).  `⭐38238`
- [deepseek-ai/awesome-deepseek-integration](https://github.com/deepseek-ai/awesome-deepseek-integration) — Official curated list of DeepSeek API integrations.  `⭐38654`
- [deepseek-ai/awesome-deepseek-agent](https://github.com/deepseek-ai/awesome-deepseek-agent) — Official list of agents/harnesses with DeepSeek support.  `⭐5426`

## Profiles & Patch Layers

_DSH's core composition mechanism: a **profile** stacks bundle patch layers, then your own `cordis.patch.yml` (profile-level, then `$DSH_HOME`-level, then `--patch` overlays) — letting you reshape the whole plugin tree without forking. This is the layer where **task-specialized runtime configurations** live: a long-horizon profile, a math-reasoning profile, a slides-editing profile are all just a different bundle stack + patch, not a different codebase. Tools and harnesses that operate at this layer (share/export a profile, or run DSH as a specialized backend under a task-specific patch) belong here rather than under generic plugins._

- [asdf17128/dshp](https://github.com/asdf17128/dshp) — Manage DeepSeek Harness profiles: list, create, clone, diff, and share a whole `dsh` setup (plugin versions + bundle order + patch) as one portable file.
- [AMAP-ML/LongHorizon-Harness](https://github.com/AMAP-ML/LongHorizon-Harness) — Long-horizon computer-use harness with a DSH adapter: runs `dsh --profile headless` under an isolated `DSH_HOME` with role-scoped patches (`workspace-write` for executors, `read-only` for Manager/auditors) — a concrete example of a task-specialized DSH profile.

- [duyanta123/dsh-preset-scaffold](https://github.com/duyanta123/dsh-preset-scaffold) — DSH agent preset: scaffold a standardized, runnable, verifiable project skeleton from scratch (architect persona + six template assets + a strict bootstrap flow).
- [Jungod1121/dsh-anchored-standard](https://github.com/Jungod1121/dsh-anchored-standard) — Two-phase DSH preset: a minimal-aligned bootstrap (bash + read), then full Standard tools after the first tool call or reply.
- [songoao25/virtual-product-team](https://github.com/songoao25/virtual-product-team) — Product Team Mode — a DSH agent preset: boss-style conversation with a virtual product team (PM → Engineer → QA → Release) from idea to shipped product.

## Harnesses & Runtimes

_DeepSeek-native or DeepSeek-first agent harnesses / coding agents, plus runtime-level infrastructure (diagnostics, ops, session management, approval policies)._

- [hxs996-beep/deepAct](https://github.com/hxs996-beep/deepAct) — Terminal AI coding agent built for DeepSeek that guards every action: ambiguity check, design review, scope control, team mode, parallel sub-agents, and MCP support.
- [LaplaceYoung/oh-my-dsh](https://github.com/LaplaceYoung/oh-my-dsh) — Large plugin collection (700+) for DSH that registers only through extension seams, without modifying the agent-loop core.  `⭐24`
- [omdsh-dev/fabric](https://github.com/omdsh-dev/fabric) — Minecraft-Fabric-style hook processor for DSH.
- [omdsh-dev/dsh-session-health](https://github.com/omdsh-dev/dsh-session-health) — Read-only, zero-dependency session health check: frame-level scanning of multi-frame zstd session files to detect torn/corrupted/empty sessions; registers a `session_health` tool.
- [omdsh-dev/dsh-security-audit](https://github.com/omdsh-dev/dsh-security-audit) — Local security audit plugin: read-only, redacted risk report covering config, plugin sources, sessions, and network exposure.
- [Zhenyu98/dsh-context-doctor](https://github.com/Zhenyu98/dsh-context-doctor) — Context-injection audit: measures the token cost of the AGENTS.md instruction chain, skill catalog, and tool schemas, and detects duplication and conflicts; Web UI ring panel plus a `context_audit` tool.
- [coppynight/dsh-doctor](https://github.com/coppynight/dsh-doctor) — flutter-doctor-style diagnostics and repair covering install-level and in-harness checks, with safe auto-fixes; repository-plugin format.
- [lhh010/dsh-bash-encoding](https://github.com/lhh010/dsh-bash-encoding) — Auto-detects bash output encoding (UTF-16LE/UTF-8/GBK, etc.) and decodes it correctly, fixing garbled non-ASCII output on WSL/Windows.
- [vlln/plugin-registry](https://github.com/vlln/plugin-registry) — Ecosystem infrastructure: a thin browser console for managing repository plugins (zero patches) plus a `make-dsh-plugin` skill guiding plugin development.  `⭐13`
- [Andy8647/dsh-auto-approval](https://github.com/Andy8647/dsh-auto-approval) — Automated tool-call approval: an `auto` tier that classifies every tool call as allow/deny via rules plus an LLM classifier, with a status chip beside the composer.
- [zzh-newlearner/dsh-postmortem](https://github.com/zzh-newlearner/dsh-postmortem) — Local-first failure postmortems for DeepSeek Harness sessions.
- [vibeinging/dsh-trace](https://github.com/vibeinging/dsh-trace) — Telemetry backend that exports turns, model steps, and tool calls to yiTrace over HTTP.
- [omdsh-dev/dsh-hub](https://github.com/omdsh-dev/dsh-hub) — Community extension catalog and profile-generation manager, adding transactional installation, recovery, catalog browsing, and a settings UI on top of official contracts.
- [fakechris/dsh-harness-ops](https://github.com/fakechris/dsh-harness-ops) — Ops toolbox: A/B dual-slot snapshot upgrades with atomic switch and one-click rollback, a watchdog that auto-restarts web/agent, and a self-rescue doctor command.
- [omdsh-dev/session-teleport](https://github.com/omdsh-dev/session-teleport) — Multi-device session handoff with PostgreSQL as the single online authority; only one device holds write credentials at a time.
- [Tieboyh/dsh-session-search](https://github.com/Tieboyh/dsh-session-search) — Index-free cross-agent session search for DeepSeek Harness.
- [ilharp/dsh-tool-approval](https://github.com/ilharp/dsh-tool-approval) — Manual approval for tool calls (a "manual mode" / "ask mode" for DSH).
- [blissito/ghostycode](https://github.com/blissito/ghostycode) — DeepSeek V4 terminal coding agent and constitutional harness (Rust TUI with MCP and sub-agents).
- [bobleer/deepseek-harness-rust](https://github.com/bobleer/deepseek-harness-rust) — Rust implementation of DeepSeek Harness: layered crates for session log, turn/step loop, and DeepSeek SSE adapter.
- [didclawapp-ai/zagens](https://github.com/didclawapp-ai/zagens) — Open-source agent harness for DeepSeek V4.  `⭐13`
- [liubf21/ds-forge](https://github.com/liubf21/ds-forge) — Lightweight agent harness for DeepSeek V4.
- [Owen718/FlashCoder](https://github.com/Owen718/FlashCoder) — Simple harness for DeepSeek models.
- [ArtificialNotImbecile/dsh-context-taxonomy](https://github.com/ArtificialNotImbecile/dsh-context-taxonomy) — Logical-call context taxonomy plugin for DeepSeek Harness.
- [btspoony/dsh-llm-fallbacks](https://github.com/btspoony/dsh-llm-fallbacks) — Role-based LLM retry and fallback strategy plugin.
- [Drifter-yh/dsh-tool-policy](https://github.com/Drifter-yh/dsh-tool-policy) — Declarative deny-by-default tool policy plugin.
- [LingLambda/dsh-undo](https://github.com/LingLambda/dsh-undo) — Context undo/redo: roll the model context back to the last completed step and restore it again.
- [omdsh-dev/omdsh](https://github.com/omdsh-dev/omdsh) — Community experiment for organizing versioned DSH component sets and defaults in a reviewable, reproducible form.
- [omdsh-dev/omdsh-runtime](https://github.com/omdsh-dev/omdsh-runtime) — Headless execution layer reusing official Profile/Bundle/Cordis operations, adding deterministic plan/apply, candidate generations, and previous-generation recovery.
- [wangshunnn/oh-my-dsh](https://github.com/wangshunnn/oh-my-dsh) — A collection of DeepSeek Harness plugins.
- [yjh051108/dsh-super-injector](https://github.com/yjh051108/dsh-super-injector) — BepInEx-style mod injector: hot-injects local plugin packages into a running DSH web instance without patches or restarts.
- [yoke233/dsh-openai-codex-auth](https://github.com/yoke233/dsh-openai-codex-auth) — OpenAI Codex OAuth login and usage card plugin.
- [YYTbit/dsh-plugin-claude-bridge](https://github.com/YYTbit/dsh-plugin-claude-bridge) — Bridges Claude Code memory, skills, and config into DeepSeek Harness.
- [Gordonynh/dsh-plugin-codex-import](https://github.com/Gordonynh/dsh-plugin-codex-import) — Imports Codex conversation history into DSH.
- [Hu9956/dsh-codex-provider](https://github.com/Hu9956/dsh-codex-provider) — Codex provider plugin with OAuth login support.
- [WSL043/dsh-codex-subscription](https://github.com/WSL043/dsh-codex-subscription) — Caches Codex subscription/usage state for DSH.
- [PerryLink/dsh-output-styles](https://github.com/PerryLink/dsh-output-styles) — Switch between different assistant output styles.
- [Toukaiteio/dsh-effort-tweak](https://github.com/Toukaiteio/dsh-effort-tweak) — Adjusts model reasoning effort on the fly.
- [csiroqa/dsh-backup-sync](https://github.com/csiroqa/dsh-backup-sync) — Snapshot backup and WebDAV sync for DSH workspaces.
- [csiroqa/dsh-schedule](https://github.com/csiroqa/dsh-schedule) — Cron-style scheduled tasks with status monitoring.
- [Karuisawa-Mrs/dsh-plugins](https://github.com/Karuisawa-Mrs/dsh-plugins) — Community plugin collection for DSH.
- [BlockRunAI/dsh-clawrouter](https://github.com/BlockRunAI/dsh-clawrouter) — A second brain for your DeepSeek Harness agent — strong-model review before risky tool calls, plus 70 models from one wallet.
- [gordonlu/dsh-context-lens](https://github.com/gordonlu/dsh-context-lens) — Request Context Profiler for DeepSeek Harness — see what changed between model requests, and how cache reuse changed with it.
- [green-dalii/dsh-shift-router](https://github.com/green-dalii/dsh-shift-router) — Two-tier model router for DeepSeek Harness — LLM-Judge routing, multi-model fallback chains, exponential-backoff failover, and task-level orchestration.
- [KitDoesIt/dsh-compaction-instant](https://github.com/KitDoesIt/dsh-compaction-instant) — LLM-free lossless compaction engine for DeepSeek Harness.
- [morlay/session-persistence-rdb](https://github.com/morlay/session-persistence-rdb) — Relational-database persistence layer for DSH sessions.
- [rainforest888/dsh-plugins-raincode](https://github.com/rainforest888/dsh-plugins-raincode) — Model layer for DeepSeek Harness: model pool/cache/retry plus a `/skills` browser.
- [weijiafu14/dsh-remote-sandbox](https://github.com/weijiafu14/dsh-remote-sandbox) — Crash-resilient remote execution world for DeepSeek Harness: `ctx.fs`/`ctx.subprocess` over an E2B sandbox with heartbeat keep-alive, transparent recovery, and workspace sync.
- [030611/dsh-telemetry-redactor](https://github.com/030611/dsh-telemetry-redactor) — Fail-closed export-copy redaction for DeepSeek Harness session telemetry.
- [cnyac/dsh-polling](https://github.com/cnyac/dsh-polling) — Polling/scheduled-task plugin: cron scheduled tasks as real sessions, natural-language creation, model tools (`polling_*`), and a Web UI.
- [cpj-dev/dsh-plugin-cc](https://github.com/cpj-dev/dsh-plugin-cc) — Bridges DeepSeek Harness into Claude Code for review, critique, delegation, and session import.
- [khiqwq/dsh-system-proxy](https://github.com/khiqwq/dsh-system-proxy) — Host plugin for smart outbound HTTP(S) routing: named proxies (http/https/socks4/4a/5/5h), per-host/provider/plugin rules, direct-first fallback with health memory.
- [lire1131/dsh-undo](https://github.com/lire1131/dsh-undo) — Snapshot & rollback for plugin/skin/settings configs: auto-save on change, undo/redo stack, snapshot manager panel, keyboard shortcuts, plus an offline PowerShell CLI & GUI that work even when DSH won't boot.
- [omdsh-dev/dsh-scout](https://github.com/omdsh-dev/dsh-scout) — Read-only environment-probe plugin for DeepSeek Harness: reports runtime environment, software versions, system resources, ports, services, hardware, and workspace info.
- [sleepinginsummer/dsh-rtk-optimizer](https://github.com/sleepinginsummer/dsh-rtk-optimizer) — RTK optimizer plugin for DeepSeek Harness.
- [weijiafu14/pi2dsh](https://github.com/weijiafu14/pi2dsh) — Bridges the Pi and DeepSeek Harness ecosystems: one Pi Host ABI runs unmodified Pi extensions as native DSH plugins.
- [wenliang9527/dsh-workspace](https://github.com/wenliang9527/dsh-workspace) — Workspace plugin for DeepSeek Harness.
- [biedongbin/dsh-claude-compat](https://github.com/biedongbin/dsh-claude-compat) — DSH plugin that bridges Claude Code's `.claude/` directory (skills, commands, rules) into DeepSeek Harness natively.
- [revive/dsh-git-credentials](https://github.com/revive/dsh-git-credentials) — Keeps GitLab and GitHub API tokens out of the model context — encrypted at rest (AES-256-GCM), tools on demand, web settings panel.
- [SnowAmberX/dsh-role-router](https://github.com/SnowAmberX/dsh-role-router) — Role-based model routing plugin for DeepSeek Harness: planner/subagent roles plus a settings card and composer summary.
- [omdsh-dev/dsh-coding](https://github.com/omdsh-dev/dsh-coding) — DeepSeek Harness coding plugin (no description provided upstream).
- [byhongyu/oh-my-dsh](https://github.com/byhongyu/oh-my-dsh) — Curated Coding, Research, and Investing agent setups for DeepSeek Harness.
- [Bernardxu123/dsh-plugins](https://github.com/Bernardxu123/dsh-plugins) — DeepSeek Harness (dsh) plugin bundle: dsh-sensenova-image for image generation plus dsh-vision for image understanding, install by cloning.
- [boxiaolanya2008/dsh-plugin](https://github.com/boxiaolanya2008/dsh-plugin) — A DeepSeek Harness plugin tool.
- [cnzgray/dsh-plugins](https://github.com/cnzgray/dsh-plugins) — A DeepSeek Harness plugin collection.
- [linqunxun/dsh-plugins](https://github.com/linqunxun/dsh-plugins) — DeepSeek Harness (DSH) client UI plugins collection.
- [MaimoryLab/dib](https://github.com/MaimoryLab/dib) — DSH-in-Box: a DSH runtime and plugin packager.
- [NIyueeE/dsh-container](https://github.com/NIyueeE/dsh-container) — DeepSeek Harness (dsh) container image: universal dev-container base, dsh auto-update on boot, compose + Quadlet examples.
- [Saktawdi/ha-orchestrator](https://github.com/Saktawdi/ha-orchestrator) — DSH dynamic Cordis plugin: model high-availability failover plus subagent orchestration for DeepSeek Harness.
- [wefio/dsh-plugin-audit](https://github.com/wefio/dsh-plugin-audit) — A DSH plugin audit tool.
- [Whning0513/deepseek-protocol-doctor](https://github.com/Whning0513/deepseek-protocol-doctor) — Offline DeepSeek protocol diagnostics and an installable DSH plugin for tool loops, reasoning_content, strict schemas, and SSE.
- [woshi-Tom/dsh-status-plugin](https://github.com/woshi-Tom/dsh-status-plugin) — DSH status plugin for conveniently checking host machine runtime status, easing troubleshooting during failures.
- [wxxb789/dsh-legion](https://github.com/wxxb789/dsh-legion) — Configurable multi-model subagent profiles for DeepSeek Harness.
- [ZhengQingJing/dsh-session-tree](https://github.com/ZhengQingJing/dsh-session-tree) — Git-like immutable session branching for DeepSeek Harness.
- [devmom/dsh-trajectory-debug](https://github.com/devmom/dsh-trajectory-debug) — A DeepSeek Harness trajectory-debugging plugin.
- [mafeis/dsh-net-proxy](https://github.com/mafeis/dsh-net-proxy) — A network proxy plugin for DeepSeek Harness.
- [PandaColour/dsh-cmd-starter](https://github.com/PandaColour/dsh-cmd-starter) — Provides a command-line launcher for deepseek-harness, adding Claude-style flags like `--append-prompt` and `--resume`.
- [jiangrz77/DSHLauncher](https://github.com/jiangrz77/DSHLauncher) — A launcher for DeepSeek Harness.
- [AndPuQing/dsh-pi](https://github.com/AndPuQing/dsh-pi) — A DeepSeek Harness plugin (dsh-pi).
- [gyyxs88/dsh-subagent-codex](https://github.com/gyyxs88/dsh-subagent-codex) — A DeepSeek Harness plugin bridging Codex as a subagent.
- [bujue600-arch/dsh-testgen](https://github.com/bujue600-arch/dsh-testgen) — Automated unit-test generation for DeepSeek Harness: a `/testgen` command plus a `generate_tools` tool that scaffold, run, and fix unit tests until they pass.
- [yoke233/dsh-prime-agent](https://github.com/yoke233/dsh-prime-agent) — Prime Agent-inspired persistent RLM control plane for DeepSeek Harness Code Mode.
- [4060415/Deepseek-harness-routing-layer-](https://github.com/4060415/Deepseek-harness-routing-layer-) — Smart model auto-routing plugin for DeepSeek Harness: automatically selects the best-fit model for each task.
- [1na-ko/dsh-hdc-bridge](https://github.com/1na-ko/dsh-hdc-bridge) — DSH-native HarmonyOS dev assistant: hdc device debug loop, bundled offline official knowledge (Tier-1), and a DevEco CLI build channel.
- [StyxNether/dsh-auto-approval](https://github.com/StyxNether/dsh-auto-approval) — Trusted Auto: a middle permission tier between workspace-write and danger-full-access, auto-approving harmless commands and trusted-area targets.
- [phelpsyacht/dshmath-manim](https://github.com/phelpsyacht/dshmath-manim) — Manim math-animation plugin for DeepSeek Harness.
- [saurtone/dsh-tool-somark](https://github.com/saurtone/dsh-tool-somark) — SoMark document parser tool (`somark_parse`) plugin for DeepSeek Harness.
- [niuniu-869/dsh-plugin-cas-kb](https://github.com/niuniu-869/dsh-plugin-cas-kb) — DeepSeek Harness bundle: article-level Chinese accounting standards (CAS/ASSE) and tax-law lookup, plus a skill that keeps citations anchored to source articles.
- [LeslieWylie/dsh-ops-kit](https://github.com/LeslieWylie/dsh-ops-kit) — A reusable DeepSeek Harness bundle for evidence-driven memory, orchestration, benchmark operations, and plugin release workflows.
- [Mars-Sea/dsh-commandcode-provider](https://github.com/Mars-Sea/dsh-commandcode-provider) — Unofficial DeepSeek Harness LLM provider plugin for Command Code: live model catalog, reasoning-effort support, Models-page card. Ported from pi-commandcode-provider (MIT).
- [040822/dsh-gzip](https://github.com/040822/dsh-gzip) — Enables gzip for `/api` responses, fixing history-loading timeouts (30s) on slow links.
- [LyleMi/dsh-codex-app-server](https://github.com/LyleMi/dsh-codex-app-server) — OpenAI Codex App Server agent provider for DeepSeek Harness.
- [SeverusZh/dsh-plugin-subagent-director](https://github.com/SeverusZh/dsh-plugin-subagent-director) — Subagent Director: per-subagent LLM provider/model selection with role templates for DeepSeek Harness.
- [TGYD-helige/dsh-pi](https://github.com/TGYD-helige/dsh-pi) — Runs trusted Pi extensions inside DeepSeek Harness through a compatibility host.
- [FengHuoLinShan/dsh-plugin-llm-balance](https://github.com/FengHuoLinShan/dsh-plugin-llm-balance) — Floating API balance ball plugin for DeepSeek Harness.
- [Niuniu-Sir/dsh-data-ledger](https://github.com/Niuniu-Sir/dsh-data-ledger) — Unified local data ledger for DeepSeek Harness: source/location/content summary for conversations, billing, skills, memory, and logs, with trash cleanup and browser-storage cleanup.
- [omdsh-dev/dsh-llm-fallbacks](https://github.com/omdsh-dev/dsh-llm-fallbacks) — Role-based LLM retry and fallback strategy plugin.
- [Bryan-cmf/dsh-infra-observability](https://github.com/Bryan-cmf/dsh-infra-observability) — Structural observability layer: real tool/skill usage recording (tools/result), skill-catalog audit, and a watchdog — no model self-reporting.
- [Gu-ZT/dsh-auxiliary](https://github.com/Gu-ZT/dsh-auxiliary) — Auxiliary models for DeepSeek Harness: vision understanding and context compression through dedicated model routes.
- [xiaohj233/dsh-keepalive](https://github.com/xiaohj233/dsh-keepalive) — Opt-in detached watchdog for the DSH Web process with snapshot-checked repair and explicit patch restoration.
- [Zhuchen00123/dsh-wsl-modes](https://github.com/Zhuchen00123/dsh-wsl-modes) — WSL modes for DSH on Windows: WSL Linux bash + bubblewrap sandbox with two ready-to-use agent presets.
- [sjh9714/dsh-win32](https://github.com/sjh9714/dsh-win32) — Real Minimal mode on Windows: the missing win32 process inspector (persistent Git Bash shell), Ctrl-C interrupt injection, and an install-trap doctor.
- [strukto-ai/mirage#dsh](https://github.com/strukto-ai/mirage/tree/main/typescript/packages/dsh) — Swaps the filesystem and bash providers for a mirage virtual workspace: file tools and shell commands run over mounted resources (RAM, S3, Redis, Slack, Gmail, Notion, Postgres) instead of the host disk, with per-mount read/write/exec modes, per-command sandbox routing (monty, pyodide, quickjs in process; docker, e2b, daytona remote), and installed CLIs (git, gh, slack, linear, ntn, gws, or one you register) as head words in the virtual terminal.

- [cinob/dsh-plugin-custom-provider-enhancer](https://github.com/cinob/dsh-plugin-custom-provider-enhancer) — Custom-provider enhancer: when configuring third-party providers, auto-fills context size, token limits, vision/multimodal input and thinking-strength tiers from an authoritative model library.
- [dsh-plugins/dsh-auxiliary](https://github.com/dsh-plugins/dsh-auxiliary) — Auxiliary models for DeepSeek Harness: vision understanding and context compression through dedicated model routes.
- [edynasty/dsh-opencode-go-provider](https://github.com/edynasty/dsh-opencode-go-provider) — OpenCode Go provider plugin for DSH.
- [RoyougiShiki/dsh-restart-systemd](https://github.com/RoyougiShiki/dsh-restart-systemd) — One-click dsh-web restart button (systemd) in the sidebar: WSL/Linux systemd channel + Windows branch, `/restart` command, sessions auto-resume.
- [Sureo0/deepseek-harness-launcher](https://github.com/Sureo0/deepseek-harness-launcher) — Zero-dependency Windows launcher for DeepSeek Harness — no Node.js / Git / pnpm needed; virtual-environment isolation, uninstall by deletion.
- [zeronesun/dsh-web-manager](https://github.com/zeronesun/dsh-web-manager) — Lightweight shell script managing the full DSH Web service lifecycle (start, stop, restart, status check).
- [ZhenHuangLab/dsh-sync](https://github.com/ZhenHuangLab/dsh-sync) — Policy-driven DeepSeek Harness config sync: sidecar Git under `$DSH_HOME`, namespace-projected settings, secret scan, journaled apply, `/sync` command, plus a Web settings panel.

- [alex04130/dsh-forge](https://github.com/alex04130/dsh-forge) — Runtime extension suite for DeepSeek Harness: forge, install, route and orchestrate plugins the Forge way (Minecraft-style), no monkey-patching.
- [daifuyang/dsh-plugin](https://github.com/daifuyang/dsh-plugin) — Community plugin bundles for dsh (DeepSeek Harness) — login, metrics, and other Cordis bundles.
- [loongsuite/pilot-dsh](https://github.com/loongsuite/pilot-dsh) — DeepSeek Harness (dsh) plugin for LoongSuite Pilot: records session, LLM, and tool events to local JSONL for OpenTelemetry GenAI traces.
- [QvShui/dsh-llm-qwen](https://github.com/QvShui/dsh-llm-qwen) — Qwen (DashScope) LLM provider adapter plugin for DeepSeek Harness.
- [wss534857356/dsh-plugin-codex](https://github.com/wss534857356/dsh-plugin-codex) — Codex App Server model provider for DeepSeek Harness, using your local Codex login.

## Security & Permissions

_Permission rules, approval review, security audits, and policy-check plugins._

- [PerryLink/dsh-permission-rules](https://github.com/PerryLink/dsh-permission-rules) — Claude Code-style declarative permission rules (allow/deny/ask).
- [PerryLink/dsh-auto-review](https://github.com/PerryLink/dsh-auto-review) — Secondary-model automatic review of approval requests.
- [PerryLink/dsh-skill-pack-security](https://github.com/PerryLink/dsh-skill-pack-security) — Security-audit skill pack (secret scanning, dependency audit).
- [agentic-control-plane/dsh-acp-plugin](https://github.com/agentic-control-plane/dsh-acp-plugin) — Policy checks before tool calls execute.
- [securstack/securstack-dsh-plugin](https://github.com/securstack/securstack-dsh-plugin) — Repository security-scanning adapter.
- [Areium/dsh-fail-logger](https://github.com/Areium/dsh-fail-logger) — Automatically logs tool-call failures and distills follow-up improvements.
- [lonelymoon87/dsh-guardian](https://github.com/lonelymoon87/dsh-guardian) — Runtime tool policy, dangerous-command guard, and output redaction for DeepSeek Harness.
- [cyzlmh/dsh-cyber-sec](https://github.com/cyzlmh/dsh-cyber-sec) — Authorized security-assessment profile for DeepSeek Harness: scoped network tools, container-backed shell, authorization guard, durable evidence, 21 security skills, and 7 specialist subagents.
- [Elaina-real/dsh-tiered-approval](https://github.com/Elaina-real/dsh-tiered-approval) — Tiered auto-review for DeepSeek Harness: static-rule safety net + LLM reviewer + human fallback — auto-allow safe actions, deny irreversible ones, ask a human for the rest.
- [Ox0400/dsh-vault](https://github.com/Ox0400/dsh-vault) — Encrypted credential vault for DeepSeek Harness — AES-256-GCM + TOTP, model tools, and a Settings UI.
- [dingge001/dsh-redact](https://github.com/dingge001/dsh-redact) — DSH / DeepSeek Harness plugin for runtime secret & PII redaction with masking, a reversible vault, and execution-time substitution.
- [lukethecat/dsh-plugin-warroom-garak](https://github.com/lukethecat/dsh-plugin-warroom-garak) — DeepSeek Harness plugin bundle for Garak-style security red-teaming workflows (no description provided upstream).
- [sjh9714/dsh-movein-permissions](https://github.com/sjh9714/dsh-movein/tree/main/plugin) — Fine-grained per-tool deny/ask rules for DSH at the tools/pre-execute gate, Claude Code rule syntax, zero dependencies, works standalone or auto-generated from an existing Claude Code settings.json by dsh-movein.
- [slywalker2006/dsh-passwords](https://github.com/slywalker2006/dsh-passwords) — DSH login gateway: first-run setup, at-rest encryption, brute-force lockout, audit log, HTTPS.

- [my-dsh-plugin/readonly-security-audit](https://github.com/my-dsh-plugin/readonly-security-audit) — Read-only security audit mode for DeepSeek Harness.

## Session & Memory Management

_Cross-session memory, checkpoints, pinning, and session navigation plugins._

- [PerryLink/dsh-memento](https://github.com/PerryLink/dsh-memento) — Bounded cross-session memory backed by SQLite.
- [Spirtxiaoqi7/mindspace-dsh-session-memory](https://github.com/Spirtxiaoqi7/mindspace-dsh-session-memory) — Session-isolated personalized memory.
- [PerryLink/dsh-checkpoint-rewind](https://github.com/PerryLink/dsh-checkpoint-rewind) — Git-snapshot checkpoints with a `/rewind` command.
- [alooshxl/dsh-session-pins](https://github.com/alooshxl/dsh-session-pins) — Pin sessions to a quick-access menu.
- [PerryLink/dsh-session-pin](https://github.com/PerryLink/dsh-session-pin) — Pin sessions for quick access.
- [malevrigns/dsh-session-stars](https://github.com/malevrigns/dsh-session-stars) — Star/favorite sessions.
- [XiLuovo/dsh-session-timeline](https://github.com/XiLuovo/dsh-session-timeline) — Visual timeline UI for session history.
- [unnnnoooo/dsh-cue-plugin](https://github.com/unnnnoooo/dsh-cue-plugin) — Cross-session references/cues.
- [Amengclass/dsh-memory](https://github.com/Amengclass/dsh-memory) — Persistent, model-editable memory/notes store for DeepSeek Harness; adds `memory_set`/`get`/`delete`/`search` tools backed by `ctx.storageDomain` so facts survive across sessions.
- [Bleed00/dsh-claude-mem](https://github.com/Bleed00/dsh-claude-mem) — DeepSeek Harness plugin integrating claude-mem (memory for dsh).
- [PerryLink/dsh-claude-move](https://github.com/PerryLink/dsh-claude-move) — Migrate Claude Code sessions, memory, skills, and CLAUDE.md into DSH with seamless resume.
- [elementor-i/dsh-agentmemory](https://github.com/elementor-i/dsh-agentmemory) — agentmemory for DeepSeek Harness: full `memory_*` tools, capture hooks, and context injection over the local REST server.
- [IAMLieutenant/dsh-tool-user-memory](https://github.com/IAMLieutenant/dsh-tool-user-memory) — User-memory plugin for DeepSeek Harness.
- [Aloneswork/deepseek-harness-evolving-memory](https://github.com/Aloneswork/deepseek-harness-evolving-memory) — Local semantic evolving long-term memory plugin for DeepSeek Harness.
- [fengshenx/dsh-recall](https://github.com/fengshenx/dsh-recall) — DSH plugin: a `recall` tool letting the model search and read the full event log of its own session, including content hidden by compaction; install with one `dsh plugin add` command.
- [GIT121995/dsh-memory-cbdc-plugin](https://github.com/GIT121995/dsh-memory-cbdc-plugin) — Lightweight local long-term memory plugin for DeepSeek Harness — SQLite, bounded recall, no extra model call.
- [cwbcheng/dsh-knowledge-graph](https://github.com/cwbcheng/dsh-knowledge-graph) — DSH Cordis plugin: turn any source text into an AI knowledge graph (facts/inferences/concepts/definitions/examples/counter-examples/rules) with two-way linking between the graph and the original text.
- [LeslieWylie/dsh-session-search-pro](https://github.com/LeslieWylie/dsh-session-search-pro) — Advanced cross-session full-text search for DeepSeek Harness, using the built-in sessionQuery service.
- [tsonglew/dsh-workspace-search](https://github.com/tsonglew/dsh-workspace-search) — VS Code-style workspace keyword search for DeepSeek Harness: a Search tab in dsh-better-sidebar.
- [030611/dsh-verification-receipt](https://github.com/030611/dsh-verification-receipt) — Privacy-minimal, heuristic per-turn verification summaries ("receipts") for DeepSeek Harness sessions.
- [GIT121995/dsh-memory-gate](https://github.com/GIT121995/dsh-memory-gate) — CBDC-gated memory for DeepSeek Harness: decides how retrieved memory is used (use/verify/ignore, feedback learning, audit) rather than just storing it.
- [EveGoodEvening/dsh-llmwiki](https://github.com/EveGoodEvening/dsh-llmwiki) — Local-first, evidence-backed Markdown wiki plugin (Karpathy llm-wiki concept): immutable source records by content hash, synthesized pages citing source IDs, and a deterministic section index for lexical search.
- [jiayuxuan123/dsh-session-history-fix](https://github.com/jiayuxuan123/dsh-session-history-fix) — Session history fix plugin for DeepSeek Harness.

- [huahai0202/dsh-better-archive](https://github.com/huahai0202/dsh-better-archive) — DSH web-GUI plugin: archived-session panel with unarchive and delete.
- [lmst2/dsh-asc](https://github.com/lmst2/dsh-asc) — Agentic Surface Compaction (ASC) — context-management / compaction plugin for DeepSeek Harness.
- [reinocheong/dsh-session-move](https://github.com/reinocheong/dsh-session-move) — Manage DSH sessions from the Web UI: drag & drop / menu move to another folder, permanent delete, and AI-rename by summarizing the conversation; includes agent tools.
- [xzyonline/dsh-file-attachments](https://github.com/xzyonline/dsh-file-attachments) — Session-bound file attachments with safe detection and bounded readers for office/text/archive formats.

- [crwsr124/dsh-memflow](https://github.com/crwsr124/dsh-memflow) — Memory-flow framework plugin for DeepSeek Harness: perception-first, record-as-you-go memory that survives sessions; distributed per-project memory for Hermes-like continuity.
- [haoyuan-sjtu/Deepseek-Harness-Lifelong-Agent](https://github.com/haoyuan-sjtu/Deepseek-Harness-Lifelong-Agent) — A governed long-term memory core for AI agents, with technical-preview adapter contracts for DeepSeek Harness integration.
- [seekerwxy/dsh-session-tabs](https://github.com/seekerwxy/dsh-session-tabs) — Browser-style session tab bar for DeepSeek Harness (DSH): one tab per opened session at the very top of the web app — click to switch, close, or start new sessions.

## Cost & Usage Tracking

_Token usage, cost dashboards, and budget-alert plugins._

- [boNeXY226/dsh-cost-chip](https://github.com/boNeXY226/dsh-cost-chip) — `/cost` command plus a floating cost chip showing session spend.
- [misakimiku2/dsh-cost-display](https://github.com/misakimiku2/dsh-cost-display) — Displays session cost.
- [suimi8/dsh-cost-ledger](https://github.com/suimi8/dsh-cost-ledger) — Cost ledger tracking spend over time.
- [csiroqa/dsh-plugin-usage-report](https://github.com/csiroqa/dsh-plugin-usage-report) — Daily/monthly usage reports: tokens, cost, budget alerts, and a contribution-graph view.
- [H1a3x/dsh-token-stats](https://github.com/H1a3x/dsh-token-stats) — Floating token-usage stats panel.
- [xinmo114514/dsh-usage-widget](https://github.com/xinmo114514/dsh-usage-widget) — Floating usage widget.
- [Han-1413141/dsh-cost-meter](https://github.com/Han-1413141/dsh-cost-meter) — Session cost meter: current-session spend, daily spend, history, synced with official pricing.
- [jelly-000/dsh-balance-monitor](https://github.com/jelly-000/dsh-balance-monitor) — DeepSeek account balance, remaining-ratio bar, and today's spend shown in the sidebar footer.
- [hccccc01333/dsh-analytics](https://github.com/hccccc01333/dsh-analytics) — Usage analytics plugin for DeepSeek Harness.
- [kissthisrain/token-usage-widget](https://github.com/kissthisrain/token-usage-widget) — Glassmorphism dark-style floating desktop widget showing local AI-tool token consumption, remaining quota, usage trends, and active days.
- [yingjunnan/dsh-deepseek-quota](https://github.com/yingjunnan/dsh-deepseek-quota) — DeepSeek API quota (balance) widget for the DSH web GUI: a floating bottom-right card showing remaining DeepSeek API balance.
- [940842546/dsh-usage-billing](https://github.com/940842546/dsh-usage-billing) — Usage billing plugin for DeepSeek Harness (no description provided upstream).
- [bobcat848/dsh-calculator](https://github.com/bobcat848/dsh-calculator) — Calculates the real-time cost of DeepSeek API calls made by DeepSeek Harness.
- [dclichang2022/dsh-green-meter](https://github.com/dclichang2022/dsh-green-meter) — Energy & carbon metering for DeepSeek Harness: per-turn/per-request energy, cache carbon savings, electricity cost.
- [juhe291/dsh-token-panel](https://github.com/juhe291/dsh-token-panel) — Real-time token consumption HUD: live usage monitor, context pressure, cost estimation, history curves, per-day/per-month stats.
- [1HelloMan1/dsh-usage-dashboard-plus](https://github.com/1HelloMan1/dsh-usage-dashboard-plus) — A usage dashboard plugin for DeepSeek Harness.
- [Ayaka157/dsh-conversation-cost](https://github.com/Ayaka157/dsh-conversation-cost) — Shows real-time DeepSeek usage cost in the DSH conversation footer stats bar (RMB/USD dual currency, including cache-hit and peak/off-peak pricing).
- [FantasyStarry/dsh-token-stats](https://github.com/FantasyStarry/dsh-token-stats) — A token-usage stats plugin for DeepSeek Harness.
- [GooodWei/context-vista](https://github.com/GooodWei/context-vista) — Adds a right-side floating panel and a `/context` command to DeepSeek Harness, showing current context token usage and allocation with a ring chart, compact-command effects, and estimated cost — modeled on Claude Code's `/context`.
- [ZeroingIn/dsh-provider-billing](https://github.com/ZeroingIn/dsh-provider-billing) — DeepSeek Harness plugin: shows provider account balance inside each Models settings row, queried through a loopback-pinned RPC channel with the stored API key kept on the host.
- [LeemanCheung/dsh-token-usage](https://github.com/LeemanCheung/dsh-token-usage) — Persistent token-usage records and dashboard for DeepSeek Harness.
- [zerro-223/dsh-token-usage](https://github.com/zerro-223/dsh-token-usage) — Token-usage tracking plugin for DeepSeek Harness (no description provided upstream).
- [Cassius0924/dsh-usage-dashboard](https://github.com/Cassius0924/dsh-usage-dashboard) — DeepSeek quota/usage dashboard, a dynamic Cordis plugin for DeepSeek Harness.
- [Make0209/dsh-usage-stats](https://github.com/Make0209/dsh-usage-stats) — GitHub-style usage heatmap plus token/cache-hit/account-balance dashboard and workspace-alias management.
- [dfkai/dsh-board](https://github.com/dfkai/dsh-board) — DeepSeek Harness usage panel: token billing, 1M context, rank badges, and daily heatmap.
- [YZz-S/dsh-token-cost-meter](https://github.com/YZz-S/dsh-token-cost-meter) — Session token cost meter with official dynamic pricing, DeepSeek & Volcengine billing balance, and an update checker; plain JavaScript, no build required.

- [AFAP/dsh-token-usage](https://github.com/AFAP/dsh-token-usage) — Token usage display plugin for the DeepSeek Harness Web GUI.
- [AKS1st/model-usage-plugin](https://github.com/AKS1st/model-usage-plugin) — Per-model token usage stats and cost estimation with account balance display for DSH.
- [spirits001/dsh-tokensforce-login](https://github.com/spirits001/dsh-tokensforce-login) — TokensForce integration (login) for DeepSeek Harness.
- [Xenia0922/dsh-opencode-go-usage](https://github.com/Xenia0922/dsh-opencode-go-usage) — OpenCode Go usage and spend floating dashboard for DSH: quota, per-request cost, model/source breakdown.

- [golitter/dsh-deepseek-billing](https://github.com/golitter/dsh-deepseek-billing) — View DeepSeek API account balance and billing info inside DSH.
- [nabin-qq273274877/dsh-model-balance](https://github.com/nabin-qq273274877/dsh-model-balance) — Multi-provider real account balance display for the DeepSeek Harness Web GUI.

## Channel / IM Bridges

_Bridges DSH into chat platforms and messaging channels._

- [PlutoKeating/dsh-lark-bot](https://github.com/PlutoKeating/dsh-lark-bot) — Feishu/Lark bridge.
- [Roy-oss1/dsh-lark](https://github.com/Roy-oss1/dsh-lark) — Feishu/Lark bridge.
- [TtTRz/dsh-wecom](https://github.com/TtTRz/dsh-wecom) — WeCom (Enterprise WeChat) bot.
- [congchuanling-dot/DSH-Telegram-Relay](https://github.com/congchuanling-dot/DSH-Telegram-Relay) — Telegram relay.
- [STARDUSTLC666/dsh-email](https://github.com/STARDUSTLC666/dsh-email) — Email tooling.
- [BeAChanger/dsh-openclaw-acp](https://github.com/BeAChanger/dsh-openclaw-acp) — DeepSeek Harness bundle for OpenClaw and WeChat over ACP.
- [gnulife/dsh-plugin-wechat](https://github.com/gnulife/dsh-plugin-wechat) — WeChat bridge plugin for DeepSeek Harness (via ClawBot).
- [sindo-s/dsh-qq-bot](https://github.com/sindo-s/dsh-qq-bot) — Bridges the QQ official Bot API to dsh agents, no third-party bot framework required.
- [wssfk12138/dsh-wechat-notify](https://github.com/wssfk12138/dsh-wechat-notify) — Adds a `wechat_notify` tool so the agent can proactively notify you over a local ClawBot WeChat channel on task completion or when a decision is needed.
- [xiaoshihou514/dsh-weixin](https://github.com/xiaoshihou514/dsh-weixin) — Weixin (WeChat) bridge for DeepSeek Harness.
- [One1turn/dsh-omnibridge](https://github.com/One1turn/dsh-omnibridge) — AstrBot-style multi-platform bridge for DeepSeek Harness: QQ(OneBot)/Telegram/Discord/KOOK/Slack/Feishu/WeCom/DingTalk/LINE/webchat, 19 platforms in one plugin.
- [STARDUSTLC666/dsh-slack](https://github.com/STARDUSTLC666/dsh-slack) — Slack bridge plugin for DeepSeek Harness (no description provided upstream).
- [hZsFN/dsh-qq-bot](https://github.com/hZsFN/dsh-qq-bot) — QQ official bot private message (C2C) bridge for DeepSeek Harness (dsh): per-user persistent agent sessions, image attachments, auto-reconnect.
- [wz-heng/dsh-feishu-bridge](https://github.com/wz-heng/dsh-feishu-bridge) — Feishu (Lark) channel bridge for DeepSeek Harness (dsh) — message a Feishu bot, it runs a dsh agent turn, the reply comes back. Community plugin.
- [YLifeOnlyOnce/dsh-smarthome](https://github.com/YLifeOnlyOnce/dsh-smarthome) — Home Assistant control for DeepSeek Harness agents — approval-gated lights, switches, climate.
- [banana770/dsh-qq-bridge](https://github.com/banana770/dsh-qq-bridge) — QQ bridge for DeepSeek Harness: chat with the Harness agent through a QQ bot (Node.js ≥ 22).
- [hi-wenw/dsh-telegram-channel](https://github.com/hi-wenw/dsh-telegram-channel) — DeepSeek Harness Telegram mobile remote: bind live Web sessions (Codex-style).
- [sosojust/dsh-messge-channels](https://github.com/sosojust/dsh-messge-channels) — Connect Feishu, DingTalk, and WeCom to DeepSeek Harness, enabling chat-driven Agent, Session, and Workspace workflows.
- [TingRuDeng/dsh-feishu-bot](https://github.com/TingRuDeng/dsh-feishu-bot) — Feishu (Lark) private-chat frontend for DeepSeek Harness: drive, monitor, and approve local agents from Feishu, sharing sessions with the Web GUI.
- [MoonGlassKitty/dsh-tailscale-sync](https://github.com/MoonGlassKitty/dsh-tailscale-sync) — Zero-config Tailscale sync for DeepSeek Harness: keep working on your phone from where you left off on desktop.

- [shaobeichen/dsh-im-bridge](https://github.com/shaobeichen/dsh-im-bridge) — Drive DeepSeek Harness remotely from Feishu / WeCom / Telegram: remote task dispatch, result notifications, and dangerous-operation approval.

## Plugin Marketplaces & Ecosystem
- [dhicoc/dsh-reverse-skill](https://github.com/dhicoc/dsh-reverse-skill) - Complete reverse-skill pack (85 SKILL.md) as a DeepSeek Harness Cordis plugin: reverse engineering, authorized pentesting and security-research skill router.

_Plugin marketplaces, install managers, indexes, and ecosystem tooling._

- [bradeGithub/DSH-Plugins-Marketplace](https://github.com/bradeGithub/DSH-Plugins-Marketplace) — GUI plugin marketplace.
- [LX2000WASD/dsh-web-plugin-manager](https://github.com/LX2000WASD/dsh-web-plugin-manager) — Web-based plugin manager.
- [Toukaiteio/dsh-plugin-installer](https://github.com/Toukaiteio/dsh-plugin-installer) — Plugin installer.
- [Sunrisepeak/dsh-index](https://github.com/Sunrisepeak/dsh-index) — Plugin index.
- [akira399/dsh-plugin-publisher](https://github.com/akira399/dsh-plugin-publisher) — Plugin-publishing workflow.
- [nightwhale-dev/nightwhale](https://github.com/nightwhale-dev/nightwhale) — Ecosystem aggregator.
- [ZK-Andy/dsh-continual-evolve](https://github.com/ZK-Andy/dsh-continual-evolve) — Self-evolving ecosystem plugin.
- [green-dalii/dsh-plugin-dev-skill](https://github.com/green-dalii/dsh-plugin-dev-skill) — DeepSeek Harness plugin-development skill: lets any agent build DSH plugins correctly and to spec, with condensed reference docs and paper notes.
- [DDDFXYqiming/Agent_Extensions](https://github.com/DDDFXYqiming/Agent_Extensions) — Agent Skills & DeepSeek Harness (DSH) extension library: general agent skills plus standard DSH plugins, an out-of-the-box collection of agent capability upgrades.
- [MicroMilo/upstream-radar](https://github.com/MicroMilo/upstream-radar) — Always-on vulnerability and breaking-change impact monitoring for DeepSeek Harness plugins.
- [plwslpld-arch/deepseek-harness-atlas](https://github.com/plwslpld-arch/deepseek-harness-atlas) — Chinese-language knowledge base covering DeepSeek Harness source code, architecture, and plugin ecosystem, with continuous updates.
- [DumplingHuman/dsh-plugin-tutorial](https://github.com/DumplingHuman/dsh-plugin-tutorial) — DeepSeek Harness plugin-development tutorial: quick-start guide covering the Cordis framework, Tool development, and LLM integration.
- [lvyuchuiyi/dsh-funpack](https://github.com/lvyuchuiyi/dsh-funpack) — A grab-bag of fun plugins for DeepSeek Harness.
- [entireyu/dsh-launcher](https://github.com/entireyu/dsh-launcher) — DeepSeek Harness Launcher: a Tauri install/launch assistant for DSH.
- [qincaizheng/betterdshlauncher](https://github.com/qincaizheng/betterdshlauncher) — A launcher plugin for DeepSeek Harness (no description provided upstream).
- [zhang66633/dsh-plugin-installer](https://github.com/zhang66633/dsh-plugin-installer) — A plugin-installer tool for DeepSeek Harness (no description provided upstream).
- [dshworks/dshworks.github.io](https://github.com/dshworks/dshworks.github.io) — Landing page for dsh.works, the community workshop for DeepSeek Harness (dsh); single static page, zero JS.
- [zebbkira/dsh-skills-mcp-manager](https://github.com/zebbkira/dsh-skills-mcp-manager) — Official-style plugin bundle adding a "Skills & MCP" card to the Web UI plugins settings group for managing skills and MCP servers in the browser.
- [meifeisite/plugin-manager](https://github.com/meifeisite/plugin-manager) — Centralized plugin manager in DSH Web Settings → Plugins: enable/disable, uninstall with dependency checks, details, operation logs, and protection for core components.
- [swaylq/dsh-genie](https://github.com/swaylq/dsh-genie) — Makes an agent's runtime plugins permanent: turns a `cordis_define` dynamic package into a real installed bundle that survives restart, with no pnpm, no network, and no build authorization.

- [cynch18/plugin-switch](https://github.com/cynch18/plugin-switch) — DSH web plugin: toggle plugins on/off from the GUI without restarting the server.

- [nonmean/dsh-plugin-explorer](https://github.com/nonmean/dsh-plugin-explorer) — DSH client plugin: browse GitHub repos tagged dsh-plugin (name, README, stats) with sync and search.
- [Noob-stupid/dsh-plugin-hub](https://github.com/Noob-stupid/dsh-plugin-hub) — Plugin manager & marketplace for DeepSeek Harness: one-click enable/disable plus a GitHub dsh-plugin market with details and one-click install.

## Visualization

_Plugins that turn data / results into charts, diagrams, dashboards._

- [ZSeven-W/dsh-openpencil](https://github.com/ZSeven-W/dsh-openpencil) — OpenPencil design preview and editing plugin for DSH.  `⭐33`
- [Anionex/dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) — Vision tasks for text-only models: intent-driven image Q&A, long-screenshot OCR, UI restoration, pixel diff.  `⭐150`
- [william-jin-cmu/dsh-vision](https://github.com/william-jin-cmu/dsh-vision) — `view_image` tool bridging any OpenAI-compatible VLM to text-only models.  `⭐10`
- [omdsh-dev/dsh-genui](https://github.com/omdsh-dev/dsh-genui) — Interactive UI components rendered inline in assistant replies via a `dsh-ui` fence — layout, charts, plots, forms, quizzes, mermaid, 3D scenes — with an action event loop back to the model.  `⭐14`
- [omdsh-dev/dsh-ernie-image](https://github.com/omdsh-dev/dsh-ernie-image) — Baidu ERNIE-Image-Turbo text-to-image: a host-side generation tool plus a browser gallery panel and config card.
- [omdsh-dev/dsh-paddle-ocr](https://github.com/omdsh-dev/dsh-paddle-ocr) — PaddleOCR-VL document layout parsing: converts PDFs/images to Markdown page by page, with host tools, a config card, and a task panel.
- [PangYiMing/dsh-screenshot-diff](https://github.com/PangYiMing/dsh-screenshot-diff) — Pixel-diffs two screenshots into a diff image and triptych (pixelmatch).
- [Kevoyuan/dsh-mac-vision](https://github.com/Kevoyuan/dsh-mac-vision) — Native macOS OCR/Vision framework integration.
- [MC5lan/dsh-multimodal](https://github.com/MC5lan/dsh-multimodal) — Combined vision transcription and text-to-image generation.
- [loudMore/dsh-drop-to-path](https://github.com/loudMore/dsh-drop-to-path) — Converts dropped images/files into file paths for text-only models.
- [Yuuz12/dsh-vision-helper](https://github.com/Yuuz12/dsh-vision-helper) — Vision-assist helper plugin.
- [ysr666/dsh-vision-router](https://github.com/ysr666/dsh-vision-router) — Free vision for text-only agents: built-in keyless vision chain plus pixel tools (Q&A, grounding, crop, pixel diff, colors, OCR, SVG trace, cutout, screenshots); paste an image and it just works — no Python, one-command install.
- [pinch-eng/dsh-audio-dub](https://github.com/pinch-eng/dsh-audio-dub) — Video/audio dubbing tool.
- [LuZhouheng/dsh-gen3d](https://github.com/LuZhouheng/dsh-gen3d) — 3D character-generation plugin for DeepSeek Harness: direct API links to Meshy / Hunyuan3D / Tripo3D / Rodin with your own keys and a mock fallback.
- [wangyang10/image-vision](https://github.com/wangyang10/image-vision) — Image/vision skill plugin for DeepSeek Harness.
- [xiaoshihou514/dsh-vision](https://github.com/xiaoshihou514/dsh-vision) — Vision bridge for DeepSeek Harness.
- [Hyperionjust/dsh-tool-underseal](https://github.com/Hyperionjust/dsh-tool-underseal) — "Underseal" sealed-assignment tool plugin for DeepSeek Harness (multi-model support).
- [hccccc01333/dsh-report-html](https://github.com/hccccc01333/dsh-report-html) — Generates self-contained interactive HTML reports from Markdown, tables, charts, China province maps, flowcharts, math, and drill-down tables.
- [yumimanji/dsh-ui-spec](https://github.com/yumimanji/dsh-ui-spec) — Turns UI screenshots into structured, implementation-grade web-frontend specs: deterministic geometry (sharp) plus optional vision-model semantics, merged into one JSON + Markdown spec.
- [237229953-create/dsh-vision](https://github.com/237229953-create/dsh-vision) — DSH plugin letting text-only models (e.g. DeepSeek-V4) automatically see images via a vision model; official surface-replace, cache-friendly, human transcript untouched.
- [moon09300731/dsh-vision-tools](https://github.com/moon09300731/dsh-vision-tools) — Full vision-capability bundle for DeepSeek Harness: a `vision_understand` tool plus paste/drag-and-drop/button entry points for image recognition.
- [tdf1995/dsh-plugin-vision](https://github.com/tdf1995/dsh-plugin-vision) — Vision for text-only LLMs in DeepSeek Harness: describe images / OCR / VQA via free Gemini & GLM vision APIs.
- [liustack/modlens](https://github.com/liustack/modlens) — The first vision plugin for DeepSeek Harness, and a vision bridge for every text-only coding agent: paste an image, get structured JSON evidence (OCR, layout, semantics).
- [GXX182/dsh-vision-bridge](https://github.com/GXX182/dsh-vision-bridge) — DeepSeek Harness plugin that bridges session images to pluggable vision APIs while keeping DeepSeek as the primary model.
- [hZsFN/dsh-image-bridge](https://github.com/hZsFN/dsh-image-bridge) — Image message bridge for text-only models in DeepSeek Harness (dsh): image blocks turn into text placeholder + local path, with vision via a qwen script.
- [wulusai2333/mimo-vision](https://github.com/wulusai2333/mimo-vision) — DeepSeek Harness (DSH) native plugin — a `describe_image` tool: a vision bridge (image → mimo-v2.5 → text description) over the `ctx.fs` / `ctx.credentials` seams.
- [yuqingsh/dsh-image-subagent](https://github.com/yuqingsh/dsh-image-subagent) — An image-handling subagent plugin for DeepSeek Harness.
- [PixLunaLab/dsh-pixluna](https://github.com/PixLunaLab/dsh-pixluna) — dsh-plugin-pixluna: an image-generation plugin letting DSH view images itself.
- [Gcsimple/Emoji_Desktop_Pet](https://github.com/Gcsimple/Emoji_Desktop_Pet) — Emoji Desktop Pet — a draggable emoji desktop pet for the DeepSeek Harness (DSH) web UI, built as a dynamic Cordis plugin, with idle animation, click interaction, and 40 built-in characters.
- [Flyvhidbwo/dsh-vision-proxy](https://github.com/Flyvhidbwo/dsh-vision-proxy) — DeepSeek Harness plugin: attached images are automatically transcribed by a VLM into text before being handed to DeepSeek for answering.
- [re-ITRT/dsh-vision-tool](https://github.com/re-ITRT/dsh-vision-tool) — DeepSeek Harness vision plugin: a `vision_analyze` tool with a Models-style settings page (Cordis plugin).
- [mochgolf/dsh-deepseek-vision-router](https://github.com/mochgolf/dsh-deepseek-vision-router) — Transparent image-preprocessing route for DeepSeek Harness.
- [cyanfish-x/dsh-live2d-pets](https://github.com/cyanfish-x/dsh-live2d-pets) — Live2D desktop-pet plugin for DeepSeek Harness: agent-state mirroring plus interactive companionship, with curated permissive-license preset models.
- [anneheartrecord/dsh-desk-pet](https://github.com/anneheartrecord/dsh-desk-pet) — Always-on-top DeepSeek Harness desktop pet: default whale, four skins, four silent states.
- [xiaoxianyu-office/dsh-image-tools](https://github.com/xiaoxianyu-office/dsh-image-tools) — DSH bundle plugin: chat-image bridge, `read_image` deny, and conversational `image_recognize` for text-only main models.
- [CeasarSmj/dsh-vision-mcp](https://github.com/CeasarSmj/dsh-vision-mcp) — Vision MCP plugin for DeepSeek Harness (no description provided upstream).
- [ZRui-C/dsh-computer-use](https://github.com/ZRui-C/dsh-computer-use) — Computer-use plugin for DeepSeek Harness (no description provided upstream).
- [clr112409-dot/TK-GMVMAX-DSH](https://github.com/clr112409-dot/TK-GMVMAX-DSH) — DSH host plugin and auto-install script for the TK-GMVMAX dashboard (TikTok ad creatives + FBT inventory).
- [lehhair/dsh-html-artifact](https://github.com/lehhair/dsh-html-artifact) — HTML artifact plugin for DeepSeek Harness.

- [AKS1st/dsh-mermaid](https://github.com/AKS1st/dsh-mermaid) — Render Mermaid code fences as SVG diagrams in DSH Web messages.
- [alsj213/local-ocr-cli](https://github.com/alsj213/local-ocr-cli) — Fully-local OCR CLI for text-only LLMs: PaddleOCR-VL first-tier engine + tesseract fallback, dsh plugin included — images never leave your machine.
- [hige6/imgpost](https://github.com/hige6/imgpost) — Send local/URL images into DSH conversations and generate images via OpenAI-compatible APIs, rendered inline via a local `/dsh-img2` route.
- [MoneShadow/dsh-plugin-vision](https://github.com/MoneShadow/dsh-plugin-vision) — Gives vision-less models vision capability via an external vision model.
- [qing9835/plug](https://github.com/qing9835/plug) — Vision bridge for text-only models (deepseek-eyes): sends images to external VLMs (Qwen-VL / DeepSeek-VL2 / DeepSeek-OCR) and feeds the text back to the main model.

- [FuzzySoul/dsh-free-vision](https://github.com/FuzzySoul/dsh-free-vision) — Vision bridge plugin for DeepSeek Harness (dsh): image understanding for text-only models via luma-mcp, free Qwen3-VL-Flash by default.
- [JIAQI23333/dsh-visual-plan](https://github.com/JIAQI23333/dsh-visual-plan) — Visual plan mode for DeepSeek Harness: turns Plan Mode output into an editable node graph with annotations, Plan Diff, and versioned write-back.
- [Koreyer/easy-vision](https://github.com/Koreyer/easy-vision) — Tool plugin that lets text-only agents “see” local images: auto-detects the real format and returns a detailed text description via any OpenAI-compatible vision model.
- [maxwell-feng/dsh-tesseract-ocr](https://github.com/maxwell-feng/dsh-tesseract-ocr) — Local Tesseract OCR plugin: attached images are recognized locally and only the text reaches the model — image bytes never leave your machine.
- [maxwell-feng/dsh-windows-ocr](https://github.com/maxwell-feng/dsh-windows-ocr) — Local Windows OCR engine plugin (Windows.Media.Ocr): attached images are recognized locally, only the recognized text is sent to the model.
- [YOGEMOW/DeepSeek_Prism](https://github.com/YOGEMOW/DeepSeek_Prism) — On-demand image understanding for text-only models: zero-patch Cordis plugin (prism_see tool + image VEP degradation + skill runtime registration) + Codex Skill; multi-provider vision APIs, low-token VEP evidence packs.

## Slides / PPT

_Generate presentations, decks, slide exports._

- [Blaczz/dsh-deck-builder](https://github.com/Blaczz/dsh-deck-builder) — Convert Markdown into a self-contained HTML presentation (slides) with themes and keyboard navigation; a zero-dependency `deck_build` tool.
- [THU-MAIC/dsh-openmaic](https://github.com/THU-MAIC/dsh-openmaic) — OpenMAIC for DeepSeek Harness: classrooms, slides, interactive widgets, and Socratic teaching.

## Coding

_Code generation, refactoring, review, repo-level engineering plugins._

- [Code2Skill](https://github.com/leechen298/Code2Skill) — Generates Function, MCP, Agent Skill, and offline-test packages from authorized existing code, and ships a DeepSeek Harness bundle for its generation and review skills.
- [omdsh-dev/dsh-open-in-vscode](https://github.com/omdsh-dev/dsh-open-in-vscode) — Open DSH workspace directories in VS Code directly from the web GUI.  `⭐33`
- [omdsh-dev/dsh-custom-tool](https://github.com/omdsh-dev/dsh-custom-tool) — Create and manage sandboxed JavaScript tools with a Monaco editor and a model-driven tool lifecycle.  `⭐18`
- [CanglongCl/dsh-web-review](https://github.com/CanglongCl/dsh-web-review) — Web preview and element annotation for the DSH Web GUI, letting the AI edit front-end source code from visual feedback.
- [omdsh-dev/dsh-plugin-check](https://github.com/omdsh-dev/dsh-plugin-check) — Plugin health check: scans plugin repos for manifest protocol, patch format, build pitfalls, and hub listing status; zero-dependency, read-only, registers a `plugin_check` tool.  `⭐11`
- [omdsh-dev/plugin-template](https://github.com/omdsh-dev/plugin-template) — Plugin template repository based on the official turtle-ui plugin repo.
- [a179-sanae/dsh-code-check](https://github.com/a179-sanae/dsh-code-check) — Auto type-check diagnostics: runs `tsc --noEmit` in the background after code edits and exposes a `code_check` tool.
- [FlashingChen/dsh-worktree](https://github.com/FlashingChen/dsh-worktree) — Codex-style permanent git worktrees: create/list/remove agent tools, a `/worktree` chat command, and durable per-repo manifests.
- [PangYiMing/dsh-batch-regression](https://github.com/PangYiMing/dsh-batch-regression) — Runs a command N rounds and judges by median/distribution for statistical regression conclusions.
- [PangYiMing/dsh-bisect-debug](https://github.com/PangYiMing/dsh-bisect-debug) — Bisects bugs by code, boundary, or commit to locate root causes.
- [PangYiMing/dsh-port-guard](https://github.com/PangYiMing/dsh-port-guard) — Triage for port conflicts: reuse, switch, or precisely kill the occupying process.
- [PerryLink/dsh-lsp-actions](https://github.com/PerryLink/dsh-lsp-actions) — LSP diagnostics and formatting actions.
- [lonelymoon87/dsh-code-intel](https://github.com/lonelymoon87/dsh-code-intel) — Symbol-aware code indexing and hybrid search for DeepSeek Harness.
- [lonelymoon87/dsh-gitflow](https://github.com/lonelymoon87/dsh-gitflow) — Git status, diff, commit, pull-request, and worktree workflows for DeepSeek Harness.
- [lonelymoon87/dsh-specflow](https://github.com/lonelymoon87/dsh-specflow) — Specification-driven development toolkit for DeepSeek Harness.
- [lonelymoon87/dsh-vscode](https://github.com/lonelymoon87/dsh-vscode) — VS Code client for the DeepSeek Harness SDK runtime.
- [liuup/dsh-latex-tools](https://github.com/liuup/dsh-latex-tools) — Copy and export the LaTeX in DeepSeek Harness: hover any formula to copy its TeX source or export it as a standalone SVG.
- [MOLAaaaaaaa/dsh-seismicx](https://github.com/MOLAaaaaaaa/dsh-seismicx) — DeepSeek Harness plugin for the SeismicX earthquake-catalog skill.
- [shyboy/dsh-k12-lesson-builder](https://github.com/shyboy/dsh-k12-lesson-builder) — DeepSeek Harness plugin for generating synchronized K12 English PPTX and DOCX lesson materials.
- [BrambleXu/dsh-annotate](https://github.com/BrambleXu/dsh-annotate) — Visual browser element annotation for DeepSeek Harness, capturing DOM, styles, accessibility data, comments, and viewport screenshots.
- [BrambleXu/dsh-revdiff](https://github.com/BrambleXu/dsh-revdiff) — Native interactive Git diff review for DeepSeek Harness with structured annotations sent back to the current Agent session.
- [sleepinginsummer/dsh-hashline-edit-pro](https://github.com/sleepinginsummer/dsh-hashline-edit-pro) — Hashline edit pro plugin for DeepSeek Harness.
- [walavave/dsh-git](https://github.com/walavave/dsh-git) — Git plugin for DeepSeek Harness.
- [Blackspace2/dsh-math-copy](https://github.com/Blackspace2/dsh-math-copy) — Copy mathematical formulas in the dsh web UI.
- [lj970926/dsh-plugin-mermaid](https://github.com/lj970926/dsh-plugin-mermaid) — DeepSeek Harness web client plugin: renders mermaid code blocks with a chart/source toggle.
- [KevinWen7415/dsh-virtual-workspace](https://github.com/KevinWen7415/dsh-virtual-workspace) — Virtual Workspaces for DeepSeek Harness: a dynamic Cordis plugin that groups multiple project directories under one name for cross-project read/search/write, with native sidebar integration and sandbox-consistent escalation.
- [joejojoking-cloud/dsh-file-explorer](https://github.com/joejojoking-cloud/dsh-file-explorer) — A global file explorer plugin for DeepSeek Harness: a folder-switch button next to any session's title bar opens a resizable file-tree panel on the right.
- [Ethanout/computer-use-plus](https://github.com/Ethanout/computer-use-plus) — Low-token, low-latency Windows computer-use MCP with learned shortcuts, UIA/CDP/OCR routing, and DeepSeek Harness support.
- [jkcltc/dsh-chat-flow-re-layout](https://github.com/jkcltc/dsh-chat-flow-re-layout) — DeepSeek Harness web UI plugin that folds settled tool calls, context and reasoning into compact horizontal chips. Pure CSS, zero build.
- [Monokuna-Hugo/dsh-kaoyan-english](https://github.com/Monokuna-Hugo/dsh-kaoyan-english) — Postgraduate Entrance Exam English reading-proposition assistant: a dynamic Cordis plugin that crawls foreign publications (The Guardian, Psychology Today, The Economist, etc.) and drafts a full mock exam paper.
- [LeslieWylie/dsh-md-preview](https://github.com/LeslieWylie/dsh-md-preview) — Render Markdown to standalone, self-contained HTML in DeepSeek Harness — an `md_html_render` tool that works headless, plus a preview/export drawer in the web GUI. One renderer behind both, zero dependencies.
- [chenw2759-wq/dsh-IDE](https://github.com/chenw2759-wq/dsh-IDE) — SSH front-end plugin giving DSH lab-like remote operation: quick SSH response plus in-UI browsing/editing of remote server files and code.
- [LJninse/dsh-open-in-ide](https://github.com/LJninse/dsh-open-in-ide) — DeepSeek Harness Web UI plugin: adds an IDE button that auto-detects local IDEs and opens the current workspace folder.
- [Pasumao/dsh-plugin-workbench](https://github.com/Pasumao/dsh-plugin-workbench) — VS Code-style workspace file explorer with editable preview for the DSH web GUI.
- [Zalpha263/dsh-file-explorer](https://github.com/Zalpha263/dsh-file-explorer) — Lets DSH browse the current workspace folder and preview files like other agent UIs.
- [anoslide/dsh-vscode-layout](https://github.com/anoslide/dsh-vscode-layout) — Turns the DeepSeek Harness Web UI into a VS Code-style IDE: three-pane layout, file tree, multi-tab viewer/editor, and a desktop launcher; fully replayable patches (MIT).
- [weinibuliu/deepseek-harness-vsc-extension](https://github.com/weinibuliu/deepseek-harness-vsc-extension) — DeepSeek Harness for VS Code as an extension.
- [chenw2759-wq/dsh-mindmap](https://github.com/chenw2759-wq/dsh-mindmap) — Mind-map mode plugin: turns courseware (PPT/PDF/Word) and e-books into print-ready review mind-map HTML (A3 landscape, brace-style branches, cover overview, and interactive quizzes).
- [SamFirefly096/dsh-docflow-workflow](https://github.com/SamFirefly096/dsh-docflow-workflow) — Document workflow plugin: upload/parse/generate/edit docx·pptx·pdf plus real literature search verification (PubMed/Crossref) and GB/T 7714 citation formatting.
- [TT432/dsh-mcmcp](https://github.com/TT432/dsh-mcmcp) — Port of the omp mcmcp extension to the DSH plugin system: MC client debug driver reading `.mcmcp` launch configs and driving the AIDebugServer inside the clientsmoke mod, with `mcmcp_*` tools and a runtime skill.
- [zoahdev/dsh-plugin-template](https://github.com/zoahdev/dsh-plugin-template) — Minimal, verified template for DeepSeek Harness plugins: bundle manifest, one tool, tests, and CI smoke load (dsh 0.1.0-rc.6).

## Agents

_Reusable sub-agents / specialized agent packs runnable inside DSH._

- [hewzhew/dsh-agent-rp](https://github.com/hewzhew/dsh-agent-rp) — SillyTavern migration and next-generation agent role-play for DSH.  `⭐67`
- [whiteguo233/dsh-openbiliclaw](https://github.com/whiteguo233/dsh-openbiliclaw) — Embeds OpenBiliClaw, a local personalized content-recommendation agent, as a fourth panel in DSH with 22 agent-bridge tools for reading recommendations and closed-loop learning.
- [omdsh-dev/dsh-data-agent](https://github.com/omdsh-dev/dsh-data-agent) — Lets the agent connect to databases and write SQL for you.
- [omdsh-dev/dsh-mnemon](https://github.com/omdsh-dev/dsh-mnemon) — Deep Mnemon integration providing a three-layer local memory: runtime memory, retrievable documents, and supervised memory spaces.
- [nowledge-co/nowledge-mem-deepseek-harness](https://github.com/nowledge-co/nowledge-mem-deepseek-harness) — Nowledge Mem community plugin bundle for DeepSeek Harness.
- [btspoony/dsh-advisor](https://github.com/btspoony/dsh-advisor) — Pairs a second model that passively reviews each turn and injects notes.
- [fakechris/dsh-track](https://github.com/fakechris/dsh-track) — Embedded task-management engine: decision-point protocol, idea-capture wall, and Linear-style issue storage shared between AI and humans.
- [Fisfzy/ego-browser](https://github.com/Fisfzy/ego-browser) — Plugs the ego-lite agent browser (Chromium) into DSH with 13 structured `ego_*` tools: semantic text snapshots, semantic-locator clicks, form filling, screenshots, and CDP control.
- [omdsh-dev/dsh-longbridge](https://github.com/omdsh-dev/dsh-longbridge) — Longbridge OpenAPI integration for HK/US stocks: quotes, account, and trading tools with credential management in settings.
- [omdsh-dev/dsh-tool-browser](https://github.com/omdsh-dev/dsh-tool-browser) — Static Cordis overlay and integration guide for the official `dsh-tool-browser` browser-control tool.
- [PangYiMing/dsh-browser-control](https://github.com/PangYiMing/dsh-browser-control) — Browser-control plugin (CDP/Playwright).
- [PangYiMing/dsh-mobile-control](https://github.com/PangYiMing/dsh-mobile-control) — Mobile-device control plugin (ADB/iOS).
- [titanwings/dsh-better-browser](https://github.com/titanwings/dsh-better-browser) — Lets agents drive the user's signed-in browser through thirteen Kimi WebBridge tools.
- [UynajGI/dsh-ssh](https://github.com/UynajGI/dsh-ssh) — SSH remote-execution plugin: ProxyJump chains, SFTP filesystem, subprocess and PTY over ssh2.
- [whiteguo233/OpenBiliClaw](https://github.com/whiteguo233/OpenBiliClaw) — Local-first cross-platform content-discovery agent (Bilibili, Xiaohongshu, YouTube, X, etc.) that ships a DSH client plugin.  `⭐1926`
- [zenx0x/allinluna](https://github.com/zenx0x/allinluna) — Resource-aware multi-agent orchestration for Codex and DeepSeek Harness ("All in Flash" DSH plugin).  `⭐22`
- [zcx369658780/governed-workflow-for-dsh](https://github.com/zcx369658780/governed-workflow-for-dsh) — Policy-enforced, evidence-first governed workflows for DeepSeek Harness agents.
- [ciceroyang/dsh-report-studio](https://github.com/ciceroyang/dsh-report-studio) — Turns a DeepSeek Harness session into deliverable work reports (daily/weekly/handoff/article) with verifiable receipts.
- [mario03690/dsh-netcafe](https://github.com/mario03690/dsh-netcafe) — Adds AI NetCafé's hosted outcome tools (statement extraction with reconciliation, SQL dialect transpile, mainland-China reachability, cross-session memory, scheduled agents) to your dsh profile in one install.
- [MicroHEROX/dsh-Kimi-WebBridge](https://github.com/MicroHEROX/dsh-Kimi-WebBridge) — Kimi WebBridge for DeepSeek Harness — turns the local Kimi WebBridge daemon into 15 native `kimi_webbridge_*` browser tools (navigate, click, fill, snapshot, screenshot, evaluate, network, upload, PDF).
- [kunjinkao-os/dsh-mobile-gui-agent](https://github.com/kunjinkao-os/dsh-mobile-gui-agent) — Android Mobile GUI Agent plugin for DeepSeek Harness with ADB control, iterative verification, approvals, and a Web mobile view.
- [sherconan/dsh-entity-dd](https://github.com/sherconan/dsh-entity-dd) — Cross-border counterparty due-diligence plugin for DeepSeek Harness: confirm which legal entity you're actually signing with before trusting its registration data, using free official data sources with no key required.
- [sakikoTGW/pack-agent](https://github.com/sakikoTGW/pack-agent) — Agent Modpack: assemble your agent the way you'd install a Minecraft modpack.
- [OrinVoss/dsh-math-team](https://github.com/OrinVoss/dsh-math-team) — DeepSeek Harness math-modeling team plugin pack: two role-based agent presets (modeling/coding + paper writing), Gitee three-folder collaboration plus a vision subagent, with a full 2023 national contest Problem C walkthrough example.
- [Socialist-Sister/dsh-collaboration](https://github.com/Socialist-Sister/dsh-collaboration) — Multi-agent collaboration suite for DeepSeek Harness: specialist roster with on-demand dispatch, roundtable, model comparison, and a multimodal vision bridge — models via the official provider flow.
- [TecFancy/dsh-deeptutor](https://github.com/TecFancy/dsh-deeptutor) — DeepTutor bridge bundle for DeepSeek Harness: learning capabilities, knowledge bases, and note archiving.
- [omdsh-dev/dsh-advisor](https://github.com/omdsh-dev/dsh-advisor) — Pairs a second model that passively reviews each turn and injects notes.
- [yhny1001/dsh-rp-distribution](https://github.com/yhny1001/dsh-rp-distribution) — Plugin-first open-source role-playing distribution for DeepSeek Harness.
- [superboy911/dsh-model-router](https://github.com/superboy911/dsh-model-router) — DSH model-routing plugin for keyword routing and isolated image generation.
- [omdsh-dev/dsh-office](https://github.com/omdsh-dev/dsh-office) — Office document tools for DeepSeek Harness: generate, read, and edit spreadsheets (.xlsx), PDFs, and presentations (.pptx).
- [AbnerAI/dsh-monitor](https://github.com/AbnerAI/dsh-monitor) — Persistent background watchers (file inbox / command output) that wake the agent on new messages; the harness analog of Claude Code's Monitor tool.

- [1149784810/jayhe-dsh-gamemaker](https://github.com/1149784810/jayhe-dsh-gamemaker) — Game development role subagents for DeepSeek Harness (planner=minimal preset, executor=hard PTC code mode, reviewer=minimal) plus bundled game-dev/game-minimal agent presets.
- [fenglufa/dsh-board](https://github.com/fenglufa/dsh-board) — A durable, multi-board, workspace-scoped task board for multi-agent / subagent collaboration: agents operate it through tools, humans manage it in a web panel.

## Loops (Auto-Research, Self-Improve, etc.)

_Long-running loop workflows: auto-research, deep-research, self-refine, iterative build._

- [btspoony/mstar-harness](https://github.com/btspoony/mstar-harness) — Skill-driven harness/loop engineering workflow agent plugin.  `⭐39`
- [csyangwen/dsh-memory-evolve](https://github.com/csyangwen/dsh-memory-evolve) — Plugin-only cross-session long-term memory with background self-evolution: five memory tracks, in-turn self-review, skill self-evolution and a skill manager, todo tracks, and session search — zero core modifications.  `⭐14`
- [vlln/dsh-loop](https://github.com/vlln/dsh-loop) — Timed loop plugin (`/loop` command + loop tool + activity status bar).
- [william-jin-cmu/dsh-evolve](https://github.com/william-jin-cmu/dsh-evolve) — Self-evolving plugin: hot-mount/unmount Cordis plugins inside a session.
- [fuhefei/dsh-sentinel](https://github.com/fuhefei/dsh-sentinel) — Condition-driven wakeup: durable file/command/HTTP/process/webhook watches that wake the agent, with a dock and a global dashboard.
- [lzszq/dsh-scholar](https://github.com/lzszq/dsh-scholar) — AI research workbench for computational research: materials, project conversations, code and data, experiment runs, an evidence ledger, and TeX manuscripts in one recoverable project.
- [omdsh-dev/dsh-revive](https://github.com/omdsh-dev/dsh-revive) — One-click revive: automatically sends "continue" to all interrupted sessions after a restart (`/revive` command, tool, and browser button).

## MCP Servers

_Model Context Protocol servers that contribute tools / prompts / resources to DSH._

<!-- Add entries here. -->
- [bobleer/deepseek-harness-plugin-mcp](https://github.com/bobleer/deepseek-harness-plugin-mcp) — MCP server that lets any agent (Cursor, Claude Code, Codex) discover, install, and run DSH plugins from the `dsh-plugin` topic.
- [taxueseek/argo](https://github.com/taxueseek/argo) — Multilingual agent-facing search tool (web, academic, code, finance, news) that ships a DSH plugin bundle exposing ten `mcp__argo__*` tools.  `⭐56`
- [chushixixin/dsh-harness-mcp-server](https://github.com/chushixixin/dsh-harness-mcp-server) — Exposes DSH itself as an MCP server.
- [f0909172434/dsh-plugin-verified-search](https://github.com/f0909172434/dsh-plugin-verified-search) — Verified/fact-checked search plugin.
- [qwased/dsh-web-search-duckduckgo](https://github.com/qwased/dsh-web-search-duckduckgo) — DuckDuckGo web-search MCP tool.
- [gxpppp/dsh-search-mcp](https://github.com/gxpppp/dsh-search-mcp) — Replaces dsh's built-in web search with search MCP servers (Tavily/Brave/Exa/Perplexity/DuckDuckGo/custom), configured from the web Settings page.
- [anweat/dsh-web-search-pro](https://github.com/anweat/dsh-web-search-pro) — Enhanced, persistent web-search plugin for DeepSeek Harness: multi-engine search, SQLite+LRU cache, platform backends, and Playwright rendering.
- [lmcsh9527/dsh-search-free](https://github.com/lmcsh9527/dsh-search-free) — Free multi-layer web search + fetch provider for DeepSeek Harness (Exa → Tavily → Bing + web_fetch).
- [MicroHEROX/dsh-exa-mcp](https://github.com/MicroHEROX/dsh-exa-mcp) — Exa Search MCP for DeepSeek Harness: mounts the remote Exa MCP endpoint through the in-box `@deepseek-ai/dsh-mcp-client` bridge.
- [labmimors/dsh-mcp-lens](https://github.com/labmimors/dsh-mcp-lens) — Progressive-disclosure MCP gateway for DeepSeek Harness: keeps two model-facing tools, reveals ranked exact remote input schemas on demand, then calls an explicit server/tool pair.
- [PerryLink/dsh-mcp-panel](https://github.com/PerryLink/dsh-mcp-panel) — Read-only runtime management panel for the official DeepSeek Harness MCP client: `/mcp` command + Settings MCP tab with status, tools, errors, reconnect counts, sanitized display, and controlled patch suggestions.
- [Nichts0v0/dsh-mcp-manager](https://github.com/Nichts0v0/dsh-mcp-manager) — MCP server manager for DeepSeek Harness — add, edit, enable/disable, reconnect & delete MCP servers from the web settings page, with live status, auto-reconnect, and a bilingual UI.
- [xwh-01/dsh-mediacrawler](https://github.com/xwh-01/dsh-mediacrawler) — MCP adapter and installable DSH profile bundle for bounded MediaCrawler jobs with isolated browser profiles, QR-code login, run supervision, redacted previews, and sanitized exports.
- [Piccolo123/url-manager](https://github.com/Piccolo123/url-manager) — Agent-first URL collection & knowledge management: save links from any platform, auto-categorize/tag, full-text search, shared categories, and magic-link card delivery. Zero setup — agents auto-register on first use. Works as a dsh skill or via its MCP server.
- [Piccolo123/url-manager-mcp](https://github.com/Piccolo123/url-manager-mcp) — MCP server companion for URL Manager: 21 tools (mcp__url_manager__*) for save/search/categorize/share and magic-link delivery. Stdio or streamable-http, installable via uvx.
- [KYinCode/dsh-project-mcp-bridge](https://github.com/KYinCode/dsh-project-mcp-bridge) — Per-project MCP loading for DeepSeek Harness: drop a `.dsh/mcp.json` into a project and its sessions get the MCP servers' tools automatically, with live config reload. Client bridge, not an MCP server.

- [wly8691-jpg/knowlp-rag](https://github.com/wly8691-jpg/knowlp-rag) — Dual knowledge-graph RAG for Markdown notes — MCP + native Cordis plugin for DeepSeek Harness and Claude Code.

- [DDDMUC/dsh-free-search](https://github.com/DDDMUC/dsh-free-search) — Free web search provider for DeepSeek Harness — DuckDuckGo backend, no API key needed.
- [lory69060/cn-intel-board](https://github.com/lory69060/cn-intel-board) — China hard-tech supply-chain intel MCP server (pure stdlib): 33 verifiable signals with track record, 2026 H1 earnings tracker, ask_edge Q&A. Data-asset play: agents can read real China supply-chain data, not headlines.

## Orchestrators & Aggregators

_Multi-step / multi-agent schedulers and output aggregators._

- [icetomoyo/dsh_workflow](https://github.com/icetomoyo/dsh_workflow) — Upgrades DSH's one-shot multi-agent dispatch into a workflow layer that can be generated, saved, governed, observed, and resumed (UltraCode-style).  `⭐35`
- [NanmiCoder/dsh-agent-teams](https://github.com/NanmiCoder/dsh-agent-teams) — AgentTeams plugin for DeepSeek Harness.  `⭐72`
- [Chinesezjc/dsh-interconnect](https://github.com/Chinesezjc/dsh-interconnect) — Cross-instance message/event handoff plugins for DSH (interconnect service + tools).  `⭐15`
- [titanwings/dsh-automation](https://github.com/titanwings/dsh-automation) — Runs coding tasks on a schedule in fresh agent sessions; schedules are managed from the DSH Web UI or by the agent itself.
- [Buyi-wsgzg/dsh-sidechain](https://github.com/Buyi-wsgzg/dsh-sidechain) — Side sessions: persistent `/side` sessions (Codex-style) and one-shot `/btw` questions (Claude-style) that run in a temporary fork without touching main-session history, with an embedded side panel.
- [omdsh-dev/dsh-hub-workshop](https://github.com/omdsh-dev/dsh-hub-workshop) — Public catalog, review projection, and immutable feed authority for the OMDSH ecosystem.
- [TtTRz/dsh-gatedflow](https://github.com/TtTRz/dsh-gatedflow) — Human-in-the-loop gated workflow engine.
- [franksong2702/dsh-codex-connect](https://github.com/franksong2702/dsh-codex-connect) — ChatGPT OAuth and Codex models for DeepSeek Harness.
- [ropon/dsh-plugin-clawrouters](https://github.com/ropon/dsh-plugin-clawrouters) — One-key ClawRouters plugin for DeepSeek Harness: chat, image, video, and web search.
- [Frost-Reed/blocker-notify](https://github.com/Frost-Reed/blocker-notify) — Real-time attention alerts for DeepSeek Harness: a global banner + flashing workspace entries when the agent is blocked (approval request / sandbox denial).
- [superslash-rico/dsh-plugin-slashx-gateway](https://github.com/superslash-rico/dsh-plugin-slashx-gateway) — DeepSeek Harness host bundle for SlashX request, response, rich media, async callbacks, and complete token metering.
- [Uddoo/dsh-dashboard](https://github.com/Uddoo/dsh-dashboard) — Symphony-compatible Linear issue orchestrator and native operations dashboard for DeepSeek Harness.
- [writeCasually/deepseek-harness-plugins](https://github.com/writeCasually/deepseek-harness-plugins) — DeepSeek Harness plugins view.

- [lileikeji/dsh-crosstalk](https://github.com/lileikeji/dsh-crosstalk) — Cross-session messaging for DSH (Claude Code-style), plus event-driven auto-collab coordination.
- [omdsh-dev/dsh-cron](https://github.com/omdsh-dev/dsh-cron) — Scheduled tasks (cron) for DeepSeek Harness: model- and human-callable scheduling that fires followup/inject into agent sessions.
- [toolclub/dsh-agent-team-gui](https://github.com/toolclub/dsh-agent-team-gui) — Multi-agent squad GUI for DSH with per-agent provider/model routes, tool policies, and serial/parallel spawn/fork/chain orchestration.

- [olicesx/kixparadigm](https://github.com/olicesx/kixparadigm) — AI self-orchestrated minimal paradigm (resident cognition layer) + kixpower multi-agent orchestration; one-command import into DeepSeek Harness (npm i -g).
- [svmlearn/dsh-monkey-desk](https://github.com/svmlearn/dsh-monkey-desk) — A visual multi-agent workspace for DeepSeek Harness (DSH) Web.

## UI / Clients

_Desktop, web, terminal, or editor front-ends for DSH._

- [zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) — Plugin and skin collection for the DSH Web UI: task board, git graph, right-side panel, remote mobile UI, pet, live token stats, and a skin center.  `⭐506`
- [huiliyi37/dsh-tianshu-tui](https://github.com/huiliyi37/dsh-tianshu-tui) — Terminal UI for DeepSeek Harness.  `⭐73`
- [omdsh-dev/DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) — Full sidebar workbench: third-party tab registration, built-in file rendering/editing, terminal, Git, and sub-agents.  `⭐127`
- [ccch1mneyyy/dsh-cc-tui](https://github.com/ccch1mneyyy/dsh-cc-tui) — Claude-Code-style full-screen interactive terminal: streaming thought expansion, double-Esc rollback, context progress bar, and a TPS gauge.  `⭐197`
- [Small-tailqwq/dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) — Whale-girl skin series for the DSH Web UI (maid-atelier), CC BY-NC-SA 4.0.  `⭐119`
- [hust-open-atom-club/oh-dsh-desktop](https://github.com/hust-open-atom-club/oh-dsh-desktop) — Extensible macOS workbench with a native PTY, workspace tools, live bilingual plugins, and an isolated-preview plugin marketplace.
- [baiyuscc13724-max/deepseek-harness-desktop](https://github.com/baiyuscc13724-max/deepseek-harness-desktop) — Windows Electron shell for the official DSH Web UI with a Chinese installer, portable build, SHA-256-verified updates, and persistent themes with custom backgrounds.
- [omdsh-dev/dsh-at-file](https://github.com/omdsh-dev/dsh-at-file) — Codex-style `@file` mentions: search workspace files in the composer and attach their contents to prompts.  `⭐25`
- [omdsh-dev/dsh-notification](https://github.com/omdsh-dev/dsh-notification) — Desktop notifications for turn completions, with per-outcome controls and include/exclude keyword rules.  `⭐25`
- [alingalingling/ui-status-label](https://github.com/alingalingling/ui-status-label) — Customize the "deep diving" thinking status label into anything you like.  `⭐21`
- [Anionex/dsh-turn-rewind](https://github.com/Anionex/dsh-turn-rewind) — Rewind conversation and workspace state, powered by a persistent change ledger.  `⭐23`
- [bobleer/dsh-acp-for-bitfun](https://github.com/bobleer/dsh-acp-for-bitfun) — ACP bridge plugin connecting BitFun with DSH.
- [Moeblack/dsh-message-edit](https://github.com/Moeblack/dsh-message-edit) — Branch-based message editing, reroll, retry, and a version timeline.  `⭐11`
- [Lum1104/dsh-browser](https://github.com/Lum1104/dsh-browser) — Chrome side-panel extension for driving the browser directly with DSH, with zero vision-model dependency.  `⭐26`
- [hellodigua/dsh-share](https://github.com/hellodigua/dsh-share) — One-click conversation sharing.  `⭐11`
- [openma-ai/deepseek-harness-acp](https://github.com/openma-ai/deepseek-harness-acp) — ACP profile plugin and standalone server that exposes the full DSH agent to Zed and other ACP clients while sharing DSH credentials, sessions, and MCP configuration.
- [chen-001/dsh-grok-tui](https://github.com/chen-001/dsh-grok-tui) — Use DSH through grok-build's TUI.
- [ccq1/dsh-side-panel](https://github.com/ccq1/dsh-side-panel) — Side panel integrating a file browser, terminal, and Git review for quick file preview.
- [lhh010/dsh-ui-whale](https://github.com/lhh010/dsh-ui-whale) — Hand-drawn pixel whale companion living in the session title bar: blinks and swims while idle, animates while thinking, sprays water on turn completion; zero core changes.  `⭐16`
- [lhh010/dsh-ui-progress](https://github.com/lhh010/dsh-ui-progress) — Session progress bar docked at the composer: real todo progress, live token generation rate, interrupt state, and todo reminders; zero core changes.
- [omdsh-dev/dsh-annotation](https://github.com/omdsh-dev/dsh-annotation) — Select text, annotate, and send annotations along with your message; replies map back to each annotation one by one.  `⭐18`
- [Ruler4396/dsh-launcher](https://github.com/Ruler4396/dsh-launcher) — Lightweight Windows launcher: silent autostart at logon plus a minimal WebView2 window instead of a full browser.  `⭐21`
- [renat3u/dsh-web-archive](https://github.com/renat3u/dsh-web-archive) — Collapses noisy messages (thinking, bash output, etc.) in the conversation.
- [renat3u/dsh-paseo](https://github.com/renat3u/dsh-paseo) — Registers DSH as a Paseo ACP provider: run and manage multiple parallel DSH agents from Paseo's desktop/web/mobile clients.
- [Small-tailqwq/dsh-deepcel](https://github.com/Small-tailqwq/dsh-deepcel) — An Excel-style skin for DSH.
- [titanwings/dsh-plannotator](https://github.com/titanwings/dsh-plannotator) — Plan-review plugin: select plan text, add anchored annotations, and send structured feedback back to the agent.
- [vibeinging/dsh-work](https://github.com/vibeinging/dsh-work) — Local-first Electron workbench combining agent sessions, project files, data analysis, web research, MCP, and Office artifacts.
- [whiteguo233/dsh-cc-connect](https://github.com/whiteguo233/dsh-cc-connect) — Use DSH remotely through CC Connect.
- [dbydd/dsh-onlyne](https://github.com/dbydd/dsh-onlyne) — Gives DSH agents a real IM inbox/outbox (Telegram, Feishu/Lark, QQ Bot, WeChat) through the Onlyne workspace-local channel daemon.
- [LaplaceYoung/dsh-qq2006](https://github.com/LaplaceYoung/dsh-qq2006) — QQ2006 skin: registers a `qq2006` theme with a full global skin table and assets.
- [vlln/whale-girl](https://github.com/vlln/whale-girl) — Desktop-pet plugin for the Web GUI (QQ-pet style): a draggable floating companion you can feed and play with.  `⭐27`
- [swaylq/dsh-digipet](https://github.com/swaylq/dsh-digipet) — Digimon-style raising game: hatch an egg that feeds on real work (turns, tools, errors) and evolves along four lines shaped by how you work; command-only, zero tokens, no model-facing surface.
- [ccch1mneyyy/dsh-working-activity](https://github.com/ccch1mneyyy/dsh-working-activity) — Live model working-status line for the TUI prompt bar and Web UI: playful thinking copy, running tools, turn summaries, and self-narration.
- [orriduck/dsh-tui](https://github.com/orriduck/dsh-tui) — A small, session-aware terminal UI for DeepSeek Harness.
- [openma-ai/deepseek-harness-tui](https://github.com/openma-ai/deepseek-harness-tui) — Rust/ratatui terminal client that speaks the DSH SDK JSON-RPC protocol directly and runs standalone or as a profile bundle.
- [bill9109/dsh-conversation-share](https://github.com/bill9109/dsh-conversation-share) — Share arbitrary segments of a DSH conversation.
- [bobleer/deepseek-harness-gui](https://github.com/bobleer/deepseek-harness-gui) — Tauri 2 desktop shell for DeepSeek Harness, following BitFun desktop + web-ui layout.
- [bruc3van/dsh-desktop](https://github.com/bruc3van/dsh-desktop) — Standalone Electron desktop client wrapping the official Web UI, with session sharing, local workspaces, remote connections, and a system tray.
- [Moresyl/dsh-studio](https://github.com/Moresyl/dsh-studio) — Cross-platform Rust/Tauri desktop shell that supervises `dsh web`, reclaims process trees, selects free ports, and publishes Windows/Linux/macOS installers without forking the upstream UI.
- [chen-001/dsh-chat-width](https://github.com/chen-001/dsh-chat-width) — Adjusts the width of DSH replies.
- [dingyi222666/dsh-session-notification](https://github.com/dingyi222666/dsh-session-notification) — Notifications for four session states (completion etc.), via browser alerts or prompt injection.
- [hellodigua/dsh-emoji](https://github.com/hellodigua/dsh-emoji) — Automatically adds emoji to AI replies.
- [icodesign/orbis](https://github.com/icodesign/orbis) — Mobile client for DeepSeek Harness remote control.
- [lhh010/dsh-input-history](https://github.com/lhh010/dsh-input-history) — Terminal-style input history for the Web UI: recall sent messages with Ctrl+Up/Ctrl+Down; zero core changes.
- [lhh010/dsh-minigames](https://github.com/lhh010/dsh-minigames) — Right-side panel with 18 offline minigames (Tetris, Minesweeper, 2048, Sudoku, etc.) and an extensible game registry.
- [lhh010/dsh-paste-input](https://github.com/lhh010/dsh-paste-input) — File-input enhancements for the Web UI: Ctrl+V paste, drag-and-drop, and file picking, copied into the session workspace on send.
- [Moeblack/deepseek-manners](https://github.com/Moeblack/deepseek-manners) — Injects a thank-you note after every message.
- [Moeblack/dsh-prompt-studio](https://github.com/Moeblack/dsh-prompt-studio) — Prompt Studio: edit user and built-in system-prompt sections with live preview.
- [sjh9714/dsh-movein](https://github.com/sjh9714/dsh-movein) — Moves a whole Claude Code setup into DSH in one command (skills, MCP servers, hooks, subagents, permission rules) with a dry-run moving estimate and a migration diff report; complements dsh-chat-import, which handles the conversations.
- [Nwflower/dsh-chat-import](https://github.com/Nwflower/dsh-chat-import) — Imports full-fidelity conversation histories from 13 coding agents (Claude Code / Codex / ChatGPT / Cursor / Gemini / Reasonix / opencode / ZCode / Grok Build / OpenClaw / Pi / Hermes / Kimi) so conversations can continue in DSH, with reverse export/sync back to Claude Code.
- [omdsh-dev/7d7d](https://github.com/omdsh-dev/7d7d) — 7k7k-style game portal: the model generates or uploads HTML5/Flash minigames playable in the Web UI (fixed-version, checksum-verified Ruffle for Flash).
- [omdsh-dev/dsh-auto-chess](https://github.com/omdsh-dev/dsh-auto-chess) — Auto-chess in the DSH Web UI: play against the AI or watch two AIs battle.
- [omdsh-dev/dsh-daily-fortune](https://github.com/omdsh-dev/dsh-daily-fortune) — Daily fortune plugin with Guan Yin lots, Tarot spreads, and daily quotes.
- [omdsh-dev/dsh-daily-progress](https://github.com/omdsh-dev/dsh-daily-progress) — Daily plan and achievement system with completion-rate, streak, and weekly metrics.
- [Blaczz/dsh-achievements](https://github.com/Blaczz/dsh-achievements) — Gamification: cross-session achievement badges for turns, tool calls, sessions and daily streaks, with a badge panel, unlock toasts and a `ctx.achievements` service.
- [omdsh-dev/dsh-fun-ticker](https://github.com/omdsh-dev/dsh-fun-ticker) — Market ticker marquee for crypto, FX, A-shares, indices, and HK/US stocks, using keyless data sources with a host proxy and caching.
- [omdsh-dev/dsh-fun-typewriter](https://github.com/omdsh-dev/dsh-fun-typewriter) — WebAudio typing ambience with a plugin-owned settings API and zero audio assets.
- [Blaczz/dsh-soundscape](https://github.com/Blaczz/dsh-soundscape) — Web UI session soundscape: turn-complete celebration (synthesized chime + confetti), blocked/approval alerts, error buzz and optional typing ambience; zero audio assets, plus a `ctx.soundscape` service.
- [omdsh-dev/dsh-fun-weather](https://github.com/omdsh-dev/dsh-fun-weather) — Weather tab and weather-following themes powered by Open-Meteo.
- [omdsh-dev/dsh-gomoku](https://github.com/omdsh-dev/dsh-gomoku) — Play Gomoku against the AI in DSH, or pit two AIs against each other.
- [omdsh-dev/dsh-pet-corner](https://github.com/omdsh-dev/dsh-pet-corner) — Floating pet with a keyless pet-image proxy, favorites, and a plugin-owned settings API.
- [omdsh-dev/dsh-voice-funasr](https://github.com/omdsh-dev/dsh-voice-funasr) — Local offline voice input for the Web UI: push-to-talk transcription with a local FunASR engine and optional LLM polish.
- [omdsh-dev/toybox](https://github.com/omdsh-dev/toybox) — Toybox of playful DSH plugins: fun skills, quirky MCP servers, and other just-for-fun experiments.
- [qyw233/dsh-deeplink](https://github.com/qyw233/dsh-deeplink) — Deep links for the Web UI: open a given session or workspace directly via `?session=`/`?workspace=`.
- [renat3u/tonghuashun-webui](https://github.com/renat3u/tonghuashun-webui) — Tonghuashun-style (stock-terminal) Web UI skin plugin.
- [SenmuuuuW/dsh-group-photo](https://github.com/SenmuuuuW/dsh-group-photo) — Beta-farewell photo wall: a Polaroid-style group-photo site with zero-permission GitHub OAuth and an allowlist check, wrapped as a DSH skill.  `⭐12`
- [Small-tailqwq/dsh-tps](https://github.com/Small-tailqwq/dsh-tps) — A simple TPS (tokens-per-second) plugin.
- [SnowCrescenter-tech/dsh-launcher](https://github.com/SnowCrescenter-tech/dsh-launcher) — One-click portable Windows launcher (no Node.js, pnpm, or CLI required).
- [vlln/dsh-navbar](https://github.com/vlln/dsh-navbar)
- [Blaczz/dsh-turn-dots](https://github.com/Blaczz/dsh-turn-dots) — Codex-style conversation turn rail: one dot per user turn on the left edge, hover to enlarge and preview, click to jump, with a scroll-spy active marker. — Conversation node navigation bar: jump between user messages from a right-edge node strip.
- [urzeye/dsh-outline](https://github.com/urzeye/dsh-outline) — Real-time conversation outline for the DSH Web session page: a tree of user questions and Markdown headings (H1-H6) that updates live during streaming, with click-to-jump highlight, expand-depth control, search, and per-session favorites.
- [vlln/dsh-task-status](https://github.com/vlln/dsh-task-status) — Background task status bar with task progress and live output tail on the conversation page.
- [yuezengwu/dsh-explain](https://github.com/yuezengwu/dsh-explain) — Local-first learning mode: cross-session global learning threads, per-source explanations, and a diagnosable settings UI.
- [yuxino/dsh-blue-whale-maid](https://github.com/yuxino/dsh-blue-whale-maid) — Blue-whale-maid desktop pixel pet living in the DSH Web GUI.
- [MashedPotato817/dsh-tui](https://github.com/MashedPotato817/dsh-tui) — Terminal client with Vim-mode keybindings.
- [NEXTINDIE/DeepSeek-Harness-for-VS-Code](https://github.com/NEXTINDIE/DeepSeek-Harness-for-VS-Code) — VS Code integration for DSH.
- [luo-ross/dsh-desktop](https://github.com/luo-ross/dsh-desktop) — Unofficial desktop client.
- [Missher12/deepseek-harness-desktop](https://github.com/Missher12/deepseek-harness-desktop) — Unofficial desktop client.
- [ningbainb/deepseek-harness-desktop](https://github.com/ningbainb/deepseek-harness-desktop) — Unofficial desktop client.
- [xccElephant/deepseek-harness-desktop](https://github.com/xccElephant/deepseek-harness-desktop) — Unofficial desktop client.
- [Tom6814/dsh-web](https://github.com/Tom6814/dsh-web) — Docker-based web deployment.
- [skitse/dsh-dev-actions](https://github.com/skitse/dsh-dev-actions) — One-click shortcuts for common dev commands.
- [Wine-Red/dsh-prompt-stash](https://github.com/Wine-Red/dsh-prompt-stash) — Stash and recall prompts.
- [crystalWinter666/dsh-header-status](https://github.com/crystalWinter666/dsh-header-status) — Moves the info bar next to the title.
- [Luaphes/dsh-web-attention-badge](https://github.com/Luaphes/dsh-web-attention-badge) — Attention badge for the web UI.
- [01Virex/dsh-status-rotator](https://github.com/01Virex/dsh-status-rotator) — Replaces the "Deep diving…" turn-status label with phase-aware, typewriter-animated, rainbow-gradient phrases, configurable from a JSON file.
- [cakeni/harness-whale](https://github.com/cakeni/harness-whale) — Unofficial community pet for DeepSeek Harness — a native DSH web plugin.
- [Carleo10032/deepseek-harness-mac](https://github.com/Carleo10032/deepseek-harness-mac) — Unofficial SwiftUI macOS shell for the DeepSeek Harness local web UI.
- [causebefore/dsh-pomodoro](https://github.com/causebefore/dsh-pomodoro) — Pomodoro-timer plugin for the DSH Web UI: configurable focus/break durations, sidebar entry, and a draggable floating panel.
- [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) — Claude-Code-style full-screen interactive terminal plugin: pixel-whale top bar, live work-status line, streaming thought expansion, double-Esc rollback, context progress bar, and a TPS gauge.
- [CCMu04/DSHDesktop](https://github.com/CCMu04/DSHDesktop) — Unofficial Windows desktop client for the unmodified DeepSeek Harness Web UI.
- [cyberlieflife/dsh-model-thinking](https://github.com/cyberlieflife/dsh-model-thinking) — Thinking-intensity / reasoning-effort settings for custom OpenAI-compatible models.
- [czzzlq/deepseek-harness-desktop](https://github.com/czzzlq/deepseek-harness-desktop) — Desktop client for DeepSeek Harness.
- [FreeCodeCampXYG/starline-dsh-desktop](https://github.com/FreeCodeCampXYG/starline-dsh-desktop) — Cross-platform Go and Wails desktop host for DeepSeek Harness, with proxy controls and native packaging.
- [Han-1413141/dsh-sticky-disclosure](https://github.com/Han-1413141/dsh-sticky-disclosure) — Pins off-screen expanded collapsible tags (Think / tool cards) to the top of the conversation viewport, with a collapse hotkey.
- [lynkas/dsh-think-flow-flow](https://github.com/lynkas/dsh-think-flow-flow) — Constant-rate typewriter reveal for assistant output and reasoning, with per-model gating.
- [pingfanfan/hello-dsh](https://github.com/pingfanfan/hello-dsh) — Zero-to-plugin tutorial for DeepSeek Harness's "everything is a plugin" architecture, with 22 example skills.
- [qingchunnh/dsh-desktop](https://github.com/qingchunnh/dsh-desktop) — Desktop client for DeepSeek Harness that auto-detects the local environment and launches/connects to the Web UI.
- [sleep2agi/DeepSeek-Harness-Desktop](https://github.com/sleep2agi/DeepSeek-Harness-Desktop) — Unofficial community desktop shell for the public DeepSeek Harness runtime.
- [tttnny/DSH-Launcher](https://github.com/tttnny/DSH-Launcher) — macOS menu-bar app that manages the DeepSeek Harness web service via launchd.
- [xiaoshihou514/dsh-tui](https://github.com/xiaoshihou514/dsh-tui) — Terminal UI for DeepSeek Harness.
- [xing-shuyin/ds-web-ui](https://github.com/xing-shuyin/ds-web-ui) — Web UI plugin for DeepSeek Harness.
- [zimzaza4/dsh-bash-win](https://github.com/zimzaza4/dsh-bash-win) — Provides Git Bash and WSL2 bash tools for DeepSeek Harness on Windows, with a bwrap sandbox, approval mode, and background tasks.
- [arcmosin/dsh-wordbox](https://github.com/arcmosin/dsh-wordbox) — DSH Web GUI common-words box, for storing and pasting frequently used project terms.
- [bill9109/dsh-101](https://github.com/bill9109/dsh-101) — Document reading mode for DSH.
- [BrambleXu/dsh-prompt-profile](https://github.com/BrambleXu/dsh-prompt-profile) — Reusable Markdown prompt profiles for DeepSeek Harness with per-turn model selection, argument substitution, and state restoration.
- [ChengChe106/dsh-web-auto-open](https://github.com/ChengChe106/dsh-web-auto-open) — Web auto-open plugin for DeepSeek Harness.
- [ChisaAlter/Deepseek-Harness-Desktop](https://github.com/ChisaAlter/Deepseek-Harness-Desktop) — Electron desktop shell for the DeepSeek Harness web UI.
- [dancingmemory/dskin](https://github.com/dancingmemory/dskin) — DSKIN: DeepSeek Harness (DSH) cartoon pixel skin plugin for the DSH Web GUI — the original interface stays put, while living pixel pets stroll, blink, and hop.
- [Easyhoov/deepseek-harness-desktop](https://github.com/Easyhoov/deepseek-harness-desktop) — Unofficial in-process desktop app for DeepSeek Harness: the host composition boots inside the Electron main process with zero ports and an IPC bridge.
- [Eveerme/deepseek-harness-desktop](https://github.com/Eveerme/deepseek-harness-desktop) — Unofficial Electron desktop shell for DeepSeek Harness (dsh web).
- [jiangnanquan/dsh-ux](https://github.com/jiangnanquan/dsh-ux) — DSH web UI enhancement plugin plus a borderless Electron desktop shell.
- [KevPH2026/deepseek-harness-desktop](https://github.com/KevPH2026/deepseek-harness-desktop) — A native macOS desktop experience for DeepSeek Harness — multimodal generation, community plugin discovery, safe updates, and bilingual docs.
- [LodyAI/acp-extension-dsh](https://github.com/LodyAI/acp-extension-dsh) — ACP extension for DeepSeek Harness.
- [lukethecat/mdPresenter](https://github.com/lukethecat/mdPresenter) — Markdown-driven macOS presentation tool, iA Presenter-compatible with Liquid Glass visuals — vibe-coded with DeepSeek Harness.
- [luoyu-xingu/dsh-background](https://github.com/luoyu-xingu/dsh-background) — DeepSeek Harness Web background-image plugin: replaces the web background with a local image path, with an appearance-settings row and live preview.
- [orxz/deepseek-harness-themes](https://github.com/orxz/deepseek-harness-themes) — A collection of UI themes for DeepSeek Harness.
- [phper666/dsh-hull-desktop](https://github.com/phper666/dsh-hull-desktop) — Desktop developer tool built around DeepSeek Harness — native shell, in-app upgrades, no forking.
- [realchenwenqiao/dash](https://github.com/realchenwenqiao/dash) — DASH — a pi-tui terminal front door for DeepSeek Harness, installed as a dsh bundle plugin.
- [sorsama/deepseek-harness-mobile](https://github.com/sorsama/deepseek-harness-mobile) — Android companion for DeepSeek Harness: chat, goals, approvals, and notifications from your phone over your LAN (Kotlin + Jetpack Compose).
- [suzike/freestyle-dsh-theme](https://github.com/suzike/freestyle-dsh-theme) — DeepSeek Harness theme-experience plugin: OKLCH theme proposals plus a theme designer with cross-restart persistence.
- [xiaoshihou514/dsh-desktop-pet](https://github.com/xiaoshihou514/dsh-desktop-pet) — DeepSeek Harness: a whale-girl desktop pet!
- [xuender/dsh-history](https://github.com/xuender/dsh-history) — Recall and re-run the current session's command history with ↑/↓ keys in the DSH Web composer.
- [xydadada/adhd-one](https://github.com/xydadada/adhd-one) — An unofficial, batteries-included Windows desktop for DeepSeek Harness.
- [zprolab/WhaleKit](https://github.com/zprolab/WhaleKit) — Superpowers customized for DeepSeek Harness.
- [a903067276-rgb/dsh-file-mentions](https://github.com/a903067276-rgb/dsh-file-mentions) — Clickable file paths in DSH replies: Codex-style inline open, a reveal-in-file-manager button, and a mentioned-files chip list. Zero-dependency DSH web plugin.
- [Asaiuta/dsh-session-hub](https://github.com/Asaiuta/dsh-session-hub) — Aggregate and natively control multiple remote DeepSeek Harness (DSH) servers' sessions from one official Web UI — hub gateway + official-UI bridge.
- [asukasec/dsh-message-preview](https://github.com/asukasec/dsh-message-preview) — Right-side user-message navigator for the DeepSeek Harness Web UI.
- [beijingwahw/dsh-conv-search](https://github.com/beijingwahw/dsh-conv-search) — In-conversation text search plugin for DeepSeek Harness (Ctrl+F, match case, whole word, streaming-aware).
- [blue-a11y/dsh-client-shortcuts](https://github.com/blue-a11y/dsh-client-shortcuts) — Global keyboard shortcuts plugin for the DeepSeek Harness web GUI: a `ctx.shortcuts` registry service plus mod+l/mod+k/mod+shift+c default bindings.
- [forrestahha/dsh-voice-input](https://github.com/forrestahha/dsh-voice-input) — Voice-to-text input plugin for the DeepSeek Harness Web UI.
- [heartmove/dsh-side-chat](https://github.com/heartmove/dsh-side-chat) — A DSH web plugin: select part of a conversation and ask about it in a side chat — an isolated chat panel on the right, scoped to the main session that spawned it.
- [JasonJin2006/dsh-sound-effects-plugin](https://github.com/JasonJin2006/dsh-sound-effects-plugin) — Sound effects plugin for DeepSeek Harness: ambient work music, success chime, and attention chime.
- [jilian-dsh/dsh-rules-manager](https://github.com/jilian-dsh/dsh-rules-manager) — Rules & commands manager for DeepSeek Harness: a `/rules` command, a settings panel, and custom commands.
- [ouyangyipeng/dsh-desktop](https://github.com/ouyangyipeng/dsh-desktop) — Unofficial desktop launcher and runtime supervisor for DeepSeek Harness.
- [qzhqzh/dsh-quickstart](https://github.com/qzhqzh/dsh-quickstart) — Desktop launcher for DeepSeek Harness: starts dsh web with no console window and auto-opens the browser. Tested on Windows; macOS/Linux in progress.
- [rirko/dsh-melody-launcher](https://github.com/rirko/dsh-melody-launcher) — Desktop launcher and plugin manager for DeepSeek Harness.
- [sakurarain1213/deepseek-harness-lite](https://github.com/sakurarain1213/deepseek-harness-lite) — A lightweight, local-first distribution and verified plugin kit for DeepSeek Harness.
- [slicenferqin/dsh-whale-tui](https://github.com/slicenferqin/dsh-whale-tui) — grok-build style terminal UI for DeepSeek Harness: a Rust/ratatui TUI shipped as a dsh plugin bundle.
- [TheChengXi/opendsh](https://github.com/TheChengXi/opendsh) — Open the DeepSeek Harness Web UI inside VS Code, with one-command start/stop for the current workspace.
- [VickylastShao/deepseek-harness-desktop](https://github.com/VickylastShao/deepseek-harness-desktop) — Unofficial cross-platform Electron desktop launcher for DeepSeek Harness with staged background runtime updates.
- [wenliang9527/dsh-eye](https://github.com/wenliang9527/dsh-eye) — DeepSeek Harness plugin (no description provided upstream).
- [zasSYJ/deepseek-harness-desktop](https://github.com/zasSYJ/deepseek-harness-desktop) — Unofficial Windows desktop wrapper for DeepSeek Harness (dsh).
- [zealot00/dsh-pet](https://github.com/zealot00/dsh-pet) — Desktop pet for DeepSeek Harness Web UI: sprite animation, agent state linkage, drag, alarm & pomodoro widgets, skin separation.
- [ZgblKylin/dsh-gui](https://github.com/ZgblKylin/dsh-gui) — Tauri GUI with an integrated DeepSeek Harness, plus a plugin bundle.
- [SamXiaBing/dsh-adb](https://github.com/SamXiaBing/dsh-adb) — ADB-related plugin for DeepSeek Harness (no description provided upstream).
- [610la/dsh-notification-center](https://github.com/610la/dsh-notification-center) — DSH notification center plugin: triggers browser notifications plus 21 matching sound effects on events such as conversation/task completion, errors, and pending approvals.
- [beijingwahw/dsh-conv-export](https://github.com/beijingwahw/dsh-conv-export) — dsh-conv-export: export the current DeepSeek Harness conversation as Markdown, PDF, or a long PNG image.
- [Dbi-Eshuh/dsh-thinking-status-customizer](https://github.com/Dbi-Eshuh/dsh-thinking-status-customizer) — Customize the visible DSH Web thinking status with lifecycle-safe CSS.
- [FlowerWater1019/Angelina-dsh-plugin](https://github.com/FlowerWater1019/Angelina-dsh-plugin) — A DeepSeek Harness UI plugin (Angelina).
- [JingkaiTang/dsh-client-ui-slingshot](https://github.com/JingkaiTang/dsh-client-ui-slingshot) — Interactive slingshot toy for the dsh web GUI: shatter UI elements, watch them tumble off screen, then recover. A dsh.client plugin, zero deps.
- [kouyichi/dsh-tui-app](https://github.com/kouyichi/dsh-tui-app) — DeepSeek Harness terminal UI plugin (Ink/React).
- [LAN-TINA-WS/dsh-gui-customization](https://github.com/LAN-TINA-WS/dsh-gui-customization) — The fashion workshop for the DSH web UI: swap looks with a Nous-blue color scheme, ambient lighting, and background-image presets, bilingual (中/英).
- [lco117/dsh-think-any-lang](https://github.com/lco117/dsh-think-any-lang) — DeepSeek Harness plugin: choose the language used for model chain-of-thought reasoning from Settings → General. System-prompt based, zero extra calls, zero latency, supports 12 languages.
- [lire1131/dsh-undo-plugin](https://github.com/lire1131/dsh-undo-plugin) — DSH plugin: snapshot & rollback your plugin/skin/settings configs. Auto-save on change, undo/redo stack, snapshot manager panel, keyboard shortcuts, plus an offline PowerShell CLI & GUI that work even when DSH won't boot.
- [TQSY114514/dsh-ui-appearance](https://github.com/TQSY114514/dsh-ui-appearance) — Appearance customization plugin for DeepSeek Harness: theme color palette, background image, opacity/blur, glass effect.
- [urzeye/dsh-outline](https://github.com/urzeye/dsh-outline) — A real-time outline plugin for the DeepSeek Harness (DSH) web GUI.
- [wuwuzhige-sudo/dsh-terminal-panel](https://github.com/wuwuzhige-sudo/dsh-terminal-panel) — A manual Terminal tab for the DeepSeek Harness (dsh) web UI — run commands on the host machine, persistent cwd, sudo password prompt, command history.
- [xtxo/dsh-ui](https://github.com/xtxo/dsh-ui) — DeepSeek Harness desktop UI.
- [zhuquan7237/zhuquan7237.github.io](https://github.com/zhuquan7237/zhuquan7237.github.io) — DeepSeek Harness Desktop (dsh desktop edition): Windows/Linux/macOS installer, a Codex-style GUI for the official @deepseek-ai/dsh, auto-updates the harness from npm.
- [yyh-001/dsh-expression](https://github.com/yyh-001/dsh-expression) — Findable, sendable — DSH emoji/sticker plugin: semantic image search that only sends real files, over the companion QQ channel.
- [chentao326/dsh-gui](https://github.com/chentao326/dsh-gui) — Native macOS desktop GUI for DeepSeek Harness: a double-click DSH desktop client (Swift + WKWebView, zero dependencies).
- [antinomie1/deepseek-harness-desktop](https://github.com/antinomie1/deepseek-harness-desktop) — A minimal Tauri desktop shell for DeepSeek Harness (dsh).
- [EDMOK/deepseek-harness-desktop](https://github.com/EDMOK/deepseek-harness-desktop) — DeepSeek Harness desktop edition: an Electron-based Windows x64 Web UI, CLI runtime, and extensible plugin ecosystem.
- [W117C/deepseek-forge](https://github.com/W117C/deepseek-forge) — DeepSeek Harness client tool (no description provided upstream).
- [x118111/prompt-optimizer](https://github.com/x118111/prompt-optimizer) — A DeepSeek Harness dynamic plugin that adds a ✨ optimize-prompt button to the chat composer — context-aware LLM rewriting with model fallback and visible errors.
- [kongxiangyiren/dhs-theme-plugin](https://github.com/kongxiangyiren/dhs-theme-plugin) — A theme-management plugin for DeepSeek Harness.
- [leavestring/awesome-dsh-background-plugin](https://github.com/leavestring/awesome-dsh-background-plugin) — DSH Web background-personalization plugin: upload your own image or one-click switch between preset aurora/ember/rice-paper ambiences, with live preview, fine-tuning of presence/dimming/blur/fit, local-only processing, and a bilingual UI.
- [qjcnmd/dsh-reasoning-slider](https://github.com/qjcnmd/dsh-reasoning-slider) — A reasoning-effort slider plugin for DeepSeek Harness (no description provided upstream).
- [ystyle/dsh-tool-terminal-search](https://github.com/ystyle/dsh-tool-terminal-search) — A terminal search tool plugin for DeepSeek Harness (no description provided upstream).
- [mervyn-teo/dsh-plugin-qr-connect](https://github.com/mervyn-teo/dsh-plugin-qr-connect) — DeepSeek Harness dynamic plugin: a QR-code sidebar button for connecting mobile devices to the web UI.
- [SenmuuuuW/dsh-whale-report](https://github.com/SenmuuuuW/dsh-whale-report) — 🐋 Whale Report — your agent's annual report: generates daily/weekly/monthly/yearly reports from session event logs for any date range, read-only.
- [silencieuxzero/Better_Deepseek_Harkness](https://github.com/silencieuxzero/Better_Deepseek_Harkness) — Better DeepSeek Harness: web-UI extensions and enhancements.
- [YTxue/dsh-skill-manager](https://github.com/YTxue/dsh-skill-manager) — DSH web plugin: skill manager in the Settings sidebar — list/enable/disable, folder batch import with conflict prompts, state-driven one-click DSH-spec check & auto-fix, system/project scope labels.
- [AcidGr/dsh-web-lan-access](https://github.com/AcidGr/dsh-web-lan-access) — DeepSeek Harness (dsh) Web plugin for LAN access.
- [AcidGr/dsh-web-mobile-fix](https://github.com/AcidGr/dsh-web-mobile-fix) — DeepSeek Harness (dsh) Web plugin with mobile UI fixes.
- [ayuanwong/deepseek-harness-ux](https://github.com/ayuanwong/deepseek-harness-ux) — Long agent tasks without transcript clutter: focused progress, auto-folded history, details on demand.
- [CH4ACKO3/dsh-ui-container](https://github.com/CH4ACKO3/dsh-ui-container) — Remote-capable recursive UI surface container for DeepSeek Harness.
- [CH4ACKO3/dsh-ui-workbench](https://github.com/CH4ACKO3/dsh-ui-workbench) — Composable workbench primitives for DeepSeek Harness UI plugins.
- [CZX2244/dsh-bilibili](https://github.com/CZX2244/dsh-bilibili) — Bilibili integration plugin for DeepSeek Harness (no description provided upstream).
- [edabchann/dsh-neotui](https://github.com/edabchann/dsh-neotui) — Neo-TUI: mouse-driven terminal UI client for DeepSeek Harness.
- [great-man2096/dsh-launcher](https://github.com/great-man2096/dsh-launcher) — One-click DSH launcher: starts the web service in the background and auto-opens the browser.
- [LambProgrammer/dsh-desktop-zero](https://github.com/LambProgrammer/dsh-desktop-zero) — Unofficial DeepSeek Harness desktop wrapper: self-contained Windows GUI, zero-config, ready to run.
- [Lu-Yu-Zhen/deepseek-harness-custom-skin](https://github.com/Lu-Yu-Zhen/deepseek-harness-custom-skin) — Custom background skin plugin for DeepSeek Harness web UI — upload background image, adjust opacity/contrast, manage named skins.
- [MichengAI/deepseek-harness-desktop](https://github.com/MichengAI/deepseek-harness-desktop) — Cross-platform desktop for DeepSeek Harness, no environment setup required.
- [Myoontyee/deepseek-harness-desktop](https://github.com/Myoontyee/deepseek-harness-desktop) — DeepSeek Harness desktop client: Tauri + WebView2 shell with bundled Node/pnpm, auto-updates from deepseek-ai/deepseek-harness.
- [nevertoday/dsh-theme-plugin](https://github.com/nevertoday/dsh-theme-plugin) — Theme plugin for DeepSeek Harness (no description provided upstream).
- [PAKIKNOWLEDGE/dsh-client-ui-skin-claude](https://github.com/PAKIKNOWLEDGE/dsh-client-ui-skin-claude) — Claude-style skin for DeepSeek Harness (dsh) Web GUI — warm-black canvas, Anthropic clay accent, serif UI.
- [rxh1999/dsh-jingle](https://github.com/rxh1999/dsh-jingle) — DeepSeek Harness plugin (no description provided upstream).
- [sgzxs/dsh-global-task-list](https://github.com/sgzxs/dsh-global-task-list) — Global task-list plugin for DeepSeek Harness (no description provided upstream).
- [skr311/dsh-codex-pet](https://github.com/skr311/dsh-codex-pet) — Desktop-pet plugin: import sprite-sheet pet animations rendered as a floating overlay, linked to agent state.
- [Starmadebydata/deepseek-harness-macos](https://github.com/Starmadebydata/deepseek-harness-macos) — Native macOS wrapper for the DeepSeek Harness Web UI.
- [Yuuz12/dsh-webui-auth](https://github.com/Yuuz12/dsh-webui-auth) — WebUI authentication: HTTP/transport-layer login enforcement across resources, plugin bundles, `/api`, and WebSocket, with server-side sessions and HttpOnly cookies.
- [zhangzheng25/dsh-timeline](https://github.com/zhangzheng25/dsh-timeline) — Minimal question timeline for DeepSeek Harness: one dot per question, click to jump, hover to preview.
- [zhijun-dai/Catppuccin-dsh-theme](https://github.com/zhijun-dai/Catppuccin-dsh-theme) — Soothing pastel Catppuccin theme for DeepSeek Harness.
- [Boliban/dsh-enter-customizer](https://github.com/Boliban/dsh-enter-customizer) — A DSH plugin that allows customizable input modes.
- [cindyguyuehu123/dsh-webchatlike](https://github.com/cindyguyuehu123/dsh-webchatlike) — Web-chat style message actions for DeepSeek Harness: edit your prompt, regenerate answers, and flip versions with a deepseek.com-style `<i/N>` pager.
- [Half-xingle/dsh-notify-sounds](https://github.com/Half-xingle/dsh-notify-sounds) — Notification sound plugin for DeepSeek Harness.
- [hsy-1234/dsh-remote](https://github.com/hsy-1234/dsh-remote) — Remote access manager for DeepSeek Harness: access the Web UI from any device (LAN or Tailscale), with a persistent sidebar, one-click Tailscale login, and QR-code sharing.
- [miracle-ai-studio/deepseek-harness-desktop](https://github.com/miracle-ai-studio/deepseek-harness-desktop) — A native macOS desktop app for DeepSeek Harness.
- [RevolutionLA/dsh-dream-skin](https://github.com/RevolutionLA/dsh-dream-skin) — Skin/wallpaper/theme pack plugin for DeepSeek Harness: 8 Mirage themes, per-user accent colors, wallpaper 2.0, theme pack import/export & share links, favorites and shuffle — pure native token implementation.
- [xiake595/touhou-hakurei](https://github.com/xiake595/touhou-hakurei) — Touhou Hakurei Shrine themed skin (Reimu) for the DeepSeek Harness Web GUI: shrine day/night backgrounds, Reimu art, framed sidebar and input box, paper-white translucent UI.
- [xuboboo/dsh-gui](https://github.com/xuboboo/dsh-gui) — DeepSeek Harness desktop client (GUI): branded boot animation, DeepSeek design-language UI, and rc.5 startup crash fix. Third-party unofficial project.
- [zouyuxuan122/Deepseek-Harness-EAC](https://github.com/zouyuxuan122/Deepseek-Harness-EAC) — DeepSeek Harness Windows desktop client: bundled Node.js + dsh CLI, one-click launch, 10 built-in UI skins. EAC: Embracing All Creation 揽尽万象.

- [237229953-create/uiopt](https://github.com/237229953-create/uiopt) — DSH WebUI display enhancer: realtime balance, context ring, cache hit rate, provider icons, extra-plugin manager.
- [AKS1st/dsh-cyber-particle](https://github.com/AKS1st/dsh-cyber-particle) — Dynamic particle-network background plugin for the DeepSeek Harness web interface.
- [AlexCHONG8/dsh-viewboost](https://github.com/AlexCHONG8/dsh-viewboost) — aionui preview toolbar boost — Finder reveal / fullscreen / copy path / copy file, plus a token usage card.
- [Chance-Wu/dsh-task-capsule](https://github.com/Chance-Wu/dsh-task-capsule) — Collapses Harness execution into an always-visible, low-distraction task status indicator.
- [ChocoLZS/dsh-plugin-chat-menu](https://github.com/ChocoLZS/dsh-plugin-chat-menu) — Type `@` in a DSH session to browse the workspace and reference files/directories in any format without leaving the keyboard.
- [Highjobop/dsh-gadgets](https://github.com/Highjobop/dsh-gadgets) — Lightweight DSH tweaks: dsh-skin (appearance) + dsh-tidy (conversation folding & nav rail).
- [kc0ed/dsh-bottom-bar](https://github.com/kc0ed/dsh-bottom-bar) — Richer bottom-bar info display for DeepSeek Harness.
- [Links2008/DeepSeek-Harness-Desktop](https://github.com/Links2008/DeepSeek-Harness-Desktop) — Unofficial Windows desktop distribution of DeepSeek Harness with native notifications, smooth window controls, bundled runtime, and automatic updates; tracks the official master branch.
- [Melosic/dsh-invoke](https://github.com/Melosic/dsh-invoke) — Prompt Vault & Invoker for DeepSeek Harness: manage, categorize, and quickly invoke prompts via a sidebar GUI with copy-paste support.
- [mengyun233/dsh-codex-pet](https://github.com/mengyun233/dsh-codex-pet) — Migrates the Codex desk pet to DeepSeek Harness: identical animation, multi-session dialogs, and settings panel rendered in the DSH Web UI, one-click migration.
- [MoneShadow/DeepSeek-Harness-linux-](https://github.com/MoneShadow/DeepSeek-Harness-linux-) — Linux desktop client built on the official WebUI with a bundled external vision plugin (bring your own API key); four iterations so far.
- [penguin-oo/dsh-pathlink](https://github.com/penguin-oo/dsh-pathlink) — Ctrl+click file paths and links in DSH chat: paths open their folder in the OS file manager, links open in a new browser tab.
- [wangjicheng2004/dsh-desktop](https://github.com/wangjicheng2004/dsh-desktop) — Desktop wrapper for the DSH Web UI: double-click to launch the local service and open the interface; the service keeps running in the background after the window closes.
- [xiekai886/dsh-MusicPlayer](https://github.com/xiekai886/dsh-MusicPlayer) — Chat-and-listen music player plugin: draggable floating window with two collapsible modes, NetEase Cloud Music via Meting API, playlist import and song/artist search.
- [XMoon/dsh-pi-tui](https://github.com/XMoon/dsh-pi-tui) — Third-party TUI mode for DeepSeek Harness (dsh), built on a vendored fork of pi-tui.
- [yimeng-dev/dsh-traffic-light](https://github.com/yimeng-dev/dsh-traffic-light) — Multi-session agent status monitor for DeepSeek Harness.
- [yunxiiQwQ/dsh-maid-whale-webUI](https://github.com/yunxiiQwQ/dsh-maid-whale-webUI) — Whale-maid theme plugin for the DeepSeek Harness Web UI.
- [ZichengGurrr/dsh-window](https://github.com/ZichengGurrr/dsh-window) — Minimal launcher that puts the DSH Web UI into a native Windows standalone window (WebView2 / Edge engine).

- [988hj7tczd-oss/harness-desktop](https://github.com/988hj7tczd-oss/harness-desktop) — Out-of-the-box desktop client for DeepSeek Harness.
- [A-BigDog/Gandalf](https://github.com/A-BigDog/Gandalf) — Gandalf — Middle-earth fantasy theme for the DeepSeek Harness Web GUI: Gandalf sunrise background, 霞鹭文楷 monospace font, and Middle-earth-styled control customization.
- [AshModeling/dsh-light-theater](https://github.com/AshModeling/dsh-light-theater) — Tech-style “light theater” skin for the DeepSeek Harness Web UI composer (input box), following the current skin theme.
- [Cheyeah/dsh-drop-preview](https://github.com/Cheyeah/dsh-drop-preview) — Drag-and-drop file preview plugin for DSH: full-screen preview of images/Markdown/text, image zoom & rotate, persistent file box, one-click attach to AI.
- [hellosz/dsh-pets](https://github.com/hellosz/dsh-pets) — Pet companion plugin bringing Codex Pets to the DeepSeek Harness Web GUI: pet behavior animations show whether the agent is thinking, waiting for approval, or done.
- [JayZz210l/deepseek-harness-for-ide](https://github.com/JayZz210l/deepseek-harness-for-ide) — DeepSeek Harness fully embedded in JetBrains IDEs: agent chat, tool approvals, goals & plans, subagents and workflows. Install, set your API key once, and chat.
- [LeemanCheung/dsh-qq2007-skin](https://github.com/LeemanCheung/dsh-qq2007-skin) — QQ 2007-inspired retro messenger skin for the DeepSeek Harness Web GUI.
- [linkingoscar/dsh-attachment-formats](https://github.com/linkingoscar/dsh-attachment-formats) — Codex-style attachment formats for the DeepSeek Harness Web GUI: PDF text-layer extraction, Office text extraction, scanned-PDF OCR, long-document spill + index cards, image-to-PNG.
- [liveqte/dsh-lan-proxy](https://github.com/liveqte/dsh-lan-proxy) — Expose the dsh loopback Web UI to the LAN via a 0.0.0.0 reverse proxy, with on/off/status/logs embedded in the settings page (official bundle plugin).
- [MarcoG-h/DSH-Launcher](https://github.com/MarcoG-h/DSH-Launcher) — Offline one-click deployment launcher for DeepSeek Harness (desktop) plus third-party plugin management.
- [Mystery-God/dsh-chime](https://github.com/Mystery-God/dsh-chime) — Task-completion chime plugin for the DeepSeek Harness Web GUI: volume control, custom audio, Plugins settings page.
- [myYangyunfan/dsh_desktop](https://github.com/myYangyunfan/dsh_desktop) — DeepSeek Harness (dsh) Windows desktop client — bundled Node.js + dsh CLI, one-click launch.
- [nirvanaslash/dsh-artifact-preview](https://github.com/nirvanaslash/dsh-artifact-preview) — Codex-style artifact preview for DeepSeek Harness (DSH): produced-files card row in chat plus split-screen side preview (Markdown / code / CSV / JSON / images / HTML).
- [QinLuza/dsh-rollback-visual](https://github.com/QinLuza/dsh-rollback-visual) — Visual plugin for dsh /rollback: trajectory anchor badges with click-to-rollback.
- [RAFOLIE/dsh-desktop-windowos](https://github.com/RAFOLIE/dsh-desktop-windowos) — DeepSeek Harness desktop shell — Tauri v2, tray + native webchat + task-done toasts, single portable exe.
- [RizenHNT/dsh-skin-digital-arcade](https://github.com/RizenHNT/dsh-skin-digital-arcade) — Rizen Signal Console — digital arcade HUD skin for the DeepSeek Harness Web GUI: neon cyan/violet/magenta, pixel fonts, animated HUD sprites, custom cursor.
- [s3yf1337/dsh-desktop](https://github.com/s3yf1337/dsh-desktop) — Desktop profile for DeepSeek Harness: a native Tauri window over the harness web surface — tray, single-instance, OS notifications, suggest-only updater, native dialogs, drag & drop, in-app settings tab.
- [sperictao/codex-pro-max](https://github.com/sperictao/codex-pro-max) — Codex Pro Max — Tauri v2 desktop launcher: taskboard service management, Codex CDP panel injection, ~/.codex config guard, FastCtx MCP integration, DeepSeek Harness remote access, and self-updates.
- [sundusk/dsh-waterball-pet](https://github.com/sundusk/dsh-waterball-pet) — A floating water-ball pet plugin for the DeepSeek Harness Web UI.
- [Venus-Gan/dsh-console](https://github.com/Venus-Gan/dsh-console) — DeepSeek Harness (DSH) desktop client — plugin-based desktop UI with tray, GUI manager (MCP/skills/preferences), and a Codex-style “scheduled” panel, built with Tauri v2.
- [xituisuany-max/dsh-client-ui-pet](https://github.com/xituisuany-max/dsh-client-ui-pet) — Whale-girl desktop pet plugin for the DSH web GUI: 23 sprite-frame actions, multiple attach points, sitting-pose action set, token reporting, slider selector.
- [Xizhi1024/dsh-vs-sidebar](https://github.com/Xizhi1024/dsh-vs-sidebar) — VS Code sidebar extension for DeepSeek Harness.
- [xxccdl/deepseek-harness-desktop](https://github.com/xxccdl/deepseek-harness-desktop) — DeepSeek Harness Desktop — Electron shell wrapping dsh web with desktop-only plugins: memory viewer, computer use, desktop settings, scheduler, quick chat, and usage bar.
- [zhxqc/dsh-oh-my-theme](https://github.com/zhxqc/dsh-oh-my-theme) — Web plugin for DeepSeek Harness (dsh) with themes, global typography, @file mentions, project file tree, and Markdown preview.

## Skills

_Packaged task capabilities (markdown-based skills, tool packs)._

- [MartinDelophy/dsh-timeline-studio-plugin](https://github.com/MartinDelophy/dsh-timeline-studio-plugin) — Timeline Studio bundle for inspecting, previewing, transactionally editing, and rendering portable `.timeline` video projects from DSH.
- [Anionex/dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) — Vision tools for text-only models: intent-aware image Q&A, long-screenshot OCR, UI restoration, grounding, pixel diff, artifacts, and a Web UI.  `⭐150`
- [omdsh-dev/dsh-toolkit](https://github.com/omdsh-dev/dsh-toolkit)
- [Blaczz/dsh-sci](https://github.com/Blaczz/dsh-sci) — Zero-dependency scientific computing tools: physical-unit conversion, CODATA physical constants, and Runge-Kutta ODE/dynamical-system simulation. — Zero-dependency deterministic tool pack — time, encoding, JSON, calculator, CSV, regex, markdown, diff, stats, and schema — with a unified one-command install.  `⭐10`
- [Anionex/dsh-computer-use](https://github.com/Anionex/dsh-computer-use) — Accessibility-first macOS computer-use bundle with fresh observations, stale-state rejection, scoped permissions, and safe input.  `⭐12`
- [omdsh-dev/dsh-plugin-dev](https://github.com/omdsh-dev/dsh-plugin-dev) — Field notes on DSH plugin development (skill + docs): cordis dual copies, tsconfig setup, Windows junctions, multi-frame zstd, and other tested findings.
- [omdsh-dev/dsh-tool-csv](https://github.com/omdsh-dev/dsh-tool-csv) — CSV data tool (RFC 4180): parse, query, aggregate, and convert CSV text with a zero-dependency state-machine parser.
- [emredeveloper/deepseek-harness-huggingface](https://github.com/emredeveloper/deepseek-harness-huggingface) — Read-only Hugging Face Hub model discovery; registers an `hf_search_models` tool that needs no API key.
- [omdsh-dev/dsh-plugin-skills](https://github.com/omdsh-dev/dsh-plugin-skills) — Agent skills for building and testing DSH plugins — from scaffolding a new package to choosing test tiers — entirely inside an agent session.
- [omdsh-dev/dsh-book2skill](https://github.com/omdsh-dev/dsh-book2skill) — Book-to-skill pipeline: a five-stage long task (fetch, parse, understand, generate, install) with three human gates and a browser timeline panel.
- [omdsh-dev/dsh-github-integration](https://github.com/omdsh-dev/dsh-github-integration) — Static skill source for structured GitHub issue and pull-request campaigns: batch survey, triage, isolated fixes, and tracking-table updates.
- [omdsh-dev/dsh-tool-calculator](https://github.com/omdsh-dev/dsh-tool-calculator) — Calculator tool: safe math-expression evaluator with a zero-dependency recursive-descent parser.
- [omdsh-dev/dsh-tool-diff](https://github.com/omdsh-dev/dsh-tool-diff) — Diff tool: structured comparison and unified diffs for text, JSON, CSV, and Markdown; zero-dependency and read-only.
- [omdsh-dev/dsh-tool-encoding](https://github.com/omdsh-dev/dsh-tool-encoding) — Encoding/hash tool: base64/base64url/url/hex codecs, md5/sha1/sha256/sha512 hashes, and UUID generation; zero-dependency.
- [omdsh-dev/dsh-tool-json](https://github.com/omdsh-dev/dsh-tool-json) — JSON query tool: JMESPath-subset queries with a zero-dependency recursive-descent parser.
- [omdsh-dev/dsh-tool-markdown](https://github.com/omdsh-dev/dsh-tool-markdown) — Markdown tool: HTML-Markdown conversion, GFM table normalization, and TOC generation with a lightweight parser.
- [omdsh-dev/dsh-tool-regex](https://github.com/omdsh-dev/dsh-tool-regex) — Regex tool: test matches, extract capture groups, replace safely, and statically explain patterns without executing code.
- [omdsh-dev/dsh-tool-schema](https://github.com/omdsh-dev/dsh-tool-schema) — JSON Schema validation tool: validate/paths/explain/normalize with zero network access and no dynamic execution.
- [omdsh-dev/dsh-tool-stat](https://github.com/omdsh-dev/dsh-tool-stat) — Statistics tool: descriptive stats, percentiles, frequency distributions, and correlations; zero-dependency pure functions.
- [omdsh-dev/dsh-tool-time](https://github.com/omdsh-dev/dsh-tool-time) — Time tool: strict ISO 8601 parsing, IANA timezone conversion, UTC calendar math, and fixed-duration differences; zero-dependency.
- [cyanseek/dsh-native-playbook](https://github.com/cyanseek/dsh-native-playbook) — Skill guide covering native-capability usage patterns.
- [cui-stack/dsh-workspace-digest](https://github.com/cui-stack/dsh-workspace-digest) — DeepSeek Harness bundle providing a `workspace_digest` tool.
- [LayneChai/superpowers-dsh](https://github.com/LayneChai/superpowers-dsh) — Superpowers skills for DeepSeek Harness: TDD, debugging, planning, and collaboration skills adapted from obra/superpowers.
- [xiaoxiaosrm/dsh-mattpocock-skills](https://github.com/xiaoxiaosrm/dsh-mattpocock-skills) — Unofficial DSH port of mattpocock/skills — Engineering (18) + Productivity (7) skills as a DeepSeek Harness bundle plugin.
- [addxing/conservative-code-edits](https://github.com/addxing/conservative-code-edits) — A conservative code-editing skill for AI coding agents: keeps changes small, scoped, and project-safe, avoiding unrelated refactors and protecting shared infrastructure code. Works with any AI coding tool that supports skills.
- [addxing/function-extraction](https://github.com/addxing/function-extraction) — A skill for extracting a complete feature implementation chain from a codebase and generating a technical development document with business logic, data flow, exception handling, and Mermaid diagrams. Works with any AI coding agent.
- [addxing/function-testing](https://github.com/addxing/function-testing) — A skill for generating functional test cases from PRDs, Git commits, or user stories, and exporting an Excel-style test report. Works with any AI coding agent.
- [addxing/replicate-android-feature](https://github.com/addxing/replicate-android-feature) — An agent skill for reproducing an existing Android feature in another project or platform, treating the Android implementation as the source of truth and preserving the complete feature path, behavior, UI, and reusable resources.
- [Equinox7379/dsh-skill-search](https://github.com/Equinox7379/dsh-skill-search) — On-demand skill search for DSH: zero preloading, keyword-search a shared skill library.
- [liuqh16/dsh-processes](https://github.com/liuqh16/dsh-processes) — Manage background processes from DeepSeek Harness: process tool, `/ps` commands, output inspection, exit/log-match notifications; a DSH port of pi-processes.
- [dhicoc/dsh-wuyun-liuqi](https://github.com/dhicoc/dsh-wuyun-liuqi) — Five Movements and Six Qi (Wuyun Liuqi) AI agent skill pack as a DeepSeek Harness (dsh) Cordis plugin: 31 SKILL.md skills, one-line `dsh plugin add` install.
- [riffkit/skill](https://github.com/riffkit/skill) — Short-video generation skill: rebuild a winning TikTok's formula into your own product video, with optional digital character, product placement, and 9 output languages. Works with any agent that reads SKILL.md.

- [pakco77/dsh-daqi.skill](https://github.com/pakco77/dsh-daqi.skill) — dsh-daqi.skill — an idea incubator: every pain point and idea you mention is noted in the camp for you. Start your wilderness journey, cowboy!
- [xmutfyh/dsh-plugin-writing-guard](https://github.com/xmutfyh/dsh-plugin-writing-guard) — AI-writing-discipline guard: scans manuscripts for revision residue, defensive writing, and AI-style patterns (dash abuse, not-X-but-Y, LLM overused words, rule-of-three); provides writing_audit + writing_rules tools with auto-audit on paper file writes.

- [ch1bug/dsh-skill-fuzzy](https://github.com/ch1bug/dsh-skill-fuzzy) — Codex-style fuzzy skill search for the DeepSeek Harness Web GUI: the built-in '/' skill menu only matches name prefixes; this plugin searches the way Codex does.
- [MichengAI/dsh-skills-manager](https://github.com/MichengAI/dsh-skills-manager) — Skills manager plugin for DeepSeek Harness: manage Skills from the UI.
- [sandbaseai/sandbase-skills](https://github.com/sandbaseai/sandbase-skills) — 88 installable open-source Agent Skills for research, social intelligence, marketing, and business workflows — compatible with Codex, Claude Code, Cursor, Gemini CLI, and DeepSeek Harness.
- [xu-jin-cs/dsh-skills](https://github.com/xu-jin-cs/dsh-skills) — Reusable skills for the DeepSeek Harness ecosystem: parallel-dispatch orchestration rules + archmap architecture-mapping agent (zero-LLM deterministic diff impact analysis, saves tokens).

## Resources

- [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) — Official source repo.  `⭐38238`
- [DeepSeek Harness overview (ai-bot.cn)](https://ai-bot.cn/deepseek-harness) — Third-party writeup.
- [Finding the Best Harness for DeepSeek V4 Flash (Composio)](https://composio.dev/content/best-agent-harness-deepseek-v4-flash)
- [flaqai/deepeseek-harness-guide](https://github.com/flaqai/deepeseek-harness-guide) — Guide for development with DeepSeek Harness; building a plugin for the DeepSeek Harness project.
- [sandbaseai/deepseek-harness-handbook](https://github.com/sandbaseai/deepseek-harness-handbook) — Agent-first, multilingual handbook covering architecture, quickstarts, MCP, skills, subagents, sandboxing, and source-backed troubleshooting.
- [zoahdev/dsh-tutorials](https://github.com/zoahdev/dsh-tutorials) — Bilingual tutorials for DeepSeek Harness: getting started, architecture, plugin development, and contributor roadmap.

- [ljsysfurryACE/dsh-plugin-story](https://github.com/ljsysfurryACE/dsh-plugin-story) — Full technical article on the three plugins featured in the official DeepSeek Harness selection: memory / compression / active scheduling.
- [wold9168/dotdsh](https://github.com/wold9168/dotdsh) — Personal DeepSeek Harness dotfiles (configuration reference).
- [yangl326-Dylan/learning-dsh](https://github.com/yangl326-Dylan/learning-dsh) — Versioned bilingual (EN/ZH) source-code learning pages for DeepSeek Harness, served as a dsh plugin at /learning.

## Contributing

PRs welcome! To add a plugin:

1. Make sure your repo carries the **`#dsh`** GitHub topic.
2. Add one entry under the most fitting category, format:
   `- [Name](https://link) — Concise one-line description.`
3. Keep the list alphabetical within each section where practical.
4. One PR per logical change; keep descriptions factual and hype-free.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, the contributors have waived all copyright and related or neighboring rights to this work.
