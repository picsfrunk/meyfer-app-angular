import {Component, DOCUMENT, effect, Inject, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {CartBadge} from './shared/cart-badge';
import {ThemeToggle} from './shared/theme-toggle';
import {Sidebar} from './core/components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzLayoutModule, CartBadge, ThemeToggle, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  isDarkMode = signal(false);

  constructor(@Inject(DOCUMENT) private document: Document) {
    effect(() => {
      const classList = this.document.documentElement.classList;
      this.isDarkMode() ? classList.add('dark') : classList.remove('dark');
    });
  }

  ngOnInit() {
    const stored = localStorage.getItem('theme');
    if (stored) {
      this.isDarkMode.set(stored === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        this.isDarkMode.set(e.matches);
      });
    }
  }

  toggleTheme() {
    this.isDarkMode.update((value) => {
      const newValue = !value;
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      return newValue;
    });
  }
}
