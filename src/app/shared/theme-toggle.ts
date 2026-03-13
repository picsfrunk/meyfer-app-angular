import { Component, inject, computed } from '@angular/core';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [NzSwitchModule, NzIconModule, FormsModule],
  template: `
    <div class="theme-toggle">
      <nz-icon nzType="sun" nzTheme="outline" class="toggle-icon sun" />
      <nz-switch
        [ngModel]="isDark()"
        (ngModelChange)="themeService.toggle()"
        nzSize="default"
      />
      <nz-icon nzType="moon" nzTheme="outline" class="toggle-icon moon" />
    </div>
  `,
  styles: [`
    .theme-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .toggle-icon {
      font-size: 16px;
      color: var(--toggle-icon-color, #333);
      transition: opacity 0.2s;
    }

    /* Resalta el icono activo */
    :host-context(body.theme-light) .toggle-icon.sun  { opacity: 1; }
    :host-context(body.theme-light) .toggle-icon.moon { opacity: 0.35; }
    :host-context(body.theme-dark)  .toggle-icon.moon { opacity: 1; }
    :host-context(body.theme-dark)  .toggle-icon.sun  { opacity: 0.35; }
  `]
})
export class ThemeToggle {
  themeService = inject(ThemeService);
  isDark = computed(() => this.themeService.theme() === 'dark');
}
