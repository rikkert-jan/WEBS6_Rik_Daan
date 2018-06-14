import { Match } from "../models/match";

export class Round {
    id: string;
    number: number;
    matches?: Match[];
    groups?: any[];
}