
# ConsentFlow Dashboard und Website
  
Dies ist die PHP-Version des ConsentFlow-Dashboards. Die Dashboard-Version ist dafür verantwortlich, den Consent zu verwalten und Einstellungen vorzunehmen.

# Routes
- [Public Routes](#public routes)
	- [Startseite]
	- [Impressum]
	- [Datenschutzerklärung]
- [Dashbaord](#dashboard)
	- [Dashboard]
	- [Einstellungen]
	- [Websiten Verwalten]
	- [Vendors Verwalten]
	- [Nutzerdaten]

# Public Routes

## Startseite

Dies ist die Startseite von ConsentFlow. Hier können sich auch Nutzer informieren, die nicht eingeloggt sind, um mehr über ConsentFlow zu erfahren.

**URL:**  `/`
**Methode:**  `GET`

## Impressum

Hier ist das Impressum einzusehen.

**URL:**  `/impressum`
**Methode:**  `GET`

## Datenschutzerklärung

Hier ist die Datenschutzerklärung einzusehen.

**URL:**  `/datenschutzerklärung`
**Methode:**  `GET`

# Dashboard

## Dashboard
Das Dashboard bietet einen schnellen Überblick über die wichtigsten Informationen. Hier können folgende Daten eingesehen werden: 
- Wie viele Anfragen wurden gestellt 
- Wie viele Nutzer haben alle Cookies aktiviert  
- Wie viele Nutzer haben nur die notwendigen Cookies gesetzt 
- Wie viele Nutzer haben Einstellungen vorgenommen 
- Wie hoch die Kosten aufgeteilt nach Datum sind 
- Zudem ist dort die aktuell gültige Lizenz zu sehen

**URL:**  `/dashboard`
**Methode:**  `GET`

## Einstellungen
Auf dieser Seite können die wichtigsten Design- und inhaltlichen Einstellungen für den Consent-Banner vorgenommen werden. Sobald die Einstellungen gespeichert werden, wird das Skript auf unserem CDN aktualisiert.
- Design-Einstellungen (Farben, Schriftarten, Positionierung) 
- Inhaltliche Einstellungen (Texte, Überschriften, Beschreibungen)

### Einstellungen Frontpage

**URL:**  `/settings`
**Methode:**  `GET`

### Einstellungen aktualisieren

Aktualisiert die vorgenommenen Einstellungen in der Datenbank. Es erfolgt eine Validierung der Einstellungen, und eventuelle Fehler werden zurückgegeben und auf der Website angezeigt.

**URL:**  `/updateSettings`
**Methode:**  `POST`

### Einstellungen zurücksetzen

Setzt die Einstellungsseite auf die Standardeinstellungen zurück und löscht die bisherigen Einstellungen aus der Datenbank.

**URL:**  `/defaultSettings`
**Methode:**  `POST`

## Websiten Verwalten

### Websiten Übersicht

Auf der Website-Verwaltungsseite können Nutzer ihre Websites verwalten. Um ConsentFlow zu nutzen, muss man auf dieser Seite seine Website hinzufügen und auswählen. Ist keine Website ausgewählt, wird man immer wieder auf diese Seite weitergeleitet. Sobald eine Website hinzugefügt wurde, wird ein Skript mit Standardwerten erstellt und auf unserem CDN bereitgestellt.

**URL:**  `/manageWebsite`
**Methode:**  `GET`

### Websiten hinzufügen

Fügt einen neuen Consent in der Datenbank hinzu, setzt die ConsentID in der Session und löst die Aktualisierung des Consent-Skripts aus.

**URL:**  `/add_consent`
**Methode:**  `POST`

### Implementierungsanleitung

Auf dieser Seite können Benutzer das Skript kopieren, das sie in den Header ihrer Website einbinden müssen, um den Cookie-Banner zu nutzen. Das Skript wird anhand der Consent-ID generiert.

**URL:**  `/script`
**Methode:**  `GET`

## Vendors Verwalten

### Vendor Übersicht

Startet den Cookie-Scanner, der ein von uns selbst geschriebenes Skript aufruft. Dieser Vorgang kann einige Zeit in Anspruch nehmen. In der Regel dauert dies 5-8 Sekunden.

**URL:**  `/cookieScanner`
**Methode:**  `GET`

### Vendor aktualisieren

Diese Route ändert die Einstellungen für den ausgewählten Vendor.

**URL:**  `/change_vendor`
**Methode:**  `POST`

### Vendor löschen

Löscht den ausgewählten Vendor aus der Datenbank.

Löscht eine Website/einen Consent aus der Datenbank.

**URL:**  `/delete_vendor`
**Methode:**  `POST`

### Vendor manuell hinzufügen

Fügt einen neuen Vendor auf der Cookie-Scanner-Seite hinzu. Diese Funktion wird manuell aufgerufen und schreibt den Vendor in die Datenbank.

**URL:**  `/addConsentVendor`
**Methode:**  `POST`

### Cookie Scanner ausführen

Auf dieser Seite können Nutzer alle Cookies einsehen, die aktuell erfasst wurden. Die Cookies werden in einer Tabelle angezeigt. Der Cookie-Scanner kann durch einen Button gestartet werden. Er ruft ein externes Skript auf, das alle Cookies übermittelt. Dieser Vorgang kann einige Zeit in Anspruch nehmen. Zusätzlich können Cookies manuell hinzugefügt, bearbeitet oder entfernt werden.

**URL:**  `/startCookieScanner`
**Methode:**  `POST`

## Nutzerdaten

### Lizenzdaten abrufen

Auf dieser Seite können Nutzer ihre aktuelle Lizenz einsehen und ihre Nutzungsinformationen ändern. Sie können hier auch die aktuellste Rechnung herunterladen. Dafür wird ihre Adresse benötigt.

**URL:**  `/license`
**Methode:**  `GET`

### Unternehmensdaten aktualisieren

Aktualisiert die Nutzerinformationen in der Tabelle `user_info`.

**URL:**  `/updateSettings_license`
**Methode:**  `POST`

### Adresse aktualisieren

Aktualisiert die Adresse in der Tabelle `user_info`.

**URL:**  `/updateAdress`
**Methode:**  `POST`

### Profilfoto aktualisieren

Aktualisiert das Profilfoto in der Tabelle `user_info`. Es erfolgt eine Validierung des Dateiformats und der Dateigröße.

**URL:**  `/updatePhoto`
**Methode:**  `POST`

### Rechnung erstellen

Berechnet alle Rechnungsdaten und erstellt eine Rechnung für den vergangenen Monat. Die Rechnung wird per E-Mail versendet. Diese Funktion kann manuell aufgerufen werden und wird jeden Monat einmal per Cron-Job gestartet.

**URL:**  `/generate_invoice`
**Methode:**  `POST`

# API Routen

## Analyse Daten senden

**URL:**  `/consents_api`
**Methode:**  `POST`
