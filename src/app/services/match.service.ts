import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import { Match } from "../models/Match";
import { Observable } from "rxjs/Observable";


@Injectable()
export class MatchService {

    public matchObservable: Observable<any[]>;
    public matches: Match[];

    private matchTableName = '/matches';

    constructor(
        private database: AngularFireDatabase
    ) {
        this.readMatches();
    }

    public readMatches() {
        this.matchObservable = this.database.list(this.matchTableName).valueChanges();
        this.matchObservable.subscribe(matches => {
            this.matches = matches;
        });
    }

    public deleteMatch(id: string){
        this.database.list(this.matchTableName).remove(id);
    }
}