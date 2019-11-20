import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable} from 'rxjs';
import { Room } from '../../models/Room';
import { v4 as uuid } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
      private fireAuth: AngularFireAuth,
      private fireStore: AngularFirestore,
      private authService: AuthService
  ) { }


  /* Creates a new room that can be rented */
  createNewRoomForRent(
      title: string,
      description: string,
      imageUrl: string,
      roomLocation: string,
      roomPrice: number,
      email: string,
      companyName: string,
  ) {
    const userId = this.authService.user.uid;
    const roomId = uuid();
    if (this.authService.user.uid) {
      return this.fireStore.collection('rooms').doc(roomId)
          .set({
            title,
            email,
            roomId,
            description,
            imageUrl,
            proprietor: userId,
            renter: '',
            location: roomLocation,
            price: roomPrice,
            company: companyName,
            timestamp: new Date().getTime() / 1000,
            rented: false
          })
          .catch(e => 'Something went wrong when creating your room:' + e);
    }
  }
  /* Simply sets a room as rented with the id of the renter */
  setRoomAsRented(roomId, userId) {
      return this.fireStore.doc('rooms/' + roomId)
          .update({ rented: true, renter: userId });
  }

  /* Removes the reservation for the given room */
  removeReservationOnRoom(roomId: string) {
      return this.fireStore.doc('rooms/' + roomId)
          .update({ rented: false, renter: '' });
  }

  /* Observable - returns all rooms - how to sort it is up to the user */
  getAllRooms() {
    return this.fireStore.collection('rooms').valueChanges() as Observable<[Room]>;
  }


  /* Observable -  returns all rooms where the "renter"-field is equals to the userId */
  getMyBookedRooms(userId: string) {
      return this.fireStore
          .collection('rooms', ref => ref.where('renter', '==', userId))
          .valueChanges() as Observable<[Room]>;
  }

}
