import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.page.html',
  styleUrls: ['./all-rooms.page.scss'],
})
export class AllRoomsPage implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }

  isProprietor: boolean | null = null;
  isProprietorChanges: Subscription;

  ngOnInit() {
    this.isProprietorChanges = this.authService.getIsProprietor()
        .subscribe(isProprietor => {
          console.log(isProprietor);
          this.isProprietor = isProprietor;
        });
  }

  ngOnDestroy() {
    this.isProprietorChanges.unsubscribe();
  }

}
