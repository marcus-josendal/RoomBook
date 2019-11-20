import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyBookedRoomsPageRoutingModule } from './my-booked-rooms-routing.module';

import { MyBookedRoomsPage } from './my-booked-rooms.page';
import {AllRoomsPageModule} from '../all-rooms/all-rooms.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MyBookedRoomsPageRoutingModule,
        AllRoomsPageModule
    ],
  declarations: [MyBookedRoomsPage]
})
export class MyBookedRoomsPageModule {}
