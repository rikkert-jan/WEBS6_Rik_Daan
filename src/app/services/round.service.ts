import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import { Round } from "../models/Round";
import { Observable } from "rxjs/Observable";


@Injectable()
export class RoundService {

    public rounds: AngularFireList<Round>;
    public round: AngularFireObject<Round>;

    private roundTableName = '/rounds';

    constructor(private database: AngularFireDatabase) {
        this.getRounds();
    }

    public getRounds() {
        this.rounds = this.database.list(this.roundTableName);
        return this.rounds;
    }

    public getRound(id: string) {
        this.rounds = this.database.list(this.roundTableName + "/" + id);
        return this.rounds;
    }

    public deleteRound(key: string) {
        return this.rounds.remove(key);
    }

    public createRound(round: Round) {
        return this.rounds.push(round);
    }

    public updateRound(key: string, round: Round) {
        return this.rounds.update(key, round);
    }
}