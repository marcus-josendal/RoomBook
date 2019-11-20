import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../../models/Room';
import { RoomService } from '../../services/room.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.page.html',
  styleUrls: ['./room-detail.page.scss'],
})
export class RoomDetailPage implements OnInit {

  room: Room;
  userId = null;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private roomService: RoomService,
      private authService: AuthService
  ) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.room = this.router.getCurrentNavigation().extras.state.room as Room;
      }
    });
  }

  ngOnInit() {
    this.userId = this.authService.user.uid;
  }

  /* After the user has rented a room - it is redirected to the list of their booked rooms */
  rentRoom() {
    this.roomService.setRoomAsRented(this.room.roomId, this.userId)
        .then(() => this.router.navigate(['/tab-nav/nav/my-booked-rooms']));
  }
}
