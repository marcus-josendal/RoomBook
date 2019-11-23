import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-tab-nav',
    templateUrl: './tab-nav.page.html',
    styleUrls: ['./tab-nav.page.scss'],
})
export class TabNavPage implements OnInit {

    constructor(private authService: AuthService) { }

    isProprietor = false;
    isProprietorChanges: Subscription;

    ngOnInit() {
        /* If user is proprietor the next value will be true */
        this.isProprietorChanges = this.authService.getIsProprietor()
            .subscribe(isProprietor => this.isProprietor = isProprietor);
    }

    ionViewDidLeave() {
        this.isProprietorChanges.unsubscribe();
    }

}
