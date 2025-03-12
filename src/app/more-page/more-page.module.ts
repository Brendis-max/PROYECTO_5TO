import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MorePagePageRoutingModule } from './more-page-routing.module';

import { MorePagePage } from './more-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MorePagePageRoutingModule
  ],
  declarations: [MorePagePage]
})
export class MorePagePageModule {}
