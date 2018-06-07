import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import { MatchService } from "../services/match.service";
import { RoundService } from "../services/round.service";
import { Competition } from "../models/Competition";
import { Round } from "../models/round";
import { Match } from "../models/match";
import { User } from "../models/user";
import { Observable } from "rxjs/Observable";


@Injectable()
export class CompetitionService {

    public competitions: AngularFireList<Competition>;
    public competition: AngularFireObject<Competition>;

    private competitionTableName = '/competitions';

    constructor(private database: AngularFireDatabase,
        private matchService: MatchService,
        private roundService: RoundService
    ) {
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
        this.getCompetition(key).valueChanges().subscribe(competition => {
            if (competition) {
                competition.rounds.forEach(round => {
                    round.matches.forEach(match => {
                        this.matchService.deleteMatch(match.id);
                    });
                });
                this.competitions.remove(competition.id);
            }
        });
    }

    public createCompetition(competition: Competition) {
        switch (competition.type) {
            case "TOURNAMENT":
                this.generateTournament(competition);
                break;
            case "POULE": break;
            case "KNOCKOUT": break;
        }
        var newCompetition = competition;
        newCompetition.id = null;
        this.competitions.push(newCompetition);
    }

    public updateCompetition(id: string, competition: Competition) {
        var updatedCompetition = competition;
        updatedCompetition.id = null;
        this.competitions.update(id, updatedCompetition);
    }

    public generateTournament(competition: Competition) {
        var rounds: Round[] = [];
        var roundsReferences: Round[] = [];
        for (var i = 0; i < (competition.participants.length / 2); i++) {
            var round = new Round();
            round.number = i;
            round.matches = this.generateMatches(competition.participants, rounds, competition, i);
            rounds.push(round);
        }

        rounds.forEach(round => {
            var roundReference = new Round();
            roundReference.matches = [];
            round.matches.forEach(match => {
                var ref = this.matchService.createMatch(match);
                roundReference.matches.push({ id: ref.key } as Match);
            });
            roundsReferences.push(roundReference);
        });
        competition.rounds = roundsReferences;
    }

    public havePlayedAgainstEachOther(user1: User, user2: User, rounds: Round[]): boolean {
        rounds.forEach(round => {
            round.matches.forEach(match => {
                if (match.participants.indexOf(user1) != -1 && match.participants.indexOf(user2)) {
                    return true;
                }
            });
        });
        return false;
    }

    public havePlayedInThisRound(user1: User, user2: User, participants: User[]): boolean {
        if (participants.indexOf(user1) != -1 || participants.indexOf(user2) != -1) {
            return true;
        }
        return false;
    }

    public generateUniqueMatch(competitionParticipants: User[], rounds: Round[], competition: Competition, multiplier: number): Match {
        var user1Index = 0;
        var user2Index = 0;

        var startingTime = new Date(competition.date);
        startingTime.setTime(startingTime.getTime() + (competition.minutesPerMatch * multiplier) * 60 * 1000);
        var startingTimeInMs = startingTime.getTime()

        var match = new Match();
        match.status = "OPEN";
        match.creator = competition.creator;
        match.startingTimeInMs = startingTimeInMs;
        match.participants = [];
        do {
            var user1Index = Math.floor(Math.random() * (competitionParticipants.length));
            var user2Index = Math.floor(Math.random() * (competitionParticipants.length));
        } while (user1Index == user2Index);
        var user1 = competitionParticipants[user1Index];
        var user2 = competitionParticipants[user2Index];

        if (this.havePlayedInThisRound(user1, user2, match.participants)) {
            this.generateUniqueMatch(competitionParticipants, rounds, competition, multiplier);
        } else {
            match.participants.push(user1);
            match.participants.push(user2);

            if (this.havePlayedAgainstEachOther(user1, user2, rounds)) {
                this.generateUniqueMatch(competitionParticipants, rounds, competition, multiplier);
            } else {
                competitionParticipants.splice(user1Index, 1);
                competitionParticipants.splice(user2Index, 1);
                return match;
            }
        }
    }

    public generateMatches(participants: User[], rounds: Round[], competition, multiplier: number): Match[] {
        var competitionParticipants = [];
        var matches = [];

        for (var i = 0, len = participants.length; i < len; ++i) {
            competitionParticipants[i] = participants[i];
        }

        for (var i = 0; i < participants.length / 2; i++) {
            matches.push(this.generateUniqueMatch(competitionParticipants, rounds, competition, multiplier));
        }

        return matches;
    }
}