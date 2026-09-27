import { Injectable, computed, signal } from '@angular/core';

export type ThemePreference = 'system' | 'light' | 'dark';
export type DesignStyle = 'grimoire' | 'sigillum' | 'tenebrae';

export const DESIGN_STYLES: { id: DesignStyle; name: string; glyph: string; description: string }[] = [
  { id: 'grimoire', name: 'Grimoire', glyph: '❦', description: 'Fraktur, Pergament, Ochsenblut' },
  { id: 'sigillum', name: 'Sigillum', glyph: '☿', description: 'Alchemie, Gold, Tarot' },
  { id: 'tenebrae', name: 'Tenebrae', glyph: '✝', description: 'Schwarz, Knochen, Blut' },
];

const CTA: Record<DesignStyle, string> = { grimoire: 'Aperire', sigillum: 'Intrare', tenebrae: 'Enter' };

const THEME_KEY = 'theme';
const STYLE_KEY = 'style';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly media: MediaQueryList | undefined = window.matchMedia?.('(prefers-color-scheme: dark)');
  private readonly systemDark = signal(this.media?.matches ?? true);

  readonly preference = signal<ThemePreference>(readPreference());
  readonly style = signal<DesignStyle>(readStyle());
  /** Label for "open this" links, in the voice of the current style. */
  readonly cta = computed(() => CTA[this.style()]);
  readonly resolved = computed<'light' | 'dark'>(() => {
    const pref = this.preference();
    if (pref === 'system') return this.systemDark() ? 'dark' : 'light';
    return pref;
  });

  constructor() {
    this.media?.addEventListener('change', (e) => {
      this.systemDark.set(e.matches);
      this.apply();
    });
    this.apply();
  }

  cycle(): void {
    const order: ThemePreference[] = ['dark', 'light', 'system'];
    const next = order[(order.indexOf(this.preference()) + 1) % order.length];
    this.preference.set(next);
    localStorage.setItem(THEME_KEY, next);
    this.apply();
  }

  setStyle(style: DesignStyle): void {
    this.style.set(style);
    localStorage.setItem(STYLE_KEY, style);
    this.apply();
  }

  /** Written synchronously so effects reading computed styles see the new tokens. */
  private apply(): void {
    const root = document.documentElement;
    root.setAttribute('data-theme', this.resolved());
    root.setAttribute('data-style', this.style());
  }
}

function readPreference(): ThemePreference {
  const stored = localStorage.getItem(THEME_KEY);
  return stored === 'light' || stored === 'system' ? stored : 'dark';
}

function readStyle(): DesignStyle {
  const stored = localStorage.getItem(STYLE_KEY);
  return DESIGN_STYLES.some((s) => s.id === stored) ? (stored as DesignStyle) : 'grimoire';
}
