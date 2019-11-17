import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllRoomsPage } from './all-rooms.page';

const routes: Routes = [
  {
    path: '',
    component: AllRoomsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllRoomsPageRoutingModule {}
