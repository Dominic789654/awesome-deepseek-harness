/**
 * dsh-refactoring-guide — bundled refactoring guide skill.
 *
 * This module is the Cordis plugin entry point dsh mounts from the bundle
 * patch row. The loader reads the named exports `name`, `inject`, and `apply`;
 * `apply` registers a skill provider on the `ctx.skills` registry, which the
 * stock `dsh-tool-skill` consumer turns into the model-facing skill catalog
 * and loader.
 */

import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdir, readFile, stat } from 'node:fs/promises';

/** Cordis plugin identifier of this bundle row. */
export const name = 'refactoring-guide';

/** Services this plugin must have mounted before it applies. */
export const inject = ['skills'];

/** Package root of this plugin (one level above the compiled or source entry). */
const PACKAGE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Simple skill provider that reads SKILL.md files from a bundled skills directory.
 */
class RefactoringGuideSkillProvider {
  constructor(skillsDir, warn) {
    this.name = 'refactoring-guide-bundled';
    this.skillsDir = skillsDir;
    this.warn = warn;
  }

  async list(options) {
    const { signal } = options;
    const skills = [];
    try {
      const entries = await readdir(this.skillsDir, { withFileTypes: true });
      for (const entry of entries) {
        if (signal?.aborted) break;
        if (!entry.isDirectory()) continue;
        const skillDir = join(this.skillsDir, entry.name);
        const skillFile = join(skillDir, 'SKILL.md');
        try {
          const content = await readFile(skillFile, 'utf8');
          // Parse YAML frontmatter (simplified)
          const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
          if (!match) {
            this.warn(`refactoring-guide: ${skillFile} missing frontmatter`);
            continue;
          }
          const frontmatter = match[1];
          const body = match[2];
          // Simple parsing: extract name and description
          const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
          const descMatch = frontmatter.match(/^description:\s*(.+)$/m);
          if (!nameMatch) {
            this.warn(`refactoring-guide: ${skillFile} missing name`);
            continue;
          }
          const skillName = nameMatch[1].trim();
          const description = descMatch ? descMatch[1].trim() : '';
          skills.push({
            name: skillName,
            description,
            source: 'bundled',
            rank: 100,
            invocation: { modelInvocable: true, userInvocable: true },
            load: async () => ({
              name: skillName,
              description,
              content: body,
              metadata: {},
            }),
          });
        } catch (e) {
          // ignore missing SKILL.md
        }
      }
    } catch (e) {
      this.warn(`refactoring-guide: failed to read skills directory: ${e.message}`);
    }
    return skills;
  }
}

/**
 * Validate user config and produce the provider settings.
 */
function resolveSettings(config) {
  const providerName = (config.providerName ?? 'refactoring-guide-bundled').trim();
  if (providerName.length === 0) {
    throw new TypeError('refactoring-guide: "providerName" must be a non-empty string');
  }
  const skillsDir = config.skillsDir
    ? (config.skillsDir.startsWith('/') ? config.skillsDir : resolve(PACKAGE_ROOT, config.skillsDir))
    : join(PACKAGE_ROOT, 'skills');
  return { providerName, skillsDir };
}

/**
 * Cordis plugin body: register the bundled library on `ctx.skills`.
 */
export function apply(ctx, config = {}) {
  const settings = resolveSettings(config);
  const warn = (message) => {
    ctx.logger.warn(message);
  };
  return ctx.skills.registerProvider((_control) =>
    new RefactoringGuideSkillProvider(settings.skillsDir, warn)
  );
}