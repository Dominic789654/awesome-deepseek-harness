# dsh-security-requirements

DSH（DeepSeek Harness）技能插件：**安全需求提取**。

把威胁模型与业务上下文转化为可行动安全需求：三层转化（业务→安全需求→技术控制）、需求类型（功能/非功能/约束）、需求属性（可追踪/可测/优先级/风险）、安全用户故事与验收标准。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-security-requirements
```

## 触发方式

描述中包含"安全需求 / 威胁转需求 / 安全用户故事 / 验收标准 / 合规映射"等关键词时自动触发。

## 能力

- 三层需求转化
- 需求类型与属性
- 追踪到威胁、含验收标准
- 与威胁建模互补

## 许可

MIT
