import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevopPageRoutingModule } from './nuevop-routing.module';

import { NuevopPage } from './nuevop.page';
const routes: Routes = [
  {
    path: '',
    component: NuevopPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevopPageRoutingModule
  ],
  declarations: [NuevopPage]
})
export class NuevopPageModule {}
