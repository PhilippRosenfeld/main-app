import { Component } from '@angular/core';

@Component({
  selector: 'app-leviathan-cross',
  host: { class: 'sigil-mark', 'aria-hidden': 'true' },
  styles: ':host { display: inline-block; } svg { display: block; width: 100%; height: 100%; }',
  template: `
    <svg viewBox="0 0 20 32" fill="none" stroke="currentColor" stroke-width="1.4">
      <line x1="10" y1="1" x2="10" y2="21" />
      <line x1="4" y1="6" x2="16" y2="6" />
      <line x1="2" y1="12" x2="18" y2="12" />
      <circle cx="6.6" cy="25.5" r="3.4" />
      <circle cx="13.4" cy="25.5" r="3.4" />
    </svg>
  `,
})
export class LeviathanCrossComponent {}
