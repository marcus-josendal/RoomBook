import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Room} from '../../../models/Room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.page.html',
  styleUrls: ['./room-detail.page.scss'],
})
export class RoomDetailPage implements OnInit {

  room: Room;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        // Vi lagrer dataen vi får med navigasjonen inn i this.post for å kunne vise binde dataen i HTML-fila
        this.room = this.router.getCurrentNavigation().extras.state.room as Room;
      }
    });
  }

  ngOnInit() {
  }

}
