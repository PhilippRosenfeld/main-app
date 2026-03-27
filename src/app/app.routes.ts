import { Routes } from '@angular/router';
import { HomeComponent } from './component/home-component/home-component';
import { AtmoComponent } from './component/atmo-component/atmo-component';
import { PanopsysMainComponent } from './component/panopsys-main-component/panopsys-main-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'panopsys', component: PanopsysMainComponent, children: [
      { path: 'atmo', component: AtmoComponent }],
  },
];
