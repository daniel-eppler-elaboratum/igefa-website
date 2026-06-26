// Kleine Auswahl deutscher Orte/PLZ mit Koordinaten (POC, Option B).
// Spaeter ersetzt durch die vollstaendige GeoNames-Tabelle fuer ganz Deutschland.
// Quelle der Koordinaten: GeoNames (https://www.geonames.org/) — CC BY 4.0.

export type PlzEntry = {
  plz: string;
  city: string;
  lat: number;
  lng: number;
};

// Bewusst kleine Liste: deckt die Demo-Standort-Staedte + ein paar bekannte
// Staedte ab, damit die Suche etwas zu rechnen hat. Reihenfolge egal.
export const PLZ_COORDS: PlzEntry[] = [
  { plz: '73430', city: 'Aalen', lat: 48.837, lng: 10.094 },
  { plz: '70173', city: 'Stuttgart', lat: 48.776, lng: 9.182 },
  { plz: '76133', city: 'Karlsruhe', lat: 49.007, lng: 8.404 },
  { plz: '76646', city: 'Bruchsal', lat: 49.124, lng: 8.598 },
  { plz: '69117', city: 'Heidelberg', lat: 49.398, lng: 8.672 },
  { plz: '60311', city: 'Frankfurt', lat: 50.110, lng: 8.682 },
  { plz: '90402', city: 'Nürnberg', lat: 49.452, lng: 11.077 },
  { plz: '89073', city: 'Ulm', lat: 48.401, lng: 9.987 },
  { plz: '80331', city: 'München', lat: 48.137, lng: 11.575 },
  { plz: '50667', city: 'Köln', lat: 50.937, lng: 6.960 },
  { plz: '40213', city: 'Düsseldorf', lat: 51.225, lng: 6.776 },
  { plz: '60311', city: 'Frankfurt am Main', lat: 50.110, lng: 8.682 },
  { plz: '20095', city: 'Hamburg', lat: 53.551, lng: 9.993 },
  { plz: '28195', city: 'Bremen', lat: 53.079, lng: 8.802 },
  { plz: '30159', city: 'Hannover', lat: 52.376, lng: 9.732 },
  { plz: '10115', city: 'Berlin', lat: 52.520, lng: 13.405 },
  { plz: '04109', city: 'Leipzig', lat: 51.340, lng: 12.375 },
  { plz: '01067', city: 'Dresden', lat: 51.051, lng: 13.738 },
  { plz: '99084', city: 'Erfurt', lat: 50.978, lng: 11.029 },
  { plz: '55116', city: 'Mainz', lat: 49.992, lng: 8.247 },
];
