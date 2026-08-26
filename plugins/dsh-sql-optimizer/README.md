# dsh-sql-optimizer

SQL 查询优化器技能插件 | SQL Query Optimizer Skill Plugin

> **License**: MIT  
> **Category**: skill  
> **Category 分类**: 技能

## Overview

DSH plugin that adds SQL query optimization capabilities to DeepSeek Harness. It diagnoses and fixes slow SQL queries using EXPLAIN/EXPLAIN ANALYZE plan reading, index design, query rewrites, statistics, and schema-aware tuning across PostgreSQL, MySQL/MariaDB, SQL Server, Oracle, and SQLite.

基于 [JayRHa/AgentSkills](https://github.com/JayRHa/AgentSkills) 的 `sql-optimizer` skill 移植。

## 概述

本插件为 DeepSeek Harness 添加 SQL 查询优化能力。使用 EXPLAIN/EXPLAIN ANALYZE 执行计划分析、索引设计、查询重写、统计信息和 Schema 感知调优，诊断并修复慢 SQL 查询。支持 PostgreSQL、MySQL/MariaDB、SQL Server、Oracle 和 SQLite。

## What It Does

- Injects SQL optimizer instructions into the system prompt (prompt section at order 5)
- Registers `sql-optimizer` as a runtime skill for on-demand loading via the `skill` tool
- Covers EXPLAIN commands for all 5 supported engines
- Provides index design principles (equality → range → sort → include)
- Includes common sargable query rewrite patterns
- Defines structured output format for findings

## Installation / 安装

### Option 1: Plugin Directory (Recommended / 推荐)

Copy or symlink the plugin into your DSH plugins directory:

```powershell
# Copy plugin
Copy-Item -Recurse "E:\DeepSeek_Harness\plugins\dsh-sql-optimizer" "$env:DSH_HOME\plugins\"

# Or symlink (requires admin on Windows)
New-Item -ItemType SymbolicLink -Path "$env:DSH_HOME\plugins\dsh-sql-optimizer" -Target "E:\DeepSeek_Harness\plugins\dsh-sql-optimizer"
```

Then add to your profile's `cordis.patch.yml`:

```yaml
- id: sql-optimizer
  name: dsh-sql-optimizer
```

### Option 2: Skill Directory (Alternative / 备选)

If you only need the skill without the prompt injection, copy `SKILL.md` to a DSH skill directory:

```powershell
# User-level skill
Copy-Item "E:\DeepSeek_Harness\plugins\dsh-sql-optimizer\SKILL.md" "$env:DSH_HOME\skills\sql-optimizer\SKILL.md"

# Or project-level skill (in your project root)
Copy-Item "E:\DeepSeek_Harness\plugins\dsh-sql-optimizer\SKILL.md" ".dsh\skills\sql-optimizer\SKILL.md"
```

The skill will be discovered automatically by `dsh-skill-filesystem`.

### Option 3: Direct Registration (For Agent Presets / 用于 Agent 预设)

In your `agent.cordis.yml`:

```yaml
insert:
  - id: sql-optimizer
    name: dsh-sql-optimizer
```

## Usage / 使用

### Automatic (via system prompt)

Once installed and registered, the SQL optimizer instructions are automatically included in the system prompt. The model will apply SQL optimization knowledge when you ask about slow queries.

安装并注册后，SQL 优化器指令会自动包含在系统提示中。当你询问慢查询时，模型会应用 SQL 优化知识。

### On-Demand (via `skill` tool / 通过 `skill` 工具按需加载)

```
skill(name="sql-optimizer")
```

This loads the full SKILL.md content into the conversation context.

### Trigger Phrases / 触发短语

The skill activates when you say things like:

- "This query is slow" / "这个查询很慢"
- "Why is this query slow?" / "为什么这个查询慢？"
- "Optimize this SQL" / "优化这条 SQL"
- "Read this EXPLAIN plan" / "分析这个执行计划"
- "Add an index" / "添加索引"
- "Fix a full table scan" / "修复全表扫描"
- "N+1 query problem" / "N+1 查询问题"
- "Reduce query cost" / "降低查询成本"

## Supported Engines / 支持的数据库引擎

| Engine | EXPLAIN Command |
|--------|----------------|
| PostgreSQL | `EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)` |
| MySQL / MariaDB | `EXPLAIN ANALYZE` or `EXPLAIN FORMAT=TREE` |
| SQL Server | `SET STATISTICS XML ON` |
| Oracle | `EXPLAIN PLAN FOR` + `DBMS_XPLAN.DISPLAY` |
| SQLite | `EXPLAIN QUERY PLAN` |

## Example / 示例

```
User: 这个查询很慢，帮我优化一下：
SELECT o.*, u.name FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.status = 'pending'
ORDER BY o.created_at DESC
LIMIT 50;

Agent: [Captures EXPLAIN ANALYZE output, identifies the dominant cost,
       proposes index creation, rewrites query if needed, verifies with
       before/after measurements]
```

## File Structure / 文件结构

```
dsh-sql-optimizer/
├── package.json          # DSH plugin manifest with dsh.plugin declaration
├── cordis.patch.yml      # Cordis composition patch (registers plugin row)
├── index.js              # Plugin entry: prompt section + skill registration
├── SKILL.md              # Full SQL optimizer skill content
└── README.md             # This file
```

## Credits / 致谢

- Original skill: [JayRHa/AgentSkills](https://github.com/JayRHa/AgentSkills)
- License: MIT
