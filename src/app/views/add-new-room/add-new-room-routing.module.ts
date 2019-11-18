import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewRoomPage } from './add-new-room.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewRoomPageRoutingModule {}
