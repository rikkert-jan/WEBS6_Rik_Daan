import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, Input } from '@angular/core';
import { MatchService } from "../../services/match.service";
import { UserService } from "../../services/user.service";
import { Match } from "../../models/match";

@Component({
    selector: '[match-simple]',
    templateUrl: './match-simple.component.html',
    styleUrls: ['./match-simple.component.scss'],
})
export class MatchSimpleComponent {

    @Input() match: Match = new Match();

    constructor(
        private matchService: MatchService,
        private userService: UserService,        
    ) { }


    ngOnInit() {
        if (this.match) {
            this.matchService.getMatch(this.match.id).snapshotChanges().subscribe(match => {
                if (match.key) {
                    this.match = { id: match.key, ...match.payload.val() }
                    this.match.participants = this.userService.getAllUsersForMatch(this.match);
                } else {
                    this.match = new Match();
                }
            });
        }
    }

}
