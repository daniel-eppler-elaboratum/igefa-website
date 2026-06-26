---
description: "Immer laden — gilt für jede Datei die geschrieben oder bearbeitet wird."
---

# Code-Qualitäts-Standards

## Vor dem Schreiben von Code — IMMER zuerst:
1. Den Plan in 3–5 Sätzen erklären (was wird gebaut, warum so)
2. Auf Bestätigung warten bevor Code geschrieben wird
3. Bei Unsicherheit über Requirements: nachfragen statt raten

## Namensgebung — sprechend, nicht kryptisch
```
❌ const d = getData();          ✅ const userProfile = getUserProfile();
❌ function fn(x, y) {}         ✅ function calculateTotalPrice(price, tax) {}
❌ const arr = [];               ✅ const activeOrders = [];
❌ if (u.v === true)             ✅ if (user.isVerified === true)
```

## Funktionen — klein, eine Aufgabe
- Maximal 30 Zeilen pro Funktion
- Eine Funktion = eine Aufgabe (Name sagt was sie tut)
- Keine verschachtelten if/else tiefer als 3 Ebenen
- Lieber mehrere kleine Funktionen als eine große

## Kommentare — das "Warum", nicht das "Was"
```
❌ // Addiert 1 zu count
   count = count + 1;

✅ // Zähler erhöhen weil jeder API-Call gegen das Rate Limit zählt
   requestCount = requestCount + 1;
```
Kommentare für: komplexe Logik, Business-Rules, Workarounds mit Grund

## Error Handling — niemals still scheitern
```
❌ try { fetchData() } catch(e) {}

✅ try {
     const data = await fetchData();
     return data;
   } catch (error) {
     console.error('fetchData fehlgeschlagen:', error.message);
     throw new Error(`Daten konnten nicht geladen werden: ${error.message}`);
   }
```

## Keine Magic Numbers / Magic Strings
```
❌ if (status === 3) { ... }
✅ const STATUS_APPROVED = 3;
   if (status === STATUS_APPROVED) { ... }

❌ setTimeout(fn, 86400000)
✅ const ONE_DAY_MS = 24 * 60 * 60 * 1000;
   setTimeout(fn, ONE_DAY_MS)
```

## Nach dem Schreiben von Code — IMMER:
1. Eigenen Code kurz reviewen (gibt es offensichtliche Probleme?)
2. Erklären was gebaut wurde in einfachen Worten
3. Auf potenzielle Probleme hinweisen die der Nutzer kennen sollte
4. Nächsten logischen Schritt vorschlagen

## Bei Änderungen an bestehendem Code:
- Niemals bestehende Funktionalität stillschweigend entfernen
- Bei Breaking Changes: explizit warnen und Grund nennen
- Immer zuerst: "Das werde ich ändern: [Liste]. Soll ich fortfahren?"
