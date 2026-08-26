# dsh-data-engineering

DSH（DeepSeek Harness）技能插件：**数据工程**。

Airflow DAG 设计（幂等/原子/增量/可观测）、dbt 分层建模（staging/intermediate/marts）与测试文档、Spark 优化（分区/广播/倾斜）、数据管线排障。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-data-engineering
```

## 触发方式

描述中包含"数据工程 / Airflow / DAG / dbt / 数据管线 / Spark / ETL / 批任务"等关键词时自动触发。

## 能力

- Airflow DAG 四原则与依赖模式
- dbt Medallion 分层与命名规范
- Spark 优化要点（广播 join/倾斜/分区）
- 管线排障流程

## 许可

MIT
