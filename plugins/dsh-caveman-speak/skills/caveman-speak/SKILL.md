---
name: caveman-speak
description: |
  输出 token 压缩纪律：让 agent 用最少的词回答问题（穴居人语
  风格，省 ~65% 输出 token），但代码/命令/错误消息保持字节精确；
  诊断 token 下沉点并分类修复（safe fix / offload / habit /
  load-bearing）、渐进披露回忆、省输入（代理层压缩读取内容）。
  当用户要省 token/降成本、长 agent 任务提速、审计上下文浪费时使用。
  受 JuliusBrussee/caveman（86k★ MIT）启发的中文原创精简版。
---

# Caveman Speak — 输出 token 压缩

"why use many token when few do trick"——让 agent 说得少、读得少，
同时代码/命令/错误保持字节精确。对长 agent 任务省 ~65% 输出 token
（基准实测输入侧再省 33%+）。

## 何时用

- 长 agentic 任务想省 token 与提速
- 审计会话上下文浪费（token 下沉点）
- 输出冗长的诊断/解释要压缩

## 1. 输出压缩规则（Caveman 1）

- 用最少的词回答：结论先行，省略客套与重复
- **代码、命令、错误消息字节精确**——压缩只作用于自然语言
- 例子：正常 agent 69 tokens → 穴居人语 19 tokens，修复方案一致

## 2. token 下沉点审计（caveman learn）

读本地会话历史（只读、无账号）生成报告：Cave Score + 每个下沉点
按流量排名 + 一行修复建议 + 30 天成本示意。

下沉点分类（每个都带 class）：

| 类别 | 含义 | 处理 |
|------|------|------|
| **safe fix** | 臃肿的 CLAUDE.md、从不调用的 skill | 直接修 |
| **offload** | 每会话重复粘贴的上下文 | 移到记忆，回忆成本更低时 |
| **habit** | 数字 + 软建议 | 从不强制 |
| **load-bearing** | 你需要的配置 | 计入分数、永不触碰 |

## 3. 输入侧压缩（Caveman 2）

- 本地代理：每次 provider 调用前压缩 agent 要读的内容，
  字节精确恢复
- 配合输出压缩双管齐下

## 4. 渐进披露回忆

- 先给紧凑索引（~50-100 tokens/条）
- 感兴趣再取详情——按需加载，不一次全灌

## 5. 自查清单

- [ ] 自然语言压缩、代码/命令/错误字节精确
- [ ] 结论先行、无客套重复
- [ ] 下沉点分类审计（safe fix / offload / habit / load-bearing）
- [ ] load-bearing 配置永不触碰
- [ ] 回忆走渐进披露（先索引后详情）

## 边界

- 压缩只针对自然语言；任何可执行内容不得被改写。
- habit 类只建议不强制；load-bearing 计数不修改。
