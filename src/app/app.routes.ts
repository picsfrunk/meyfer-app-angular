import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CatalogComponent} from './components/catalog/catalog.component';
import {DataUploadComponent} from './components/data-upload/data-upload.component';

export const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'upload', component: DataUploadComponent },
];
