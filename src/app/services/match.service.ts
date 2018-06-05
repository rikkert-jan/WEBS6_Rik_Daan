import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import { Match } from "../models/Match";
import { Observable } from "rxjs/Observable";


@Injectable()
export class MatchService {

    public matchObservable: Observable<any[]>;
    public matches: Match[];

    private matchTableName = '/matches';

    constructor(private database: AngularFireDatabase) {
        this.readMatches();
    }

    public readMatches() {
        this.matchObservable = this.database.list(this.matchTableName).valueChanges();
        this.matchObservable.subscribe(matches => {
            this.matches = matches as Match[];
        });
    }

    public deleteMatch(key: string) {
        this.database.list(this.matchTableName).remove(key);
    }

    public createMatch(match: Match) {
        this.database.list(this.matchTableName).push(match);
    }

    public updateMatch(key: string, match: Match) {
        this.database.list(this.matchTableName).update(key, match);
    }
}