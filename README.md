# EStores Project Template

Professionelles Claude Code + Cursor Projekt-Template für neue Softwareprojekte.

## 🚀 Neues Projekt starten

### Option A — GitHub (empfohlen)
1. Klicke auf **"Use this template"** → **"Create a new repository"**
2. Repo klonen: `git clone https://github.com/DEIN-NAME/NEUES-PROJEKT`
3. In den Ordner wechseln: `cd NEUES-PROJEKT`

### Option B — CLI
```bash
gh repo create neues-projekt --template DEIN-NAME/estores-project-template --clone
cd neues-projekt
```

---

## ✅ Erste Schritte nach dem Klonen

```bash
# 1. Persönliche Dateien anlegen (nicht im Template enthalten)
mkdir context
cp .env.example .env.local

# 2. Claude Code initialisieren
claude /init

# 3. Stack-Auswahl starten (in Claude Code)
/stack-selection

# 4. Phase 0 durcharbeiten (in Claude Code)
/plan
```

---

## 📁 Was ist drin?

```
.claude/
  rules/      → Verhaltensregeln für Claude (Code-Qualität, Kommunikation etc.)
  skills/     → Wiederverwendbare Workflows (Security, Testing, Stack etc.)
  commands/   → Slash-Commands (/plan, /stack-selection, /local-review etc.)
  agents/     → Spezialisierte Sub-Agenten (Security, Testing, Review, DB)
  scripts/    → Hook-Scripts (Auto-Lint, Secret-Check, Danger-Check)
  settings.json → Hooks-Konfiguration

docs/         → DISCOVERY, ARCHITECTURE, ROADMAP, CHANGELOG (Vorlagen)
decisions/    → Entscheidungs-Log und ADRs
templates/    → Session-Start und Developer-Onboarding Vorlagen
```

## ❌ Was NICHT im Template ist (musst du selbst anlegen)

```
context/      → Dein persönlicher Kontext (gitignored)
.mcp.json     → Deine MCP-Server-Tokens (gitignored)
.env.local    → Deine Secrets (gitignored)
```

---

## 📖 Vollständige Dokumentation

Siehe `CLAUDE_CODE_SETUP.md` für die komplette Anleitung.

---

*EStores GmbH / Syntegro — April 2026*
