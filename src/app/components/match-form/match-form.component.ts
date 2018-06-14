import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { MatchService } from "../../services/match.service";
import { Match } from "../../models/match";
import { AuthorizationService } from '../../services/authorization.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'match-form',
    templateUrl: './match-form.component.html',
    styleUrls: ['./match-form.component.scss'],
})
export class MatchFormComponent implements OnInit {

    @Input() match: Match = new Match();
    private matchId: string;

    constructor(
        private matchService: MatchService,
        private route: ActivatedRoute,
        private router: Router,
        public auth: AuthorizationService,
        private notificationService: NotificationService
    ) { }

    onSubmit(form: any): void {
        if (this.auth.user) {
            this.match.participants = [];
            this.match.winner = null;

            if (this.matchId) {
                if (this.match.creator === this.auth.user.uid) {
                    this.matchService.updateMatch(this.matchId, this.match);
                    this.notificationService.sendSuccess('Match updated');
                    this.router.navigate(['/matches']);
                } else {
                    this.notificationService.sendError('You are not the owner of this match');
                }
            } else {
                this.match.creator = this.auth.user.uid;
                this.matchService.createMatch(this.match);
                this.notificationService.sendSuccess('Match created');
                this.router.navigate(['/matches']);
            }
        } else {
            this.notificationService.sendError('You need to be logged in to perform this action');
        }
    }

    ngOnInit() {
        this.matchId = this.route.snapshot.paramMap.get('id');
        if (this.matchId) {
            this.matchService.getMatch(this.matchId).snapshotChanges().subscribe(match => {
                if (match.key) {
                    this.match = { id: match.key, ...match.payload.val() }
                } else {
                    this.match = new Match();
                }
            });
        }
    }

}
