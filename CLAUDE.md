# igefa-webseite — Claude Code Kontext

## Projekt-Überblick
- **Produkt**: Webseite der igefa, gepflegt über ein Headless CMS (Redaktionssystem ohne eigenes Frontend)
- **Stack**: Astro 5 (Frontend-Framework) + Storyblok (Headless CMS) im SSR-Modus
- **Sprache(n)**: TypeScript (strict)
- **CSS/Styling**: Tailwind CSS v4 (über @tailwindcss/vite); globales Stylesheet in src/styles/global.css
- **Datenbank**: keine — Inhalte kommen aus Storyblok (Content Delivery API)
- **ORM**: entfällt
- **Deployment**: Railway (SSR über @astrojs/node, Modus standalone) — Vercel-Option via @astrojs/vercel bleibt möglich
- **Team**: [Namen / Rollen]

## Wichtige Befehle
```bash
npm run dev         # Dev-Server starten (lokal)
npm run build       # Production Build
npm run preview     # Production Build lokal ansehen
npm run type-check  # Typ-Prüfung (astro check)
```

## Code-Konventionen
- Sprache: TypeScript strict — kein untypisiertes ohne Kommentar
- Komponenten: Astro-Komponenten (`.astro`), funktional
- Naming: camelCase (Variablen/Funktionen), PascalCase (Komponenten-Dateien)
- Storyblok-Blöcke: snake_case Block-Name in Storyblok, PascalCase Datei (siehe Konvention unten)
- Error Handling: Immer explizit — keine stillen Failures
- Tests: Für jede neue Funktion mind. ein Unit-Test

## Architektur-Entscheidungen
- Rendering: SSR (`output: 'server'`) — nötig für Storyblok Visual Editor (Live-Vorschau)
- Datenabruf: Storyblok Content Delivery API via `@storyblok/astro`
- Live-Vorschau: Storyblok Bridge (`bridge: true`) + `livePreview: true` + Middleware (`src/middleware.ts`) + `getPayload(locals)`
  - **`livePreview: true` ist Pflicht für Live-Update beim Tippen.** `bridge: true` allein
    reagiert nur auf `change`/`published` (Reload nach Speichern), NICHT auf das `input`-Event.
    Erst `livePreview: true` schickt die getippten Daten an die Middleware → `getPayload` →
    Sofort-Vorschau. Setzt SSR (`output: 'server'`) voraus.
  - **Einschränkung:** Live-Update beim Tippen gilt nur für die im Editor geöffnete Story.
    Header (`config`) und Footer (`footer`) werden in `src/layouts/Layout.astro` als separate
    Stories direkt aus der API geladen → sie erscheinen erst nach dem Speichern, nicht beim Tippen.
- Auth: keine (öffentliche Webseite)
- API-Layer: keiner eigenen — Storyblok liefert die Inhalte
- Lokale Vorschau über HTTPS (mkcert + Chrome Local Network Access) — Setup siehe
  `docs/LOCAL-HTTPS-STORYBLOK.md`. Dev-Server läuft über `https://localhost:4321`
  (mkcert-Zertifikat aus `certs/`, sonst Fallback `@vitejs/plugin-basic-ssl`).

## Storyblok-Konventionen (VERBINDLICH)

1. **Namensgleichheit (Block = Mapping-Key = Dateiname):** Der Block-Name in Storyblok,
   der Schlüssel im `components`-Mapping (in `astro.config.mjs`) und der `.astro`-Dateiname
   müssen identisch sein.
   Beispiel: Block `hero_section` → Mapping `{ hero_section: 'storyblok/HeroSection' }`
   → Datei `src/storyblok/HeroSection.astro`.
2. **Region immer `eu`:** Der Space ist EU-gehostet. `apiOptions: { region: 'eu' }` ist Pflicht.
3. **Tokens nur aus Umgebungsvariablen:** Niemals Tokens hartkodieren oder committen.
   Der Management-Token gehört ausschließlich in die MCP-Konfiguration, nicht in `.env`.
4. **Neue Komponenten immer in `src/storyblok/`** ablegen und das `components`-Mapping
   in `astro.config.mjs` aktualisieren.
5. **1:1-Umsetzung gegen igefa.de:** Blöcke/Sektionen werden nicht nach Augenmaß gebaut,
   sondern nach dem 4-Schritte-Prozess (Erfassen → Spezifizieren → Bauen → Verifizieren)
   in `.claude/rules/storyblok-block-1to1.md`. Verbindlich für jeden neuen/geänderten Block.

## Styling-Konventionen (VERBINDLICH)

- **Design-Tokens als einzige Quelle:** Alle Farben und Schriften kommen ausschließlich
  aus den Design-Tokens in `src/styles/global.css` (`@theme` → CSS-Variablen wie
  `var(--color-brand)` bzw. Token-Utilities wie `bg-brand`, `text-ink`, `font-heading`).
- **Niemals hartkodierte Werte:** Keine rohen Farbwerte (Hex/RGB/HSL) und keine konkreten
  Schriftfamilien in Komponenten. Auch **keine** Tailwind-Palette-Klassen wie `text-gray-900`
  oder `bg-white` — stattdessen die Token-Utilities (`text-ink`, `bg-surface` …).
- **Neue Tokens** werden zentral in `src/styles/global.css` (`@theme`) ergänzt, nie ad-hoc
  in einer Komponente.
- Das globale Stylesheet wird **einmalig** im Layout (`src/layouts/Layout.astro`) eingebunden.

## Was NICHT tun
- NIEMALS `console.log` / `dd()` / `print()` in Production-Code committen
- NIEMALS `.env` Dateien committen
- NIEMALS Dependencies ohne Absprache hinzufügen oder entfernen
- NIEMALS direkt auf `main` pushen
- NIEMALS Datenbankmigrationen ohne Review ausführen
- NIEMALS Code schreiben ohne vorher den Plan erklärt zu haben

## Kommunikations-Stil
- Antworten immer auf Deutsch
- Technische Begriffe immer kurz erklären
- Vor größeren Änderungen ankündigen und Bestätigung abwarten
- Am Ende jeder Session: Zusammenfassung was gemacht wurde und was offen ist
- Bei Unklarheiten: fragen statt raten

## Aktuelle Sprint-Fokus
[Wird aus context/current-priorities.md geladen — hier aktuellen Fokus eintragen]

## Branching-Strategie
- `main` → Production (protected)
- `staging` → Staging-Umgebung
- `develop` → Entwicklung
- `feature/[ticket-id]-[name]` → Features
- `hotfix/[ticket-id]-[name]` → Hotfixes
