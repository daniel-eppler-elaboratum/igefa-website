# Entscheidungs-Log

**Regel:** Niemals löschen oder ändern — nur neue Einträge anhängen (append-only).
**Format:** `[DATUM] [Name] Entscheidung — Begründung`

Für große Architektur-Entscheidungen: Separate ADR-Datei in `decisions/adr/` anlegen.

---

<!-- Einträge werden hier von Claude Code und manuell angehängt -->
<!-- Beispiel: -->
<!-- 2026-04-15 [Armin] Next.js gewählt — Server Components, große Community, Claude-Unterstützung gut. -->

2026-06-15 [Armin] Stack gewählt: Astro 5 + Storyblok (Headless CMS) + Vercel (SSR) — Storyblok liefert Redaktions-Workflow mit Live-Vorschau (Visual Editor), Astro im SSR-Modus (`output: 'server'`) macht die Echtzeit-Vorschau möglich, Vercel als Hosting. Astro 5 statt der ursprünglich angedachten 4 — aktuelle Version, längerer Support; benötigt @astrojs/vercel@^8 (v10 verlangt Astro 6).

2026-06-15 [Armin] Hauptnavigation als redaktionell pflegbare Storyblok-Struktur angelegt — statt Menue im Code zu verdrahten, lebt es in einer zentralen Story `config` (Content-Typ `site_config`). Bausteine: `main_navigation` (Logo + Menue) > `nav_item` (Hauptpunkt, optional mit Dropdown) > `nav_link` (Unterpunkt). Begruendung: igefa-Redaktion kann Menuepunkte selbst aendern, ohne Deployment — passt zur Headless-CMS-Philosophie. Das Layout laedt `config` einmal serverseitig und rendert den Header auf jeder Seite. Modern-Umfang: Sticky-Header, Desktop-Dropdowns (Hover + Tastatur via focus-within) und Mobile-Burger-Menue (kleines Inline-Script, Submenues als natives `details`-Element). Styling ausschliesslich ueber Design-Tokens. Logo aktuell Text-Platzhalter, echtes Asset folgt.

2026-06-15 [Armin] Deployment-Ziel (testweise) auf Railway umgestellt — bezahlter Railway-Account vorhanden, Vercel würde Upgrade erfordern. Adapter von @astrojs/vercel auf @astrojs/node (Modus standalone) gewechselt; `start`-Skript `node ./dist/server/entry.mjs` ergänzt. @astrojs/node@^9 wegen Astro 5 (v10 verlangt Astro 6). Token wird beim Build via loadEnv eingebettet → Env-Variablen müssen in Railway zur Build-Zeit gesetzt sein. Rückkehr zu Vercel jederzeit durch Adapter-Tausch möglich.

2026-06-16 [Armin/Claude] Storyblok Live-Vorschau beim Tippen aktiviert — `livePreview: true` in der Integration ist Pflicht zusätzlich zu `bridge: true`; ohne reagiert die Bridge nur auf change/published (Reload nach Speichern), nicht auf das input-Event. Setzt SSR voraus. Verifiziert im Paket-Quellcode (@storyblok/astro v9).

2026-06-16 [Armin/Claude] Lokales HTTPS für den Dev-Server via mkcert (statt nur @vitejs/plugin-basic-ssl) — der Storyblok Visual Editor lädt die Vorschau im iframe, das ein vertrauenswürdiges Zertifikat braucht; selbstsigniert (basicSsl) reicht für Chrome im iframe nicht. astro.config nutzt mkcert-Cert aus `certs/` (gitignored) mit basicSsl-Fallback. Zusätzlich Chrome-Flag „Local Network Access" deaktivieren. Doku: docs/LOCAL-HTTPS-STORYBLOK.md.

2026-06-17 [Armin/Claude] Verbindlicher 1:1-Block-Prozess verankert (.claude/rules/storyblok-block-1to1.md) — Blöcke werden gegen igefa.de gemessen (agent-browser: Inhalte/Zahlen/berechnete Stile), nicht nach Augenmaß gebaut; vor dem Commit Block↔Original verifizieren. Grund: frühere Blöcke erzeugten viel Nacharbeit (0-Platzhalter, fehlende Texte, geratene Schreibweisen).

2026-06-17 [Armin/Claude] Standort-Feature: Inhaltstyp `location` als einzige Datenquelle — eine Storyblok-Story je Niederlassung (eigene Seite über Slug) speist Detailseite, Suche (/kontakt) UND Karte (/standorte). Unterblöcke `location_team` (Branchenteam) und `location_contact` (Ansprechpartner). Begründung: Standorte einmal redaktionell pflegen statt URLs/Daten mehrfach kopieren (Headless-CMS-Logik wie Navigation/Footer). Such-/Karten-Einträge verlinken über full_slug auf die Detailseite.

2026-06-17 [Armin/Claude] Geocoding-Strategie: offline PLZ→Koordinaten-Tabelle statt externem Dienst — datenschutzfreundlich, kostenlos, keine Rate-Limits, keine externen Calls zur Laufzeit. Quelle für den Vollausbau: GeoNames (CC BY 4.0, kommerziell ok, Attribution = Link auf geonames.org). Distanz per Haversine (Luftlinie). Alternative WZB plz_geocoord verworfen (Google-generierte Koordinaten → ToS-Reibung bei kommerzieller Nutzung).

2026-06-17 [Armin/Claude] Interaktive Karte mit Leaflet + OpenStreetMap (statt Google Maps) — frei, kein API-Schlüssel, datenschutzfreundlich, kleine Client-Insel in Astro. Für hohe Last später eigener Tile-Anbieter (OSM-Nutzungsregeln). Neue Dependency `leaflet` (+ @types/leaflet) bewusst freigegeben.

2026-06-17 [Armin/Claude] Interne Daten-Stories (`site_config`, `site_footer`) liefern bei Direktaufruf 404 statt Render-Fehler — sie sind Datencontainer (in Layout.astro geladen), keine Seiten. Guard in `[...slug].astro` per Denylist der Inhaltstypen.
