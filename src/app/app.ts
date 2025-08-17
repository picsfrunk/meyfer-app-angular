import {Component, DOCUMENT, effect, Inject, OnInit, signal} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-root',
  imports: [RouterLink,
            RouterOutlet,
            NzIconModule,
            NzLayoutModule,
            NzMenuModule,
            NzButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  isCollapsed = false;
  isDarkMode = signal(false);

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    effect(() => {
      const classList = this.document.documentElement.classList;
      if (this.isDarkMode()) {
        classList.add('dark');
      } else {
        classList.remove('dark');
      }
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

  toggleTheme(): void {
    this.isDarkMode.update((value) => {
      const newValue = !value;
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      return newValue;
    });
  }

  private applyTheme(): void {
    const classList = this.document.documentElement.classList;
    if (this.isDarkMode()) {
      classList.add('dark');
      classList.remove('light');
    } else {
      classList.add('light');
      classList.remove('dark');
    }
  }

  menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      children: [
        { title: 'Welcome', link: '/welcome' },
        { title: 'Monitor', link: '/monitor' },
        { title: 'Workplace', link: '/workplace' }
      ]
    },
    {
      title: 'Form',
      icon: 'form',
      children: [
        { title: 'Basic Form', link: '/form/basic' }
      ]
    },
    {
      title: 'Catálogo',
      icon: 'shop',
      link: '/products'
    }
  ];
}


interface MenuItem {
  title: string;
  icon?: string;
  link?: string;
  children?: MenuItem[];
}

