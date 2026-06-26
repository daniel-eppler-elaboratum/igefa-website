/**
 * Storyblok-Link-Feld (Auszug der relevanten Felder).
 * Storyblok liefert Links als Objekt, nicht als fertige URL.
 */
export interface StoryblokLink {
  linktype?: 'story' | 'url' | 'email' | 'asset';
  url?: string;
  cached_url?: string;
}

// Ziel, wenn ein Menuepunkt (noch) keinen Link gesetzt hat.
const FALLBACK_HREF = '#';

/**
 * Wandelt ein Storyblok-Link-Feld in eine nutzbare href-URL um.
 *
 * Warum noetig: Interne Story-Links liefern nur den Pfad ohne fuehrenden
 * Slash (z. B. "produkte"), externe/E-Mail-Links eine fertige URL. Diese
 * Funktion vereinheitlicht beide Faelle zu einer gueltigen href.
 */
export function resolveNavLink(link?: StoryblokLink | null): string {
  if (!link) return FALLBACK_HREF;

  // Externe URLs, E-Mail- und Asset-Links sind bereits fertige Adressen.
  if (link.linktype === 'url' || link.linktype === 'email' || link.linktype === 'asset') {
    return link.url || link.cached_url || FALLBACK_HREF;
  }

  // Interne Story-Verlinkung: cached_url ist z. B. "produkte" -> "/produkte".
  const internalPath = link.cached_url || link.url || '';
  if (!internalPath) return FALLBACK_HREF;

  return '/' + internalPath.replace(/^\/+/, '');
}
