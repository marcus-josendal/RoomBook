import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyBookedRoomsPageRoutingModule } from './my-booked-rooms-routing.module';

import { MyBookedRoomsPage } from './my-booked-rooms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyBookedRoomsPageRoutingModule
  ],
  declarations: [MyBookedRoomsPage]
})
export class MyBookedRoomsPageModule {}
