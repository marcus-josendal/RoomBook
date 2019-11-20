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
    // Checks if user is proprietor or not
    this.isProprietorChanges = this.authService.getIsProprietor()
        .subscribe(isProprietor => {
          this.isProprietor = isProprietor;
        });

    // Instead of simply returning all rooms in random order, sort them by timestamp
    this.rooms = this.roomService.getAllRooms().pipe(
        map(rooms => rooms.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))
    );
  }

  ngOnDestroy() {
    this.isProprietorChanges.unsubscribe();
  }

  navigateToRoomDetailView(room: Room) {
    const navigationExtras: NavigationExtras = {
      state: { room }
    };

    this.router.navigate(['room-detail'], navigationExtras);
  }

}
