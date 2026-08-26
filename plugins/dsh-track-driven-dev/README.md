# dsh-track-driven-dev

DSH（DeepSeek Harness）技能插件：**Track 驱动开发**。

以 track 为逻辑工作单元（spec.md → plan.md → TDD 实施）：阶段检查点、质量门、plan.md 即时更新、提交 SHA 记录、显式依赖与可测验收标准。受 [wshobson/agents](https://github.com/wshobson/agents) 的 conductor（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-track-driven-dev
```

## 触发方式

描述中包含"track / 工作单元 / spec.md / plan.md / 阶段检查点 / 质量门 / 长任务组织"等关键词时自动触发。

## 能力

- Track 生命周期管理（单一关注点/1-5 天规模/归档）
- TDD 实施工作流（先 RED/小提交/即时更新）
- 质量门与验证协议
- 依赖与验收标准管理

## 许可

MIT
