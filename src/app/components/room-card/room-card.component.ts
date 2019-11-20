import {Component, Input, OnInit} from '@angular/core';
import { Room } from '../../../models/Room';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {

  constructor() { }

  @Input() roomData: Room;

  ngOnInit() {}

}
