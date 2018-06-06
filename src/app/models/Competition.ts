import { User } from "./User";
import { Match } from "./Match";
import { Round } from "./Round";

export class Competition {
    id: string;
    participants: User[];
    rounds: Round[];
    type: string;
    name: string;
    date: Date;
    maxAmountOfParticipants: number;
    minutesPerMatch: number;
    creator: User;
    winner: User;

    constructor(id?: string, participants?: User[], rounds?: Round[], type?: string, name?: string, date?: Date, maxAmountOfParticipants?: number, minutesPerMatch?: number, creator?: User, winner?: User) {
        this.id = id;
        this.participants = participants;
        this.rounds = rounds;
        this.type = type;
        this.name = name;
        this.date = date;
        this.maxAmountOfParticipants = maxAmountOfParticipants;
        this.minutesPerMatch = minutesPerMatch;
        this.winner = winner;
        this.creator = creator;
    }
}