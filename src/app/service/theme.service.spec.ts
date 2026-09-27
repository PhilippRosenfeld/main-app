import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('defaults to the dark Grimoire style', () => {
    const theme = TestBed.inject(ThemeService);

    expect(theme.style()).toBe('grimoire');
    expect(theme.resolved()).toBe('dark');
    expect(document.documentElement.getAttribute('data-style')).toBe('grimoire');
  });

  it('switches and remembers the design style', () => {
    const theme = TestBed.inject(ThemeService);

    theme.setStyle('tenebrae');

    expect(document.documentElement.getAttribute('data-style')).toBe('tenebrae');
    expect(localStorage.getItem('style')).toBe('tenebrae');
    expect(theme.cta()).toBe('Enter');
  });

  it('ignores unknown stored styles', () => {
    localStorage.setItem('style', 'glass');
    expect(TestBed.inject(ThemeService).style()).toBe('grimoire');
  });
});
