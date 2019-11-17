import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

    constructor(private authService: AuthService, private router: Router) { }

    // Form input
    email = '';
    password = '';
    confirmPassword = '';
    willBeRentingOut = false;
    errorMessage = '';
    isLoading = false;


    ngOnInit() {
    }

    registerUser() {
        const isValidInput = this.validateInput();
        if (isValidInput.valid) {
            this.isLoading = true;
            this.authService.registerUser(this.email, this.password, this.willBeRentingOut)
                .then(() => this.router.navigate(['all-rooms']))
                .catch(err => this.errorMessage = err)
                .finally(() => this.isLoading = false);
        } else {
            this.errorMessage = isValidInput.statusMessage;
        }
    }


    // I really don't like writing custom validation, but the Angular frameworks for validation look awful.
    validateInput(): { valid: boolean, statusMessage: string; } {
        const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
        const validatePassword = (p, cp) =>  p === cp && p.length >= 8;

        if (validateEmail(this.email) && validatePassword(this.password, this.confirmPassword)) {
            return { valid: true, statusMessage: 'ok'};
        } else if (!validateEmail(this.email) && !validatePassword(this.password, this.confirmPassword)) {
            return { valid: false, statusMessage: 'Please use a valid e-mail and password' };
        } else if (validateEmail(this.email) && !validatePassword(this.password, this.confirmPassword)) {
            return { valid: false, statusMessage: 'Please make sure your password is longer than 8 characters and match' };
        } else if (!validateEmail(this.email) && validatePassword(this.password, this.confirmPassword)) {
            return { valid: false, statusMessage: 'Please use valid e-mail address' };
        } else {
            return { valid: false, statusMessage: 'Please use valid credentials' };
        }
    }

}
