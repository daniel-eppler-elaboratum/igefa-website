#!/bin/bash
# Exit code 2 = BLOCKIEREN, Exit code 0 = Erlauben

COMMAND=$(cat)

DANGEROUS_PATTERNS=(
  "rm -rf /"
  "DROP TABLE"
  "DROP DATABASE"
  "git push.*--force.*main"
  "git push.*-f.*main"
  "npm publish"
  "vercel --prod"
  "> /dev/null 2>&1 &"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qi "$pattern"; then
    echo "🚫 BLOCKIERT: Gefährlicher Befehl erkannt: '$pattern'" >&2
    echo "Bitte manuell ausführen und bestätigen." >&2
    exit 2
  fi
done

exit 0
