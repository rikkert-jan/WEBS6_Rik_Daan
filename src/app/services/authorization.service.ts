import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { User } from "firebase";
import { auth } from 'firebase/app';
import { AngularFireDatabase } from "angularfire2/database";

@Injectable() export class AuthorizationService {

    public user: User;

    constructor(
        private authService: AngularFireAuth,
        private database: AngularFireDatabase
    ) {
        this.authService.authState.subscribe(u => this.user = u);
    }

    public login() {
        this.authService.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(result => {
            console.log('test');
            // if (this.user) {
            //     this.database.list('/users').set('/user', this.user.email);
            // }
        });
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
