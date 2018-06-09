import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import { Match } from "../models/Match";
import { Observable } from "rxjs/Observable";


@Injectable()
export class MatchService {

    public matches: AngularFireList<Match>;
    public match: AngularFireObject<Match>;

    private matchTableName = '/matches';

    constructor(private database: AngularFireDatabase) {
        this.getMatches();
    }

    public getMatches(): AngularFireList<Match> {
        this.matches = this.database.list(this.matchTableName)
        return this.matches;
    }

    public getMatch(key: string): AngularFireObject<Match> {
        this.match = this.database.object(this.matchTableName + "/" + key);
        return this.match
    }

    public deleteMatch(key: string) {
        return this.matches.remove(key);
    }

    public createMatch(match: Match) {
        var newMatch = match;
        //newMatch.id = null;
        return this.matches.push(newMatch);
    }

    public updateMatch(id: string, match: Match) {
        var updatedMatch = match;
        updatedMatch.id = null;
        return this.matches.update(id, updatedMatch);
    }
}