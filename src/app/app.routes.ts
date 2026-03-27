import { Routes } from '@angular/router';
import { HomeComponent } from './component/home-component/home-component';
import { AtmoComponent } from './component/panopsys/atmo-component/atmo-component';
import { PanopsysMainComponent } from './component/panopsys/panopsys-main-component/panopsys-main-component';
import { PanopsysOverviewComponent } from './component/panopsys/panopsys-overview-component/panopsys-overview-component';
import { OpticaComponent } from './component/panopsys/optica-component/optica-component';
import { RecipesListComponent } from './component/recipes/recipes-main-component/recipes-main-component';
import { GugelhupfComponent } from './component/recipes/instance/gugelhupf';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'panopsys',
    component: PanopsysMainComponent,
    children: [
      { path: '', component: PanopsysOverviewComponent },
      { path: 'atmo', component: AtmoComponent },
      { path: 'optica', component: OpticaComponent },
    ],
  },
  {
    path: 'recipes',
    children: [
      { path: '', component: RecipesListComponent },
      { path: 'baking/gugelhupf', component: GugelhupfComponent },
    ],
  },
];
