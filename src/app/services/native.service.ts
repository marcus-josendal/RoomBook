import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NativeService {

  userIsOnIos: boolean;

  constructor(private platform: Platform) {
    this.userIsOnIos = this.platform.is('ios');
  }

}
