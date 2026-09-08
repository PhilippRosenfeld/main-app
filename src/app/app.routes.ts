import { Routes } from '@angular/router';
import { HomeComponent } from './component/home-component/home-component';
import { AtmoComponent } from './component/panopsys/atmo-component/atmo-component';
import { PanopsysMainComponent } from './component/panopsys/panopsys-main-component/panopsys-main-component';
import { PanopsysOverviewComponent } from './component/panopsys/panopsys-overview-component/panopsys-overview-component';
import { OpticaComponent } from './component/panopsys/optica-component/optica-component';
import { RecipesListComponent } from './component/recipes/recipes-main-component/recipes-main-component';
import { GugelhupfComponent } from './component/recipes/instance/gugelhupf';
import { SenfgemueseComponent } from './component/recipes/instance/senfgemuese';
import { RindsgulaschComponent } from './component/recipes/instance/rindsgulasch';
import { RisottoComponent } from './component/recipes/instance/risotto';
import { StockComponent } from './component/recipes/instance/stock';
import { LoginComponent } from './component/login-component/login-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent }, //{ path: 'admin', component: AdminComponent, canActivate: [authGuard] },
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
      { path: 'cooking/senfgemuese', component: SenfgemueseComponent },
      { path: 'cooking/rindsgulasch', component: RindsgulaschComponent },
      { path: 'cooking/risotto', component: RisottoComponent },
      { path: 'cooking/stock', component: StockComponent },
    ],
  },
];
