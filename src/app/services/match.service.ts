import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import { UserService } from "../services/user.service";
import { Match } from "../models/match";
import { Observable } from "rxjs/Observable";


@Injectable()
export class MatchService {

    public matches: AngularFireList<Match>;
    public match: AngularFireObject<Match>;

    private matchTableName = '/matches';

    constructor(private database: AngularFireDatabase, private userService: UserService) {
        this.getMatches();
    }

    public getMatches(): AngularFireList<Match> {
        this.matches = this.database.list(this.matchTableName)
        return this.matches;
    }

    public getMatchesCompleteData(): AngularFireList<Match> {
        this.matches = this.database.list(this.matchTableName)
        return this.matches;
    }

    public getMatchesCompleteData2(): AngularFireList<Match> {
        this.matches = this.database.list(this.matchTableName)

        this.matches.snapshotChanges().subscribe(matches => {
            for (var i = 0; i < matches.length; i++) {
                for (var j = 0; j < matches[i].payload.val().participants; j++) {
                    this.userService.getAll().snapshotChanges().subscribe(users => {
                        for (var k = 0; k < users.length; k++) {
                            for (var l = 0; l < matches[i].payload.val().participants.length; l++) {
                                if (users[k].key == matches[i].payload.val().participants[l].id) {
                                    matches[i].payload.val().participants[l] = { id: users[k].key, ...users[k].payload.val() }
                                }
                            }
                        }
                    })
                }
            }
        });

        return this.matches;
    }

    public getMatch(key: string): AngularFireObject<Match> {
        this.match = this.database.object(this.matchTableName + "/" + key);
        return this.match
    }

    public getMatchCompleteData(key: string): AngularFireObject<Match> {
        this.match = this.database.object(this.matchTableName + "/" + key);
        return this.match
    }

    public deleteMatch(key: string) {
        return this.matches.remove(key);
    }

    public createMatch(match: Match) {
        var newMatch = match;
        return this.matches.push(newMatch);
    }

    public updateMatch(id: string, match: Match) {
        var updatedMatch = match;
        updatedMatch.id = null;
        return this.matches.update(id, updatedMatch);
    }
}