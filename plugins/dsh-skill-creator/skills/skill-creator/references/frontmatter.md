# Frontmatter 字段速查（agentskills.io 规范）

| 字段 | 必填 | 约束 | 说明 |
|---|---|---|---|
| `name` | ✅ | ≤64 字符；仅小写字母数字与连字符；不以连字符开头/结尾；无连续连字符 | 目录名必须一致 |
| `description` | ✅ | 规范 ≤1024 字符；Claude.ai 上传限 200 | "做什么 + 何时用 + 触发关键词" |
| `license` | – | 字符串 | 如 MIT、Apache-2.0 |
| `compatibility` | – | ≤500 字符 | 运行环境要求 |
| `allowed-tools` | – | 空格分隔 | 预授权工具，实验性 |
| `metadata` | – | 字符串键值映射 | 任意元数据 |
| `dependencies` | – | 逗号分隔 | 脚本依赖（Claude.ai 文档） |

## DSH 特有字段（ctx.skills 解析）

- `disable-model-invocation: true` — 禁止模型自动调用该技能（仅用户可见）。
- `user-invocable: false` — 仅模型可调用。

## 目录结构

```
skill-name/              # 目录名 = frontmatter name
├── SKILL.md             # 必填：frontmatter + 正文
├── references/          # 可选：长文档，正文相对路径引用
├── scripts/             # 可选：Python/Bash/JS 可执行代码
└── assets/              # 可选：模板、图片、数据
```
