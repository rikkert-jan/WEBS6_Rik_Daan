import { Component, OnInit } from '@angular/core';
import { MatchService } from "../../services/match.service";
import { Match } from "../../models/match";
import { AuthorizationService } from '../../services/authorization.service';

@Component({
    selector: 'match-list',
    templateUrl: './match-list.component.html',
    styleUrls: ['./match-list.component.scss'],
    providers: [MatchService]
})
export class MatchListComponent implements OnInit {

    public matches: Match[];

    constructor(
        private matchService: MatchService,
        public auth: AuthorizationService
    ) { }

    ngOnInit() {
        this.matchService.getMatches().subscribe((matches) => {
            this.matches = matches.map(
                m => ({ id: m.key, ...m.payload.val() })
            );
        });
    }

    public deleteMatch(match: Match) {
        if (this.auth.user) {
            if (match.creator === this.auth.user.uid) {
                this.matchService.deleteMatch(match.id.toString());
            }
        }
    }
}
