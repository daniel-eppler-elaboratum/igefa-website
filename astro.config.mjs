import { defineConfig } from 'astro/config';
import { storyblok } from '@storyblok/astro';
import node from '@astrojs/node';
import { loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';
// HTTPS fuer den Dev-Server. Storyblok laedt die Vorschau im Visual Editor in
// einem iframe, das HTTPS verlangt — sonst blockt der Browser localhost.
// Wirkt nur im Dev-Server, nicht im Production-Build.
import basicSsl from '@vitejs/plugin-basic-ssl';
import fs from 'node:fs';

// In der Config-Datei ist import.meta.env nicht zuverlaessig verfuegbar,
// daher lesen wir dieselbe .env-Variable ueber loadEnv von Vite.
const env = loadEnv(import.meta.env.MODE, process.cwd(), '');

// Vertrauenswuerdiges lokales Zertifikat via mkcert (erzeugt mit
// `mkcert localhost 127.0.0.1 ::1` im Ordner certs/). Nur damit akzeptiert der
// Browser das Storyblok-iframe ohne Warnung. Liegt lokal, nicht im Repo.
// Fehlt es (z.B. Teammitglied ohne mkcert), faellt der Dev-Server unten auf das
// selbstsignierte basicSsl-Zertifikat zurueck.
const mkcertKey = './certs/localhost+2-key.pem';
const mkcertCert = './certs/localhost+2.pem';
const hasMkcert = fs.existsSync(mkcertKey) && fs.existsSync(mkcertCert);

export default defineConfig({
  // SSR (Server-Side-Rendering): jede Anfrage wird live gerendert,
  // damit der Storyblok Visual Editor Aenderungen sofort zeigt.
  output: 'server',

  // Node-Server (standalone) — Railway startet diesen direkt.
  // Fuer ein Vercel-Deploy stattdessen den @astrojs/vercel-Adapter nutzen.
  adapter: node({ mode: 'standalone' }),

  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_PREVIEW_TOKEN,
      // Storyblok Bridge = Live-Vorschau im Visual Editor.
      bridge: true,
      // Live-Update schon beim Tippen (input-Event), nicht erst beim Speichern.
      // Ohne dies reagiert die Bridge nur auf 'change'/'published' (Reload nach
      // Speichern). Erfordert SSR (output: 'server') — ist oben gesetzt.
      // Spielt mit der Middleware + getPayload(locals) in src/pages/[...slug].astro zusammen.
      livePreview: true,
      // Space ist in der EU gehostet.
      apiOptions: { region: 'eu' },
      // Konvention: Block-Name in Storyblok = Mapping-Key = .astro-Dateiname.
      components: {
        page: 'storyblok/Page',
        teaser: 'storyblok/Teaser',
        grid: 'storyblok/Grid',
        feature: 'storyblok/Feature',
        // Hero-Slider: ein Slider-Block mit beliebig vielen Slides.
        hero_slider: 'storyblok/HeroSlider',
        hero_slide: 'storyblok/HeroSlide',
        // Startseiten-Sektionen + ihre Item-Bloecke.
        split_heading: 'storyblok/SplitHeading',
        text_block: 'storyblok/TextBlock',
        my_block: 'storyblok/TextBlock',
        kpi_band: 'storyblok/KpiBand',
        kpi_item: 'storyblok/KpiItem',
        branch_section: 'storyblok/BranchSection',
        branch_tile: 'storyblok/BranchTile',
        service_section: 'storyblok/ServiceSection',
        service_tile: 'storyblok/ServiceTile',
        highlight_section: 'storyblok/HighlightSection',
        highlight_card: 'storyblok/HighlightCard',
        location_section: 'storyblok/LocationSection',
        location_card: 'storyblok/LocationCard',
        // Standort-Detailseite (eigener Inhaltstyp `location` = eigene Story/Seite).
        location: 'storyblok/Location',
        location_team: 'storyblok/LocationTeam',
        location_contact: 'storyblok/LocationContact',
        // Footer (eigene "footer"-Story).
        site_footer: 'storyblok/SiteFooter',
        footer_column: 'storyblok/FooterColumn',
        footer_link: 'storyblok/FooterLink',
        social_link: 'storyblok/SocialLink',
        // Hauptnavigation (gepflegt in der zentralen site_config-Story).
        main_navigation: 'storyblok/MainNavigation',
        nav_item: 'storyblok/NavItem',
        nav_link: 'storyblok/NavLink',
        nav_column: 'storyblok/NavColumn',
        nav_promo: 'storyblok/NavPromo',
        top_bar_link: 'storyblok/TopBarLink',
      },
    }),
  ],

  vite: {
    // Mit mkcert-Zertifikat: vertrauenswuerdiges HTTPS, das Storyblok-iframe laedt
    // ohne Warnung. Ohne mkcert: Fallback auf basicSsl (selbstsigniert, Browser warnt).
    // Beide ergeben https://localhost:4321 (Port bleibt Astro-Default).
    plugins: [tailwindcss(), ...(hasMkcert ? [] : [basicSsl()])],
    server: hasMkcert
      ? {
          https: {
            key: fs.readFileSync(mkcertKey),
            cert: fs.readFileSync(mkcertCert),
          },
        }
      : undefined,
  },
});