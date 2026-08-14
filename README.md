<p align="center">
  <img src="./assets/deepseek-logo.svg" alt="DeepSeek" height="48">
</p>

# Awesome DeepSeek Harness [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of **plugins, skills, MCP servers, orchestrators, aggregators & UIs** for **DeepSeek Harness (DSH)** — DeepSeek's official agent runtime built around the idea **`Model + Harness = Agent`**.

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

## Security & Permissions

_Permission rules, approval review, security audits, and policy-check plugins._

- [PerryLink/dsh-permission-rules](https://github.com/PerryLink/dsh-permission-rules) — Claude Code-style declarative permission rules (allow/deny/ask).
- [PerryLink/dsh-auto-review](https://github.com/PerryLink/dsh-auto-review) — Secondary-model automatic review of approval requests.
- [PerryLink/dsh-skill-pack-security](https://github.com/PerryLink/dsh-skill-pack-security) — Security-audit skill pack (secret scanning, dependency audit).
- [agentic-control-plane/dsh-acp-plugin](https://github.com/agentic-control-plane/dsh-acp-plugin) — Policy checks before tool calls execute.
- [securstack/securstack-dsh-plugin](https://github.com/securstack/securstack-dsh-plugin) — Repository security-scanning adapter.
- [Areium/dsh-fail-logger](https://github.com/Areium/dsh-fail-logger) — Automatically logs tool-call failures and distills follow-up improvements.
- [lonelymoon87/dsh-guardian](https://github.com/lonelymoon87/dsh-guardian) — Runtime tool policy, dangerous-command guard, and output redaction for DeepSeek Harness.

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

## Plugin Marketplaces & Ecosystem

_Plugin marketplaces, install managers, indexes, and ecosystem tooling._

- [bradeGithub/DSH-Plugins-Marketplace](https://github.com/bradeGithub/DSH-Plugins-Marketplace) — GUI plugin marketplace.
- [LX2000WASD/dsh-web-plugin-manager](https://github.com/LX2000WASD/dsh-web-plugin-manager) — Web-based plugin manager.
- [Toukaiteio/dsh-plugin-installer](https://github.com/Toukaiteio/dsh-plugin-installer) — Plugin installer.
- [Sunrisepeak/dsh-index](https://github.com/Sunrisepeak/dsh-index) — Plugin index.
- [akira399/dsh-plugin-publisher](https://github.com/akira399/dsh-plugin-publisher) — Plugin-publishing workflow.
- [nightwhale-dev/nightwhale](https://github.com/nightwhale-dev/nightwhale) — Ecosystem aggregator.
- [ZK-Andy/dsh-continual-evolve](https://github.com/ZK-Andy/dsh-continual-evolve) — Self-evolving ecosystem plugin.
- [green-dalii/dsh-plugin-dev-skill](https://github.com/green-dalii/dsh-plugin-dev-skill) — DeepSeek Harness plugin-development skill: lets any agent build DSH plugins correctly and to spec, with condensed reference docs and paper notes.

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
- [ysr666/dsh-vision-router](https://github.com/ysr666/dsh-vision-router) — Routes vision requests to an appropriate VLM.
- [pinch-eng/dsh-audio-dub](https://github.com/pinch-eng/dsh-audio-dub) — Video/audio dubbing tool.
- [LuZhouheng/dsh-gen3d](https://github.com/LuZhouheng/dsh-gen3d) — 3D character-generation plugin for DeepSeek Harness: direct API links to Meshy / Hunyuan3D / Tripo3D / Rodin with your own keys and a mock fallback.
- [wangyang10/image-vision](https://github.com/wangyang10/image-vision) — Image/vision skill plugin for DeepSeek Harness.
- [xiaoshihou514/dsh-vision](https://github.com/xiaoshihou514/dsh-vision) — Vision bridge for DeepSeek Harness.
- [Hyperionjust/dsh-tool-underseal](https://github.com/Hyperionjust/dsh-tool-underseal) — "Underseal" sealed-assignment tool plugin for DeepSeek Harness (multi-model support).
- [hccccc01333/dsh-report-html](https://github.com/hccccc01333/dsh-report-html) — Generates self-contained interactive HTML reports from Markdown, tables, charts, China province maps, flowcharts, math, and drill-down tables.
- [yumimanji/dsh-ui-spec](https://github.com/yumimanji/dsh-ui-spec) — Turns UI screenshots into structured, implementation-grade web-frontend specs: deterministic geometry (sharp) plus optional vision-model semantics, merged into one JSON + Markdown spec.

## Slides / PPT

_Generate presentations, decks, slide exports._

- [THU-MAIC/dsh-openmaic](https://github.com/THU-MAIC/dsh-openmaic) — OpenMAIC for DeepSeek Harness: classrooms, slides, interactive widgets, and Socratic teaching.

## Coding

_Code generation, refactoring, review, repo-level engineering plugins._

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

## UI / Clients

_Desktop, web, terminal, or editor front-ends for DSH._

- [zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) — Plugin and skin collection for the DSH Web UI: task board, git graph, right-side panel, remote mobile UI, pet, live token stats, and a skin center.  `⭐506`
- [huiliyi37/dsh-tianshu-tui](https://github.com/huiliyi37/dsh-tianshu-tui) — Terminal UI for DeepSeek Harness.  `⭐73`
- [omdsh-dev/DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) — Full sidebar workbench: third-party tab registration, built-in file rendering/editing, terminal, Git, and sub-agents.  `⭐127`
- [ccch1mneyyy/dsh-cc-tui](https://github.com/ccch1mneyyy/dsh-cc-tui) — Claude-Code-style full-screen interactive terminal: streaming thought expansion, double-Esc rollback, context progress bar, and a TPS gauge.  `⭐197`
- [Small-tailqwq/dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) — Whale-girl skin series for the DSH Web UI (maid-atelier), CC BY-NC-SA 4.0.  `⭐119`
- [hust-open-atom-club/oh-dsh-desktop](https://github.com/hust-open-atom-club/oh-dsh-desktop) — Extensible macOS workbench with a native PTY, workspace tools, live bilingual plugins, and an isolated-preview plugin marketplace.
- [omdsh-dev/dsh-at-file](https://github.com/omdsh-dev/dsh-at-file) — Codex-style `@file` mentions: search workspace files in the composer and attach their contents to prompts.  `⭐25`
- [omdsh-dev/dsh-notification](https://github.com/omdsh-dev/dsh-notification) — Desktop notifications for turn completions, with per-outcome controls and include/exclude keyword rules.  `⭐25`
- [alingalingling/ui-status-label](https://github.com/alingalingling/ui-status-label) — Customize the "deep diving" thinking status label into anything you like.  `⭐21`
- [Anionex/dsh-turn-rewind](https://github.com/Anionex/dsh-turn-rewind) — Rewind conversation and workspace state, powered by a persistent change ledger.  `⭐23`
- [bobleer/dsh-acp-for-bitfun](https://github.com/bobleer/dsh-acp-for-bitfun) — ACP bridge plugin connecting BitFun with DSH.
- [Moeblack/dsh-message-edit](https://github.com/Moeblack/dsh-message-edit) — Branch-based message editing, reroll, retry, and a version timeline.  `⭐11`
- [Lum1104/dsh-browser](https://github.com/Lum1104/dsh-browser) — Chrome side-panel extension for driving the browser directly with DSH, with zero vision-model dependency.  `⭐26`
- [hellodigua/dsh-share](https://github.com/hellodigua/dsh-share) — One-click conversation sharing.  `⭐11`
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
- [ccch1mneyyy/dsh-working-activity](https://github.com/ccch1mneyyy/dsh-working-activity) — Live model working-status line for the TUI prompt bar and Web UI: playful thinking copy, running tools, turn summaries, and self-narration.
- [orriduck/dsh-tui](https://github.com/orriduck/dsh-tui) — A small, session-aware terminal UI for DeepSeek Harness.
- [openma-ai/deepseek-harness-tui](https://github.com/openma-ai/deepseek-harness-tui) — Rust/ratatui terminal client that speaks the DSH SDK JSON-RPC protocol directly and runs standalone or as a profile bundle.
- [bill9109/dsh-conversation-share](https://github.com/bill9109/dsh-conversation-share) — Share arbitrary segments of a DSH conversation.
- [bobleer/deepseek-harness-gui](https://github.com/bobleer/deepseek-harness-gui) — Tauri 2 desktop shell for DeepSeek Harness, following BitFun desktop + web-ui layout.
- [bruc3van/dsh-desktop](https://github.com/bruc3van/dsh-desktop) — Standalone Electron desktop client wrapping the official Web UI, with session sharing, local workspaces, remote connections, and a system tray.
- [chen-001/dsh-chat-width](https://github.com/chen-001/dsh-chat-width) — Adjusts the width of DSH replies.
- [dingyi222666/dsh-session-notification](https://github.com/dingyi222666/dsh-session-notification) — Notifications for four session states (completion etc.), via browser alerts or prompt injection.
- [hellodigua/dsh-emoji](https://github.com/hellodigua/dsh-emoji) — Automatically adds emoji to AI replies.
- [icodesign/orbis](https://github.com/icodesign/orbis) — Mobile client for DeepSeek Harness remote control.
- [lhh010/dsh-input-history](https://github.com/lhh010/dsh-input-history) — Terminal-style input history for the Web UI: recall sent messages with Ctrl+Up/Ctrl+Down; zero core changes.
- [lhh010/dsh-minigames](https://github.com/lhh010/dsh-minigames) — Right-side panel with 18 offline minigames (Tetris, Minesweeper, 2048, Sudoku, etc.) and an extensible game registry.
- [lhh010/dsh-paste-input](https://github.com/lhh010/dsh-paste-input) — File-input enhancements for the Web UI: Ctrl+V paste, drag-and-drop, and file picking, copied into the session workspace on send.
- [Moeblack/deepseek-manners](https://github.com/Moeblack/deepseek-manners) — Injects a thank-you note after every message.
- [Moeblack/dsh-prompt-studio](https://github.com/Moeblack/dsh-prompt-studio) — Prompt Studio: edit user and built-in system-prompt sections with live preview.
- [Nwflower/dsh-chat-import](https://github.com/Nwflower/dsh-chat-import) — Imports Claude Code chat history so conversations can continue in DSH.
- [omdsh-dev/7d7d](https://github.com/omdsh-dev/7d7d) — 7k7k-style game portal: the model generates or uploads HTML5/Flash minigames playable in the Web UI (fixed-version, checksum-verified Ruffle for Flash).
- [omdsh-dev/dsh-auto-chess](https://github.com/omdsh-dev/dsh-auto-chess) — Auto-chess in the DSH Web UI: play against the AI or watch two AIs battle.
- [omdsh-dev/dsh-daily-fortune](https://github.com/omdsh-dev/dsh-daily-fortune) — Daily fortune plugin with Guan Yin lots, Tarot spreads, and daily quotes.
- [omdsh-dev/dsh-daily-progress](https://github.com/omdsh-dev/dsh-daily-progress) — Daily plan and achievement system with completion-rate, streak, and weekly metrics.
- [omdsh-dev/dsh-fun-ticker](https://github.com/omdsh-dev/dsh-fun-ticker) — Market ticker marquee for crypto, FX, A-shares, indices, and HK/US stocks, using keyless data sources with a host proxy and caching.
- [omdsh-dev/dsh-fun-typewriter](https://github.com/omdsh-dev/dsh-fun-typewriter) — WebAudio typing ambience with a plugin-owned settings API and zero audio assets.
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
- [vlln/dsh-navbar](https://github.com/vlln/dsh-navbar) — Conversation node navigation bar: jump between user messages from a right-edge node strip.
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

## Skills

_Packaged task capabilities (markdown-based skills, tool packs)._

- [Anionex/dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) — Vision tools for text-only models: intent-aware image Q&A, long-screenshot OCR, UI restoration, grounding, pixel diff, artifacts, and a Web UI.  `⭐150`
- [omdsh-dev/dsh-toolkit](https://github.com/omdsh-dev/dsh-toolkit) — Zero-dependency deterministic tool pack — time, encoding, JSON, calculator, CSV, regex, markdown, diff, stats, and schema — with a unified one-command install.  `⭐10`
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

## Resources

- [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) — Official source repo.  `⭐38238`
- [DeepSeek Harness overview (ai-bot.cn)](https://ai-bot.cn/deepseek-harness) — Third-party writeup.
- [Finding the Best Harness for DeepSeek V4 Flash (Composio)](https://composio.dev/content/best-agent-harness-deepseek-v4-flash)

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
