# dsh-setup-wizard

DSH（DeepSeek Harness）技能插件：**交互式设置向导**。

为只能人工完成的步骤生成 bash 向导：逐步打开 URL、指示点击复制、捕获值写入 .env/GitHub secrets、每阶段确认、显示剩余步数；用于基础设施开通、凭据/CI 密钥、陌生第三方后台、一次性迁移。受 [mattpocock/skills](https://github.com/mattpocock/skills) 的 wizard（223k★ MIT）启发的中文原创精简版。

## 安装

```bash
dsh plugin add dsh-setup-wizard
```

## 触发方式

描述中包含"设置向导 / 配置凭据 / CI 密钥 / 开通基础设施 / 后台操作 / 一次性迁移"等关键词时自动触发。

## 能力

- 流程划定（读仓库找人工步骤与值）
- 阶段路径映射（可照做、不编造）
- 向导编写纪律（先开 URL/密钥隐藏/confirm）
- 验证交接与一次性默认

## 许可

MIT
