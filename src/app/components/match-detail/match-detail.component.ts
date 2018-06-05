import { Component, Input } from '@angular/core';
import { MatchService } from "../../services/match.service";
import { Match } from "../../models/match";

@Component({
    selector: 'match-detail',
    templateUrl: './match-detail.component.html',
    styleUrls: ['./match-detail.component.scss'],
})
export class MatchDetailComponent {

    @Input() match: Match;

    constructor(private matchService: MatchService) { }

    public deleteMatch() {
        this.matchService.deleteMatch(this.match.id.toString());
    }

}
