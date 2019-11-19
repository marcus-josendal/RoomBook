import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomDetailPage } from './room-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RoomDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomDetailPageRoutingModule {}
