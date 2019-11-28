import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {NativeService} from '../../services/native.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

    constructor(private authService: AuthService, private nativeService: NativeService, private router: Router) { }

    // Form input
    email = '';
    password = '';
    confirmPassword = '';
    willBeRentingOut = false;
    errorMessage = '';
    isLoading = false;
    companyName: string | null = '';

    ngOnInit() {
    }

    registerUser() {
        const isValidInput = this.validateInput();
        if (isValidInput.valid) {
            this.isLoading = true;
            this.companyName = this.companyName.length > 0 ? this.companyName : null;
            this.authService.registerUser(this.email, this.password, this.willBeRentingOut, this.companyName)
                .then(() => this.router.navigate(['tab-nav']))
                .catch(err => this.errorMessage = err)
                .finally(() => this.isLoading = false);
        } else {
            this.errorMessage = isValidInput.statusMessage;
        }
    }


    /* I really don't like writing custom validation, but the Angular frameworks for validation looks awful. */
    validateInput(): { valid: boolean, statusMessage: string; } {
        const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
        const validatePassword = (p, cp) =>  p === cp && p.length >= 8;
        const validateCompanyName = (cn, renting) => !(renting && cn < 1);

        if (validateEmail(this.email) && validatePassword(this.password, this.confirmPassword) && validateCompanyName(this.companyName, this.willBeRentingOut)) {
            return { valid: true, statusMessage: 'ok'};
        } else if (!validateEmail(this.email)) {
            return { valid: false, statusMessage: 'Please use a valid e-mail' };
        } else if (!validatePassword(this.password, this.confirmPassword)) {
            return {valid: false, statusMessage: 'Please make sure your password is longer than 8 characters and match'};
        } else if (this.willBeRentingOut && this.companyName.length < 1) {
            return {valid: false, statusMessage: 'Please write a company name'};
        } else {
            return { valid: false, statusMessage: 'Please use valid credentials' };
        }
    }

}
