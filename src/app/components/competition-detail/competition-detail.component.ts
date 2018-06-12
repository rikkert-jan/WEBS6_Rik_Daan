import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, Input } from '@angular/core';
import { CompetitionService } from "../../services/competition.service";
import { Competition } from "../../models/competition";
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
    selector: 'competition-detail',
    templateUrl: './competition-detail.component.html',
    styleUrls: ['./competition-detail.component.scss'],
})
export class CompetitionDetailComponent {

    @Input() competition: Competition = new Competition();
    public creator: User = new User();
    public participants: User[] = [];
    private competitionId: string;

    constructor(
        private competitionService: CompetitionService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.competitionId = this.route.snapshot.paramMap.get('id');
        if (this.competitionId) {
            this.competitionService.getCompetition(this.competitionId).snapshotChanges().subscribe(competition => {
                if (competition.key) {
                    this.competition = {id: competition.key, ...competition.payload.val()}
                    this.userService.getUser(this.competition.creator).snapshotChanges().subscribe(user => {
                        this.creator = {id: user.key, ...user.payload.val()};
                    });
                    this.competition.participants.forEach(participant => {
                        this.userService.getUser(participant.id).snapshotChanges().subscribe(user => {
                            let u = {id: user.key, ...user.payload.val()};
                            this.participants.push(u);
                        });
                    });
                } else {
                    this.competition = new Competition();
                }
            });
        }
    }
}
