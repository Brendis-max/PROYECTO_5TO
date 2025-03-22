import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarpPage } from './cambiarp.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarpPageRoutingModule {}
