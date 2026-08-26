// dsh-sql-optimizer — SQL query optimizer skill for DeepSeek Harness
//
// Registers a prompt section injecting the SQL optimizer skill instructions
// into the system prompt, and a runtime skill for on-demand loading via
// the `skill` tool.

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const name = 'sql-optimizer'
export const inject = ['systemPrompt', 'skills']

const SKILL_BODY = `
# SQL Optimizer Skill — Active

You have the **sql-optimizer** skill loaded. Use it when diagnosing slow SQL queries.

## Core Rules
- **Measure first**: Always capture EXPLAIN ANALYZE output before proposing changes.
- **One change at a time**: Make a single fix, re-measure, then proceed.
- **Never guess**: Base every recommendation on evidence from the actual execution plan.

## Quick Process
1. Gather context: engine+version, exact query, row counts, existing indexes.
2. Capture the real plan (EXPLAIN ANALYZE for the target engine).
3. Find the dominant cost node (bottom-up, estimated vs actual rows).
4. Classify: full scan, unused index, row estimate mismatch, expensive sort, N+1, too many rows.
5. Design indexes: equality → range → sort → include.
6. Rewrite the query to be sargable and minimal.
7. Verify with before/after EXPLAIN ANALYZE.

## Engine Commands
- **PostgreSQL**: \`EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT) <query>;\`
- **MySQL/MariaDB**: \`EXPLAIN ANALYZE <query>;\` or \`EXPLAIN FORMAT=TREE <query>;\`
- **SQL Server**: \`SET STATISTICS XML ON;\` then run query.
- **Oracle**: \`EXPLAIN PLAN FOR <query>; SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);\`
- **SQLite**: \`EXPLAIN QUERY PLAN <query>;\`

## Index Design (Equality → Range → Sort → Include)
\`\`\`sql
-- Composite index example
CREATE INDEX idx_orders_user_status_created
  ON orders (user_id, status, created_at DESC);

-- Covering index (PostgreSQL / SQL Server)
CREATE INDEX idx_orders_cover
  ON orders (user_id, status, created_at DESC)
  INCLUDE (total_amount, product_id);

-- Partial index (PostgreSQL)
CREATE INDEX idx_orders_pending
  ON orders (created_at)
  WHERE status = 'pending';
\`\`\`

## Common SARGable Rewrites
\`\`\`sql
-- Bad → Good: function on column
WHERE YEAR(order_date) = 2024  →  WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01'

-- Bad → Good: leading wildcard
WHERE name LIKE '%smith'  →  WHERE name LIKE 'smith%' (or use full-text)

-- Bad → Good: OR preventing index
WHERE a = 1 OR b = 1  →  WHERE a IN (1) OR b IN (1) — or UNION ALL
\`\`\`

## Output Format
Present findings as:
1. **Problem** — one sentence
2. **Evidence** — key EXPLAIN lines
3. **Root Cause** — why it happens
4. **Fix** — the specific change (CREATE INDEX, rewrite, config)
5. **Expected Improvement** — plan after fix
6. **Verification** — how to confirm

For the full skill reference, use the \`skill\` tool to load \`sql-optimizer\`.
`.trim()

const SKILL_CONTENT = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'SKILL.md'),
  'utf8',
)

export function apply(ctx, config = {}) {
  // 1. Register a prompt section injecting the SQL optimizer instructions
  ctx.systemPrompt.section({
    name: 'skill:sql-optimizer',
    order: 5,
    text: SKILL_BODY,
  })

  // 2. Register as a runtime skill for on-demand loading via the `skill` tool
  ctx.skills.register({
    name: 'sql-optimizer',
    description:
      'Diagnoses and fixes slow SQL queries using EXPLAIN/EXPLAIN ANALYZE plan reading, index design, query rewrites, statistics, and schema-aware tuning across PostgreSQL, MySQL/MariaDB, SQL Server, Oracle, and SQLite.',
    content: SKILL_CONTENT,
    invocation: { modelInvocable: true, userInvocable: true },
    provider: 'dsh-sql-optimizer',
  })
}
