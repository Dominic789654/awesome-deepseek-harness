# dsh-api-designer

A DeepSeek Harness (DSH) plugin that injects the **api-designer** skill into the system prompt, providing comprehensive guidance for designing clean, consistent REST and GraphQL APIs.

## Features

- Injects the api-designer skill content into the system-prompt persona (order 10, after deployment persona).
- Covers resource modeling, URI design, HTTP semantics, versioning, pagination, filtering/sorting, error contracts (RFC 9457), idempotency, concurrency control, authentication, rate limiting, and machine-readable contracts (OpenAPI 3.1 / GraphQL SDL).
- Helps agents when designing new APIs, reviewing API designs, choosing REST vs GraphQL, defining error responses, or writing OpenAPI/GraphQL schemas.

## Installation

### Prerequisites

- DeepSeek Harness `dsh` installed and configured.
- Web profile installed (default: `~/.dsh/profiles/web/`).

### Option A: Using `dsh plugin add` (recommended)

```bash
dsh plugin --profile web add github:your-username/dsh-api-designer
```

Then add the plugin to your profile's `package.json` bundles list (see Option B for example).

### Option B: Manual installation

1. Clone or download this repository into your DSH plugins directory:

```bash
cd ~/.dsh/plugins
git clone https://github.com/your-username/dsh-api-designer.git
```

2. Edit your web profile's `package.json` (typically `~/.dsh/profiles/web/package.json`) to include the plugin in the `dsh.profile.bundles` array and as a dependency:

```json
{
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-base",
        "@deepseek-ai/dsh-web-app",
        "dsh-api-designer"
      ]
    }
  },
  "dependencies": {
    "dsh-api-designer": "file:../../plugins/dsh-api-designer"
  }
}
```

3. Install dependencies:

```bash
cd ~/.dsh/profiles/web
pnpm install
```

4. Restart the DSH web server:

```bash
dsh web
```

5. Hard-refresh your browser to load the new plugin.

## Usage

Once installed, the api-designer skill is automatically injected into the system prompt for all agents. The agent will have access to API design best practices when:

- Designing new REST or GraphQL APIs
- Reviewing existing API designs
- Deciding between REST, GraphQL, or RPC
- Choosing versioning or pagination strategies
- Defining error responses (RFC 9457 Problem Details)
- Adding idempotency keys or concurrency control
- Writing or critiquing OpenAPI 3.1 or GraphQL SDL schemas
- Establishing API style guidelines

No configuration is required; the skill is always active.

## How It Works

The plugin registers a system-prompt section with order 10 (after the deployment persona at order 0, but before tool guidance at orders 100–199). The section content is extracted from `skill.md` (YAML frontmatter stripped) and injected into every prompt assembly.

## Customization

To modify the skill content, edit `skill.md` and restart the DSH web server. The plugin reads the file at startup.

## License

MIT