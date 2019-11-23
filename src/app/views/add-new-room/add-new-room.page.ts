import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';
import { NativeService } from '../../services/native.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import Axios from 'axios';
import {Router} from '@angular/router';


@Component({
  selector: 'app-add-new-room',
  templateUrl: './add-new-room.page.html',
  styleUrls: ['./add-new-room.page.scss'],
})
export class AddNewRoomPage implements OnInit, OnDestroy {

  /* Form fields */
  title = '';
  roomDescription: '';
  roomLocation = '';
  roomPrice: number | null = null;
  email = '';
  companyName = '';
  cameraPreview = '';

  /* Loading fields */
  isFetchingLocation = false;
  isLoading = false;
  isTakingPicture = false;
  errorMessage = '';

  /* Other */
  placeholderImage = 'https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_800/https://www.testingxperts.com/wp-content/uploads/2019/02/placeholder-img.jpg';

  constructor(
      private authService: AuthService,
      private nativeService: NativeService,
      private geoLocation: Geolocation,
      private roomService: RoomService,
      private router: Router,
  ) { this.roomDescription = ''; }


  ngOnInit() {

  }

  /* Because of the navigation the component is not destroyed on leave, so we have to manually reset the input fields */
  ngOnDestroy() {
    this.title = '';
    this.roomDescription = '';
    this.roomLocation = '';
    this.roomPrice = null;
    this.email = '';
    this.companyName = '';
    this.cameraPreview = '';
    this.errorMessage = '';
  }

  /* Gets the users lat/lng and fetches the address based on these */
  getLocation() {
    this.roomLocation = 'Fetching you location..';
    this.isFetchingLocation = true;

    this.nativeService.getGeolocation().then((resp) => {
      Axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${resp.coords.latitude}&lon=${resp.coords.longitude}&zoom=18&addressdetails=1`)
          .then(address => this.roomLocation = address.data.address.road + ' ' + address.data.address.house_number)
          .catch(err => console.log(err))
          .finally(() => this.isFetchingLocation = false);
    });
  }

  /* If there is taken a picture upload it to FireStorage. If not set a placeholder image */
  checkImageAndAddRoom() {
    this.isLoading = true;
    if (this.formValidation()) {
      if (this.cameraPreview !== this.placeholderImage && this.cameraPreview.length > 1) {
        this.nativeService.uploadImageToFireStorage(this.cameraPreview)
            .then(data =>  {
              this.cameraPreview = data;
              this.addRoom();
            });
      } else {
        this.cameraPreview = this.placeholderImage;
        this.addRoom();
      }
    }
  }

  addRoom() {
    this.roomService.createNewRoomForRent(
      this.title,
      this.roomDescription,
      this.cameraPreview,
      this.roomLocation,
      this.roomPrice,
      this.email,
      this.companyName
    ).then(() => {
      this.router.navigate(['/tab-nav/nav/all-rooms']);
      this.ngOnDestroy();
    }).catch(e => this.errorMessage = e)
      .finally(() => this.isLoading = false);
  }

  takePicture() {
    this.isTakingPicture = true;
    this.nativeService.takePicture()
        .then(pictureData => this.cameraPreview = pictureData )
        .catch(e => this.errorMessage = e)
        .finally(() => this.isTakingPicture = false);
  }

  /* In the "real" world I would've made this a lot stricter, but some validation is better than no validation :) */
  formValidation() {
    const validString = (input: string) => input.length >= 1;
    const toBeValidated = [this.title, this.roomDescription, this.roomLocation, this.email, this.companyName];

    if (toBeValidated.filter(e => validString(e)).length === toBeValidated.length && this.roomPrice > 0) {
      return true;
    } else {
      this.errorMessage = 'Please fill in all required fields';
    }
    return false;
  }
}
