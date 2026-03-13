import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'meyfer-theme';
  private readonly LINK_ID     = 'nz-theme';

  theme = signal<Theme>(this.getSavedTheme());

  constructor() {
    this.applyTheme(this.theme());
    effect(() => {
      this.applyTheme(this.theme());
      localStorage.setItem(this.STORAGE_KEY, this.theme());
    });
  }

  toggle(): void {
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private applyTheme(theme: Theme): void {
    // 1. Swap CSS de ng-zorro
    let link = document.getElementById(this.LINK_ID) as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.id   = this.LINK_ID;
      link.rel  = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = theme === 'dark'
      ? 'ng-zorro-antd.dark.css'
      : 'ng-zorro-antd.min.css';

    // 2. Clase en body para los overrides SCSS
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${theme}`);
  }

  private getSavedTheme(): Theme {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved === 'light' ? 'light' : 'dark'; // dark por defecto
  }
}
