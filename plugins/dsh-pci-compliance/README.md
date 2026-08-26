# dsh-pci-compliance

PCI 合规：支付卡数据保护、安全控制清单（六大支柱）、工程落地要点
（缩小范围/托管支付/标记化/密钥管理）、评估输出。不构成合规审计意见。

受 [wshobson/agents](https://github.com/wshobson/agents)（38k★ MIT）
的 payment-processing/pci-compliance 技能启发，改编为 DSH 中文原创精简版
（与 dsh-security-hardening 互补）。

## 安装

```sh
dsh plugin --profile web add dsh-pci-compliance
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-pci-compliance
# 重启 dsh web 生效
```

## 使用

对 agent 说"PCI 合规检查 / 卡数据怎么保护"，`pci-compliance` 技能输出
范围 + 数据流 + 控制检查表 + 建议。

## 结构

```
dsh-pci-compliance/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/pci-compliance/SKILL.md
```

## License

MIT。原创精简改编，灵感来自 wshobson/agents（MIT）。
