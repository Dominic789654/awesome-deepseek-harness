# boss-agent-cli × DeepSeek Harness 插件

本目录是 boss-agent-cli 的 **DeepSeek Harness (DSH) 插件封装**：一个 `dsh.bundle` 组合包，
通过 DSH 官方 `@deepseek-ai/dsh-mcp-client` 把项目自带的 MCP server（`boss-mcp`）桥接进
Harness，`boss_*` 的 70+ 个 MCP 工具变成 DSH 原生工具 `mcp__boss__*`，模型直接调用，
无需任何 Python 侧改造。

## 快速开始

前置：`dsh` CLI 已安装（`npx @deepseek-ai/dsh` 或全局安装）。

```bash
# 1. 安装 boss-agent-cli（提供 boss / boss-mcp 两个可执行入口）
uv tool install boss-agent-cli
patchright install chromium

# 2. 确认入口在 PATH 上
boss --version
boss-mcp --help

# 3. 把本插件装进 DSH profile（以 web 为例）
dsh plugin --profile web add github:satan9394/dsh-boss-agent-cli#feat/dsh-plugin

# 4. 启动 DSH
dsh --profile web
```

启动后模型可以看到 `mcp__boss__search`、`mcp__boss__wizard`、`mcp__boss__shortlist_add`
等工具。首次使用前按 CLI 惯例跑 `boss doctor` / `boss login` / `boss status`
（对应工具 `mcp__boss__doctor`、`mcp__boss__status`）。

## 插件内容

| 文件 | 作用 |
|---|---|
| `package.json` | `dsh.bundle`（patch 入口）+ `dsh.plugin` V1 发现清单 |
| `cordis.patch.yml` | 插入一行 `@deepseek-ai/dsh-mcp-client`，stdio 拉起 `boss-mcp` |
| `README.dsh.md` | 本文档 |

## 配置说明

`cordis.patch.yml` 中 `mcp-boss` 行配置：

- `serverName: boss` —— 工具命名空间，模型看到的工具名为 `mcp__boss__<rawName>`。
- `transport: stdio` —— `boss-mcp` 默认即 stdio，无需额外服务进程。
- `toolCallTimeoutMs: 120000` —— 单次工具调用超时 2 分钟（长流程如批量打招呼需要）。
- `failOnStartupError: false` —— `boss-mcp` 不在 PATH 时插件仍可加载（不阻塞 DSH 启动），
  工具会在连接成功后才出现；安装前置后 HMR 或重启即恢复。
- `reconnect` —— 断线自动重连，指数退避，10 次失败后停止。

需要覆盖时（例如自定义 `--data-dir`、默认平台/角色），改这一行的 `config` 即可
（bundle patch 按行整体替换 config，需重述全部键）。

## 工具清单

完整工具集由 `boss schema` 驱动（`mcp__boss__schema` 或 CLI `boss schema`），
包括：职位搜索/福利筛选/详情/投递、打招呼/聊天/汇总、候选人名单（shortlist）、
收藏、简历、AI 求职增强（JD 分析/润色/模拟面试）、招聘者工作流（候选人/投递/聊天/回复）
等。所有工具返回统一 JSON 信封 `{ok, data, pagination, error, hints}`。

## 向 DSH 主仓库回馈

本封装以 MCP 桥接方式接入，属于 DSH 生态的 **MCP server** 类别；仓库已打 `#dsh` topic，
并被 [awesome-deepseek-harness](https://github.com/Dominic789654/awesome-deepseek-harness)
收录。也欢迎把使用中发现的问题回报给 boss-agent-cli 上游。
