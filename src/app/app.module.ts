import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Firebase-spesifikke moduler
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';

// Font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

const firebaseConfig = {
  apiKey: 'AIzaSyDQiaByENUukJv-SGWyri_g1lzHH-vsIuY',
  authDomain: 'roombook-e1ebf.firebaseapp.com',
  databaseURL: 'https://roombook-e1ebf.firebaseio.com',
  projectId: 'roombook-e1ebf',
  storageBucket: 'roombook-e1ebf.appspot.com',
  messagingSenderId: '428331030982',
  appId: '1:428331030982:web:470f8a840555150b5e7ac7'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule,
      AngularFireAuthModule,
      AngularFireStorageModule,
      AngularFireAuthGuardModule,
      FontAwesomeModule
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
