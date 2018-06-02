import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { User } from "../models/User";
import { Observable } from "rxjs";

@Injectable() export class UserService {

   
    public userObservable: Observable<any[]>;
    public users: User[];

    private userTableName = '/users';

    constructor(
        private database: AngularFireDatabase
    ) {

    }

    public getAll() {
        this.userObservable = this.database.list(this.userTableName).valueChanges();
        this.userObservable.subscribe(users => {
            this.users = users as User[];
        });
    }

    public addUser() {

    }

    public deleteUser() {

    }
}