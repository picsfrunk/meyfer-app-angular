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
}
