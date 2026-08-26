# dsh-sql-optimization

DSH（DeepSeek Harness）技能插件：**SQL 优化模式**。

把慢查询变成快查询：EXPLAIN 计划分析、索引策略、N+1 解决、查询改写与防回归检查。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-sql-optimization
```

## 触发方式

描述中包含"SQL 太慢 / 优化查询 / EXPLAIN / 加索引 / N+1"等关键词时自动触发。

## 能力

- EXPLAIN ANALYZE 慢查询定位
- 索引策略（复合/覆盖/部分索引，读写权衡）
- 常见问题改写（N+1、SELECT *、函数包裹索引列、深分页）
- 查询计划分析流程与防回归清单

## 许可

MIT
