import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyBookedRoomsPage } from './my-booked-rooms.page';

const routes: Routes = [
  {
    path: '',
    component: MyBookedRoomsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBookedRoomsPageRoutingModule {}
