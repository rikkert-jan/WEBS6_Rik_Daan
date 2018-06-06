import { Component, Input } from '@angular/core';
import { CompetitionService } from "../../services/competition.service";
import { Competition } from "../../models/competition";

@Component({
    selector: 'competition-list-detail',
    templateUrl: './competition-list-detail.component.html',
    styleUrls: ['./competition-list-detail.component.scss'],
})
export class CompetitionListDetailComponent {

    @Input() competition: Competition;

    constructor(private competititonService: CompetitionService) { }

    public deleteCompetition() {
        this.competititonService.deleteCompetition(this.competition.id.toString());
    }

}
