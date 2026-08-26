# Example DSH Plugins

Example / reference plugins for DeepSeek Harness (DSH), converted from commonly used agent skills (visualization, slides, code review, auto-research loop). They live here both as usable starting points and as documentation-by-example of the DSH plugin layout.

> 中文：这是把社区常见 agent skill 能力转成 DSH 插件形式的**示范骨架**。结构与字段按下方列出的真实高赞插件仓库归纳，实现是最小可用骨架，欢迎 PR 完善。

## Plugin format: how these are structured (and why)

As of 2026-08-13 (DSH public beta launch) there is **no official public plugin-spec document**. The layout used here is reverse-engineered from the highest-starred real `#dsh` plugin repositories and from the `dsh-plugin-development` skill (v2.0.0, 2026-08-12) shipped inside `NanmiCoder/dsh-agent-teams`:

| Evidence repo | Stars* | What it evidences |
| --- | --- | --- |
| `Anionex/dsh-vision-toolkit` | 45 | overall layout, `cordis.patch.yml` |
| `omdsh-dev/DSH-better-sidebar` | 31 | `dsh.plugin.json` (id/main/engines/contributes), client bundle |
| `hewzhew/dsh-agent-rp` | 32 | layout, host/client tsconfig split |
| `omdsh-dev/dsh-open-in-vscode` | 22 | host entry contract (`name`/`inject`/`Config`/`apply`), `dsh.plugin.json` |
| `omdsh-dev/dsh-at-file` | 19 | layout, `package.json` `dsh` field |
| `omdsh-dev/dsh-custom-tool` | 17 | `ctx.tools.register(defineTool({...}))` tool shape |
| `omdsh-dev/dsh-notification` | 17 | `package.json` `dsh` field, README conventions |
| `NanmiCoder/dsh-agent-teams` | 12 | `skills/<name>/SKILL.md` convention, minimal bundle contract doc |

\* star counts on 2026-08-13.

### Minimal host-only plugin contract (as used here)

```text
my-plugin/
├── package.json        # type=module, main=lib/index.js, "dsh": { "bundle": { "patch": "./cordis.patch.yml" } }
├── dsh.plugin.json     # { id, version, main, description, engines: { dsh }, contributes: { tools, skills } }
├── cordis.patch.yml    # top-level array: - insert: [{ id, name, config: {} }]
├── tsconfig.json
├── src/index.ts        # exports: name, inject, Config (schemastery), apply(ctx, config)
├── skills/<name>/SKILL.md   # optional agent-facing skill (YAML frontmatter + checklist)
└── README.md
```

Key conventions observed in the wild:

- **Host entry** exports `name`, `inject` (required services, e.g. `['tools']`), `Config` (a `@deepseek-ai/schemastery` schema whose callable form applies defaults) and `apply(ctx, config)`. Long-lived resources are effect-owned and return disposers.
- **Tools** are registered with `ctx.tools.register(defineTool({ name, description, parameters, output: { schema, render }, async execute(args) { ... } }))` from `@deepseek-ai/dsh-tools`. Parameter entries are `{ type, required, description }`.
- **`cordis.patch.yml`** mounts the plugin into a profile layer stack; users tune the `config` object on the same row in their profile patch.
- **`dsh.plugin.json`** appears in the `omdsh-dev` family and `DSH-better-sidebar` but not in every plugin; the `package.json` `dsh` field + `cordis.patch.yml` are the parts every repo agrees on. We ship both.
- **Web/client bundles** (`dsh.client`, `./client` export, `lib/client.js`) exist only for plugins with UI surfaces. Per the community contract: *no web need → no client bundle*. All plugins here are host-only.
- **Install**: `dsh plugin --profile <name> add file:/absolute/path/to/plugin` (or a package/git ref), then restart that profile.

If DeepSeek publishes an official spec that diverges from this, these examples should be updated to match — PRs welcome.

## The plugins

| Plugin | Tool(s) | What it does |
| --- | --- | --- |
| [`dsh-viz`](./dsh-viz/) | `chart_render` | Turn structured data into a self-contained ECharts HTML chart in the workspace |
| [`dsh-slides`](./dsh-slides/) | `slides_generate` | Turn a markdown outline into a reveal.js HTML slide deck |
| [`dsh-code-review`](./dsh-code-review/) | `code_review_context` (+ skill) | Collect git diff context deterministically; skill drives the review checklist |
| [`dsh-research-loop`](./dsh-research-loop/) | `research_log` (+ skill) | Durable JSONL research log; skill drives a plan→search→read→synthesize loop |

## Self-developed plugins (205, maintained by satan9394)

In addition to the four reference skeletons above, this directory also ships **205
self-developed `dsh-*` plugins** (maintained by the fork author, satan9394). These
are production-oriented JavaScript plugins (no TypeScript build step required):

- **Layout**: `package.json` (`"dsh": { "bundle": { "patch": "./cordis.patch.yml" } }`,
  `main: index.js`, `type: module`) + `cordis.patch.yml` + `index.js` (host entry
  exporting `name` / `inject` / `apply(ctx, config)`) + optional
  `skills/<name>/SKILL.md`. MIT licensed; each plugin carries its own `LICENSE`
  and `README.md`.
- **Variants**: the set includes three legitimate non-standard shapes — runtime
  root-level `SKILL.md` consumers (`dsh-api-designer`, `dsh-sql-optimizer`),
  system-prompt persona injectors with no JS entry (`dsh-project-planner`,
  `dsh-unit-test-author`), and an MCP bridge (`dsh-boss-agent-cli`).
- **Install**: `dsh plugin --profile <name> add file:/absolute/path/to/plugin`
  or a git ref to this repository, then restart that profile.

All 205 plugins pass an automated format audit (required files, package.json
fields, patch shape, SKILL.md frontmatter, EOL consistency) with zero hard errors
and zero warnings as of 2026-08-26.

## Status / honesty note

These are **structurally faithful skeletons**: manifests, mounting, entry contract and tool schemas follow the observed conventions, and the tool `execute` bodies implement the core logic in plain Node. They have **not** been verified against a live DSH instance (public beta access required), and `@deepseek-ai/*` peer packages are declared loosely (`*`). Treat them as reference implementations, not production plugins.
