# Awesome DeepSeek Harness [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of **plugins, skills, MCP servers, orchestrators, aggregators & UIs** for **DeepSeek Harness (DSH)** — DeepSeek's official agent runtime built around the idea **`Model + Harness = Agent`**.

**English** | [简体中文](./README.zh-CN.md)

![DeepSeek Harness ecosystem map](./assets/dsh-ecosystem.svg)

DeepSeek Harness ("DSH") is DeepSeek's agent runtime / harness layer — the "hands" that turn the model's reasoning into real actions (context management, tool-call orchestration, execution sandbox, feedback loop, session persistence). Its defining feature is an **open plugin ecosystem**: the community contributes plugins, skills, MCP servers, orchestrators, aggregators, and UIs.

This list collects the best of that ecosystem. Contributions welcome — see [Contributing](#contributing).

> **Tip for authors:** DeepSeek asks plugin repositories to carry the **`#dsh`** GitHub topic so they can be discovered. Add it to your repo, then open a PR here.

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

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) — DeepSeek's official agent runtime framework (`Model + Harness = Agent`), an "everything is a plugin" architecture built on Cordis (TypeScript, MIT).
- [deepseek-ai/awesome-deepseek-integration](https://github.com/deepseek-ai/awesome-deepseek-integration) — Official curated list of DeepSeek API integrations.
- [deepseek-ai/awesome-deepseek-agent](https://github.com/deepseek-ai/awesome-deepseek-agent) — Official list of agents/harnesses with DeepSeek support.

## Harnesses & Runtimes

_DeepSeek-native or DeepSeek-first agent harnesses / coding agents._

- [blissito/ghostycode](https://github.com/blissito/ghostycode) — DeepSeek V4 terminal coding agent and constitutional harness (Rust TUI with MCP and sub-agents).
- [didclawapp-ai/zagens](https://github.com/didclawapp-ai/zagens) — Open-source agent harness for DeepSeek V4.
- [HenryZ838978/deepseek-harness](https://github.com/HenryZ838978/deepseek-harness) — Python harness library + `dsh` CLI + MCP server + `SKILL.md` for DeepSeek V4-Pro / V4-Flash.
- [huiliyi37/Tianshu-Tui](https://github.com/huiliyi37/Tianshu-Tui) — Terminal coding-agent runtime built on harness engineering; DeepSeek V4 prefix-cache optimization (95–99% hit rate) with a Cognitive Virtual Machine + stigmergy memory layer.
- [itmisx/deepx-code](https://github.com/itmisx/deepx-code) — DeepSeek-first coding agent: model routing, CodeGraph code graph, OCR screenshot recognition, automatic context compression, and workflows (MIT).
- [liubf21/ds-forge](https://github.com/liubf21/ds-forge) — Lightweight agent harness for DeepSeek V4.
- [Owen718/FlashCoder](https://github.com/Owen718/FlashCoder) — Simple harness for DeepSeek models.

## Visualization

_Plugins that turn data / results into charts, diagrams, dashboards._

- [Anionex/dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) — Vision tasks for text-only models: intent-driven image Q&A, long-screenshot OCR, UI restoration, pixel diff.
- [omdsh-dev/dsh-genui](https://github.com/omdsh-dev/dsh-genui) — Interactive UI components (charts, plots, forms, quizzes, mermaid, 3D scenes) rendered inline in assistant replies via the `dsh-ui` fence.
- [william-jin-cmu/dsh-vision](https://github.com/william-jin-cmu/dsh-vision) — `view_image` tool bridging any OpenAI-compatible VLM to text-only models.
- [ZSeven-W/dsh-openpencil](https://github.com/ZSeven-W/dsh-openpencil) — OpenPencil design preview and editing.

## Slides / PPT

_Generate presentations, decks, slide exports._

<!-- Add entries here. -->

## Coding

_Code generation, refactoring, review, repo-level engineering plugins._

- [Anionex/dsh-computer-use](https://github.com/Anionex/dsh-computer-use) — Accessibility-first macOS computer-use bundle with scoped permissions.
- [CanglongCl/dsh-web-review](https://github.com/CanglongCl/dsh-web-review) — Web preview + element annotation so the agent edits frontend source from visual feedback.
- [omdsh-dev/dsh-at-file](https://github.com/omdsh-dev/dsh-at-file) — Codex-style `@file` mentions: search workspace files and attach them to prompts.
- [omdsh-dev/dsh-open-in-vscode](https://github.com/omdsh-dev/dsh-open-in-vscode) — Open the workspace directory in VS Code directly from the web GUI.

## Agents

_Reusable sub-agents / specialized agent packs runnable inside DSH._

- [btspoony/mstar-harness](https://github.com/btspoony/mstar-harness) — Skill-driven harness / loop-engineering workflow agent plugin.
- [hewzhew/dsh-agent-rp](https://github.com/hewzhew/dsh-agent-rp) — SillyTavern migration and next-generation agent roleplay for DSH.
- [NanmiCoder/dsh-agent-teams](https://github.com/NanmiCoder/dsh-agent-teams) — AgentTeams multi-agent plugin for DSH.

## Loops (Auto-Research, Self-Improve, etc.)

_Long-running loop workflows: auto-research, deep-research, self-refine, iterative build._

- [csyangwen/dsh-memory-evolve](https://github.com/csyangwen/dsh-memory-evolve) — Cross-session long-term memory + background self-evolution, plugin-only.
- [omdsh-dev/dsh-deep-research](https://github.com/omdsh-dev/dsh-deep-research) — Adaptive deep-research orchestrator plugin; the official DSH workflow engine (cybernetics / information-theory design).
- [vlln/dsh-loop](https://github.com/vlln/dsh-loop) — Timed loop plugin (`/loop` command + loop tool + activity status bar).
- [william-jin-cmu/dsh-evolve](https://github.com/william-jin-cmu/dsh-evolve) — Self-evolving plugin: hot-mount/unmount Cordis plugins inside a session.

## MCP Servers

_Model Context Protocol servers that contribute tools / prompts / resources to DSH._

<!-- Add entries here. -->

## Orchestrators & Aggregators

_Multi-step / multi-agent schedulers and output aggregators._

- [icetomoyo/dsh_workflow](https://github.com/icetomoyo/dsh_workflow) — Workflow layer over one-shot multi-agent scheduling: saveable, observable, recoverable.

## UI / Clients

_Desktop, web, terminal, or editor front-ends for DSH._

- [chen-001/dsh-grok-tui](https://github.com/chen-001/dsh-grok-tui) — Use DSH via grok-build's TUI.
- [huiliyi37/dsh-tianshu-tui](https://github.com/huiliyi37/dsh-tianshu-tui) — Tianshu terminal UI for DSH.
- [hust-open-atom-club/oh-dsh-desktop](https://github.com/hust-open-atom-club/oh-dsh-desktop) — Extensible macOS workbench with a native PTY and an isolated-preview plugin marketplace.
- [omdsh-dev/DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) — Sidebar workbench with file rendering, terminal, Git, and sub-agents.
- [vibeinging/dsh-work](https://github.com/vibeinging/dsh-work) — Local-first Electron workbench combining sessions, files, data analysis, and MCP.
- [zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) — Web UI plugin & skin collection: task board, git graph, side panel, token stats.

## Skills

_Packaged task capabilities (markdown-based skills, tool packs)._

- [omdsh-dev/dsh-mnemon](https://github.com/omdsh-dev/dsh-mnemon) — Three-layer local memory: runtime memory, retrievable documents, supervised memory spaces.
- [omdsh-dev/dsh-plugin-skills](https://github.com/omdsh-dev/dsh-plugin-skills) — Agent skills for building and testing DSH plugins.
- [omdsh-dev/dsh-toolkit](https://github.com/omdsh-dev/dsh-toolkit) — Zero-dependency deterministic tool pack: time, encoding, json, calculator, csv, regex, markdown, diff, stat, schema.

## Resources

- [Awesome DSH Plugins](https://github.com/AdamPlatin123/awesome-dsh-plugins) — Community plugin directory with daily compatibility tracking.
- [DeepSeek Harness overview (ai-bot.cn)](https://ai-bot.cn/deepseek-harness)
- [DSH Hub](https://github.com/omdsh-dev/dsh-hub) — Community plugin hub.
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