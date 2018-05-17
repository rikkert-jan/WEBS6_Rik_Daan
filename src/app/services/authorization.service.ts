import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { firebase } from '@firebase/app';
import { User } from "@firebase/auth-types";

@Injectable() export class AuthorizationService {

    public user: User;

    constructor(public authService: AngularFireAuth) {
        this.authService.authState.subscribe(u => this.user = u);
    }

    public login() {
        this.authService.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    public logout() {
        this.authService.auth.signOut();
    }

    public getCurrentUser(): User {
        if (this.user) {
            return this.user
        } else {
            return undefined;
        }
    }

}