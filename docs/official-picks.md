# Official Picks — DSH 官方推荐插件

> 由 **DeepSeek Harness 团队负责人 Tianyi Cui（[@tianyi](https://x.com/tianyi)）** 在其 X 的 **【DSH 社区插件推荐】** 系列中亲自推荐的插件。
> 本页与主清单 [README](../README.md) 顶部的 **Official Picks / 官方推荐** 专栏保持同步，最新在前。

## 为什么看这个

DeepSeek Harness（`dsh`）是「一切皆插件」的 agent 运行时——模型、工具、记忆、沙箱、界面都是插件，装什么插件几乎决定了你的使用体验。社区插件已经数以千计，官方团队亲自下场推荐的，是目前信噪比最高的一批筛选信号。据 DeepSeek 官方 API 统计，约 **60%** 的 DSH 用户至少使用一个第三方插件。

安装任意插件：

```bash
npx @deepseek-ai/dsh web                      # 启动 Web UI（若未装全局命令）
dsh plugin --profile web add "github:owner/repo#main"
```

---

## 1. dsh-TUI — 把 DSH 搬回终端

- 仓库：<https://github.com/ccch1mneyyy/dsh-TUI>
- 是什么：Claude Code 风格的全屏终端界面（TUI），补齐了 DSH 缺失的终端形态。像素鲸鱼顶栏、实时工作状态行、流式思考展开、双击 Esc 时间回溯、上下文进度条 + TPS 仪表。
- 官方推荐日期：**2026-09-26**
- tianyi 原话：

  > 推荐一下从 DeepSeek Harness 内测期间就持续开发的 dsh-TUI。做得非常用心，补齐了 DSH 缺失的 TUI 界面，并持续随 DSH 版本更新及打磨功能。

- 安装：

  ```bash
  dsh plugin --profile web add "github:ccch1mneyyy/dsh-TUI#main"
  ```

- 推荐原推：<https://x.com/tianyi/status/2103821968944533526>

## 2. dsh-better-sidebar — 侧边栏工作台底座

- 仓库：<https://github.com/omdsh-dev/DSH-better-sidebar>
- 是什么：开放的侧边栏底座，支持三方扩展注册新页面；内置文件渲染编辑、终端、侧边对话、Git、子代理页面。
- 官方推荐日期：**2026-09-27**
- tianyi 原话：

  > dsh-better-sidebar 插件为 DeepSeek Harness 添加了侧边栏、底边栏、分栏、可浮动栏等 UI 定制化能力。属于「为其它插件提供基础能力」的底座类插件，体现了 Cordis 插件系统中可组合性的特点。

- 安装：

  ```bash
  dsh plugin --profile web add "github:omdsh-dev/DSH-better-sidebar#main"
  ```

- 推荐原推：<https://x.com/tianyi/status/2104125200048746899>

## 3. 插件导航站 — dshfind / dshmarket / awesome-dsh-plugin

- 官方推荐日期：**2026-09-28**（第三期，本期不推单个插件，推导航站）
- 官方原话：

  > 今天提名几个广泛使用、内容丰富、更新及时的 DSH 插件导航站吧～ dshfind.com / dshmarket.com / awesome-dsh-plugin.com。其中 dshmarket 也可直接作为 DSH 插件安装到设置页中。（不代表公司立场，不对非官方网站的内容负责。）

- 三个站：
  1. **dshfind** — 学习站 + 插件市场二合一（系统课程 / 自动聚合 / S/A/B/C 评分 / 作者榜）：<https://dshfind.com/> · <https://github.com/hikariming/dshfind>
  2. **dshmarket** — 唯一能装进 DSH 设置页的插件市场（4000+ 插件）：<https://dshmarket.com/> · <https://github.com/dsh-market/dsh-market> · 安装 `dsh plugin --profile web add dshmarket`
  3. **awesome-dsh-plugin** — 社区精选目录（必须能用 `dsh plugin add` 安装才收录）：<https://awesome-dsh-plugin.com/> · <https://github.com/awesome-dsh-plugin/awesome-dsh-plugin>
- 新手路径：先装 dshmarket → 用 awesome-dsh-plugin 筛质量 → 用 dshfind 学原理看评分。
- 推荐原推：<https://x.com/tianyi/status/2104565558712959065>

---

## 维护方式

- 本页与主清单的 **Official Picks** 专栏由自动化每日跟进：新增推荐会先进入主清单专栏（并开 PR 走核验），本页按需同步。
- 只收录 **@tianyi 本人公开推荐** 的插件；收录不代表安全审计——安装第三方插件等同在本机运行第三方代码，请先阅读其源码。
- 想补充条目或修正信息？[提 Issue / PR](https://github.com/Dominic789654/awesome-deepseek-harness)。
