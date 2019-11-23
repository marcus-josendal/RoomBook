import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { v4 as uuid } from 'uuid';
import {Geolocation} from '@ionic-native/geolocation/ngx';


@Injectable({
  providedIn: 'root'
})
export class NativeService {

  userIsOnIos: boolean;

  constructor(
      private platform: Platform,
      private camera: Camera,
      private fireStorage: AngularFireStorage,
      private geoLocation: Geolocation,
  ) {
    this.userIsOnIos = this.platform.is('ios');
  }

  /* Returns users current geo-location */
  getGeolocation() {
    return this.geoLocation.getCurrentPosition();
  }

  /* Takes picture and returns a promise with the image data */
  takePicture() {
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    return this.camera.getPicture(cameraOptions);
  }

  /* Uploading image data to firebase and returns a URL */
  async uploadImageToFireStorage(cameraPreview: string) {
    const fileName = `room-book-${uuid()}.png`;
    const fireStorageFileRef = this.fireStorage.ref(fileName);
    const uploadTask = fireStorageFileRef.putString(
        cameraPreview,
        'base64',
        { contentType: 'image/png' }
    );
    await uploadTask.then();
    return fireStorageFileRef.getDownloadURL().toPromise();
  }

}
