# dsh-git-guardrails

DSH（DeepSeek Harness）技能插件：**Git 安全护栏**。

拦截危险 git 命令（push/--force/reset --hard/clean -f/branch -D/checkout .）于执行前（PreToolUse 钩子）、项目级或全局安装、人工确认放行与安全替代命令。受 [mattpocock/skills](https://github.com/mattpocock/skills)（223k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-git-guardrails
```

## 触发方式

描述中包含"git 安全 / 防误推 / 防误清 / 危险 git 命令 / 安全钩子 / 保护工作区"等关键词时自动触发。

## 能力

- 危险命令拦截清单
- PreToolUse 钩子安装（项目/全局）
- 人工确认放行机制
- 安全替代命令（stash/普通 push）

## 许可

MIT
