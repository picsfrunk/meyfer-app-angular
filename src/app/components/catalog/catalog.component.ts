import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import { Section } from '../../../models/interfaces.model';
import { MOCK_SECTIONS } from '../../../data/mock.data';
import { SectionComponent } from '../sections/section.component';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  standalone: true,
  imports: [
    NgForOf,
    SectionComponent
  ],
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  sections: Section[] = MOCK_SECTIONS
}
