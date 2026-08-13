# Awesome DeepSeek Harness [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> 面向 **DeepSeek Harness（DSH）** 的 **插件 / Skill / MCP / 编排器 / 聚合器 / UI** 精选清单 —— DeepSeek 官方 agent 运行框架，核心理念 **`Model + Harness = Agent`**。

[English](./README.md) | **简体中文**

DeepSeek Harness（简称 "DSH"）是 DeepSeek 的 agent 运行框架 / harness 层 —— 把模型的推理变成真实行动的那双"手"（上下文管理、工具调用编排、执行沙箱、反馈循环、会话持久化）。它最大的特点是**开放的插件生态**：由社区贡献 plugin、Skill、MCP server、orchestrator、aggregator 和 UI。

本清单收录这个生态里最好的项目。欢迎贡献 —— 见 [贡献指南](#贡献指南)。

> **给作者的提示：** DeepSeek 要求插件仓库带上 **`#dsh`** GitHub topic 以便被发现。给你的仓库加上它，然后来这里提 PR。

## 目录

- [官方](#官方)
- [Harness 与运行时](#harness-与运行时)
- [可视化](#可视化)
- [幻灯片 / PPT](#幻灯片--ppt)
- [写代码](#写代码)
- [Agent](#agent)
- [循环（自动研究 / 自我改进等）](#循环自动研究--自我改进等)
- [MCP Server](#mcp-server)
- [编排器与聚合器](#编排器与聚合器)
- [UI / 客户端](#ui--客户端)
- [Skill](#skill)
- [资源](#资源)
- [贡献指南](#贡献指南)

---

## 官方

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) —— DeepSeek 官方 agent 运行框架（`Model + Harness = Agent`），基于 Cordis 的"一切皆插件"架构（TypeScript，MIT）。
- [deepseek-ai/awesome-deepseek-integration](https://github.com/deepseek-ai/awesome-deepseek-integration) —— 官方 DeepSeek API 集成清单。
- [deepseek-ai/awesome-deepseek-agent](https://github.com/deepseek-ai/awesome-deepseek-agent) —— 官方支持 DeepSeek 的 agent / harness 清单。

## Harness 与运行时

_DeepSeek 原生 / DeepSeek 优先的 agent harness、coding agent。_

- [blissito/ghostycode](https://github.com/blissito/ghostycode) —— DeepSeek V4 终端编程 agent 与带宪章约束的 harness（Rust TUI，含 MCP 与子 agent）。
- [didclawapp-ai/zagens](https://github.com/didclawapp-ai/zagens) —— DeepSeek V4 开源 agent harness。
- [HenryZ838978/deepseek-harness](https://github.com/HenryZ838978/deepseek-harness) —— DeepSeek V4 的 Python harness 库 + `dsh` CLI + MCP server + `SKILL.md`。
- [liubf21/ds-forge](https://github.com/liubf21/ds-forge) —— 轻量级 DeepSeek V4 agent harness。
- [Owen718/FlashCoder](https://github.com/Owen718/FlashCoder) —— 面向 DeepSeek 模型的简单 harness。

## 可视化

_把数据 / 结果变成图表、图形、看板的插件。_

- [Anionex/dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) —— 为纯文本模型提供视觉能力：带意图的图片问答、长截图 OCR、UI 还原、像素级 diff。
- [william-jin-cmu/dsh-vision](https://github.com/william-jin-cmu/dsh-vision) —— `view_image` 工具，桥接任意 OpenAI 兼容 VLM。
- [ZSeven-W/dsh-openpencil](https://github.com/ZSeven-W/dsh-openpencil) —— OpenPencil 设计预览与编辑。

## 幻灯片 / PPT

_生成演示文稿、幻灯片、导出 PPT。_

<!-- 在此添加条目。 -->

## 写代码

_代码生成、重构、审查、仓库级工程插件。_

- [Anionex/dsh-computer-use](https://github.com/Anionex/dsh-computer-use) —— 基于 Accessibility 的 macOS 电脑控制插件（带作用域权限）。
- [CanglongCl/dsh-web-review](https://github.com/CanglongCl/dsh-web-review) —— 网页预览 + 元素批注，让 agent 根据可视化反馈修改前端源码。
- [omdsh-dev/dsh-at-file](https://github.com/omdsh-dev/dsh-at-file) —— Codex 风格 `@file` 提及：检索工作区文件并附到提示词。
- [omdsh-dev/dsh-open-in-vscode](https://github.com/omdsh-dev/dsh-open-in-vscode) —— 从 Web GUI 一键在 VS Code 中打开工作区目录。

## Agent

_可在 DSH 内运行的可复用子 agent / 专用 agent 包。_

- [btspoony/mstar-harness](https://github.com/btspoony/mstar-harness) —— 以 Skill 驱动的 harness / 循环工程工作流 agent 插件。
- [hewzhew/dsh-agent-rp](https://github.com/hewzhew/dsh-agent-rp) —— SillyTavern 迁移与下一代 Agent RP。
- [NanmiCoder/dsh-agent-teams](https://github.com/NanmiCoder/dsh-agent-teams) —— DSH 的 AgentTeams 多 agent 插件。

## 循环（自动研究 / 自我改进等）

_长时运行的循环工作流：自动研究、深度调研、自我精炼、迭代构建。_

- [csyangwen/dsh-memory-evolve](https://github.com/csyangwen/dsh-memory-evolve) —— 纯插件实现的跨会话长期记忆 + 后台自我进化。
- [vlln/dsh-loop](https://github.com/vlln/dsh-loop) —— 定时循环插件（`/loop` 命令 + loop 工具 + 活动状态条）。
- [william-jin-cmu/dsh-evolve](https://github.com/william-jin-cmu/dsh-evolve) —— 自进化插件：在会话内热挂载 / 卸载 Cordis 插件。

## MCP Server

_向 DSH 贡献工具 / prompt / 资源的 Model Context Protocol server。_

<!-- 在此添加条目。 -->

## 编排器与聚合器

_多步 / 多 agent 调度器与输出聚合器。_

- [icetomoyo/dsh_workflow](https://github.com/icetomoyo/dsh_workflow) —— 把一次性多 agent 调度升级为可生成、可保存、可观察、可恢复的 Workflow 层。

## UI / 客户端

_DSH 的桌面、网页、终端或编辑器前端。_

- [chen-001/dsh-grok-tui](https://github.com/chen-001/dsh-grok-tui) —— 通过 grok-build 的 TUI 使用 DSH。
- [huiliyi37/dsh-tianshu-tui](https://github.com/huiliyi37/dsh-tianshu-tui) —— 天枢（Tianshu）DSH 终端 UI。
- [hust-open-atom-club/oh-dsh-desktop](https://github.com/hust-open-atom-club/oh-dsh-desktop) —— 可扩展的 macOS 工作台（原生 PTY + 隔离预览的插件市场）。
- [omdsh-dev/DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) —— 侧边栏工作台：文件渲染 / 终端 / Git / 子 agent。
- [vibeinging/dsh-work](https://github.com/vibeinging/dsh-work) —— 本地优先的 Electron 工作台（会话、文件、数据分析、MCP）。
- [zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) —— Web UI 插件与皮肤合集：任务板、git 图、侧面板、token 统计。

## Skill

_打包好的任务能力（基于 markdown 的 skill、工具包）。_

- [omdsh-dev/dsh-mnemon](https://github.com/omdsh-dev/dsh-mnemon) —— 三层本地记忆：运行时记忆、可检索文档、受监督记忆空间。
- [omdsh-dev/dsh-plugin-skills](https://github.com/omdsh-dev/dsh-plugin-skills) —— 用于构建与测试 DSH 插件的 agent skill。
- [omdsh-dev/dsh-toolkit](https://github.com/omdsh-dev/dsh-toolkit) —— 零依赖确定性工具包（time / encoding / json / calculator / csv / regex / markdown / diff / stat / schema）。

## 资源

- [Awesome DSH Plugins](https://github.com/AdamPlatin123/awesome-dsh-plugins) —— 社区插件目录 + 每日兼容性追踪。
- [DeepSeek Harness 概览（ai-bot.cn）](https://ai-bot.cn/deepseek-harness)
- [DSH Hub](https://github.com/omdsh-dev/dsh-hub) —— 社区插件 hub。
- [Finding the Best Harness for DeepSeek V4 Flash (Composio)](https://composio.dev/content/best-agent-harness-deepseek-v4-flash)

## 贡献指南

欢迎 PR！添加插件的步骤：

1. 确保你的仓库带有 **`#dsh`** GitHub topic。
2. 在最合适的分类下添加一条，格式：
   `- [名称](https://链接) —— 简洁的一句话描述。`
3. 每个分区内尽量按字母 / 拼音顺序排列。
4. 一次 PR 只做一件事；描述客观、不吹水。

详见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 许可

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

在法律允许的范围内，贡献者已放弃本作品的所有版权及相关权利。
