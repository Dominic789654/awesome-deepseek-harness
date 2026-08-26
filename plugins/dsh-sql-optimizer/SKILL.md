---
name: sql-optimizer
description: Diagnoses and fixes slow SQL queries using EXPLAIN/EXPLAIN ANALYZE plan reading, index design, query rewrites, statistics, and schema-aware tuning across PostgreSQL, MySQL/MariaDB, SQL Server, Oracle, and SQLite. Use this skill when a user says a query is slow, times out, "takes forever", needs an index, asks to "optimize this SQL", "why is this query slow", "read this EXPLAIN plan", "add an index", "reduce query cost", "fix a full table scan / seq scan", "N+1 query", "tune the database", or pastes a query plan and asks what is wrong.
license: MIT
---

# SQL Optimizer

## Overview
This skill turns "this query is slow" into a concrete, evidence-driven fix. It reads execution plans, identifies the dominant cost, proposes the smallest effective change (index, rewrite, schema, or config), and verifies the improvement with before/after measurements.

Golden rule: measure, change one thing, measure again. Never guess. Never add an index without reading the plan first.

## Process
1. Gather context (engine+version, exact query, row counts, existing indexes, how query is run)
2. Capture the real plan (EXPLAIN ANALYZE for each engine)
3. Find the dominant cost (bottom-up, estimated vs actual rows)
4. Classify the problem (full scan, unused index, row estimate mismatch, expensive sort, N+1, too many rows)
5. Design indexes deliberately (equality → range → sort → include)
6. Rewrite the query to be sargable and minimal
7. Verify with before/after measurements

## Engine-Specific EXPLAIN Commands

### PostgreSQL
```sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT) <query>;
```
Key plan nodes to watch: Seq Scan, Index Scan, Index Only Scan, Nested Loop, Hash Join, Sort, HashAggregate, CTE Scan, Materialize.

### MySQL / MariaDB
```sql
EXPLAIN ANALYZE <query>;
-- or for traditional output:
EXPLAIN FORMAT=JSON <query>;
EXPLAIN FORMAT=TREE <query>;
```
Key metrics: type (ALL=full scan), key (NULL=no index used), rows (estimated), Extra (Using filesort, Using temporary).

### SQL Server
```sql
SET STATISTICS XML ON;
SET STATISTICS PROFILE ON;
SET STATISTICS IO ON;
SET STATISTICS TIME ON;
<query>
```
Also consider: `SET SHOWPLAN_XML ON;` for estimated plans without execution.

### Oracle
```sql
EXPLAIN PLAN FOR <query>;
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
-- With actual execution stats (requires 10046 trace or):
SELECT /*+ GATHER_PLAN_STATISTICS */ * FROM ... ;
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR(NULL, NULL, 'ALLSTATS LAST'));
```
Key columns: Id, Operation, Rows (%Real), Starts, Cost (%CPU), Time, A-Rows, A-Time, Buffers.

### SQLite
```sql
EXPLAIN QUERY PLAN <query>;
```
SQLite provides simpler plans; focus on table scans vs index searches.

## Problem Classification

### Full Table Scan / Sequential Scan
- Plan shows `Seq Scan` on a table with many rows
- Fix: Add an index on the WHERE clause columns, then JOIN columns if needed
- Rule: If scanning > ~10% of rows, a sequential scan may be correct — check cardinality estimates

### Missing or Unused Index
- `type: ALL` (MySQL) or `Seq Scan` (PostgreSQL) on filtered queries
- Key is NULL in MySQL EXPLAIN
- Fix: Create index matching the query's WHERE + JOIN + ORDER BY pattern

### Row Estimate Mismatch
- Estimated rows ≠ actual rows (PostgreSQL: `rows` vs `Actual rows`)
- Causes wrong join strategy selection
- Fix: `ANALYZE` the table; check statistics; consider extended statistics for correlated columns

### Expensive Sort / Using Filesort
- `Sort` node cost dominates; MySQL `Extra: Using filesort`
- Fix: Index that covers ORDER BY; remove unnecessary ORDER BY; avoid SELECT * with ORDER BY on indexed columns

### N+1 Query Pattern
- Many individual queries instead of one bulk query
- Fix: Use JOIN, IN/EXISTS subquery, or batch loading

### Too Many Rows Returned
- Query returns more rows than needed
- Fix: Add LIMIT, narrow SELECT columns, filter earlier in WHERE clause

## Index Design Principles

### Ordering Rule
1. Equality conditions first (`column = value`)
2. Range conditions second (`column > value`, `column BETWEEN ...`)
3. ORDER BY / GROUP BY columns
4. Include columns for covering index (SELECT list)

### Composite Index Examples
```sql
-- Query: SELECT * FROM orders WHERE user_id = ? AND status = ? ORDER BY created_at DESC LIMIT 20;
CREATE INDEX idx_orders_user_status_created
  ON orders (user_id, status, created_at DESC);
```

### Covering Index (INCLUDE)
```sql
-- PostgreSQL / SQL Server:
CREATE INDEX idx_orders_user_status_created_cover
  ON orders (user_id, status, created_at DESC)
  INCLUDE (total_amount, product_id);
-- MySQL equivalent (no INCLUDE syntax):
CREATE INDEX idx_orders_user_status_created_cover
  ON orders (user_id, status, created_at DESC, total_amount, product_id);
```

### Partial / Conditional Index
```sql
-- PostgreSQL:
CREATE INDEX idx_orders_pending ON orders (created_at)
  WHERE status = 'pending';

-- SQL Server:
CREATE INDEX idx_orders_pending ON orders (created_at)
  WHERE status = 'pending';
```

## Query Rewrite Patterns

### SARGable Rewrites
```sql
-- Bad: function on column defeats index
WHERE YEAR(order_date) = 2024
-- Good: range scan uses index
WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01'

-- Bad: OR can prevent index use
WHERE status = 'active' OR status = 'pending'
-- Good: IN uses index
WHERE status IN ('active', 'pending')

-- Bad: leading wildcard
WHERE name LIKE '%smith'
-- Good: trailing wildcard or full-text
WHERE name LIKE 'smith%'
```

### JOIN Optimization
```sql
-- Ensure join columns have indexes
-- Use INNER JOIN when possible (optimizer can reorder)
-- Move selective conditions into WHERE, not ON (for INNER JOIN)
-- Check for missing foreign key indexes
```

### Subquery to JOIN
```sql
-- Bad: correlated subquery
SELECT * FROM orders o
WHERE o.total > (SELECT AVG(total) FROM orders WHERE user_id = o.user_id);

-- Good: JOIN with aggregate
SELECT o.* FROM orders o
JOIN (SELECT user_id, AVG(total) AS avg_total FROM orders GROUP BY user_id) u
  ON o.user_id = u.user_id
WHERE o.total > u.avg_total;
```

## Statistics and Configuration

### PostgreSQL
```sql
-- Refresh statistics
ANALYZE table_name;

-- Check statistics
SELECT relname, last_analyze, last_autoanalyze, n_live_tup, n_dead_tup
FROM pg_stat_user_tables WHERE relname = 'table_name';

-- Tune planner parameters
SET random_page_cost = 1.1;  -- SSD
SET effective_cache_size = '8GB';
SET work_mem = '256MB';      -- for sorts/hashes
```

### MySQL
```sql
-- Refresh statistics
ANALYZE TABLE table_name;

-- Check indexes
SHOW INDEX FROM table_name;

-- Tune buffer pool (my.cnf)
innodb_buffer_pool_size = 8G
innodb_log_file_size = 1G
```

## Output Format

When presenting findings, structure as:

1. **Problem**: One-sentence description of the dominant cost
2. **Evidence**: Key lines from the actual EXPLAIN output
3. **Root Cause**: Why the problem occurs (missing index, bad selectivity estimate, etc.)
4. **Fix**: The specific change (CREATE INDEX, query rewrite, config change)
5. **Expected Improvement**: What the plan should look like after the fix
6. **Verification**: How to confirm the fix worked (before/after EXPLAIN ANALYZE)

## Anti-Patterns to Check
- SELECT * (wastes I/O, prevents covering indexes)
- Implicit type conversions (defeats indexes, e.g., varchar column compared to integer)
- Too many JOINs (>5-6 may indicate schema design issue)
- Missing foreign key indexes
- Large IN lists (consider JOIN with values table)
- OFFSET-based pagination on large tables (use keyset pagination)
- OR conditions that could be UNION ALL
- Functions on indexed columns in WHERE clause
