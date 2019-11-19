import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';
import { Observable, Subscription } from 'rxjs';
import { Room } from '../../../models/Room';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

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
    this.isProprietorChanges = this.authService.getIsProprietor()
        .subscribe(isProprietor => {
          this.isProprietor = isProprietor;
        });
    this.rooms = this.roomService.getAllRooms();
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
