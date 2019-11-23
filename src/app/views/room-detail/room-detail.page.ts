import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../../models/Room';
import { RoomService } from '../../services/room.service';
import { AuthService } from '../../services/auth.service';
import { NativeService } from '../../services/native.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.page.html',
  styleUrls: ['./room-detail.page.scss'],
})
export class RoomDetailPage implements OnInit {

  room: Room;
  isRentedByUser: boolean;
  userId = null;
  isLoading = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private roomService: RoomService,
      private authService: AuthService,
      private nativeService: NativeService
  ) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.room = this.router.getCurrentNavigation().extras.state.room as Room;
        this.isRentedByUser = this.router.getCurrentNavigation().extras.state.isRentedByMe;
      }
    });
  }

  ngOnInit() {
    this.userId = this.authService.user.uid;
  }

  /* After the user has rented a room - it is redirected to the list of their booked rooms */
  rentRoom() {
    this.isLoading = true;
    this.roomService.setRoomAsRented(this.room.roomId, this.userId)
        .then(() => this.router.navigate(['/tab-nav/nav/my-booked-rooms']))
        .finally(() => this.isLoading = false);
  }

  /* Delete reservation and redirect to all rooms */
  removeReservation() {
    this.isLoading = true;
    this.roomService.removeReservationOnRoom(this.room.roomId)
        .then(() => this.router.navigate(['/tab-nav/nav/all-rooms']))
        .finally(() => this.isLoading = false);
  }

  get dateFormatted() {
    return new Date(this.room.timestamp * 1000).toDateString();
  }
}
