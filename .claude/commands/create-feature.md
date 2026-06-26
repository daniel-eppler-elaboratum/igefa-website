Erstelle ein neues Feature nach folgendem Ablauf:

1. Lese den Ticket-Kontext (frage nach Ticket-ID falls nicht angegeben)
2. Erkläre in 3–5 Sätzen was gebaut werden soll — warte auf Bestätigung
3. Prüfe Backlog auf abhängige Tasks
4. Erstelle Feature-Branch: `git checkout -b feature/[TICKET-ID]-[name]`
5. Erstelle Komponenten/Services nach Konventionen aus CLAUDE.md und Skills
6. Schreibe Unit Tests für neue Logik
7. Aktualisiere CHANGELOG.md unter [Unreleased]
8. Erstelle Commit mit Conventional Commit Message
9. Aktualisiere Task-Status im Backlog
10. Zeige Zusammenfassung: Was wurde erstellt, was noch fehlt, nächster Schritt

Format der Commit Message: `feat(scope): Beschreibung [TICKET-ID]`

Erkläre nach jedem Schritt kurz was passiert ist.
