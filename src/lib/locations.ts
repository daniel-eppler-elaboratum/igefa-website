// Standort-Daten aus Storyblok (Inhaltstyp `location`).
// Eine Quelle fuer Suche (/kontakt) und Karte (/standorte): die Redaktion pflegt
// Standorte in Storyblok, hier werden sie in eine schlanke Form gebracht.

import { useStoryblokApi } from '@storyblok/astro';

export type LocationTeam = {
  name: string;
  phone: string;
  email: string;
};

export type LocationPoint = {
  id: string;
  name: string;
  slug: string;
  street: string;
  plz: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  phone: string;
  teams: LocationTeam[];
};

// Laedt alle veroeffentlichten/Entwurfs-Standorte aus Storyblok.
// Stories ohne gueltige Koordinaten werden ausgefiltert (sonst keine Karte/Suche).
export async function getLocations(): Promise<LocationPoint[]> {
  try {
    const storyblokApi = useStoryblokApi();
    const { data } = await storyblokApi.get('cdn/stories', {
      version: 'draft',
      content_type: 'location',
      per_page: 100,
    });

    // Storyblok liefert untypisierte Rohdaten; die Form wird im map() zu LocationPoint.
    const stories: any[] = Array.isArray(data?.stories) ? data.stories : [];

    return stories
      .map((story: any): LocationPoint => {
        const content = story.content ?? {};
        const teams = Array.isArray(content.teams) ? content.teams : [];
        return {
          id: story.uuid,
          name: content.name ?? story.name ?? '',
          slug: story.full_slug ?? '',
          street: content.street ?? '',
          plz: content.zip ?? '',
          city: content.city ?? '',
          country: content.country ?? '',
          lat: Number(content.lat),
          lng: Number(content.lng),
          phone: content.phone ?? '',
          teams: teams.map((team: any) => ({
            name: team.division ?? '',
            phone: team.phone ?? '',
            email: team.email ?? '',
          })),
        };
      })
      .filter((location) => Number.isFinite(location.lat) && Number.isFinite(location.lng));
  } catch (error) {
    console.error(
      'Standorte konnten nicht aus Storyblok geladen werden:',
      error instanceof Error ? error.message : error,
    );
    return [];
  }
}
