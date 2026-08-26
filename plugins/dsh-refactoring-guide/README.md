# dsh-refactoring-guide

A DeepSeek Harness (DSH) plugin that provides the **refactoring-guide** skill for safe, incremental, behavior-preserving refactorings.

## What it does

This plugin bundles the `refactoring-guide` skill, which applies safe, incremental, behavior-preserving refactorings using a test-protected, small-step workflow. The skill includes guidance for:

- Extract function/variable
- Rename
- Inline
- Decompose conditionals
- Remove duplication
- Replace conditional with polymorphism
- Introduce parameter object

The skill is automatically available in DSH sessions when this plugin is installed.

## Installation

### Installing from a local directory (recommended for development)

1. Navigate to the plugin directory:
   ```sh
   cd E:\DeepSeek_Harness\plugins\dsh-refactoring-guide
   ```

2. Install into a DSH profile:
   ```sh
   dsh plugin --profile web add .
   ```

   Or from an absolute path:
   ```sh
   dsh plugin --profile web add E:\DeepSeek_Harness\plugins\dsh-refactoring-guide
   ```

### Installing from a published package (when available)

```sh
dsh plugin --profile web add dsh-refactoring-guide
```

### Installing from a Git repository (when published)

```sh
 dsh plugin --profile web add github:owner/dsh-refactoring-guide
```

## Usage

No manual configuration is needed after installation. When the model encounters a refactoring-related trigger scenario during a session, it loads the matching skill automatically. You can also specify directly in conversation:

> First give me an implementation plan for this refactor.

Or:

> Refactor this function to improve readability.

## How it works

The plugin registers a skill provider on `ctx.skills` that reads the bundled `skills/refactoring-guide/SKILL.md` file. The DSH skill system discovers the skill and makes it available to the model via the `skill` tool.

## File structure

```
dsh-refactoring-guide/
├── package.json          # declares dsh.bundle manifest
├── cordis.patch.yml      # the layer applied when a profile lists this bundle
├── README.md             # this file
├── lib/
│   └── index.js          # plugin module that registers skill provider
└── skills/
    └── refactoring-guide/
        └── SKILL.md      # the skill content
```

## License

MIT