import { User } from "./User";

export class Match {
    id: string;
    status: string;
    creator: User;
    participants: User[];
    startingTime: Date;
    winner: User;

    constructor(id?: string, status?: string, creator?: User, participants?: User[], startingTime?: Date, winner?: User){
        this.id = id;
        this.status = status;
        this.creator = creator;
        this.participants = participants;
        this.startingTime = startingTime;
        this.winner = winner;
    }
}