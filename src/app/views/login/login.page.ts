import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NativeService } from '../../services/native.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private nativeService: NativeService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.isLoading = true;
    this.authService.login(this.email, this.password)
        .then(() => this.router.navigate(['tab-nav']))
        .catch(e => this.errorMessage = e)
        .finally(() => this.isLoading = false);
  }
}
