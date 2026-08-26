# dsh-hot-trends

中国实时热点数据采集器：微博/百度/B站/知乎热搜、App Store 免费榜、QQ音乐飙升榜。
免 API Key、零依赖（Node 20+ 全局 fetch）。

灵感来自腾讯 SkillHub 热门技能"热点数据采集"（9376 下载，社区榜热门）与
"热搜/榜单"类需求。本实现为 DSH 原创：把采集逻辑做成 `hot_trends` 工具注册进
`ctx.tools`，并附带 `hot-trends` 技能教 agent 何时用、怎么用。

## 安装

```sh
dsh plugin --profile web add dsh-hot-trends
# 或本地开发：dsh plugin --profile web add link:E:\DeepSeek_Harness\workspace\2026_08_15\plugins\dsh-hot-trends
# 重启 dsh web 生效
```

## 工具

`hot_trends(source, limit?)` — source: weibo | baidu | bilibili | zhihu | appstore | qqmusic。

数据来源为各平台公开接口（非官方 API，可能变化），采集失败会如实返回错误信息。

## 结构

```
dsh-hot-trends/
├── index.js           # 注册 hot_trends 工具 + skills/ 到 ctx.skills
├── cordis.patch.yml   # bundle patch 层
├── package.json       # dsh.bundle manifest
└── skills/hot-trends/SKILL.md
```

## License

MIT。
