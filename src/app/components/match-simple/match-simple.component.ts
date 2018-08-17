import { Component, Input } from '@angular/core';
import { MatchService } from "../../services/match.service";
import { UserService } from "../../services/user.service";
import { Match } from "../../models/match";
import { User } from "../../models/user";

@Component({
    selector: '[match-simple]',
    templateUrl: './match-simple.component.html',
    styleUrls: ['./match-simple.component.scss'],
})
export class MatchSimpleComponent {

    @Input() match: Match = new Match();
    @Input() winner: User;

    constructor(
        private matchService: MatchService,
        private userService: UserService,
    ) { }


    ngOnInit() {
        if (this.match) {
            this.matchService.getMatch(this.match.id).subscribe(match => {
                if (match.key) {
                    this.match = { id: match.key, ...match.payload.val() }
                    this.match.participants = this.userService.getAllUsersForMatch(this.match);
                    this.match.startingTime = new Date(this.match.startingTimeInMs);
                    if (this.match.winner) {
                        this.userService.getUser(this.match.winner).subscribe(user => {
                            this.winner = { id: user.key, ...user.payload.val() };
                        })
                    }
                } else {
                    this.match = new Match();
                }
            });
        }
    }

}
