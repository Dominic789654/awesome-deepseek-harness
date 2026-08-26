# dsh-planning-files

DSH（DeepSeek Harness）技能插件：**三文件持久化规划**。

task_plan.md（阶段+进度）/ findings.md（研究发现）/ progress.md（会话日志+测试结果）落地磁盘、每轮 hook 重注入——计划扛过上下文丢失、/clear、崩溃与压缩；会话恢复 catchup 重读三文件续跑；并行任务用隔离目录 + `.active_plan`。受 [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files)（25k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-planning-files
```

## 触发方式

描述中包含"文件化规划 / 计划持久化 / 长任务续跑 / 会话恢复 / 三文件模式 / 上下文丢失"等关键词时自动触发。

## 能力

- 三文件模式（task_plan / findings / progress）
- 每轮注入计划块（hook 或手动）
- 会话 catchup 恢复续跑
- 并行任务隔离目录
- 完成门（gated 模式）
- 纯 Markdown、gitignore 默认

## 许可

MIT
