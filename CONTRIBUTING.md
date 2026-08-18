# Contributing to Awesome DeepSeek Harness

Thanks for helping build the DeepSeek Harness (DSH) plugin ecosystem!

## What belongs here

Anything that extends or works with **DeepSeek Harness**:

- **Plugins** — tools/capabilities that extend the harness (visualization, PPT, coding, etc.)
- **Skills** — packaged, markdown-based task capabilities
- **MCP servers** — Model Context Protocol servers usable from DSH
- **Orchestrators / Aggregators** — multi-step or multi-agent controllers
- **UIs / Clients** — desktop, web, terminal, editor front-ends
- **Harnesses / Runtimes** — DeepSeek-native or DeepSeek-first agent harnesses
- **Loops** — auto-research, deep-research, self-improve, iterative build workflows

## How to add an entry

1. **Tag your repo** with the **`#dsh`** GitHub topic (DeepSeek's discovery convention).
2. Fork this repo and edit **both** `README.md` and `README.zh-CN.md` (keep the two in sync).
3. Add your entry under the most fitting category, using this exact format:

   ```
   - [Name](https://link) — Concise one-line description.
   ```

   (Chinese file uses ` —— ` as the separator.)

4. **Only add new lines — never modify or delete existing ones.**
   Your diff should be pure insertions. Add your entry as its own complete line;
   don't append it onto a neighbouring row or split an existing row in half.

   <details>
   <summary>The most common mistake (click to see what goes wrong)</summary>

   Inserting your entry *into* an existing line truncates that project's
   description and glues the leftover text onto yours:

   ```diff
   - - [someone/their-plugin](https://github.com/someone/their-plugin) — Their real description.
   + - [someone/their-plugin](https://github.com/someone/their-plugin)
   + - [you/your-plugin](https://github.com/you/your-plugin) — Your description. — Their real description.
   ```

   The correct edit leaves the neighbour untouched and puts yours on a new line:

   ```diff
     - [someone/their-plugin](https://github.com/someone/their-plugin) — Their real description.
   + - [you/your-plugin](https://github.com/you/your-plugin) — Your description.
   ```

   Before pushing, run `git diff` and confirm every changed line starts with `+`.
   </details>

5. Keep entries alphabetical within a section where practical.
6. Open one Pull Request per logical change, and avoid unrelated edits
   (reordering rows, reflowing text) — they make review slower and cause conflicts.

## Quality bar

- The project must be real, working, and publicly accessible.
- Descriptions must be **factual and hype-free** — no "revolutionary", "best-ever", etc.
- Prefer the canonical source repo over mirrors or blog posts.
- Dead links / abandoned projects may be removed.

## Not sure which category?

Open an issue and ask, or pick the closest fit — a maintainer can recategorize during review.

## Automated checks

Every PR that touches `README.md` / `README.zh-CN.md` runs an automated check.
It only inspects the lines **you added** (existing rows are grandfathered in), and it verifies:

| Check | What it requires |
| --- | --- |
| Format | `- [Name](https://link) — Concise one-line description.` |
| Description | Non-empty (a trailing `` `⭐N` `` badge alone doesn't count) |
| Link | Resolves — a `404` / `410` / unreachable URL fails the check |
| Topic | GitHub repos must carry a `dsh` / `dsh-plugin` / `dsh-skill` / `deepseek-harness` topic |
| Scope | The PR touches only the two README files |
| Insert-only | Your diff adds lines without modifying or deleting existing entries |

If something fails, the bot posts a comment listing exactly what to fix.
Push a new commit to the same branch and the check re-runs automatically — no need to reopen the PR.

### Branch protection

`main` requires a pull request and a passing check, so please don't expect direct pushes to land.
Two tips that avoid almost all merge friction:

- **Leave "Allow edits by maintainers" enabled** on your PR, so a maintainer can fix a small conflict for you.
- **Rebase before pushing** if the list has moved on:

  ```bash
  git remote add upstream https://github.com/Dominic789654/awesome-deepseek-harness.git
  git fetch upstream && git rebase upstream/main
  git push --force-with-lease
  ```

Keeping your diff to a **single added line** is the most reliable way to avoid conflicts entirely.
