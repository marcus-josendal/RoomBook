import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';
import { Observable, Subscription } from 'rxjs';
import { Room } from '../../../models/Room';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.page.html',
  styleUrls: ['./all-rooms.page.scss'],
})
export class AllRoomsPage implements OnInit, OnDestroy {

  constructor(
      private authService: AuthService,
      private roomService: RoomService,
      private router: Router
  ) { }

  rooms: Observable<Room[]>;
  isProprietor: boolean | null = null;
  isProprietorChanges: Subscription;

  ngOnInit() {
    /* If user is proprietor the next value will be true */
    this.isProprietorChanges = this.authService.getIsProprietor()
        .subscribe(isProprietor => {
          this.isProprietor = isProprietor;
        });

    /* Sorts the rooms on timestamp and filters out rooms the logged in user have rented */
    this.rooms = this.roomService.getAllRooms().pipe(
        map(rooms => rooms.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())),
        map(rooms => rooms.filter(room => room.renter !== this.authService.user.uid))
    );
  }

  ngOnDestroy() {
    this.isProprietorChanges.unsubscribe();
  }

  navigateToRoomDetailView(room: Room) {
    const navigationExtras: NavigationExtras = {
      state: { room, isRentedByMe: false },
    };

    this.router.navigate(['room-detail'], navigationExtras);
  }

}
