# dsh-threat-modeling

DSH（DeepSeek Harness）技能插件：**威胁建模**。

攻击树构建（OR/AND/叶子节点 + 成本/时间/技能/检测属性）、STRIDE 六类威胁分类、缓解措施映射与优先级、安全需求提取。受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-threat-modeling
```

## 触发方式

描述中包含"威胁建模 / 攻击树 / STRIDE / 安全架构评审 / 攻击路径 / 缓解措施 / 防御优先级"等关键词时自动触发。

## 能力

- 攻击树结构与节点类型
- 攻击属性标注（成本/时间/技能/检测）
- STRIDE 六类威胁分类
- 缓解映射与残余风险管理

## 许可

MIT
