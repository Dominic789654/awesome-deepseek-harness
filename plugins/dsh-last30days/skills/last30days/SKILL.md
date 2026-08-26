---
name: last30days
description: |
  跨平台近 30 天研究：Reddit/X/YouTube/TikTok/HN/Polymarket/GitHub/
  arXiv 等并行搜索，按真实参与度（赞/币/真金白银）评分而非编辑
  推荐，AI 裁判综合成一份简报——开会前查人、招人信号、发现爆发
  前主题（discovery mode）、工具对比、理解世界动态。
  当用户要查某人/公司/主题最近动态、找热点、对比工具时使用。
  受 mvanhorn/last30days-skill（26k★）启发的中文原创精简版。
---

# Last30Days — 跨平台近 30 天研究

AI agent 主导的搜索引擎，按 upvotes、likes 和真金白银评分——
而不是编辑。Google 聚合编辑，/last30days 搜索人。

## 何时用

- 开会/销售通话前查人（最近 30 天动态）
- 查公司真实状况、招人信号
- 找"爆发前的主题"（discovery mode）
- 工具对比、理解世界动态

## 1. 数据源（按真实参与度评分）

| 来源 | 信号 |
|------|------|
| Reddit | 真实 upvote 数、顶评——Google 埋掉的真实观点 |
| X/Twitter | 热点反应、专家长帖 |
| YouTube | 45 分钟深潜，搜索 5 句可引用的关键句 |
| TikTok / IG Reels | 影响者视角、口播转写 |
| Hacker News | 开发者共识（825 分、899 评论） |
| Polymarket | 真金白银赔率（非观点） |
| GitHub | 人的 PR 速度/顶级仓库；话题的 issue/discussion |
| arXiv / Techmeme / Digg | 论文、编辑层、AI 1000 高信号账号 |
| 更多 | LinkedIn / StockTwits / Threads / Pinterest / 小红书 / Bluesky / Web |

## 2. 工作流

1. 并行扫所有可用来源（自带 key/浏览器会话）
2. 按真实参与度跨来源评分（social relevancy 非 SEO relevancy）
3. AI 裁判综合成一份简报：每条带来源数字与动量标签
4. 输出可直接执行的后续查询

## 3. 典型用法

- `/last30days <人名>` — 查人：加入的团队、争议、PR 速度、社区讨论
- `--hiring-signals` — 读公司职位页读聚焦信号
- discovery mode — 扫 Reddit 分类/HN/Digg，输出 5-10 个按速度排序的主题
- 工具对比 — 并排表：架构/记忆/安全/适用（star 数实时拉取）
- `--as-of` — 历史回看

## 4. 自查清单

- [ ] 多源并行（不只看一个平台）
- [ ] 按真实参与度评分（非编辑推荐）
- [ ] AI 裁判综合成简报（非 URL 堆砌）
- [ ] 每条结果带来源与动量
- [ ] 会议/决策前先跑（人/公司/主题）
- [ ] 敏感场合核实事实（市场赔率非观点）

## 边界

- 各平台是围墙花园：需自带 key/浏览器会话授权。
- 结果按参与度排序，不是绝对事实——重大决策交叉验证。
