import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePastelPage } from './detalle-pastel.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePastelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePastelPageRoutingModule {}
