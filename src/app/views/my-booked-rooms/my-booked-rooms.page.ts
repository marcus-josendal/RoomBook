import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {RoomService} from '../../services/room.service';
import {NavigationExtras, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Room} from '../../../models/Room';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-my-booked-rooms',
  templateUrl: './my-booked-rooms.page.html',
  styleUrls: ['./my-booked-rooms.page.scss'],
})
export class MyBookedRoomsPage implements OnInit {

  constructor(
      private authService: AuthService,
      private roomService: RoomService,
      private router: Router
  ) {}

  userId = this.authService.user.uid;
  myBookedRooms: Observable<Room[]>;

  ngOnInit() {
    this.myBookedRooms = this.roomService.getMyBookedRooms(this.userId).pipe(
        map(rooms => rooms.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))
    );
  }

  navigateToRoomDetailView(room: Room) {
    const navigationExtras: NavigationExtras = {
      state: { room, isRentedByMe: true },
    };

    this.router.navigate(['room-detail'], navigationExtras);
  }
}
