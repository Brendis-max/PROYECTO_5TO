import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarpPageRoutingModule } from './cambiarp-routing.module';

import { CambiarpPage } from './cambiarp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarpPageRoutingModule
  ],
  declarations: [CambiarpPage]
})
export class CambiarpPageModule {}
