import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Observable} from 'rxjs';
import {distinctUntilChanged, finalize, first, map} from 'rxjs/operators';
import {Room} from '../../../models/Room';
import {Router} from '@angular/router';
import {forEach} from '@angular-devkit/schematics';
import {RoomService} from '../../services/room.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private roomService: RoomService) { }

  email: Observable<string>;
  proprietor: Observable<boolean>;
  myRooms: Observable<[Room]>;
  isEmpty = false;
  isDeleting = false;

  ngOnInit() {
    this.email = this.authService.getUserMail().pipe(
        map(val => val.email)
    );
    this.proprietor = this.authService.getIsProprietor().pipe(first());
    this.myRooms = this.roomService.getMyRooms(this.authService.user.uid) as Observable<[Room]>;
  }


  get userStatus(): string {
    return this.proprietor ? 'Proprietor' : 'Renter';
  }


  signOut() {
    this.authService.logOutUser().then(() => this.router.navigate(['/home']));
  }

  deleteRoom(roomId: string) {
    this.isDeleting = true;
    this.roomService.deleteRoom(roomId)
        .finally(() => this.isDeleting = false);
  }
}
