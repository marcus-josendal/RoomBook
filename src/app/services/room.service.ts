import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Room } from '../../models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
      private fireAuth: AngularFireAuth,
      private fireStore: AngularFirestore,
      private authService: AuthService
  ) { }


  // Creates a new room that can be rented
  createNewRoomForRent(
      title: string,
      roomLocation: string,
      roomPrice: number,
      email: string,
      companyName: string,
  ) {
    const uid = this.authService.user.uid;
    if (this.authService.user.uid) {
      return this.fireStore.collection('rooms')
          .add({ title, email, uid, location: roomLocation, price: roomPrice, company: companyName })
          .catch(e => 'Something went wrong when updating your user:' + e);
    }
  }

  getAllRooms() {
    return this.fireStore.collection('rooms').valueChanges() as Observable<[Room]>;
  }
}
