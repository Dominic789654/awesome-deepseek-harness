#!/usr/bin/env bash
# Notify authors of newly-listed, mature DSH plugins that they've been included.
#
# Guardrails (per 2026-08-13 spec):
#   1. only repos with stars >= MIN_STARS
#   2. never notify the same repo twice (.notified-authors.txt ledger)
#   3. skip official / competitor / our own repos
#   4. at most MAX_PER_RUN per invocation
#
# Usage:
#   notify_authors.sh            # dry-run (default; prints what WOULD be sent)
#   notify_authors.sh --send     # actually open issues
#
# Output contract (consumed by cron):
#   NO_NEW_AUTHORS        -> nothing eligible
#   SENT <repo> <url>     -> one line per notification actually sent
#   DRYRUN <repo>         -> one line per candidate in dry-run mode

set -uo pipefail

REPO_DIR="$HOME/awesome-deepseek-harness"
LIST_REPO="Dominic789654/awesome-deepseek-harness"
SNAPSHOT="$REPO_DIR/.stars-snapshot.tsv"
LEDGER="$REPO_DIR/.notified-authors.txt"

# Star window, not just a floor. Rationale: a floor alone makes the highest-star
# repos win every run, and pinging a 19k-star project about being listed in a
# ~100-star index reads as spam and gets ignored. The 20..300 band is where the
# project is real enough to be worth listing, and small enough that the author
# actually cares / may link back.
MIN_STARS="${MIN_STARS:-20}"
MAX_STARS="${MAX_STARS:-300}"
MAX_PER_RUN="${MAX_PER_RUN:-3}"

SEND=0
[ "${1:-}" = "--send" ] && SEND=1

# --- skip list: our own repo, official DeepSeek/Anthropic orgs, competing lists
SKIP_OWNERS_RE='^(Dominic789654|deepseek-ai|deepseek|anthropics|openai|google|microsoft|sindresorhus)$'
SKIP_REPO_RE='(awesome-deepseek-harness|awesome-claude|awesome-mcp|^awesome-)'

[ -f "$SNAPSHOT" ] || { echo "ERROR: snapshot missing: $SNAPSHOT" >&2; exit 1; }
touch "$LEDGER"

# --- repos currently in the list (README), lowercased
grep -oE 'github\.com/[A-Za-z0-9._-]+/[A-Za-z0-9._-]+' "$REPO_DIR/README.md" \
  | sed 's#github.com/##' | tr 'A-Z' 'a-z' | sort -u > /tmp/.dsh_listed.$$

sent=0
declare -a candidates=()

while IFS=$'\t' read -r full stars created; do
  [ -z "${full:-}" ] && continue
  case "${stars:-}" in (''|*[!0-9]*) continue ;; esac
  [ "$stars" -lt "$MIN_STARS" ] && continue
  [ "$stars" -gt "$MAX_STARS" ] && continue

  owner="${full%%/*}"
  name="${full##*/}"
  lc="$(echo "$full" | tr 'A-Z' 'a-z')"

  # guardrail 3: skip official / competitor / self
  echo "$owner" | grep -qiE "$SKIP_OWNERS_RE" && continue
  echo "$name"  | grep -qiE "$SKIP_REPO_RE"  && continue

  # must actually be in our list
  grep -qxF "$lc" /tmp/.dsh_listed.$$ || continue

  # guardrail 2: already notified?
  grep -qxF "$lc" "$LEDGER" && continue

  candidates+=("$full|$stars|${created:-0000-00-00}")
done < "$SNAPSHOT"

rm -f /tmp/.dsh_listed.$$

if [ "${#candidates[@]}" -eq 0 ]; then
  echo "NO_NEW_AUTHORS"
  exit 0
fi

# Newest-first, not highest-star-first: within the star window every candidate is
# equally "worth listing", so prefer freshly-added repos (the author just shipped,
# so a heads-up is timely and most likely to be welcome).
IFS=$'\n' sorted=($(printf '%s\n' "${candidates[@]}" | awk -F'|' '{print $3"\t"$0}' | sort -r | cut -f2-))
unset IFS

for entry in "${sorted[@]}"; do
  [ "$sent" -ge "$MAX_PER_RUN" ] && break
  full="${entry%%|*}"
  stars="$(echo "$entry" | cut -d'|' -f2)"
  lc="$(echo "$full" | tr 'A-Z' 'a-z')"

  if [ "$SEND" -eq 0 ]; then
    echo "DRYRUN $full (${stars}⭐, listed $(echo "$entry" | cut -d'|' -f3))"
    sent=$((sent+1))
    continue
  fi

  body=$(cat <<EOF
Hi! 👋

Your project **[$full](https://github.com/$full)** is listed in [Awesome DeepSeek Harness](https://github.com/$LIST_REPO) — a curated index of the DSH plugin/skill ecosystem.

No action needed on your side; this is just a heads-up so you know where the traffic is coming from. If the description there is inaccurate or you'd prefer a different category (or would rather not be listed at all), just say so and I'll fix or remove it right away.

Thanks for building in the open. 🐋
EOF
)

  url=$(gh issue create --repo "$full" \
        --title "Listed in Awesome DeepSeek Harness 🐋" \
        --body "$body" 2>&1 | grep -oE 'https://github.com/[^ ]+/issues/[0-9]+' | head -1)

  if [ -n "$url" ]; then
    echo "$lc" >> "$LEDGER"
    echo "SENT $full $url"
    sent=$((sent+1))
  else
    # issues disabled / no permission — record so we don't retry forever
    echo "$lc" >> "$LEDGER"
    echo "SKIP $full (issue creation failed — issues disabled?)"
  fi
done

# --- official-picks pass: authors of @tianyi-recommended plugins (star window waived) ---
OFFICIAL_MAX="${OFFICIAL_MAX:-1}"
ofsent=0
official_repos="$(awk '/^## Official Picks/{f=1;next} /^## /{f=0} f' "$REPO_DIR/README.md" 2>/dev/null \
  | grep -oE 'github\.com/[A-Za-z0-9._-]+/[A-Za-z0-9._-]+' | sed 's#github.com/##' | tr 'A-Z' 'a-z' | sort -u)"
for full in $official_repos; do
  [ "$ofsent" -ge "$OFFICIAL_MAX" ] && break
  owner="${full%%/*}"; name="${full##*/}"
  echo "$owner" | grep -qiE "$SKIP_OWNERS_RE" && continue
  echo "$name"  | grep -qiE "$SKIP_REPO_RE"  && continue
  grep -qxF "$full" "$LEDGER" && continue
  if [ "$SEND" -eq 0 ]; then echo "DRYRUN-OFFICIAL $full"; ofsent=$((ofsent+1)); continue; fi
  body=$(cat <<EOF
Hi! 👋

Your project **[$full](https://github.com/$full)** was recently featured as an **Official Pick** in [Awesome DeepSeek Harness](https://github.com/$LIST_REPO) — the DSH team's own @tianyi recommended it in the 【DSH 社区插件推荐】 series on X, and we highlighted it at the very top of our list.

No action needed — just letting you know where the traffic is coming from. If you like, feel free to link back to the list. And if our description is off, tell us and we'll fix it right away. 🐋
EOF
)
  url=$(gh issue create --repo "$full" --title "Featured as an Official Pick in Awesome DeepSeek Harness 🐋" --body "$body" 2>&1 | grep -oE 'https://github.com/[^ ]+/issues/[0-9]+' | head -1)
  if [ -n "$url" ]; then echo "$full" >> "$LEDGER"; echo "SENT-OFFICIAL $full $url"; ofsent=$((ofsent+1));
  else echo "$full" >> "$LEDGER"; echo "SKIP-OFFICIAL $full (issue creation failed)"; fi
done

[ "$sent" -eq 0 ] && [ "$ofsent" -eq 0 ] && echo "NO_NEW_AUTHORS"
exit 0
