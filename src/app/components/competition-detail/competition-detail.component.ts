import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, Input } from '@angular/core';
import { CompetitionService } from "../../services/competition.service";
import { Competition } from "../../models/competition";
import { UserService } from '../../services/user.service';
import { AuthorizationService } from '../../services/authorization.service';
import { NotificationService } from '../../services/notification.service';
import { User } from '../../models/user';
import { Match } from '../../models/match';
import { MatchService } from '../../services/match.service';

@Component({
    selector: 'competition-detail',
    templateUrl: './competition-detail.component.html',
    styleUrls: ['./competition-detail.component.scss'],
})
export class CompetitionDetailComponent {

    @Input() competition: Competition = new Competition();
    public creator: User = new User();
    public participants: User[] = [];
    public matches: Match[] = [];
    public canParticipate = true;
    public alreadyParticipating = false;


    private competitionId: string;

    constructor(
        private competitionService: CompetitionService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        public auth: AuthorizationService,
        private notificationService: NotificationService,
        private matchService: MatchService
    ) { }

    ngOnInit() {
        this.competitionId = this.route.snapshot.paramMap.get('id');
        if (this.competitionId) {
            this.competitionService.getCompetition(this.competitionId).subscribe(competition => {
                if (competition.key) {
                    this.competition = { id: competition.key, ...competition.payload.val() };

                    if (this.competition.rounds) {
                        this.competition.rounds.forEach(round => {
                            round.matches.forEach(match => {
                                this.matchService.getMatch(match.id).subscribe(m => {
                                    let n: Match = { id: m.key, ...m.payload.val() };
                                    this.matches.push(n);
                                })
                            });
                        });
                    }

                    this.userService.getUser(this.competition.creator).subscribe(user => {
                        let u: User = { id: user.key, ...user.payload.val() };
                        this.creator = u;
                    });

                    if (this.competition.participants) {
                        this.participants = [];
                        this.competition.participants.forEach(participant => {
                            this.userService.getUser(participant.id).subscribe(user => {
                                let u = { id: user.key, ...user.payload.val() };
                                this.participants.push(u);
                                if (u.id === this.auth.user.uid && this.canParticipate) {
                                    this.alreadyParticipating = true;
                                    this.canParticipate = false;
                                }
                            });
                        });
                    } else {
                        this.competition.participants = [];
                    }
                } else {
                    this.competition = new Competition();
                }
            });
        }
    }

    public joinCompetition() {
        let canJoin = true;
        this.participants.forEach(participant => {
            if (participant.id === this.auth.user.uid) {
                canJoin = false;
            }
        });

        let competitionTime = this.competition.date;
        let currentTime = new Date();

        // && competitionTime > currentTime

        if (canJoin
            && this.competition.participants.length < this.competition.maxAmountOfParticipants) {

            this.userService.getUser(this.auth.user.uid).subscribe(user => {
                let u: User = { id: user.key, ...user.payload.val() };
                this.competition.participants.push(u);
                this.competitionService.updateCompetition(this.competition.id, this.competition)
                this.canParticipate = false;
                this.alreadyParticipating = true;
                this.notificationService.sendSuccess('Joined the competition');
            });
        } else {
            this.canParticipate = false;
            this.notificationService.sendError('You cannot join this competition');
        }
    }

    public leaveCompetition() {
        this.userService.getUser(this.auth.user.uid).subscribe(user => {
            let u: User = { id: user.key, ...user.payload.val() };
            let index = this.competition.participants.indexOf(u);
            this.competition.participants.splice(index, 1);
            this.competitionService.updateCompetition(this.competition.id, this.competition)
            this.canParticipate = true;
            this.alreadyParticipating = false;
            this.notificationService.sendSuccess('Left the competition');
        });
    }
}
