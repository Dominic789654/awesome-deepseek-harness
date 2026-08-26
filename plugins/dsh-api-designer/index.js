// dsh-api-designer — DSH plugin to inject api-designer skill into system-prompt persona
//
// Reads skill.md, extracts markdown content (strips YAML frontmatter),
// and registers a system-prompt section with order 10 (after persona, before tool guidance).

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const name = 'api-designer'
export const inject = ['systemPrompt']

const __dirname = dirname(fileURLToPath(import.meta.url))

function extractMarkdown(content) {
  // Strip YAML frontmatter (between first two --- lines)
  const lines = content.split('\n')
  let start = 0
  if (lines[0].trim() === '---') {
    // find closing ---
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        start = i + 1
        break
      }
    }
  }
  return lines.slice(start).join('\n').trim()
}

export function apply(ctx) {
  const skillPath = join(__dirname, 'skill.md')
  const raw = readFileSync(skillPath, 'utf8')
  const markdown = extractMarkdown(raw)

  ctx.systemPrompt.section({
    name: 'api-designer-skill',
    order: 10, // after persona (0) but before tool guidance (100-199)
    text: markdown,
  })
}