import { Component, Input } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Section, SectionsNames} from 'models/interfaces.model';
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
  @Input() allSections: SectionsNames[] = [];

  get otherSections() {
    return this.allSections;
  }

  scrollToSection(id: string, event: Event) {
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
