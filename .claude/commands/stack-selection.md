Führe eine geführte Stack-Auswahl durch. Stelle diese Fragen einzeln,
warte auf jede Antwort bevor du die nächste stellst.
Erkläre alle Fachbegriffe sofort in einfacher Sprache.

FRAGEN:

1. WAS wird gebaut?
   "Beschreibe das Produkt in 2–3 Sätzen. Ist es eine Website,
   eine Web-App, ein internes Tool, eine mobile App, ein API-Service,
   oder etwas anderes?"

2. WER nutzt es?
   "Wie viele Nutzer erwartest du? Sind es hauptsächlich Endkunden,
   interne Mitarbeiter, oder andere Entwickler/Systeme?"

3. WIE komplex ist die Datenhaltung?
   "Musst du viele verschiedene Dinge speichern die miteinander
   zusammenhängen (z.B. Nutzer → Bestellungen → Produkte)?
   Oder eher einfache Listen / Formulare?"

4. WELCHE Integrationen sind nötig?
   "Müssen externe Dienste angebunden werden?
   z.B. Zahlungen, E-Mails, KI-Funktionen, bestehende Systeme?"

5. WIE schnell muss es fertig sein?
   "Gibt es einen festen Deadline? Ist das ein MVP der in 4 Wochen
   stehen soll, oder ein langfristiges Projekt?"

6. WER entwickelt es?
   "Arbeitet jemand mit Coding-Erfahrung mit, oder läuft die
   Entwicklung hauptsächlich über Claude Code?"

7. GIBT ES Präferenzen oder Einschränkungen?
   "Gibt es schon Systeme oder Sprachen im Einsatz die wir nutzen
   sollten? Hosting-Präferenzen? Budget-Limits?"

8. WIE sieht die Oberfläche aus?
   "Braucht es eine aufwendige interaktive UI, oder eher einfache
   Seiten? Muss es auch auf dem Handy gut funktionieren?"

---

Nach allen Antworten: Erstelle eine Stack-Empfehlung mit:
- Empfohlener Stack (Framework, Sprache, DB, Hosting)
- Warum dieser Stack für die genannten Anforderungen passt
- Welche Alternativen es gibt und warum du sie nicht empfiehlst
- Risiken und was zu beachten ist
- Geschätzter Setup-Aufwand in Stunden

Schreibe die Empfehlung so, dass jemand ohne Coding-Erfahrung
versteht warum du was empfiehlst.

Trage die Entscheidung danach automatisch in decisions/log.md ein
und erstelle einen ersten Entwurf für docs/ARCHITECTURE.md.
