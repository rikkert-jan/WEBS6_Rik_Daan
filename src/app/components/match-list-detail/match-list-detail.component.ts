import { Component, Input } from '@angular/core';
import { MatchService } from "../../services/match.service";
import { Match } from "../../models/match";

@Component({
    selector: 'match-list-detail',
    templateUrl: './match-list-detail.component.html',
    styleUrls: ['./match-list-detail.component.scss'],
})
export class MatchListDetailComponent {

    @Input() match: Match;

    constructor(private matchService: MatchService) { }

    public deleteMatch() {
        this.matchService.deleteMatch(this.match.id.toString());
    }

}
