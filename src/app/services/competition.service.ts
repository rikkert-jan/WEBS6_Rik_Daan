import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Competition } from "../models/Competition";
import { Observable } from "rxjs";

@Injectable() export class CompetitionService {

    public competitionObservable: Observable<any[]>;
    public competitions: Competition[];

    private competitionTableName = '/competitions';

    constructor(
        private database: AngularFireDatabase
    ) {
        this.getAll();
    }

    public getAll() {
        this.competitionObservable = this.database.list(this.competitionTableName).valueChanges();
        this.competitionObservable.subscribe(competitions => {
            this.competitions = competitions as Competition[];
        });
    }

    public addCompetition() {
        const comp: Competition = {
            id: 1,
            name: 'test',
            maxAmountOfParticipants: 1,
            timePerMatch: 1,
            type: 'type test',
            date: new Date()
        };
        this.database.list(this.competitionTableName).set('1', comp);
    }

    public deleteCompetition() {

    }
}