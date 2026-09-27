import { Component, ElementRef, HostListener, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../service/auth';
import { DESIGN_STYLES, DesignStyle, ThemeService } from '../../service/theme.service';
import { LeviathanCrossComponent } from '../leviathan-cross/leviathan-cross';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink, RouterLinkActive, LeviathanCrossComponent],
  templateUrl: './header-component.html',
})
export class HeaderComponent {
  protected readonly auth = inject(AuthService);
  protected readonly theme = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly styles = DESIGN_STYLES;
  protected readonly menuOpen = signal(false);
  protected readonly styleMenuOpen = signal(false);
  protected readonly currentStyle = computed(() => DESIGN_STYLES.find((s) => s.id === this.theme.style())!);
  protected readonly initial = computed(() => (this.auth.username() ?? '?').charAt(0).toUpperCase());
  protected readonly themeIcon = computed(() => {
    switch (this.theme.preference()) {
      case 'light':
        return 'bi-sun';
      case 'dark':
        return 'bi-moon-stars';
      default:
        return 'bi-circle-half';
    }
  });
  protected readonly themeLabel = computed(() => `Theme: ${this.theme.preference()}`);

  constructor() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.menuOpen.set(false);
        this.styleMenuOpen.set(false);
      });
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    const switcher = this.host.nativeElement.querySelector('.style-switch');
    if (this.styleMenuOpen() && switcher && !switcher.contains(event.target as Node)) {
      this.styleMenuOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.styleMenuOpen.set(false);
  }

  protected chooseStyle(style: DesignStyle): void {
    this.theme.setStyle(style);
    this.styleMenuOpen.set(false);
  }

  protected logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
