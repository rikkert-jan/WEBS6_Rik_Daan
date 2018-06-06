import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, Input } from '@angular/core';
import { MatchService } from "../../services/match.service";
import { Match } from "../../models/match";

@Component({
    selector: 'match-detail',
    templateUrl: './match-detail.component.html',
    styleUrls: ['./match-detail.component.scss'],
})
export class MatchDetailComponent {

    @Input() match: Match = new Match();
    private matchId: string;

    constructor(
        private matchService: MatchService,
        private route: ActivatedRoute,
        private router: Router
    ) { }


    ngOnInit() {
        this.matchId = this.route.snapshot.paramMap.get('id');
        if (this.matchId) {
            this.matchService.getMatch(this.matchId).snapshotChanges().subscribe(match => {
                if (match.key) {
                    this.match = {id: match.key, ...match.payload.val()}
                } else {
                    this.match = new Match();
                }
            });
        }
    }

}
