// Faengt POST-Anfragen aus dem Storyblok Visual Editor ab und legt die
// Live-Vorschau-Daten in Astro.locals ab. Notwendig fuer Echtzeit-Preview.
export { onRequest } from '@storyblok/astro/middleware.ts';
