import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, finalize, first, map} from 'rxjs/operators';
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
  company: string | null = null;
  proprietor: Observable<boolean>;
  myRooms: Observable<[Room]>;
  isEmpty = false;
  isDeleting = false;
  isProprietor = false;
  isProprietorChanges: Subscription;

  ngOnInit() {
    this.email = this.authService.getUserMail().pipe(
        filter(val => !!val),
        map(val => val.email)
    );
    this.authService.getCompanyName().subscribe(next => this.company = next);
    this.myRooms = this.roomService.getMyRooms(this.authService.user.uid) as Observable<[Room]>;
    this.isProprietorChanges = this.authService.getIsProprietor().subscribe(isProprietor => this.isProprietor = isProprietor);
    this.roomService.getMyRooms(this.authService.user.uid).subscribe((next: Room[] | []) => this.isEmpty = next.length === 0);

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
