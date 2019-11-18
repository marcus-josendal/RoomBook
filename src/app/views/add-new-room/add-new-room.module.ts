import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { IonicModule } from '@ionic/angular';

import { AddNewRoomPageRoutingModule } from './add-new-room-routing.module';

import { AddNewRoomPage } from './add-new-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewRoomPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [AddNewRoomPage]
})
export class AddNewRoomPageModule {}
