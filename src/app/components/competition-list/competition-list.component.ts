import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { NotificationService } from '../../services/notification.service';
import { CompetitionService } from "../../services/competition.service";
import { Competition } from "../../models/competition";

@Component({
    selector: 'competition-list',
    templateUrl: './competition-list.component.html',
    styleUrls: ['./competition-list.component.scss'],
})
export class CompetitionListComponent implements OnInit {

    public competitions: Competition[];
    public filteredCompetitions: Competition[];
    public filterCreated = false;
    public filterParticipating = false;

    constructor(
        private competitionService: CompetitionService,
        public auth: AuthorizationService,
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.competitionService.getCompetitions().subscribe((competitions) => {
            this.competitions = competitions.map(
                competition => ({ id: competition.key, ...competition.payload.val() })
            );
            this.filteredCompetitions = this.competitions;
        });
    }

    public deleteCompetition(competition: Competition) {
        if (this.auth.user) {
            if (competition.creator === this.auth.user.uid) {
                this.competitionService.deleteCompetition(competition.id.toString());
            }
        }
    }

    public toggleOwned() {
        this.filterCreated = !this.filterCreated;
        this.filterParticipating = false;
        if (this.filterCreated) {
            this.filteredCompetitions = [];
            this.competitions.forEach(competition => {
                if (competition.creator === this.auth.user.uid) {
                    this.filteredCompetitions.push(competition);
                }
            });
        } else {
            this.filteredCompetitions = this.competitions;
        }
    }

    public toggleParticipating() {
        this.filterParticipating = !this.filterParticipating;
        this.filterCreated = false;
        if (this.filterParticipating) {
            this.filteredCompetitions = [];
            this.competitions.forEach(competition => {
                competition.participants.forEach(user => {
                    if (user.id === this.auth.user.uid) {
                        this.filteredCompetitions.push(competition);
                    }
                })
            })
        } else {
            this.filteredCompetitions = this.competitions;
        }
    }
}
