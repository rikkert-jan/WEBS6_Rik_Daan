import { UserService } from "../../services/user.service";
import { Match } from "../../models/match";
import { User } from "../../models/user";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'competition-match-participants',
    templateUrl: './competition-match-participants.html',
})
export class CompetitionMatchParticipantsComponent {

    @Input()
    set match(m: Match) {
        if (m.participants) {
            m.participants.forEach(participant => {
                this.userService.getUser(participant.id).subscribe(user => {
                    let u: User = { id: user.key, ...user.payload.val() };
                    this.participants.push(u);
                });
            });
        }
    }

    public participants: User[] = [];

    constructor(
        private userService: UserService,
    ) { }

    public setMatchManually(m: Match) {
        if (m.participants) {
            m.participants.forEach(participant => {
                this.userService.getUser(participant.id).subscribe(user => {
                    let u: User = { id: user.key, ...user.payload.val() };
                    this.participants.push(u);
                });
            });
        }
    }
}
