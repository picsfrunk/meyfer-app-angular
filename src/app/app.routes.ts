import { Routes } from '@angular/router';
import {Products} from './pages/products/products';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/products' },
  { path: 'products', component: Products }

];
