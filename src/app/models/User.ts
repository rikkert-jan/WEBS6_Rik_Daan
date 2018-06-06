export class User {
    id: string;
    email: string;
    name: string;
    gamesWon?: number;

    constructor(id?: string, email?: string, name?: string, gamesWon?: number) {
        this.email = email;
        this.name = name;
        this.gamesWon = gamesWon;
    }
}