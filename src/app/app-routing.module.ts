import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomePageModule),
    ...canActivate(redirectLoggedInTo(['tab-nav']))
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./views/sign-up/sign-up.module').then( m => m.SignUpPageModule),
    ...canActivate(redirectLoggedInTo(['tab-nav']))
  },
  {
    path: 'tab-nav',
    loadChildren: () => import('./views/tab-nav/tab-nav.module').then( m => m.TabNavPageModule),
    ...canActivate(redirectUnauthorizedTo(['login']))
  },
  {
    path: 'room-detail',
    loadChildren: () => import('./views/room-detail/room-detail.module').then( m => m.RoomDetailPageModule),
    ...canActivate(redirectUnauthorizedTo(['login']))
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInTo(['tab-nav']))
  },
  {
    path: 'user',
    loadChildren: () => import('./views/user/user.module').then( m => m.UserPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
