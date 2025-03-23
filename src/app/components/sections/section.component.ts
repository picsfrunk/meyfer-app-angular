import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Section } from 'models/interfaces.model';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  imports: [ProductComponent, CommonModule],
  standalone: true,
})
export class SectionComponent {
  @Input() section!: Section;
  @Input() allSections!: Section[];

  get otherSections() {
    return this.allSections.filter((s) => s.id !== this.section.id);
  }

  scrollToSection(id: number, event: Event) {
    event.preventDefault();
    const element = document.getElementById(id.toString());
    if (element) {
      element.scrollIntoView({
        block: 'start',
        behavior: 'instant',
      });
    }
  }
}
