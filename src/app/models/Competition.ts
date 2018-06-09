import { User } from "./user";
import { Match } from "./match";
import { Round } from "./round";

export class Competition {
    id: string;
    participants: User[];
    rounds: Round[];
    type: string;
    name: string;
    date: Date;
    dateInMs: number;
    maxAmountOfParticipants: number;
    minutesPerMatch: number;
    creator: string;
    winner: string;
}