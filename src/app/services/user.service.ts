import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject, AngularFireAction } from "angularfire2/database";
import { User } from "../models/user";
import { Competition } from "../models/competition";
import { Match } from "../models/match";
import { Observable } from "rxjs/internal/Observable";
import { DatabaseSnapshot } from "angularfire2/database/interfaces";

@Injectable() export class UserService {

    private userTableName = '/users';

    constructor(
        private database: AngularFireDatabase
    ) { }

    public getAll(): Observable<AngularFireAction<DatabaseSnapshot>[]> {
        return this.database.list(this.userTableName).snapshotChanges();
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

    public getUser(id: string): Observable<AngularFireAction<DatabaseSnapshot>> {
        return this.database.object(this.userTableName + "/" + id).snapshotChanges();
 
    }
}