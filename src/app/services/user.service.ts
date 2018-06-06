import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { User } from "../models/User";
import { Competition } from "../models/competition";
import { Match } from "../models/match";

@Injectable() export class UserService {

    public users: AngularFireList<User>;

    private userTableName = '/users';

    constructor(
        private database: AngularFireDatabase
    ) { }

    public getAll(): AngularFireList<User> {
        this.users = this.database.list(this.userTableName);
        return this.users;
    }

    public getAllUsersForMatch(match: Match): User[] {
        let filteredList: User[];

        match.participants.forEach(participant => {
            this.database.object(`${this.userTableName}/${participant.id}`).valueChanges().subscribe(result => {
                filteredList.push(result as User);
            });
        });

        return filteredList;
    }

    public getAllUsersForCompetition(competition: Competition): User[] {
        let filteredList: User[];

        competition.participants.forEach(participant => {
            this.database.object(`${this.userTableName}/${participant.id}`).valueChanges().subscribe(result => {
                filteredList.push(result as User);
            });
        });

        return filteredList;
    }
}