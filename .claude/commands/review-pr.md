Führe ein vollständiges Code Review des aktuellen Git-Diffs durch:

1. **Security Check**: Gibt es Sicherheitslücken? (Injection, XSS, Secrets, unvalidierter Input)
2. **Typ-Sicherheit**: Gibt es untypisierte Stellen ohne Begründung?
3. **Error Handling**: Sind alle Fehlerszenarien abgedeckt?
4. **Tests**: Sind neue Features ausreichend getestet?
5. **Konventionen**: Folgt der Code den Regeln aus CLAUDE.md?
6. **Code-Qualität**: Sprechende Namen? Funktionen klein genug? Kommentare sinnvoll?
7. **Performance**: Gibt es offensichtliche Performance-Probleme (z.B. N+1 Queries)?

Format der Ausgabe:
- PASS / FAIL pro Kategorie
- Gesamt-Urteil: ✅ Bereit für Merge / ⚠️ Minor Issues / 🚫 Muss überarbeitet werden
- Priorisierte Findings mit konkreten Fix-Vorschlägen
- Alles auf Deutsch, Fachbegriffe erklären
