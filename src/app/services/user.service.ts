import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import { User } from "../models/user";
import { Competition } from "../models/competition";
import { Match } from "../models/match";

@Injectable() export class UserService {

    public users: AngularFireList<User>;
    public user: AngularFireObject<User>;

    private userTableName = '/users';

    constructor(
        private database: AngularFireDatabase
    ) {
        this.getAll();
    }

    public getAll(): AngularFireList<User> {
        this.users = this.database.list(this.userTableName);
        return this.users;
    }

    public getAllUsersForMatch(match: Match): User[] {
        let filteredList: User[] = [];
        if (match.participants) {
            match.participants.forEach(participant => {
                this.database.object(`${this.userTableName}/${participant.id}`).snapshotChanges().subscribe(user => {
                    filteredList.push({ id: user.key, ...user.payload.val() } as User);
                });
            });
        }

        return filteredList;
    }

    public getAllUsersForCompetition(competition: Competition): User[] {
        let filteredList: User[] = [];

        competition.participants.forEach(participant => {
            this.database.object(`${this.userTableName}/${participant.id}`).snapshotChanges().subscribe(user => {
                filteredList.push({ id: user.key, ...user.payload.val() } as User);
            });
        });

        return filteredList;
    }

    public getUser(id: string): AngularFireObject<User> {
        this.user = this.database.object(this.userTableName + "/" + id);
        return this.user;
    }
}