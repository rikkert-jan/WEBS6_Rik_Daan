import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { CompetitionService } from "../../services/competition.service";
import { UserService } from "../../services/user.service";
import { Competition } from "../../models/competition";
import { User } from "../../models/user";

@Component({
    selector: 'competition-form',
    templateUrl: './competition-form.component.html',
    styleUrls: ['./competition-form.component.scss'],
})
export class CompetitionFormComponent implements OnInit {

    @Input() competition: Competition = new Competition();
    private competitionId: string;

    constructor(
        private competitionService: CompetitionService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    onSubmit(form: any): void {
        this.competition.rounds = [];
        this.competition.creator = null;
        this.competition.winner = null;

        if (this.competitionId) {
            this.competitionService.updateCompetition(this.competitionId, this.competition);
        } else {
            this.competitionService.createCompetition(this.competition);
        }
    }

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
