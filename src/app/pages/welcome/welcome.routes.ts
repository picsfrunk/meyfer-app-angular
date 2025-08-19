import { Routes } from '@angular/router';
import { Welcome } from './welcome';
import {Products} from '../product-list/products';

export const WELCOME_ROUTES: Routes = [
  { path: '', component: Welcome },
];
