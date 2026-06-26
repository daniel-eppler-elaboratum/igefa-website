#!/bin/bash
# Nach jeder Datei-Bearbeitung automatisch linting

MODIFIED_FILE=$(echo "$CLAUDE_TOOL_INPUT" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('path',''))" 2>/dev/null)

# TypeScript / JavaScript
if [[ "$MODIFIED_FILE" == *.ts || "$MODIFIED_FILE" == *.tsx || "$MODIFIED_FILE" == *.js ]]; then
  npx tsc --noEmit --skipLibCheck 2>/dev/null | head -20
  npx eslint "$MODIFIED_FILE" --fix --quiet 2>/dev/null
fi

# PHP
if [[ "$MODIFIED_FILE" == *.php ]]; then
  ./vendor/bin/pint "$MODIFIED_FILE" 2>/dev/null
fi

# Python
if [[ "$MODIFIED_FILE" == *.py ]]; then
  ruff check "$MODIFIED_FILE" --fix 2>/dev/null
fi

exit 0
