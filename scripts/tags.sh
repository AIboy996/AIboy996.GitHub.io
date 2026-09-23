#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

find "$ROOT" -type f \( -name '*.md' -o -name '*.markdown' \) -print0 |
while IFS= read -r -d '' file; do
	awk '
		NR == 1 && $0 != "---" { exit }
		$0 == "---" {
			if (seen_frontmatter) exit
			seen_frontmatter = 1
			in_frontmatter = 1
			next
		}
		in_frontmatter && /^[[:space:]]*tags:[[:space:]]*$/ {
			in_tags = 1
			next
		}
		in_frontmatter && /^[[:space:]]*tags:[[:space:]]*\[/ {
			value = $0
			sub(/^[^[]*\[/, "", value)
			sub(/\].*$/, "", value)
			n = split(value, tags, /,[[:space:]]*/)
			for (i = 1; i <= n; i++) print_tag(tags[i])
			in_tags = 0
			next
		}
		in_tags && /^[[:space:]]*-[[:space:]]+/ {
			value = $0
			sub(/^[[:space:]]*-[[:space:]]+/, "", value)
			print_tag(value)
			next
		}
		in_tags && $0 !~ /^[[:space:]]*$/ { in_tags = 0 }

		function print_tag(tag) {
			gsub(/^[[:space:]"'"'"']+|[[:space:]"'"'"']+$/, "", tag)
			if (tag != "") print tag
		}
	' "$file"
done |
	LC_ALL=C sort |
	uniq -c |
	sort -k1,1nr -k2,2 |
	awk '{ print $2 "\t" $1 }'

