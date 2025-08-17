import {Component, DOCUMENT, Inject, signal} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {ThemeService} from './core/services/theme.service';
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
export class App {
  isCollapsed = false;
  isDarkMode = signal(false); // Usa una señal para manejar el estado del tema

  constructor(
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // Al iniciar, comprueba si el usuario tiene una preferencia de tema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      this.isDarkMode.set(true);
      this.applyTheme();
    }
  }

  // Método para cambiar el tema
  toggleTheme(): void {
    this.isDarkMode.update(value => !value);
    this.applyTheme();
  }

  // Aplica el tema CSS a la etiqueta <html> del documento
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

