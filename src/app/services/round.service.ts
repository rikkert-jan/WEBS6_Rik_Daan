import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import { Round } from "../models/Round";
import { Observable } from "rxjs/Observable";


@Injectable()
export class RoundService {

    public roundObservable: Observable<any[]>;
    public rounds: Round[];

    private roundTableName = '/rounds';

    constructor(
        private database: AngularFireDatabase
    ) {
        this.getRounds();
    }

    public getRounds() {
        this.roundObservable = this.database.list(this.roundTableName).valueChanges();
        this.roundObservable.subscribe(rounds => {
            this.rounds = rounds;
        });
    }

    public deleteMatch(id: string){
        this.database.list(this.roundTableName).remove(id);
    }
}