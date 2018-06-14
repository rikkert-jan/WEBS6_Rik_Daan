import { User } from "./user";

export class Match {
    id: string;
    status: string;
    creator: string;
    participants: User[];
    startingTime: Date;
    startingTimeInMs: number;
    winner: string;
    prevMatch1: Match;
    prevMatch2: Match;
}