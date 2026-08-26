# dsh-operating-kit

DSH（DeepSeek Harness）技能插件：**会话操作纪律**。

会话开始简报（读状态文档/线上验证/漂移对账/脏关闭恢复）+ 会话结束收尾（经验/未决问题/下一步/定向更新），防陈旧状态错误、保会话间上下文交接。受 [wshobson/agents](https://github.com/wshobson/agents) 的 operating-kit（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-operating-kit
```

## 触发方式

描述中包含"会话开始 / 会话结束 / 状态简报 / 对账 / 恢复上次会话 / 交接上下文 / 状态文档"等关键词时自动触发。

## 能力

- 开始简报四步（读文档/验证线上/检查工作树/标记不匹配）
- MISMATCH 对账与推断标注
- 结束收尾定向编辑（不整文件替换）
- 信任但验证纪律

## 许可

MIT
