import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import { Competition } from "../models/Competition";
import { Observable } from "rxjs/Observable";


@Injectable()
export class CompetitionService {

    public competitions: AngularFireList<Competition>;
    public competition: AngularFireObject<Competition>;

    private competitionTableName = '/competitions';

    constructor(private database: AngularFireDatabase) {
        this.getCompetitions();
    }

    public getCompetitions(): AngularFireList<Competition> {
        this.competitions = this.database.list(this.competitionTableName)
        return this.competitions;
    }

    public getCompetition(key: string): AngularFireObject<Competition> {
        this.competition = this.database.object(this.competitionTableName + "/" + key);
        return this.competition;
    }

    public deleteCompetition(key: string) {
        this.competitions.remove(key);
    }

    public createCompetition(competition: Competition) {
        var newCompetition = competition;
        newCompetition.id = null;
        this.competitions.push(newCompetition);
    }

    public updateCompetition(id: string, competition: Competition) {
        var updatedCompetition = competition;
        updatedCompetition.id = null;
        this.competitions.update(id, updatedCompetition);
    }
}