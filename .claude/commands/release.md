Führe den vollständigen Release-Prozess durch. Stoppe bei jedem Fehler und warte auf Bestätigung.

1. Prüfe: Ist `staging` Branch aktuell und alle Tests grün?
2. Führe `/security-check` aus — keine kritischen Findings erlaubt
3. Frage nach Version-Typ: patch (Bugfix) / minor (neues Feature) / major (Breaking Change)
   Erkläre den Unterschied falls unklar
4. Version in der entsprechenden Konfigurationsdatei bumpen
5. `CHANGELOG.md` aktualisieren: [Unreleased] → [x.y.z] mit heutigem Datum
6. Git-Tag erstellen: `git tag v[x.y.z]`
7. `staging` → `main` mergen
8. Deployment-Status prüfen und melden
9. Eintrag in `decisions/log.md`

Nach dem Release: Kurze Zusammenfassung was deployed wurde.
