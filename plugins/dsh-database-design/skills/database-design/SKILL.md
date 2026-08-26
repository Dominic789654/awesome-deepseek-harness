---
name: database-design
description: |
  数据库表设计：主键/规范化/索引/数据类型/约束/性能模式，PostgreSQL 重点
  + 通用规范。当用户说"设计表结构"、"建表"、"review 这个 schema"、
  "数据库设计"、"SQL schema"、或讨论数据模型时使用。受 wshobson/agents
  （38k★ MIT）启发的中文原创精简版。
---

# Database Design — 数据库表设计

设计或审查数据库 schema 时遵循的最佳实践：规范化、类型选择、索引、
约束与性能模式。以 PostgreSQL 为主，通用原则适用于多数关系库。

## 核心规则

- **参考表（users/orders 等）定义 PRIMARY KEY**；时间序列/事件/日志数据
  不一定需要。主键优先 `BIGINT GENERATED ALWAYS AS IDENTITY`；
  需要全局唯一/不可猜测时用 `UUID`。
- **先规范化到 3NF** 消除数据冗余与更新异常；**只在有实测高收益读路径
  时才反规范化**（join 性能被证明有问题）。过早反规范化制造维护负担。
- **语义上必须 NOT NULL 的地方都加 NOT NULL**；常见值用 DEFAULT。
- **只为实际查询的访问路径建索引**：主键/唯一（自动）、**外键列（手动！）**、
  高频过滤/排序、join 键。
- 时间用 `TIMESTAMPTZ`；金额用 `NUMERIC`；字符串用 `TEXT`；整数用 `BIGINT`；
  浮点用 `DOUBLE PRECISION`（精确十进制运算用 `NUMERIC`）。

## 数据类型速查

- **ID**：`BIGINT GENERATED ALWAYS AS IDENTITY` 优先；分布式/合并场景用
  `UUID`（PG18+ 用 `uuidv7()`，旧版 `gen_random_uuid()`）。
- **整数**：默认 `BIGINT`；空间紧张才 `INTEGER`；避免 `SMALLINT`。
- **浮点**：`DOUBLE PRECISION` 优先于 `REAL`；精确十进制用 `NUMERIC`。
- **字符串**：优先 `TEXT`；需要长度限制用 `CHECK (LENGTH(col) <= n)`
  而非 `VARCHAR(n)`；避免 `CHAR(n)`；二进制用 `BYTEA`。
- **金额**：`NUMERIC(p,s)`，绝不用浮点。
- **时间**：时间戳用 `TIMESTAMPTZ`（避免无时区的 TIMESTAMP）；仅日期用
  `DATE`；时长用 `INTERVAL`。事务时间用 `now()`，墙上时钟用 `clock_timestamp()`。
- **布尔**：`BOOLEAN NOT NULL`（除非真需要三态）。
- **枚举**：小而稳定集合（州名/星期）用 `CREATE TYPE AS ENUM`；
  业务驱动、会演进的取值（订单状态）用 TEXT/INT + CHECK 或查找表。

## PostgreSQL Gotchas（易踩坑）

- **标识符**：不带引号会转小写。避免引号/混合大小写命名，用 `snake_case`。
- **UNIQUE + NULL**：UNIQUE 允许多个 NULL；PG15+ 用
  `UNIQUE (...) NULLS NOT DISTINCT` 限制只允许一个 NULL。
- **外键列不自动建索引**——要手动加。
- **无静默截断**：超长/超精度会报错（如 `999` 插入 `NUMERIC(2,0)` 报错），
  不像某些库静默截断。
- **序列有间隙是正常的**：回滚/崩溃/并发产生 1,2,5,6…，不要试图修复。
- **堆存储无聚簇主键**：`CLUSTER` 是一次性重组，后续插入不维护。
- **MVCC**：更新/删除留死元组，vacuum 处理——避免热点宽行频繁变更。

## 设计流程

1. **澄清需求**：实体、关系、读写模式（哪个表热、什么查询）、数据量级。
2. **出模型**：ER 草图（实体/关系/基数）+ 每表字段与类型。
3. **对照规则自查**：主键/规范化/NOT NULL/索引/类型选择。
4. **给出 DDL**：完整建表 SQL（含约束与索引）。
5. **review 时**：按上述规则逐表检查，输出问题清单 + 修复建议。

## 边界

- 具体数据库（MySQL/SQL Server/Oracle）的差异点另行说明，核心规则通用。
- 不擅自改用户现有 schema，先给建议。
