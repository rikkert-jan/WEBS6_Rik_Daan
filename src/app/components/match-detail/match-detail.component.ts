import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, Input } from '@angular/core';
import { MatchService } from "../../services/match.service";
import { Match } from "../../models/match";
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
    selector: 'match-detail',
    templateUrl: './match-detail.component.html',
    styleUrls: ['./match-detail.component.scss'],
})
export class MatchDetailComponent {

    @Input() match: Match = new Match();
    public participants: User[] = [];
    public creator: User = new User();
    public winner: User = new User();

    private matchId: string;

    constructor(
        private matchService: MatchService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        public auth: AuthorizationService
    ) { }

    ngOnInit() {
        this.matchId = this.route.snapshot.paramMap.get('id');
        if (this.matchId) {
            this.matchService.getMatch(this.matchId).snapshotChanges().subscribe(match => {
                if (match.key) {
                    this.match = { id: match.key, ...match.payload.val() }

                    this.userService.getUser(this.match.creator).snapshotChanges().subscribe(user => {
                        let u: User = { id: user.key, ...user.payload.val() };
                        this.creator = u;
                    });

                    if (this.match.winner) {
                        this.userService.getUser(this.match.winner).snapshotChanges().subscribe(user => {
                            let u: User = { id: user.key, ...user.payload.val() };
                            this.winner = u;
                        });
                    }

                    this.participants = [];
                    this.match.participants.forEach(participant => {
                        this.userService.getUser(participant.id).snapshotChanges().subscribe(user => {
                            let u: User = { id: user.key, ...user.payload.val() };
                            this.participants.push(u);
                        });
                    });
                } else {
                    this.match = new Match();
                }
            });
        }
    }

    public setAsWinner(user: User) {
        this.winner = user;
        this.match.winner = user.id;
        this.match.status = 'GESPEELD';
        this.matchService.updateMatch(this.match.id, this.match);
    }
}
