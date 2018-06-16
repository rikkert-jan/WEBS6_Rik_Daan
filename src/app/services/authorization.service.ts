import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { User as FirebaseUser } from "firebase";
import { User } from "../models/user";
import { auth } from 'firebase/app';
import { AngularFireDatabase } from "angularfire2/database";

@Injectable() export class AuthorizationService {

    public user: FirebaseUser;

    private userTableName = '/users';

    constructor(
        public authService: AngularFireAuth,
        private database: AngularFireDatabase
    ) {
        this.authService.authState.subscribe(u => this.user = u);
    }

    public login() {
        this.authService.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(result => {
            const currentUser = this.authService.auth.currentUser;
            let user = {
                id: currentUser.uid,
                email: currentUser.email,
                name: currentUser.displayName
            };

            this.database.object(`${this.userTableName}/${currentUser.uid}`).update(user);
        });
    }

    public logout() {
        this.authService.auth.signOut();
    }

    public updateGamesWon(newGamesWon: number) {
        const currentUser = this.authService.auth.currentUser;

        let user = {
            id: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName,
            gamesWon: newGamesWon
        };

        this.database.object(`${this.userTableName}/${currentUser.uid}`).update(user);
    }

    public getCurrentUser() {
        return this.database.object(`${this.userTableName}/${this.authService.auth.currentUser.uid}`).valueChanges();
    }
}
