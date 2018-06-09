import { User } from "./user";
import { Match } from "./match";
import { Round } from "./round";

export class Competition {
    id: string;
    participants: User[];
    numberOfRounds: number;
    numberOfPoules: number;    
    rounds: Round[];
    poules: any[];
    type: string;
    name: string;
    date: Date;
    dateInMs: number;
    maxAmountOfParticipants: number;
    minutesPerMatch: number;
    creator: User;
    winner: User;
}