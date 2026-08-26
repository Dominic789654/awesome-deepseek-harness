---
name: data-engineering
description: |
  数据工程：Airflow DAG 设计（幂等/原子/增量/可观测）、
  dbt 分层建模（staging/intermediate/marts）与测试文档、
  Spark 优化、数据质量与数据管线排障。
  当用户建数据管线、编排批任务（Airflow）、做 dbt 转换、
  优化 Spark 任务或排查 DAG 失败时使用。
  受 wshobson/agents（38k★ MIT）启发的中文原创精简版。
---

# Data Engineering — 数据工程

生产级数据管线：Airflow 编排 + dbt 建模 + Spark 优化。

## 何时用

- 用 Airflow 做数据管线编排
- 设计 DAG 结构与依赖
- 实现自定义 operator/sensor
- dbt 数据转换与模型分层
- Spark 任务优化
- 排查失败的 DAG run

## 1. Airflow DAG 设计原则

| 原则 | 说明 |
|---|---|
| 幂等 | 跑两次结果一致 |
| 原子 | 任务整体成功或失败 |
| 增量 | 只处理新增/变更数据 |
| 可观测 | 每步有日志/指标/告警 |

依赖写法：`a >> b >> c`（线性）、`a >> [b,c]`（扇出）、
`[a,b] >> c`（汇聚）、复杂依赖按需组合。

**要点**：TaskFlow API（更干净 + 自动 XCom）；任务设超时防僵尸；
sensor 用 `mode='reschedule'` 释放 worker；幂等任务可安全重试；
DAG 要测试（单测 + 集成测试）。
**不要**：不用 `depends_on_past=True`（造成瓶颈）；不硬编码日期
（用 `{{ ds }}` 宏）；不用全局状态（任务无状态）；不在 DAG 文件
里放重逻辑（从模块导入）；catchup 别盲目关——理解影响再定。

## 2. dbt 分层建模（Medallion）

```
sources → staging（1:1 清洗）→ intermediate（业务逻辑/join）→ marts（最终分析表）
```

命名：`stg_` / `int_` / `dim_`+`fct_`。

- 每层做数据质量测试（唯一性/非空/关系）
- 增量模型：大表用 incremental（按时间/键增量）
- 文档与血缘：dbt 生成 lineage，模型注释即文档
- 项目结构：model-paths/analysis-paths 清晰划分

## 3. Spark 优化要点

- 分区/分桶对齐查询模式；避免小文件过多（coalesce/合并）
- 广播小表（broadcast join）避免 shuffle
- 内存/GC 调优按 executor 规格；数据倾斜用盐化/重分区
- 用 Spark UI 定位 stage 瓶颈（shuffle 量/任务倾斜）

## 4. 排障流程

- DAG 失败：先看任务日志 → 重试语义（幂等可重跑）→ 依赖数据问题
- dbt 失败：先过测试再查转换逻辑；`dbt run --select` 精准重跑
- Spark 失败：看 executor 日志 + Spark UI stage 统计

## 5. 自查清单

- [ ] DAG 幂等/原子/增量/可观测四原则
- [ ] 任务有超时、重试与背压策略
- [ ] dbt 三层 + 命名规范 + 每层测试
- [ ] 大表用增量模型、血缘文档齐
- [ ] Spark 分区/广播/倾斜已处理
- [ ] 失败有日志定位与重跑路径

## 边界

- 工具栈（Airflow/dbt/Spark）版本差异大，按版本查文档。
- 数据管线"能跑"≠"可靠"：先把幂等与可观测做扎实。
