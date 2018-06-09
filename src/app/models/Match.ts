import { User } from "./User";

export class Match {
    id: string;
    status: string;
    creator: string;
    participants: User[];
    startingTime: Date;
    startingTimeInMs: number;
    winner: string;
}