import { Component, OnInit, Input } from '@angular/core';
import { MatchService } from "../../services/match.service";
import { Match } from "../../models/match";

@Component({
    selector: 'match-form',
    templateUrl: './match-form.component.html',
    styleUrls: ['./match-form.component.scss'],
})
export class MatchFormComponent {

    @Input() match: Match;

    constructor(private matchService: MatchService) {
        if (!this.match) {
            this.match = new Match();
        }
    }

    onSubmit(form: any): void {
        this.match.id = null;
        this.match.creator = null;
        this.match.participants = [];
        this.match.winner = null;

        console.log(this.match.startingTime)

        this.matchService.createMatch(this.match);
    }

}
