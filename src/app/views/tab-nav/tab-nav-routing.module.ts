import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabNavPage } from './tab-nav.page';

const routes: Routes = [
  {
    path: 'nav',
    component: TabNavPage,
    children: [
      {
          path: 'all-rooms',
          loadChildren: () => import('../all-rooms/all-rooms.module').then( m => m.AllRoomsPageModule)
      },
      {
        path: 'my-booked-rooms',
        loadChildren: () => import('../my-booked-rooms/my-booked-rooms.module').then( m => m.MyBookedRoomsPageModule)
      },
      {
        path: 'new-room',
        loadChildren: () => import('../add-new-room/add-new-room.module').then( m => m.AddNewRoomPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'nav/all-rooms',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabNavPageRoutingModule {}
