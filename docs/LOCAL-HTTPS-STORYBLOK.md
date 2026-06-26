# Lokale Entwicklung mit dem Storyblok Visual Editor (HTTPS)

Damit der **Storyblok Visual Editor** die lokale Vorschau (`https://localhost:4321`)
in seinem iframe anzeigen kann, muss der Astro-Dev-Server über **HTTPS** mit einem
**vertrauenswürdigen** Zertifikat laufen. Diese Anleitung führt einmalig durch das Setup.

> Hintergrund: Der Visual Editor lädt die Seite in einem iframe. Browser verlangen dafür
> HTTPS, und Chrome akzeptiert selbstsignierte Zertifikate im iframe nicht. Wir lösen das
> mit [mkcert](https://github.com/FiloSottile/mkcert) (lokal vertrauenswürdiges Zertifikat).

## Einmaliges Setup

### 1. mkcert installieren und lokale CA eintragen
```bash
brew install mkcert
mkcert -install        # fragt nach dem Mac-Passwort (Admin)
```
`mkcert -install` traegt eine lokale Zertifizierungsstelle in den macOS-Schluesselbund ein.

### 2. Zertifikat fuer localhost erzeugen
```bash
cd <projekt>
mkdir -p certs
cd certs
mkcert localhost 127.0.0.1 ::1
```
Ergebnis: `certs/localhost+2.pem` und `certs/localhost+2-key.pem`.
Der Ordner `certs/` ist in `.gitignore` — die Dateien sind maschinen-lokal und
enthalten einen privaten Schluessel, gehoeren also **nicht** ins Repo.

> `astro.config.mjs` nutzt diese Dateien automatisch, sobald sie existieren. Fehlen sie,
> faellt der Dev-Server auf ein selbstsigniertes Zertifikat (`@vitejs/plugin-basic-ssl`)
> zurueck — dann zeigt der Browser eine Warnung und der Visual-Editor-iframe bleibt leer.

### 3. Browser dem Zertifikat vertrauen lassen
Nach `mkcert -install` den Browser **komplett neu starten** (Chrome: `Cmd+Q`, dann wieder
oeffnen). Erst beim Neustart liest Chrome den neuen Vertrauensanker.

### 4. Chrome: Local Network Access erlauben
Chrome (ab ca. v138) blockiert, dass eine **oeffentliche** Seite (`app.storyblok.com`) auf
einen Server im **lokalen Netzwerk** (`localhost`) zugreift ("Local Network Access").
Einmalig deaktivieren:

1. Neuer Tab → `chrome://flags/#local-network-access-check`
2. **Local Network Access Checks** auf **Disabled** stellen
3. **Relaunch** klicken

Aeltere Chrome-Versionen: stattdessen `chrome://flags/#block-insecure-private-network-requests`
auf **Disabled**.

## Taeglicher Workflow

1. Dev-Server starten und **Fenster offen lassen** (Dauer-Prozess):
   ```bash
   npm run dev
   ```
   Banner: `Local  https://localhost:4321/`
2. Im Visual Editor die Story oeffnen — die Vorschau laedt von `https://localhost:4321/`.

## Storyblok Preview-URL

In Storyblok unter **Settings → Visueller Editor → Location** die lokale Preview-URL setzen:

```
https://localhost:4321/
```

> ⚠️ Der **abschliessende Schraegstrich** ist Pflicht. Storyblok haengt den Slug der Story
> direkt an — ohne `/` wird aus `home` die ungueltige Adresse `https://localhost:4321home`
> und die Vorschau bleibt leer.

Fuer Production bleibt die Railway-URL hinterlegt.

## Troubleshooting

| Symptom | Ursache | Loesung |
|---|---|---|
| `localhost hat die Verbindung abgelehnt` | Dev-Server laeuft nicht | `npm run dev` im Projektordner, Fenster offen lassen |
| Adresse zeigt `localhost:4321home` (ohne `/`) | Preview-URL ohne Schraegstrich | Preview-URL auf `https://localhost:4321/` setzen |
| Browser warnt "nicht sicher" | Zertifikat nicht vertraut | `mkcert -install` + Browser-Neustart |
| iframe bleibt leer, Meldung "Verbindung ... lokales Netzwerk blockiert" | Chrome Local Network Access | Chrome-Flag deaktivieren (Schritt 4) |
| Aenderungen erscheinen erst nach Speichern | `livePreview` aus | `livePreview: true` in `astro.config.mjs` (ist gesetzt) |
