---
description: "Use when building or querying project knowledge bases. Activates on: 'document this', 'remember for later', 'what do we know about', knowledge capture from sessions."
---

# Project Wiki (Karpathy Pattern)

Kompoundierende Wissensbasis, die mit jeder Session wertvoller wird.

## Operationen

### init
Erstelle `docs/wiki/[projektname].md` mit Grundstruktur:
- Projekt-Überblick, Stack, Ziele
- Bekannte Probleme und Lösungen
- Patterns die funktionieren / nicht funktionieren
- Offene Fragen

### ingest
Nach jeder Session: Erkenntnisse, Entscheidungen, gelöste Probleme eintragen.
Format: `### [DATUM] [Thema]\n[Erkenntnis]\n`

### query
Bevor eine neue Aufgabe beginnt: relevante Wiki-Einträge laden und berücksichtigen.

### lint
Monatlich: doppelte Einträge entfernen, Widersprüche auflösen, Struktur optimieren.

## Wichtig
Das Wiki ist append-friendly — lieber mehr schreiben als zu wenig.
Jede Session sollte mindestens einen Wiki-Eintrag produzieren.
