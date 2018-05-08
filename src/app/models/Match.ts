import { User } from "./User";

export class Match {
    id: number;
    status: string;
    creator: User;
    participants: User[];
    startingTime: Date;
    winner: User;
}