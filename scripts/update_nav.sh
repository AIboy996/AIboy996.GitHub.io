#!/usr/bin/env bash
#
# update_nav.sh — 把 docs 下新增的 markdown 文件路径自动补进 nav.yml
#
# 规则：
#   1. 已出现在 nav.yml 中的文件跳过；
#   2. 已列在 mkdocs.yml 的 not_in_nav 块中的文件跳过（刻意不进导航的页面）；
#   3. 其余新增的 .md 会插入到「同目录最后一个已有条目」之后，并沿用其缩进；
#   4. 若新文件所在目录在 nav.yml 中还没有任何条目，则跳过并提示手动处理。
#
# 用法：
#   bash scripts/update_nav.sh            # 直接修改 nav.yml
#   bash scripts/update_nav.sh --dry-run  # 只打印将要发生的改动，不写文件

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NAV="$ROOT/nav.yml"
CFG="$ROOT/mkdocs.yml"
DOCS="$ROOT/docs"

DRY_RUN=0
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=1

# 记录原 nav.yml 末尾是否带换行（改写时保持原样，避免产生无关 diff）
if [[ -z "$(tail -c 1 "$NAV")" ]]; then
  had_trailing_nl=1
else
  had_trailing_nl=0
fi

# 1) nav.yml 中已引用的路径（.md / .ipynb）
nav_paths="$(grep -oE '[A-Za-z0-9][A-Za-z0-9_./+-]*\.(md|ipynb)' "$NAV" | sort -u)"

# 2) mkdocs.yml 里 not_in_nav 块中的路径（刻意不进导航）
not_in_nav="$(awk '
  /^not_in_nav:/ { f=1; next }
  f && /^[[:space:]]/ { line=$0; sub(/^[[:space:]]+/, "", line); if (line != "") print line; next }
  f { f=0 }
' "$CFG" | sort -u)"

# 3) docs 下所有 markdown（相对 docs 的路径）
doc_md="$(cd "$DOCS" && find . -type f -name '*.md' | sed 's#^\./##' | sort)"

# 4) 需要新增到 nav 的文件
new_files="$(comm -23 \
  <(printf '%s\n' "$doc_md") \
  <(printf '%s\n%s\n' "$nav_paths" "$not_in_nav" | sort -u))"

if [[ -z "$new_files" ]]; then
  echo "✅ 没有需要新增到 nav.yml 的 markdown 文件"
  exit 0
fi

# 找到某目录在 nav.yml 中最后一个条目的「行号<TAB>缩进」
find_sibling() {
  local dir="$1"
  awk -v dir="$dir" '
    /\.(md|ipynb)[[:space:]]*$/ {
      orig = $0
      t = $0
      sub(/^[[:space:]]*-[[:space:]]*/, "", t)
      sub(/[[:space:]]+$/, "", t)
      if (t ~ /: /) sub(/^[^:]*: /, "", t)
      n = split(t, p, "/")
      d = ""
      for (i = 1; i < n; i++) d = d (i > 1 ? "/" : "") p[i]
      if (d == dir) {
        last = NR
        match(orig, /^[[:space:]]*/)
        ind = substr(orig, RSTART, RLENGTH)
      }
    }
    END { if (last != "") print last "\t" ind }
  ' "$NAV"
}

# 为每个新文件生成插入计划：行号<TAB>缩进<TAB>文件
plan="$(mktemp)"
trap 'rm -f "$plan"' EXIT

while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  dir="$(dirname "$f")"
  sib="$(find_sibling "$dir")"
  if [[ -z "$sib" ]]; then
    echo "⚠️  ${f}：目录 ${dir} 在 nav.yml 中还没有条目，请手动决定分组与标题"
    continue
  fi
  line="${sib%%$'\t'*}"
  indent="${sib#*$'\t'}"
  printf '%s\t%s\t%s\n' "$line" "$indent" "$f" >> "$plan"
done <<< "$new_files"

# 按行号降序（同目录内按文件名降序）插入：保证最终同目录内文件名升序，且行号不漂移
if [[ -s "$plan" ]]; then
  sort -t$'\t' -k1,1nr -k3,3r "$plan" -o "$plan"
  while IFS=$'\t' read -r line indent f; do
    [[ -z "$line" ]] && continue
    entry="${indent}- ${f}"
    if [[ "$DRY_RUN" -eq 1 ]]; then
      echo "  + 在第 ${line} 行后插入：${entry}"
    else
      awk -v line="$line" -v text="$entry" '
        { print }
        NR == line { print text }
      ' "$NAV" > "$NAV.tmp" && mv "$NAV.tmp" "$NAV"
      echo "  + 已插入：${entry}"
    fi
  done < "$plan"

  # 若原文件末尾没有换行，恢复原状（awk 的 print 会给最后一行补换行）
  if [[ "$DRY_RUN" -eq 0 && "$had_trailing_nl" -eq 0 ]]; then
    printf '%s' "$(cat "$NAV")" > "$NAV.tmp" && mv "$NAV.tmp" "$NAV"
  fi
fi

echo "完成。"
