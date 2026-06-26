# 1:1-Umsetzung von Sektionen/Blöcken (VERBINDLICH)

Die igefa-Webseite soll die bestehende Liveseite **igefa.de 1:1** abbilden. Blöcke/Sektionen
dürfen **nicht nach Augenmaß** gebaut werden — das hat in der Vergangenheit zu viel Nacharbeit
geführt (KPI-Werte als 0-Platzhalter, fehlende Beschreibungstexte, geratene Schreibweisen,
vereinfachte Strukturen). Stattdessen gilt für **jeden** neuen oder geänderten Block dieser
4-Schritte-Prozess.

## Der Prozess

### 1. Erfassen (aus der Vorlage, nicht aus der Erinnerung)
Den Original-Block auf der Liveseite mit `agent-browser` öffnen und **objektiv** auslesen:
- **Screenshot** des Blocks (Desktop **und** Mobile).
- **Exakte Inhalte**: alle Texte, Zahlen, Button-Beschriftungen, Anzahl der Elemente
  (z. B. „8 KPIs", „7 Footer-Badges", „5 Karten") — wörtlich, nicht sinngemäß.
- **Berechnete Stile** (`getComputedStyle`): Farbe, `font-size`, `font-weight`,
  `text-transform`, Abstände, Ausrichtung, Heading-Level (`h1`/`h2`/…).
- **Assets**: Bilder, SVG-Icons, Logos, Badges.

### 2. Spezifizieren
Kurze Block-Spec festhalten: Felder, konkrete Inhalte, **Zuordnung der gemessenen Werte zu
Design-Tokens** in `src/styles/global.css` (rohe Werte werden zu Token, siehe Styling-Regeln).

### 3. Bauen
Astro-Komponente in `src/storyblok/` **und** den Storyblok-Inhalt exakt nach Spec umsetzen.
Inhalte (echte Zahlen, Beschreibungstexte) gehören in den Content — keine 0-/Leer-Platzhalter
committen.

### 4. Verifizieren (Pflicht vor dem Commit)
Den gebauten Block ↔ Original **nebeneinander** prüfen:
- Screenshot-Abgleich an gleicher Stelle/Breite.
- Stichprobe der berechneten Stile (stimmen Farbe/Größe/Abstände/`text-transform`?).
- Inhalts-Abgleich (Anzahl Elemente, Texte, Zahlen identisch?).
Abweichungen schließen, **bis deckungsgleich** — erst dann committen.

## Faustregeln
- **Messen statt raten.** Schreibweise (Title Case vs. GROSSBUCHSTABEN), Anzahl Elemente und
  echte Zahlen kommen aus der Vorlage, nie aus Annahmen.
- **Heading-Semantik** prüfen: die Hauptüberschrift der Seite ist ein `<h1>` (im Original ist
  „Wir halten ganz Deutschland am Laufen." ein h1).
- **Vollständigkeit** prüfen: lieber den ganzen Block bis unten scrollen als aus
  Heading-Tags auf Vorhandensein schließen (Original nutzt teils Nicht-Heading-Tags für
  Sektions-Titel).
- Tooling-Detail siehe `docs/LOCAL-HTTPS-STORYBLOK.md` (lokale Vorschau) — der Vergleich läuft
  über `agent-browser`, nicht über Firecrawl o. Ä.
