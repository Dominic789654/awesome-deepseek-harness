# dsh-web-clone

网页复刻：从参考图/截图/URL 提取设计细节（字体、颜色、动画、组件结构、
资源 URL），生成还原度高的网页项目。先出复刻规格 → 用户确认 → 实现。

受 [xuanxuan321/xuanxuan-prompts](https://github.com/xuanxuan321/xuanxuan-prompts)
（169★，AI 复刻精美网页的提示词合集）启发，改编为 DSH 中文原创技能
（把"给一份 prompt"升级为"提取规格 → 确认 → 复刻"的完整流程）。

## 安装

```sh
dsh plugin --profile web add dsh-web-clone
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-web-clone
# 重启 dsh web 生效
```

## 使用

对 agent 说"复刻这个网页（附截图/URL）"，`web-clone` 技能先提取
字体/颜色/动画/组件/资源 规格给你确认，再生成项目并交付差异说明。

## 结构

```
dsh-web-clone/
├── index.js           # 注册 skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/web-clone/SKILL.md
```

## License

MIT。原创改编，灵感来自 xuanxuan-prompts（无 LICENSE 的公开仓库，
正文为原创撰写）。
