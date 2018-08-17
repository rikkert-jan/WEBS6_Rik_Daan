import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject, AngularFireAction, DatabaseSnapshot } from "angularfire2/database";
import { UserService } from "../services/user.service";
import { Match } from "../models/match";
import { Observable } from "rxjs/Observable";


@Injectable()
export class MatchService {

    private matchTableName = '/matches';

    constructor(private database: AngularFireDatabase, private userService: UserService) {
        this.getMatches();
    }

    public getMatches(): Observable<AngularFireAction<DatabaseSnapshot>[]> {
        return this.database.list(this.matchTableName).snapshotChanges();
    }

    public getMatch(key: string): Observable<AngularFireAction<DatabaseSnapshot>> {
        return this.database.object(this.matchTableName + "/" + key).snapshotChanges();
    }

    public getMatchCompleteData(key: string): Observable<AngularFireAction<DatabaseSnapshot>> {
        return this.database.object(this.matchTableName + "/" + key).snapshotChanges();
    }

    public deleteMatch(key: string) {
        return this.database.list(this.matchTableName).remove(key);
    }

    public createMatch(match: Match) {
        return this.database.list(this.matchTableName).push(match);
    }

    public updateMatch(id: string, match: Match) {
        var updatedMatch = match;
        updatedMatch.id = null;
        return this.database.list(this.matchTableName).update(id, updatedMatch);
    }
}