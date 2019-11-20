import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { v4 as uuid } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class NativeService {

  userIsOnIos: boolean;
  private cameraPreview = '';


  constructor(
      private platform: Platform,
      private camera: Camera,
      private fireStorage: AngularFireStorage,
      private fireStore: AngularFirestore,
      private fireAuth: AngularFireAuth
  ) {
    this.userIsOnIos = this.platform.is('ios');
  }

  async takePicture() {
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    try {
      const imageData = await this.camera.getPicture(cameraOptions);
      this.cameraPreview = imageData;
    } catch (e) {
      console.log(e);
    }
  }

  async postToFirebase() {
    const uploadedImageUrl = await this.uploadImageToFirestorage();
  }

  async uploadImageToFirestorage() {
    const fileName = `tds-${uuid()}.png`;
    console.log(fileName);
    const firestorageFileRef = this.fireStorage.ref(fileName);
    const uploadTask = firestorageFileRef.putString(
        this.cameraPreview,
        'base64',
        { contentType: 'image/png' }
    );
    await uploadTask.then();
    return firestorageFileRef.getDownloadURL().toPromise();
  }

}
