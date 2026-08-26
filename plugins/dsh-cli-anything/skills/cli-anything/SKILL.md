---
name: cli-anything
description: |
  让任何软件 agent 化：为任意软件/代码库/API 生成 agent 可用的
  CLI 封装——7 阶段流水线（分析→设计→实现→测试→发布）、
  真实后端集成（非玩具实现）、JSON 输出、REPL 会话模式、
  refine 增量补全、输出验证（不轻信 exit 0）。
  当用户要自动化某个软件/工具、给 GUI 软件做 CLI、
  统一零散 API、让 agent 操作真实应用时使用。
  受 HKUDS/CLI-Anything（48k★ Apache-2.0）启发的中文原创精简版。
---

# CLI Anything — 让任何软件 agent 化

AI agent 擅长推理但不擅长操作真实专业软件。CLI 是人与 agent 的通用接口：
结构化、可组合、自描述（--help）、确定性、JSON 输出零解析负担。
本技能把任何软件（有源码/代码库/文档即可）封装成 agent 可用的 CLI harness。

## 何时用

- 让 agent 操作真实软件（Blender/LibreOffice/GIMP/FFmpeg…）
- 给 GUI 软件或内部工具补一个 CLI 接口
- 把零散 Web API 统一成一个有状态的 CLI
- 替代脆弱的 UI 自动化（截图/像素点击）

**不用**：纯脚本任务（直接写命令即可）、需要人机界面设计的产品化 CLI。

## 1. 核心原则

- **用真实软件**：CLI 必须调用真实后端完成渲染/处理（LibreOffice 出 PDF、
  Blender 渲染 3D、Audacity 走 sox）——禁止 Pillow 冒充 GIMP、禁止自制渲染器
- **Agent-First 输出**：`--json` 输出结构化数据供 agent 消费；人类可读格式仅调试用
- **双模式**：无参运行进入 REPL（有状态会话）；子命令模式供脚本/流水线
- **零配置安装**：`pip install -e .` 后命令直接上 PATH，`which` 可发现

## 2. 7 阶段流水线

1. 🔍 **Analyze** — 扫描源码，把 GUI 动作映射到 API/后端能力
2. 📐 **Design** — 架构命令组、状态模型、输出格式（JSON schema）
3. 🔨 **Implement** — 用 Click 实现 CLI：REPL、JSON 输出、undo/redo、会话持久化
4. 📋 **Plan Tests** — 写 TEST.md：单元 + E2E 测试计划
5. 🧪 **Write Tests** — 实现完整测试套件（合成数据单元测 + 真实文件/软件 E2E + 子进程验证）
6. 📝 **Document** — 更新 TEST.md 结果；生成 SKILL.md（从 Click 装饰器/README 提取元数据）
7. 📦 **Publish** — 写 setup.py，安装到 PATH，包名 `cli-anything-<software>`

## 3. Refine 增量补全

- **Broad refine**：agent 做全能力差距分析，补齐缺失命令
- **Focused refine**：针对特定功能域补全（如"批处理与滤镜"）
- 每次运行增量、非破坏，可反复执行直到覆盖完整

## 4. 关键教训（Critical Lessons）

- **Rendering Gap**：GUI 应用在渲染时才应用特效；若只操作工程文件却用朴素导出工具，
  特效会被静默丢弃。解法：原生渲染器 → 滤镜翻译 → 渲染脚本
- **Filter Translation**：跨格式映射特效（MLT→ffmpeg）注意重复滤镜合并、
  交错流顺序、参数空间差异、不可映射特效
- **Timecode Precision**：非整数帧率（29.97fps）累积舍入误差——
  用 `round()` 不用 `int()`，显示用整数运算，测试容差 ±1 帧
- **Output Verification**：绝不因 exit 0 就相信导出成功——
  校验魔数、ZIP/OOXML 结构、像素分析、音频 RMS、时长

## 5. 自查清单

- [ ] 调用真实后端（无玩具实现）
- [ ] `--json` 输出可用
- [ ] REPL + 子命令双模式
- [ ] 单元 + E2E + 子进程三层测试
- [ ] 输出验证（不轻信 exit 0）
- [ ] refine 差距分析过一遍

## 边界

- 本技能是方法论：产出 CLI harness 设计与实现路径，不替用户选软件/授权。
- 涉及安全敏感软件（SQLCipher 等）时强制备份与受控写路径。
