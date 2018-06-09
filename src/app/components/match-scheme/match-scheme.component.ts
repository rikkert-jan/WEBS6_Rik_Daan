import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CompetitionService } from "../../services/competition.service";
import { MatchService } from "../../services/match.service";
import { Competition } from "../../models/competition";
import { Match } from "../../models/match";

@Component({
    selector: 'match-scheme',
    templateUrl: './match-scheme.component.html',
    styleUrls: ['./match-scheme.component.scss'],
    providers: [MatchService]
})
export class MatchSchemeComponent implements OnInit {

    public competition: Competition = new Competition();
    public competitionId: string;

    constructor(
        private matchService: MatchService,
        private competitionService: CompetitionService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.competitionId = this.route.snapshot.paramMap.get('id');
        if (this.competitionId) {
            this.competitionService.getCompetition(this.competitionId).snapshotChanges().subscribe(competition => {
                if (competition.key) {
                    this.competition = { id: competition.key, ...competition.payload.val() }
                } else {
                    this.competition = new Competition();
                }
            });
        }
    }
}
