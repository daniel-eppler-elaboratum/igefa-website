Führe einen vollständigen Sicherheits-Scan durch:

1. Aktiviere den Security Auditor Agent
2. Package-Audit ausführen (`npm audit` / `composer audit` / `pip-audit`)
3. Alle API-Routes / Controller auf fehlende Auth-Checks prüfen
4. `.env.example` auf versehentlich enthaltene Secrets prüfen
5. Nach unsicheren Patterns scannen (eval, innerHTML, raw SQL, unvalidierter Input)
6. CORS- und Security-Header-Konfiguration prüfen
7. Dependencies auf bekannte Schwachstellen prüfen

Ausgabe auf Deutsch:
- 🔴 Kritisch: Sofortiger Handlungsbedarf (blockiert Release)
- 🟡 Mittel: Nächster Sprint
- 🟢 Niedrig: Backlog

Für jeden Punkt: Was ist das Problem? Warum ist es gefährlich? Wie beheben?
