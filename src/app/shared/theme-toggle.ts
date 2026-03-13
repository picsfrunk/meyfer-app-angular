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
      <nz-icon nzType="sun" nzTheme="outline" class="toggle-icon" />
      <nz-switch
        [ngModel]="isDark()"
        (ngModelChange)="themeService.toggle()"
        [nzCheckedChildren]="moonIcon"
        [nzUnCheckedChildren]="sunIcon"
        nzSize="small"
      />
      <nz-icon nzType="moon" nzTheme="outline" class="toggle-icon" />

      <ng-template #moonIcon><nz-icon nzType="moon" /></ng-template>
      <ng-template #sunIcon><nz-icon nzType="sun" /></ng-template>
    </div>
  `,
  styles: [`
    .theme-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toggle-icon {
      font-size: 14px;
      color: var(--toggle-icon-color, #e8d8cc);
    }
  `]
})
export class ThemeToggle {
  themeService = inject(ThemeService);
  isDark = computed(() => this.themeService.theme() === 'dark');
}
