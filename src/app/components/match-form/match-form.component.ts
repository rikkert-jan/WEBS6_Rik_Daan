import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { MatchService } from "../../services/match.service";
import { Match } from "../../models/match";

@Component({
    selector: 'match-form',
    templateUrl: './match-form.component.html',
    styleUrls: ['./match-form.component.scss'],
})
export class MatchFormComponent implements OnInit {

    @Input() match: Match = new Match();
    private matchId: string;

    constructor(
        private matchService: MatchService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    onSubmit(form: any): void {
        this.match.creator = null;
        this.match.participants = [];
        this.match.winner = null;
        this.matchService.updateMatch(this.matchId, this.match);
    }

    ngOnInit() {
        this.matchId = this.route.snapshot.paramMap.get('id');
        this.matchService.getMatch(this.matchId).snapshotChanges().subscribe(match => {
            this.match = new Match(
                match.key,
                match.payload.val().status,
                match.payload.val().creator,
                match.payload.val().participants,
                match.payload.val().startingTime,
                match.payload.val().winner
            );
        });
    }

}
