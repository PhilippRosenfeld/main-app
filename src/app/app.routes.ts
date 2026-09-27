import { Routes } from '@angular/router';
import { HomeComponent } from './component/home-component/home-component';
import { RecipesListComponent } from './component/recipes/recipes-main-component/recipes-main-component';
import { GugelhupfComponent } from './component/recipes/instance/gugelhupf';
import { SenfgemueseComponent } from './component/recipes/instance/senfgemuese';
import { RindsgulaschComponent } from './component/recipes/instance/rindsgulasch';
import { RisottoComponent } from './component/recipes/instance/risotto';
import { StockComponent } from './component/recipes/instance/stock';
import { authGuard } from './service/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Mezzanine' },
  {
    path: 'login',
    title: 'Sign in · Mezzanine',
    loadComponent: () => import('./component/login-component/login-component').then((m) => m.LoginComponent),
  },
  {
    path: 'panopsys',
    canActivate: [authGuard],
    loadChildren: () => import('./component/panopsys/panopsys.routes').then((m) => m.PANOPSYS_ROUTES),
  },
  {
    path: 'recipes',
    children: [
      { path: '', component: RecipesListComponent, title: 'Recipes · Mezzanine' },
      { path: 'baking/gugelhupf', component: GugelhupfComponent, title: 'Gugelhupf · Mezzanine' },
      { path: 'cooking/senfgemuese', component: SenfgemueseComponent, title: 'Senfgemüse · Mezzanine' },
      { path: 'cooking/rindsgulasch', component: RindsgulaschComponent, title: 'Rindsgulasch · Mezzanine' },
      { path: 'cooking/risotto', component: RisottoComponent, title: 'Risotto · Mezzanine' },
      { path: 'cooking/stock', component: StockComponent, title: 'Suppe · Mezzanine' },
    ],
  },
  { path: '**', redirectTo: '' },
];
