import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllRoomsPageRoutingModule } from './all-rooms-routing.module';

import { AllRoomsPage } from './all-rooms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllRoomsPageRoutingModule
  ],
  declarations: [AllRoomsPage]
})
export class AllRoomsPageModule {}
