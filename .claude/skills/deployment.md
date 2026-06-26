---
description: "Use when deploying, configuring CI/CD, setting up environments, or troubleshooting deployment issues. Triggers on: deploy, release, environment config, CI/CD."
---

# Deployment Best Practices

## Umgebungen
```
develop → Lokale Entwicklung
staging → Test-Umgebung (wie Production, aber nur intern)
main    → Production (was echte Nutzer sehen)
```

## Deployment-Ablauf (immer in dieser Reihenfolge)
1. Tests lokal grün (`[test-cmd]`)
2. `/local-review` — Pre-Commit Review
3. PR erstellen → Code Review
4. Merge in `develop`
5. Tests auf CI grün
6. Merge in `staging`
7. Smoke Tests auf Staging
8. `/release` Command für Production

## Environment Variables
- Niemals Secrets in Code oder Git
- Alle Vars in `.env.example` dokumentieren (ohne echte Werte)
- Produktions-Secrets nur in Deployment-Plattform setzen

## Security Headers (alle Produktions-Deployments)
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## Rollback-Plan
- Vor jedem Release: Git-Tag setzen
- Bei Problemen: `git revert` oder Deploy des letzten Tags
- Datenbankmigrationen: immer mit Down-Migration
