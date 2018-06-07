import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, Input } from '@angular/core';
import { CompetitionService } from "../../services/competition.service";
import { Competition } from "../../models/competition";

@Component({
    selector: 'competition-detail',
    templateUrl: './competition-detail.component.html',
    styleUrls: ['./competition-detail.component.scss'],
})
export class CompetitionDetailComponent {

    @Input() competition: Competition = new Competition();
    private competitionId: string;

    constructor(
        private competitionService: CompetitionService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.competitionId = this.route.snapshot.paramMap.get('id');
        if (this.competitionId) {
            this.competitionService.getCompetition(this.competitionId).snapshotChanges().subscribe(competition => {
                if (competition.key) {
                    this.competition = {id: competition.key, ...competition.payload.val()}
                } else {
                    this.competition = new Competition();
                }
            });
        }
    }
}
