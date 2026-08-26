/**
 * dsh-hot-trends bundle entry:
 * 1) registers the model-facing `hot_trends` tool on `ctx.tools` — collects
 *    real-time China hot lists from public, keyless endpoints via global
 *    fetch (Node >= 20);
 * 2) registers the packaged `skills/hot-trends/SKILL.md` on `ctx.skills`.
 * @module dsh-hot-trends
 */

import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'

const BUNDLED_SKILL_RANK = 600
const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const PROVIDER_NAME = 'dsh-hot-trends'
const SKILLS_ROOT = fileURLToPath(new URL('./skills/', import.meta.url))

export const name = 'dsh-hot-trends'
export const inject = ['tools', 'skills']

export function apply(ctx) {
  ctx.tools.register({
    name: 'hot_trends',
    description:
      '采集中国实时热点/榜单数据，免 API Key。支持来源：weibo(微博热搜)、baidu(百度热搜)、bilibili(B站全站排行榜)、zhihu(知乎热榜)、appstore(苹果App Store免费榜)、qqmusic(QQ音乐飙升榜)。返回 JSON 数组 {rank,title,heat}。当用户问"今天热搜是什么/有什么热点/排行榜"时使用。',
    parameters: {
      source: {
        type: 'string',
        enum: ['weibo', 'baidu', 'bilibili', 'zhihu', 'appstore', 'qqmusic'],
        required: true,
        description: '榜单来源',
      },
      limit: {
        type: 'number',
        description: '返回条数，默认 20，最大 50',
      },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    async execute(args) {
      const source = args.source
      const limit = Math.min(Math.max(Number(args.limit) || 20, 1), 50)
      try {
        const items = await fetchList(source, limit)
        const lines = items.map((item, index) => {
          const heat = item.heat ? `（${item.heat}）` : ''
          return `${index + 1}. ${item.title}${heat}`
        })
        return `【${sourceLabel(source)}】Top ${lines.length}：\n` + lines.join('\n')
      } catch (error) {
        return `采集失败（${source}）：${error instanceof Error ? error.message : String(error)}。可换其他来源重试。`
      }
    },
  })

  ctx.skills.registerProvider(() => ({
    name: PROVIDER_NAME,
    async list(options) {
      options?.signal?.throwIfAborted()
      const listed = await loadSkills(options?.signal)
      options?.signal?.throwIfAborted()
      return listed.map(toCandidate)
    },
    async get(candidate, options) {
      options?.signal?.throwIfAborted()
      const listed = await loadSkills(options?.signal)
      const skill = listed.find((entry) => entry.name === candidate.name)
      return skill === undefined ? undefined : toDefinition(skill)
    },
  }))
}

/* ------------------------------------------------------------------ *
 * Tool: hot-list fetchers (public keyless endpoints, best effort)
 * ------------------------------------------------------------------ */

function sourceLabel(source) {
  return {
    weibo: '微博热搜',
    baidu: '百度热搜',
    bilibili: 'B站热搜',
    zhihu: '知乎热榜',
    appstore: 'App Store 免费榜',
    qqmusic: 'QQ音乐飙升榜',
  }[source] ?? source
}

async function fetchList(source, limit) {
  switch (source) {
    case 'weibo':
      return weiboHotSearch(limit)
    case 'baidu':
      return baiduHotSearch(limit)
    case 'bilibili':
      return bilibiliHotSearch(limit)
    case 'zhihu':
      return zhihuHotList(limit)
    case 'appstore':
      return appstoreTop(limit)
    case 'qqmusic':
      return qqmusicTop(limit)
    default:
      throw new Error(`unknown source: ${source}`)
  }
}

async function getJson(url, timeoutMs = 8000, extraHeaders = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
        accept: 'application/json, text/plain, */*',
        ...extraHeaders,
      },
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.json()
  } finally {
    clearTimeout(timer)
  }
}

async function weiboHotSearch(limit) {
  try {
    // 微博 ajax 接口需要 Referer 头，否则返回 403
    const data = await getJson('https://weibo.com/ajax/side/hotSearch', 8000, {
      referer: 'https://weibo.com/',
    })
    const realtime = data?.data?.realtime ?? []
    if (realtime.length > 0) {
      return realtime.slice(0, limit).map((item) => ({
        title: item.word ?? '',
        heat: item.num != null ? `${item.num} 讨论` : undefined,
      }))
    }
    throw new Error('empty list')
  } catch {
    // 直连接口受限时兜底：vvhan 微博热搜聚合接口
    const data = await getJson('https://api.vvhan.com/api/hotlist/wbHot')
    const list = data?.data ?? []
    return list.slice(0, limit).map((item) => ({
      title: item.title ?? '',
      heat: item.hot != null ? `${item.hot}` : undefined,
    }))
  }
}

async function baiduHotSearch(limit) {
  const data = await getJson('https://top.baidu.com/api/board?platform=wise&tab=realtime')
  const cards = data?.data?.cards ?? []
  const content = cards[0]?.content ?? []
  return content.slice(0, limit).map((item) => ({
    title: item.word ?? item.query ?? '',
    heat: item.hotScore != null ? `${item.hotScore}` : undefined,
  }))
}

async function bilibiliHotSearch(limit) {
  // 全站排行榜（公开稳定接口），替代已失效的 search/square 热搜接口
  const data = await getJson('https://api.bilibili.com/x/web-interface/ranking/v2?rid=0&type=all')
  const list = data?.data?.list ?? []
  return list.slice(0, limit).map((item) => ({
    title: item.title ?? '',
    heat: item.stat?.view != null ? `${item.stat.view} 播放` : undefined,
  }))
}

async function zhihuHotList(limit) {
  const data = await getJson('https://api.zhihu.com/topstory/hot-list')
  const list = data?.data ?? []
  return list.slice(0, limit).map((item) => ({
    title: item?.target?.title ?? item?.target?.question?.title ?? '',
    heat: item?.detail_text ?? undefined,
  }))
}

async function appstoreTop(limit) {
  const data = await getJson(
    `https://rss.applemarketingtools.com/api/v2/cn/apps/top-free/${Math.max(limit, 10)}/apps.json`,
  )
  const apps = data?.feed?.results ?? []
  return apps.slice(0, limit).map((item) => ({
    title: `${item.name}（${item.artist ?? ''}）`,
    heat: undefined,
  }))
}

async function qqmusicTop(limit) {
  // topid=4 is the 飙升榜; the endpoint may return plain JSON or JSONP — handle both.
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)
  try {
    const response = await fetch(
      'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?topid=4&format=json',
      { signal: controller.signal, headers: { 'user-agent': 'Mozilla/5.0' } },
    )
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const text = await response.text()
    const trimmed = text.trim()
    const json = JSON.parse(
      trimmed.startsWith('{') || trimmed.startsWith('[')
        ? trimmed
        : trimmed.replace(/^[^(]*\(|\)[^)]*$/g, ''),
    )
    const list = json?.songlist ?? []
    return list.slice(0, limit).map((item, index) => ({
      title: `${item.songname ?? ''} — ${(item.singer ?? []).map((s) => s.name).join('/')}`,
      heat: `第 ${index + 1} 名`,
    }))
  } finally {
    clearTimeout(timer)
  }
}

/* ------------------------------------------------------------------ *
 * Skill provider (skills/hot-trends/SKILL.md)
 * ------------------------------------------------------------------ */

async function loadSkills(signal) {
  const entries = await readdir(SKILLS_ROOT, { withFileTypes: true, signal })
  const skills = []
  for (const entry of entries) {
    if (!entry.isDirectory() && !entry.isSymbolicLink()) continue
    signal?.throwIfAborted()
    const directory = join(SKILLS_ROOT, entry.name)
    const skillFile = join(directory, 'SKILL.md')
    const parsed = parseSkill(await readFile(skillFile, 'utf8'), directory, skillFile)
    if (parsed !== undefined) skills.push(parsed)
  }
  return [...skills].sort((left, right) => left.name.localeCompare(right.name))
}

function parseSkill(raw, directory, skillFile) {
  const parsed = parseFrontmatter(raw)
  if (parsed === undefined) return undefined
  const data = parsed.data
  const skillName = typeof data.name === 'string' ? data.name.trim() : undefined
  const description = typeof data.description === 'string' ? data.description.trim() : undefined
  if (skillName === undefined || description === undefined) {
    throw new Error(`${PROVIDER_NAME}: ${skillFile} frontmatter requires name and description`)
  }
  if (!SKILL_NAME.test(skillName)) {
    throw new Error(`${PROVIDER_NAME}: invalid skill name "${skillName}"`)
  }
  return {
    name: skillName,
    description,
    ...(typeof data.metadata === 'object' && data.metadata !== null && !Array.isArray(data.metadata)
      ? { metadata: data.metadata }
      : {}),
    invocation: {
      modelInvocable: data['disable-model-invocation'] !== true,
      userInvocable: data['user-invocable'] !== false,
    },
    provider: PROVIDER_NAME,
    source: 'bundled',
    resourceBase: { kind: 'directory', path: directory },
    rank: BUNDLED_SKILL_RANK,
    locator: skillFile,
    path: skillFile,
    content: parsed.body.trim(),
  }
}

function parseFrontmatter(raw) {
  const firstLineEnd = raw.indexOf('\n')
  if (firstLineEnd < 0) return undefined
  if (raw.slice(0, firstLineEnd).replace(/\r$/, '') !== '---') return undefined
  const start = firstLineEnd + 1
  const closing = findClosingFrontmatter(raw, start)
  if (closing === undefined) return undefined
  const parsed = parseYaml(raw.slice(start, closing.start))
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return undefined
  return { data: parsed, body: raw.slice(closing.bodyStart) }
}

function findClosingFrontmatter(raw, start) {
  let lineStart = start
  while (lineStart <= raw.length) {
    const nextNewline = raw.indexOf('\n', lineStart)
    const lineEnd = nextNewline < 0 ? raw.length : nextNewline
    if (raw.slice(lineStart, lineEnd).replace(/\r$/, '') === '---') {
      return { start: lineStart, bodyStart: nextNewline < 0 ? raw.length : nextNewline + 1 }
    }
    if (nextNewline < 0) return undefined
    lineStart = nextNewline + 1
  }
}

function toCandidate(skill) {
  return {
    name: skill.name,
    description: skill.description,
    ...(skill.metadata !== undefined ? { metadata: skill.metadata } : {}),
    invocation: skill.invocation,
    provider: skill.provider,
    source: skill.source,
    resourceBase: skill.resourceBase,
    rank: skill.rank,
    locator: skill.locator,
    path: skill.path,
  }
}

function toDefinition(skill) {
  return {
    name: skill.name,
    description: skill.description,
    ...(skill.metadata !== undefined ? { metadata: skill.metadata } : {}),
    invocation: skill.invocation,
    provider: skill.provider,
    source: skill.source,
    resourceBase: skill.resourceBase,
    path: skill.path,
    content: skill.content,
  }
}
