import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MorePagePage } from './more-page.page';

const routes: Routes = [
  {
    path: '',
    component: MorePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MorePagePageRoutingModule {}
