Führe ein Pre-Commit Review aller uncommitteten Änderungen durch:

1. Aktiviere das local-review Plugin (5 parallele Review-Agenten)
2. Nur Issues mit Score ≥ 80 werden gemeldet
3. Bei kritischen Findings (Score 90+): Commit blockieren, Fix vorschlagen
4. Bei mittleren Findings (80–89): Warnung ausgeben, Commit erlauben

Zusätzlich automatisch:
- Typ-Check (`tsc --noEmit` / `mypy` / `phpstan`) — je nach Stack
- Linting (`eslint` / `ruff` / `pint`) — je nach Stack
- Prüfe auf Debug-Ausgaben (`console.log` / `dd()` / `print()`) in Production-Code
- Prüfe auf Magic Numbers / Magic Strings
- Prüfe ob neue Funktionen Tests haben

Ausgabe auf Deutsch:
✅ Grün = commit-ready
⚠️ Gelb = Warnung, Commit möglich
🚫 Rot = Erst fixen, dann committen

Erkläre jeden gefundenen Issue in einfacher Sprache mit konkretem Fix-Vorschlag.
