import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'meyfer-theme';

  theme = signal<Theme>(this.getSavedTheme());

  constructor() {
    // Aplica el tema inicial al arrancar
    this.applyTheme(this.theme());

    // Cada vez que cambia el signal, actualiza el DOM y guarda
    effect(() => {
      this.applyTheme(this.theme());
      localStorage.setItem(this.STORAGE_KEY, this.theme());
    });
  }

  toggle(): void {
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private applyTheme(theme: Theme): void {
    const body = document.body;
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add(`theme-${theme}`);
  }

  private getSavedTheme(): Theme {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved === 'light' ? 'light' : 'dark'; // dark por defecto
  }
}
