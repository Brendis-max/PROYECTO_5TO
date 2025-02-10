import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevopPage } from './nuevop.page';

const routes: Routes = [
  {
    path: '',
    component: NuevopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevopPageRoutingModule {}
