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
      <nz-icon nzType="sun"  nzTheme="outline" class="toggle-icon sun"  />
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

    /* nz-icon renderiza un <span anticon> con SVG adentro
       hay que apuntar al SVG para que tome el color */
    .toggle-icon {
      font-size: 18px;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      transition: opacity 0.2s;
    }

    .toggle-icon ::ng-deep svg {
      fill: #ffffff !important;
      width: 18px;
      height: 18px;
    }

    /* Activo vs inactivo según tema */
    :host-context(body.theme-light) .sun  { opacity: 1; }
    :host-context(body.theme-light) .moon { opacity: 0.45; }
    :host-context(body.theme-dark)  .moon { opacity: 1; }
    :host-context(body.theme-dark)  .sun  { opacity: 0.45; }
  `]
})
export class ThemeToggle {
  themeService = inject(ThemeService);
  isDark = computed(() => this.themeService.theme() === 'dark');
}
