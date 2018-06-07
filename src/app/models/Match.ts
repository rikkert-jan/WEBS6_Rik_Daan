import { User } from "./User";

export class Match {
    id: string;
    status: string;
    creator: User;
    participants: User[];
    startingTime: Date;
    startingTimeInMs: number;
    winner: User;
}