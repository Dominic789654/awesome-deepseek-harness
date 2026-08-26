# dsh-project-planner

项目规划技能插件 | Project Planner Skill Plugin

## 功能简介

为 DeepSeek Harness 提供专业的项目规划能力，将模糊目标分解为具体、可执行的项目计划。

### 核心特性
- **工作分解结构 (WBS)**：使用 100% 规则和 8/80 规则分解目标
- **里程碑定义**：设置明确的进度检查点和验收标准
- **依赖关系映射**：使用 FS/SS/FF/SF 关系类型映射任务依赖
- **三点估算法 (PERT)**：基于乐观、最可能、悲观估算工作量
- **关键路径计算**：识别项目关键路径和总工期
- **风险识别与评估**：系统化识别和评估项目风险
- **综合项目计划**：生成完整的项目计划文档

### 项目规划流程
1. 明确目标、约束和成功标准
2. 分解为具有明确可交付成果的 WBS
3. 定义里程碑用于进度跟踪
4. 映射任务依赖关系和顺序
5. 使用三点估算法估算工作量
6. 计算计划并识别关键路径
7. 识别风险并进行概率和影响评估
8. 呈现完整的项目计划

## 安装

### 从本地路径安装

```bash
cd E:\DeepSeek_Harness\plugins\dsh-project-planner
dsh plugin --profile web add .
```

### 从 git 仓库安装

```bash
dsh plugin --profile web add "github:your-username/dsh-project-planner#main"
```

## 使用方法

安装后，技能会自动注入到系统提示中。当用户提到以下关键词时自动触发：

- "plan a project"
- "create a project plan"
- "break down this goal"
- "create a work breakdown structure"
- "define milestones"
- "map dependencies"
- "estimate effort"
- "compute critical path"
- "identify risks"
- "schedule this project"

### 示例对话

**用户**：请为这个软件开发项目制定计划
**助手**：我会为你制定全面的项目计划。首先明确项目目标和约束，然后使用工作分解结构分解项目...

**用户**：识别项目的关键路径
**助手**：我会计算项目的关键路径，识别哪些任务直接影响项目总工期...

**用户**：评估这个项目的风险
**助手**：我会系统化识别和评估项目风险，包括技术风险、资源风险、进度风险等...

## 项目管理知识领域

| 知识领域 | 内容 | 工具/技术 |
|----------|------|-----------|
| 范围管理 | WBS、需求收集、范围确认 | 100% 规则、8/80 规则 |
| 时间管理 | 进度规划、关键路径 | PERT 估算、甘特图 |
| 风险管理 | 风险识别、评估、应对 | 概率-影响矩阵 |
| 资源管理 | 资源分配、优化 | 资源平衡、资源平滑 |
| 沟通管理 | 干系人沟通、报告 | 沟通矩阵、状态报告 |

## 方法论支持

- **PMBOK 指南**：项目管理知识体系
- **PRINCE2**：受控环境中的项目管理
- **敏捷方法**：Scrum、Kanban、XP
- **混合方法**：结合预测和敏捷方法

## 卸载

```bash
dsh plugin --profile web remove dsh-project-planner
```

## 许可证

MIT License