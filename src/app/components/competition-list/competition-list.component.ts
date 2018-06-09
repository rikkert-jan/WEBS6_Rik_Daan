import { Component, OnInit } from '@angular/core';
import { CompetitionService } from "../../services/competition.service";
import { Competition } from "../../models/competition";
import { AuthorizationService } from '../../services/authorization.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'competition-list',
    templateUrl: './competition-list.component.html',
    styleUrls: ['./competition-list.component.scss'],
    providers: [CompetitionService]
})
export class CompetitionListComponent implements OnInit {

    public competitions: Competition[];

    constructor(
        private competitionService: CompetitionService,
        private auth: AuthorizationService,
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.competitionService.competitions.snapshotChanges().subscribe((competitions) => {
            this.competitions = competitions.map(
                competition => ({ id: competition.key, ...competition.payload.val() })
            );
        });
    }

    public deleteCompetition(competition: Competition) {
        if (this.auth.user) {
            if (competition.creator === this.auth.user.uid) {
                this.competitionService.deleteCompetition(competition.id.toString());
            }
        }
    }
}
