import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import { MatchService } from "../services/match.service";
import { Competition } from "../models/competition";
import { Round } from "../models/round";
import { Match } from "../models/match";
import { User } from "../models/user";
import { Observable } from "rxjs/Observable";


@Injectable()
export class CompetitionService {

    public competitions: AngularFireList<Competition>;
    public competition: AngularFireObject<Competition>;

    private competitionTableName = '/competitions';
    private participantIndex = 0;

    constructor(private database: AngularFireDatabase,
        private matchService: MatchService,
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
            }
        });
        this.competitions.remove(key);
    }

    public createCompetition(competition: Competition) {
        if (competition.participants.length == competition.maxAmountOfParticipants) {
            if (competition.rounds || competition.rounds.length == 0) {
                switch (competition.type) {
                    case "TOURNAMENT":
                        this.generateTournament(competition);
                        break;
                    case "POULE":
                        this.generatePoules(competition);
                        break;
                    case "KNOCKOUT":
                        this.generateKnockout(competition);
                        break;
                }
            }
        }
        var newCompetition = competition;
        newCompetition.id = null;
        this.competitions.push(newCompetition);
    }

    public updateCompetition(id: string, competition: Competition) {
        if (competition.participants.length == competition.maxAmountOfParticipants) {
            if (competition.rounds || competition.rounds.length == 0) {
                switch (competition.type) {
                    case "TOURNAMENT":
                        this.generateTournament(competition);
                        break;
                    case "POULE":
                        this.generatePoules(competition);
                        break;
                    case "KNOCKOUT":
                        this.generateKnockout(competition);
                        break;
                }
            }
        }
        var updatedCompetition = competition;
        updatedCompetition.id = null;
        this.competitions.update(id, updatedCompetition);
    }

    public generateKnockout(competition: Competition) {
        this.participantIndex = 0;
        var rounds: Round[] = [];
        var roundsReferences: Round[] = [];
        var numberOfRounds = this.calculateNumberOfRounds(competition.participants.length) - 1;
        var numberOfMatches = 1;
        var participantCombos = this.calculateUniqueMatches(competition.participants);
        this.generateKnockOutMatch(rounds, competition.creator, numberOfRounds, competition.minutesPerMatch, competition.date, competition.participants);
        competition.rounds = rounds;
    }

    public generateKnockOutMatch(rounds: Round[], creator: string, roundNumber: number, minutesPerMatch: number, date: Date, participants: User[]): Match {
        var doesRoundExist = this.doesRoundExist(rounds, roundNumber);
        var startingTime = new Date(date);
        startingTime.setTime(startingTime.getTime() + (minutesPerMatch * roundNumber) * 60 * 1000);
        var startingTimeInMs = startingTime.getTime();

        var match = new Match();
        match.participants = [];
        match.creator = creator;
        match.startingTimeInMs = startingTimeInMs;
        match.status = "OPEN";

        if (roundNumber == 0) {
            match.participants.push({ id: participants[this.participantIndex].id } as User);
            match.participants.push({ id: participants[this.participantIndex + 1].id } as User);
            this.participantIndex += 2;
        }
        if (roundNumber > 0) {
            match.prevMatch1 = { id: this.generateKnockOutMatch(rounds, creator, roundNumber - 1, minutesPerMatch, date, participants).id } as Match;
            match.prevMatch2 = { id: this.generateKnockOutMatch(rounds, creator, roundNumber - 1, minutesPerMatch, date, participants).id } as Match;
        }
        if (roundNumber >= 0) {
            if (doesRoundExist) {
                for (var i = 0; i < rounds.length; i++) {
                    if (rounds[i].number == roundNumber) {
                        var ref = this.matchService.createMatch(match);
                        match.id = ref.key;
                        rounds[i].matches.push({ id: ref.key } as Match);
                    }
                }
            } else {
                var ref = this.matchService.createMatch(match);
                match.id = ref.key;
                var round = new Round();
                round.number = roundNumber;
                round.pouleNumber = null;                
                round.matches = [{ id: ref.key }] as Match[];
                rounds.push(round);
            }
            roundNumber--;
        }
        return match;
    }

    public generatePoules(competition: Competition) {
        var rounds: Round[] = [];
        var roundsReferences: Round[] = [];
        for (var i = 0; i < competition.poules.length; i++) {
            this.generatePoule(competition, i, competition.poules[i].participants, rounds);
        }
        this.createMatches(rounds, roundsReferences);
        competition.rounds = roundsReferences;
    }

    public generatePoule(competition: Competition, pouleNumber: number, pouleParticipants: User[], rounds: Round[]) {
        var pouleParticipantCombos = this.calculateUniqueMatches(pouleParticipants);
        var pouleParticipantCombosPool = this.calculateUniqueMatches(pouleParticipants);
        var numberOfRounds = this.calculateNumberOfUserOccurencesInCombos(pouleParticipantCombos);
                
        for (var i = 0; i < numberOfRounds; i++) {
            var round = new Round();
            round.number = i + 1;
            round.pouleNumber = pouleNumber + 1;
            round.matches = this.generateMatches(pouleParticipantCombos, pouleParticipantCombosPool, rounds, competition, i);
            rounds.push(round);
        }
    }

    public generateTournament(competition: Competition) {
        var participantCombos = this.calculateUniqueMatches(competition.participants);
        var rounds: Round[] = [];
        var roundsReferences: Round[] = [];
        var participantCombosCopy: any[] = [];
        for (var i = 0; i < participantCombos.length; i++)
            participantCombosCopy.push(participantCombos[i]);

        for (var i = 0; i < competition.numberOfRounds; i++) {
            var round = new Round();
            round.number = i + 1;
            round.pouleNumber = null;
            round.matches = this.generateMatches(participantCombos, participantCombosCopy, rounds, competition, i);
            rounds.push(round);
        }
        this.createMatches(rounds, roundsReferences);
        competition.rounds = roundsReferences;
    }

    public createMatches(rounds: Round[], roundsReferences: Round[]) {
        rounds.forEach(round => {
            var roundReference = new Round();
            roundReference.pouleNumber = round.pouleNumber;
            roundReference.number = round.number;
            roundReference.matches = [];
            round.matches.forEach(match => {
                var ref = this.matchService.createMatch(match);
                roundReference.matches.push({ id: ref.key } as Match);
            });
            roundsReferences.push(roundReference);
        });
    }

    public generateMatches(participantCombosReference: any[], participantCombosPool: any[], rounds: Round[], competition: Competition, multiplier: number): Match[] {
        var matches = [];
        var startingTime = new Date(competition.date);

        for (var i = 0; i < participantCombosReference.length; i++) {
            startingTime.setTime(startingTime.getTime() + (competition.minutesPerMatch * multiplier) * 60 * 1000);
            var startingTimeInMs = startingTime.getTime();
            var match = new Match();
            match.status = "OPEN";
            match.creator = competition.creator;
            match.startingTimeInMs = startingTimeInMs;
            match.participants = [];

            for (var j = 0; j < participantCombosReference[i].users.length; j++) {
                var user1Id = participantCombosReference[i].users[0];
                var user2Id = participantCombosReference[i].users[1];

                if (matches.length < participantCombosReference.length / 2 || competition.type != "TOURNAMENT") {
                    if (!this.havePlayedInThisRound(user1Id, user2Id, matches)) {
                        if (!this.havePlayedAgainstEachOther({ id: user1Id } as User, { id: user2Id } as User, rounds)) {
                            if (match.participants.length < 2) {
                                match.participants.push({ id: user1Id } as User);
                                match.participants.push({ id: user2Id } as User);
                                participantCombosPool.splice(participantCombosPool[i], 1)
                                matches.push(match);
                            }
                        }
                    }
                }
            }
        }
        return matches;
    }


    public calculateNumberOfUserOccurencesInCombos(userCombos: any[]): number {
        var userToTrack = userCombos[0].users[0];
        var numberOfOccurencesOfUser = 0;
        for (var i = 0; i < userCombos.length; i++) {
            var combo = userCombos[i];
            var comboUser1 = combo.users[0];
            var comboUser2 = combo.users[1];

            if (comboUser1 == userToTrack || comboUser2 == userToTrack) {
                numberOfOccurencesOfUser++;
            }
        }

        return numberOfOccurencesOfUser;
    }

    public calculateUniqueMatches(participants: User[]) {
        var participantCombos = [];

        for (var i = 0; i < participants.length; i++) {
            for (var j = 0; j < participants.length; j++) {
                var user1 = participants[i];
                var user2 = participants[j];
                var shouldAdd = true;
                if (participantCombos.length != 0) {
                    for (var k = 0; k < participantCombos.length; k++) {
                        var participantCombo = participantCombos[k];
                        if (this.arraysEqual(participantCombo.users, [user1.id, user2.id])) {
                            shouldAdd = false;
                            continue;
                        }
                    }
                }
                if (user1.id == user2.id) {
                    shouldAdd = false;
                }
                if (shouldAdd) {
                    participantCombos.push({ users: [user1.id, user2.id] })
                }
            }
        }
        return participantCombos;
    }

    public doesRoundExist(rounds: Round[], roundNumber: number) {
        for (var i = 0; i < rounds.length; i++) {
            if (rounds[i].number == roundNumber) {
                return true;
            }
        }
        return false;
    }

    public havePlayedAgainstEachOther(user1: User, user2: User, rounds: Round[]): boolean {
        for (var i = 0; i < rounds.length; i++) {
            for (var j = 0; j < rounds[i].matches.length; j++) {
                var match = rounds[i].matches[j];
                if (match && match.participants) {
                    var users = match.participants;
                    if (JSON.stringify(users) == JSON.stringify([{ id: user1.id }, { id: user2.id }])) {
                        return true;
                    }
                    if (JSON.stringify(users) == JSON.stringify([{ id: user2.id }, { id: user1.id }])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public havePlayedInThisRound(user1Id: string, user2Id: string, matches: Match[]) {
        if (matches.length > 0) {
            for (var i = 0; i < matches.length; i++) {
                for (var j = 0; j < matches[i].participants.length; j++) {
                    var users = matches[i].participants;
                    if (JSON.stringify(users).indexOf(JSON.stringify({ id: user1Id })) != -1) {
                        return true;
                    }
                    if (JSON.stringify(users).indexOf(JSON.stringify({ id: user2Id })) != -1) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public calculateNumberOfRounds(numberOfParticipants: number) {
        var numberOfRounds = 1;
        var prevI = 1;
        for (var i = 1; i < (numberOfParticipants / 2) + 1; i++) {
            if (i % 2 == 0) {
                if (i / prevI == 2) {
                    numberOfRounds++;
                    prevI = i;
                }
            }
        }
        return numberOfRounds;
    }

    public arraysEqual(_arr1: any[], _arr2: any[]): boolean {

        if (!Array.isArray(_arr1) || !Array.isArray(_arr2) || _arr1.length !== _arr2.length)
            return false;

        var arr1 = _arr1.concat().sort();
        var arr2 = _arr2.concat().sort();
        for (var i = 0; i < arr1.length; i++) {

            if (arr1[i] !== arr2[i])
                return false;

        }
        return true;
    }
}