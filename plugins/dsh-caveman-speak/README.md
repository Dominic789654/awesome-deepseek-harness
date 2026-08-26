# dsh-caveman-speak

DSH（DeepSeek Harness）技能插件：**输出 token 压缩纪律**。

让 agent 用最少的词回答问题（省 ~65% 输出 token），代码/命令/错误保持字节精确；token 下沉点审计（caveman learn：safe fix / offload / habit / load-bearing 分类 + 一行修复建议 + 30 天成本示意）；渐进披露回忆。受 [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)（86k★）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-caveman-speak
```

## 触发方式

描述中包含"省 token / 压缩输出 / 降成本 / token 审计 / 上下文浪费 / 长任务提速"等关键词时自动触发。

## 能力

- 输出压缩（代码/命令/错误字节精确）
- 下沉点审计（四类分类 + 修复建议）
- 渐进披露回忆（先索引后详情）
- 输入侧压缩（代理层，可选）

## 许可

MIT
