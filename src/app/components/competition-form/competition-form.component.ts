import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { CompetitionService } from "../../services/competition.service";
import { UserService } from "../../services/user.service";
import { Competition } from "../../models/competition";
import { User } from "../../models/user";
import { DragulaModule } from 'ng2-dragula';

@Component({
    selector: 'competition-form',
    templateUrl: './competition-form.component.html',
    styleUrls: ['./competition-form.component.scss', "../../../../node_modules/dragula/dist/dragula.css"],
})
export class CompetitionFormComponent implements OnInit {

    @Input() competition: Competition = new Competition();
    private competitionId: string;
    private poules: any[];

    constructor(
        private competitionService: CompetitionService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    public generatePoules() {
        var poules = [];
        var playersPerPoule = this.competition.participants.length / this.competition.numberOfPoules;
        var participants = [];

        for (var i = 0; i < this.competition.participants.length; i++) {
            participants.push(this.competition.participants[i]);
        }

        for (var i = 0; i < this.competition.numberOfPoules; i++) {
            var pouleParticipants = [];
            var poule: any = {};
            for (var j = 0; j < playersPerPoule; j++) {
                pouleParticipants.push(participants[j] as User);
            }
            participants.splice(participants[0], playersPerPoule)
            poule.participants = pouleParticipants;
            poules.push(poule);
        }
        this.poules = poules;
    }

    onSubmit(form: any): void {
        this.competition.rounds = [];
        this.competition.creator = null;
        this.competition.winner = null;
        this.competition.dateInMs = new Date(this.competition.date).getTime();
        if (this.competition.type == "POULE") {
            this.competition.poules = this.poules;
        }
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
