import { Routes } from '@angular/router';
import { PanopsysMainComponent } from './panopsys-main-component/panopsys-main-component';
import { PanopsysOverviewComponent } from './panopsys-overview-component/panopsys-overview-component';
import { AtmoComponent } from './atmo-component/atmo-component';
import { OpticaComponent } from './optica-component/optica-component';

export const PANOPSYS_ROUTES: Routes = [
  {
    path: '',
    component: PanopsysMainComponent,
    children: [
      { path: '', component: PanopsysOverviewComponent, title: 'PanOpSys · Mezzanine' },
      { path: 'atmo', component: AtmoComponent, title: 'Atmosphere · Mezzanine' },
      { path: 'optica', component: OpticaComponent, title: 'Optica · Mezzanine' },
    ],
  },
];
