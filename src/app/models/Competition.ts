import { User } from "./User";
import { Match } from "./Match";
import { Round } from "./Round";

export class Competition {
    id: number;
    participants: User[];
    rounds: Round[];
    type: string;
    name: string;
    date: Date;
    maxAmountOfParticipants: number;
    timePerMatch: number;
}