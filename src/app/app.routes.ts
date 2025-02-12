import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CatalogComponent} from './components/catalog/catalog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
];
