import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [NzButtonModule, NzIconModule],
  template: `
    <button nz-button nzType="text" (click)="toggleTheme()">
      @if (isDarkMode()) {
        <nz-icon class="large-icon" nzType="sun" nzTheme="outline" />
      } @else {
        <nz-icon class="large-icon" nzType="moon" nzTheme="outline" />
      }
    </button>
  `
})
export class ThemeToggle {
  @Input() isDarkMode!: Signal<boolean>;
  @Input() toggleTheme!: () => void;
}
