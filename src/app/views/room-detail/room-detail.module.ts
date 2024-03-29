import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomDetailPageRoutingModule } from './room-detail-routing.module';

import { RoomDetailPage } from './room-detail.page';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RoomDetailPageRoutingModule,
        FontAwesomeModule
    ],
    exports: [
        RoomDetailPage
    ],
    declarations: [RoomDetailPage]
})
export class RoomDetailPageModule {}
