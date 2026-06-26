#!/bin/bash
FILE=$(echo "$CLAUDE_TOOL_INPUT" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('path',''))" 2>/dev/null)
CONTENT=$(echo "$CLAUDE_TOOL_INPUT" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('content',''))" 2>/dev/null)

SECRET_PATTERNS=(
  "sk-[a-zA-Z0-9]{32,}"
  "ANTHROPIC_API_KEY\s*=\s*['\"]?sk-"
  "password\s*=\s*['\"][^'\"]{8,}"
  "secret\s*=\s*['\"][^'\"]{16,}"
)

for pattern in "${SECRET_PATTERNS[@]}"; do
  if echo "$CONTENT" | grep -qiE "$pattern"; then
    echo "🚫 BLOCKIERT: Mögliches Secret in '$FILE' erkannt!" >&2
    echo "Nutze stattdessen Umgebungsvariablen." >&2
    exit 2
  fi
done

exit 0
