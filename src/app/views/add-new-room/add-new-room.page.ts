import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import Axios from 'axios';


@Component({
  selector: 'app-add-new-room',
  templateUrl: './add-new-room.page.html',
  styleUrls: ['./add-new-room.page.scss'],
})
export class AddNewRoomPage implements OnInit {

  constructor(
      private authService: AuthService,
      private geoLocation: Geolocation,
      private roomService: RoomService
  ) { }

  /* Form fields */
  title = '';
  description: '';
  roomLocation = '';
  roomPrice: number | null = null;
  email = '';
  companyName = '';
  imageUrl = '';

  /* Loading fields */
  isFetchingLocation = false;
  isLoading = false;

  ngOnInit() {

  }

  getLocation() {
    this.roomLocation = 'Fetching you location..';
    this.isFetchingLocation = true;

    this.geoLocation.getCurrentPosition().then((resp) => {
      // tslint:disable-next-line:max-line-length
      Axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${resp.coords.latitude}&lon=${resp.coords.longitude}&zoom=18&addressdetails=1`)
          .then(address => this.roomLocation = address.data.address.road + ' ' + address.data.address.house_number)
          .catch(err => console.log(err))
          .finally(() => this.isFetchingLocation = false);
    });
  }

  addRoom() {
    this.isLoading = true;
    this.roomService.createNewRoomForRent(
        this.title,
        this.description,
        this.imageUrl,
        this.roomLocation,
        this.roomPrice,
        this.email,
        this.companyName
    ).then(data => console.log(data))
     .catch(e => console.log(e))
     .finally(() => this.isLoading = false);
  }
}
