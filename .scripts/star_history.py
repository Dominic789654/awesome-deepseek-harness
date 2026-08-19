#!/usr/bin/env python3
"""Append today's star count to a history file and render a self-hosted SVG chart.

Why this exists: GitHub restricted the public stargazers API on 2026-06-30
(https://github.blog/changelog/2026-06-30-upcoming-access-restrictions-to-public-api-endpoints-and-ui-views/),
so third-party live charts (star-history.com) return a placeholder for repos they
do not collaborate on. The per-stargazer timeline is no longer readable, but the
plain star *total* still is -- so we sample it daily and build our own curve.

Idempotent: re-running on the same day overwrites that day's sample rather than
appending a duplicate. Never rewrites history for earlier dates.

Usage:
  python3 .scripts/star_history.py                 # fetch live count via API
  python3 .scripts/star_history.py --stars 152     # use an explicit count
  python3 .scripts/star_history.py --date 2026-08-19 --stars 152
"""
import argparse
import datetime as dt
import json
import os
import pathlib
import subprocess
import sys
import urllib.request

REPO = os.environ.get("STAR_HISTORY_REPO", "Dominic789654/awesome-deepseek-harness")
ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "assets" / "star-history.tsv"
SVG = ROOT / "assets" / "star-history.svg"

# chart geometry
W, H = 600, 300
PAD_L, PAD_R, PAD_T, PAD_B = 58, 18, 22, 40
PLOT_W = W - PAD_L - PAD_R
PLOT_H = H - PAD_T - PAD_B


def fetch_stars(repo: str) -> int:
    """Read the repo's star total. Prefers gh CLI (inherits auth), falls back to REST."""
    try:
        out = subprocess.run(
            ["gh", "api", f"repos/{repo}", "--jq", ".stargazers_count"],
            capture_output=True, text=True, timeout=30,
        )
        if out.returncode == 0 and out.stdout.strip().isdigit():
            return int(out.stdout.strip())
    except (FileNotFoundError, subprocess.TimeoutExpired):
        pass

    req = urllib.request.Request(
        f"https://api.github.com/repos/{repo}",
        headers={"Accept": "application/vnd.github+json", "User-Agent": "star-history-selfhosted"},
    )
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return int(json.load(resp)["stargazers_count"])


def load() -> "list[tuple[str, int]]":
    if not DATA.exists():
        return []
    rows = []
    for line in DATA.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split("\t")
        if len(parts) >= 2 and parts[1].isdigit():
            rows.append((parts[0], int(parts[1])))
    return sorted(set(rows), key=lambda r: r[0])


DEFAULT_HEADER = "# date\tstars — sampled daily; see .scripts/star_history.py"


def load_header() -> str:
    """Preserve the existing comment header (provenance notes) across rewrites."""
    if not DATA.exists():
        return DEFAULT_HEADER
    kept = []
    for line in DATA.read_text().splitlines():
        if line.startswith("#"):
            kept.append(line)
        elif line.strip():
            break  # header ends at the first data row
    return "\n".join(kept) if kept else DEFAULT_HEADER


def save(rows) -> None:
    DATA.parent.mkdir(parents=True, exist_ok=True)
    header = load_header()
    body = "\n".join(f"{d}\t{s}" for d, s in rows)
    DATA.write_text(f"{header}\n{body}\n")


def nice_ceil(n: int) -> int:
    """Round an axis max up to something human-readable."""
    if n <= 5:
        return 5
    for step in (10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 5000, 10000):
        if n <= step:
            return step
    return ((n + 9999) // 10000) * 10000


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def render(rows) -> str:
    if not rows:
        raise SystemExit("no data to plot")

    y_max = nice_ceil(max(s for _, s in rows))
    n = len(rows)
    d0 = dt.date.fromisoformat(rows[0][0])
    d1 = dt.date.fromisoformat(rows[-1][0])
    span_days = max((d1 - d0).days, 1)

    def px(date_str: str) -> float:
        d = dt.date.fromisoformat(date_str)
        if n == 1:
            return PAD_L + PLOT_W / 2
        return PAD_L + PLOT_W * ((d - d0).days / span_days)

    def py(stars: int) -> float:
        return PAD_T + PLOT_H * (1 - stars / y_max)

    pts = [(px(d), py(s)) for d, s in rows]

    # y gridlines + labels
    grid, ylabels = [], []
    for i in range(5):
        val = round(y_max * i / 4)
        y = py(val)
        grid.append(
            f'<line x1="{PAD_L}" y1="{y:.1f}" x2="{PAD_L + PLOT_W}" y2="{y:.1f}" '
            f'stroke="#e5e7eb" stroke-width="1"/>'
        )
        ylabels.append(
            f'<text x="{PAD_L - 10}" y="{y + 4:.1f}" text-anchor="end" '
            f'font-size="11" fill="#6b7280">{val}</text>'
        )

    # x labels: first, last, and a middle tick when there is room
    idxs = {0, n - 1}
    if n >= 5:
        idxs.add(n // 2)
    xlabels = []
    for i in sorted(idxs):
        d, _ = rows[i]
        x = pts[i][0]
        anchor = "start" if i == 0 and n > 1 else ("end" if i == n - 1 and n > 1 else "middle")
        label = dt.date.fromisoformat(d).strftime("%b %d")
        xlabels.append(
            f'<text x="{x:.1f}" y="{PAD_T + PLOT_H + 20}" text-anchor="{anchor}" '
            f'font-size="11" fill="#6b7280">{label}</text>'
        )

    line = " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)
    area = (
        f"{PAD_L},{PAD_T + PLOT_H} "
        + line
        + f" {pts[-1][0]:.1f},{PAD_T + PLOT_H}"
    )
    dots = "".join(
        f'<circle cx="{x:.1f}" cy="{y:.1f}" r="2.5" fill="#2563eb"/>' for x, y in pts
    )
    latest = rows[-1][1]

    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="Star history for {esc(REPO)}">
  <title>Star history for {esc(REPO)} — {latest} stars as of {rows[-1][0]}</title>
  <defs>
    <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2563eb" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#2563eb" stop-opacity="0.02"/>
    </linearGradient>
  </defs>
  <rect width="{W}" height="{H}" fill="#ffffff"/>
  <text x="{PAD_L}" y="15" font-size="12" font-weight="600" fill="#111827">{esc(REPO)}</text>
  <text x="{W - PAD_R}" y="15" text-anchor="end" font-size="12" fill="#2563eb">{latest} ★</text>
{chr(10).join("  " + g for g in grid)}
  <polygon points="{area}" fill="url(#fill)"/>
  <polyline points="{line}" fill="none" stroke="#2563eb" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
  {dots}
  <line x1="{PAD_L}" y1="{PAD_T + PLOT_H}" x2="{PAD_L + PLOT_W}" y2="{PAD_T + PLOT_H}" stroke="#9ca3af" stroke-width="1"/>
  <line x1="{PAD_L}" y1="{PAD_T}" x2="{PAD_L}" y2="{PAD_T + PLOT_H}" stroke="#9ca3af" stroke-width="1"/>
{chr(10).join("  " + t for t in ylabels)}
{chr(10).join("  " + t for t in xlabels)}
  <text x="{W - PAD_R}" y="{H - 8}" text-anchor="end" font-size="9" fill="#9ca3af">self-hosted · daily sample</text>
</svg>
"""


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--stars", type=int, help="star count to record (default: fetch from GitHub)")
    ap.add_argument("--date", default=dt.date.today().isoformat(), help="YYYY-MM-DD sample date")
    ap.add_argument("--render-only", action="store_true", help="redraw SVG without adding a sample")
    args = ap.parse_args()

    rows = load()

    if not args.render_only:
        stars = args.stars if args.stars is not None else fetch_stars(REPO)
        rows = [(d, s) for d, s in rows if d != args.date]  # idempotent same-day overwrite
        rows.append((args.date, stars))
        rows.sort(key=lambda r: r[0])
        save(rows)
        print(f"recorded {args.date}\t{stars}")

    SVG.parent.mkdir(parents=True, exist_ok=True)
    SVG.write_text(render(rows))
    print(f"wrote {SVG.relative_to(ROOT)} ({len(rows)} point(s))")


if __name__ == "__main__":
    main()
