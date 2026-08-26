/**
 * dsh-agent-teams bundle entry: registers the packaged
 * `skills/dsh-agent-teams/SKILL.md` bundle on `ctx.skills`.
 * @module dsh-agent-teams
 */

import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'

const BUNDLED_SKILL_RANK = 600
const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const PROVIDER_NAME = 'dsh-agent-teams'
const SKILLS_ROOT = fileURLToPath(new URL('./skills/', import.meta.url))

export const name = 'dsh-agent-teams'
export const inject = ['skills']

export function apply(ctx) {
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
