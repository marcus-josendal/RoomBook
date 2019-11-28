import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {distinctUntilChanged, filter, flatMap, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = null;

    constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFirestore) {
        this.setUserInfo();
    }

    /* Registers user, sets role and makes makes the users uid available in components that uses this service */
    registerUser(email: string, password: string, isRentingOut: boolean, companyName: string | null) {
        return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                if (companyName) {
                    this.setAsProprietor(res.user.uid, isRentingOut, companyName).then(() => this.setUserInfo());
                } else {
                    this.setAsTenant(res.user.uid).then(() => this.setUserInfo());
                }
            })
            .catch(err => 'Error:' + err);
    }

    /* Standard login and sets the user info */
    login(email: string, password: string) {
        return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
            .then(() => this.setUserInfo());
    }

    /* Sets the user as a proprietor */
    setAsProprietor(uid: string, isRentingOut: boolean, company: string) {
        return this.fireStore.collection('users')
            .add({ proprietor: isRentingOut, company,   uid })
            .catch(e => 'Something went wrong when updating your user:' + e);
    }

    /* Sets the user as a tenant */
    setAsTenant(uid: string) {
        return this.fireStore.collection('users')
            .add({ uid, proprietor: false })
            .catch(e => 'Something went wrong when updating your user:' + e);
    }

    /*  Observable - listens to new changes in authState and returns true if user is proprietor */
    getIsProprietor() {
        return this.fireAuth.authState
            .pipe(
                distinctUntilChanged(),
                filter(user => !!user),
                flatMap(user => this.fireStore.collection('users', ref => ref.where('uid', '==', user.uid)).get()),
                map(result => result.docs.some(item => item.get('proprietor') === true))
            );
    }

    /* Observable - listens to new changes in auth state and returns the users company */
    getCompanyName() {
        return this.fireAuth.authState
            .pipe(
                filter(user => !!user),
                flatMap(user => this.fireStore.collection('users', ref => ref.where('uid', '==', user.uid)).get()),
                map(result => result.docs[0].get('company'))
            );
    }

    /* Observable - Returns information about user */
    getUserMail() {
        return this.fireAuth.authState;
    }

    /* Logs out user - returns a promise */
    logOutUser() {
        return this.fireAuth.auth.signOut();
    }

    /* Listens to new changes in auth and sets the user info as soon as the service is injected */
    setUserInfo() {
        this.fireAuth.authState.subscribe(auth => this.user = auth);
    }

}
