import { describe, it, expect } from 'vitest';
import { resolveNavLink } from '../../src/lib/navigation';

describe('resolveNavLink', () => {
  it('gibt # zurueck, wenn kein Link gesetzt ist', () => {
    expect(resolveNavLink(null)).toBe('#');
    expect(resolveNavLink(undefined)).toBe('#');
  });

  it('setzt bei internen Story-Links einen fuehrenden Slash', () => {
    expect(resolveNavLink({ linktype: 'story', cached_url: 'produkte' })).toBe('/produkte');
  });

  it('vermeidet doppelte Slashes bei bereits fuehrendem Slash', () => {
    expect(resolveNavLink({ linktype: 'story', cached_url: '/produkte' })).toBe('/produkte');
  });

  it('uebernimmt verschachtelte Story-Pfade korrekt', () => {
    expect(resolveNavLink({ linktype: 'story', cached_url: 'produkte/verpackung' })).toBe(
      '/produkte/verpackung',
    );
  });

  it('nutzt externe URLs unveraendert', () => {
    expect(resolveNavLink({ linktype: 'url', url: 'https://shop.igefa.de' })).toBe(
      'https://shop.igefa.de',
    );
  });

  it('nutzt E-Mail-Links unveraendert', () => {
    expect(resolveNavLink({ linktype: 'email', url: 'info@igefa.de' })).toBe('info@igefa.de');
  });

  it('faellt auf # zurueck, wenn ein Story-Link ohne Pfad ankommt', () => {
    expect(resolveNavLink({ linktype: 'story', cached_url: '' })).toBe('#');
  });
});
