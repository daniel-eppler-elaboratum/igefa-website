Deploye den aktuellen Stand auf die Staging-Umgebung:

1. Prüfe: Ist der `develop` Branch aktuell?
2. Führe Tests aus — alle müssen grün sein
3. Führe `/local-review` aus — keine kritischen Findings
4. Merge `develop` → `staging`
5. Deployment triggern (je nach Setup: Vercel / Coolify / Railway)
6. Warte auf erfolgreichen Build
7. Smoke Test: Öffne die wichtigsten Seiten und prüfe ob sie laden
8. Melde Ergebnis: URL der Staging-Umgebung + Status

Bei Fehler: Fehlermeldung auf Deutsch erklären und Lösungsvorschlag machen.
