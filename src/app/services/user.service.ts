import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import { User } from "../models/user";
import { Observable } from "rxjs";

@Injectable() export class UserService {


    public users: AngularFireList<User>;
    public user: AngularFireObject<User>;

    private userTableName = '/users';

    constructor(
        private database: AngularFireDatabase
    ) {
        this.getUsers();
    }

    public getUsers(): AngularFireList<User> {
        this.users = this.database.list(this.userTableName);
        return this.users;
    }

    public getUser(id: string): AngularFireObject<User> {
        this.user = this.database.object(this.userTableName + "/" + id);
        return this.user;
    }
}