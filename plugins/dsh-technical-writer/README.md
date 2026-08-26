# dsh-technical-writer

A [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) bundle plugin that provides a technical writing skill for producing clear, well-structured documentation.

## What It Does

This plugin injects the **technical-writer** skill into your DSH agent, enabling it to produce:

- **Guides** and **tutorials** (learning-oriented)
- **API docs** and **reference pages** (information-oriented)
- **How-to guides** (task-oriented)
- **READMEs** and **release notes** (all types)

The skill is based on the **Diátaxis framework** — a systematic approach to technical documentation that classifies content by reader need.

## Installation

### From Local Directory

```sh
dsh plugin --profile <your-profile> add ./dsh-technical-writer
```

### From Git Repository

```sh
dsh plugin --profile <your-profile> add "github:<owner>/<repo>#main&path:/plugins/dsh-technical-writer"
```

## Structure

```
dsh-technical-writer/
├── package.json              # dsh.bundle manifest
├── cordis.patch.yml          # Plugin registration
├── index.js                  # Plugin entry point
├── README.md                 # This file
└── skills/
    └── technical-writer/
        └── SKILL.md          # The technical writing skill
```

## How It Works

1. The plugin declares itself as a `dsh.bundle` in `package.json`
2. `cordis.patch.yml` registers the plugin with the DSH container
3. `index.js` provides the plugin entry point
4. `skills/technical-writer/SKILL.md` contains the full skill documentation

## Skill Usage

When installed, the agent can load the technical-writer skill on demand. The skill guides the agent through:

1. **Identifying the reader** — Who is this for? What do they need?
2. **Choosing document type** — Tutorial, how-to, reference, or explanation
3. **Planning architecture** — Information flow and structure
4. **Writing drafts** — Clear, concise, example-driven prose
5. **Editing for clarity** — Plain language, active voice, short sentences
6. **Verifying quality** — Readability, link checks, example testing

## License

MIT
