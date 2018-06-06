import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { Competition } from "../../models/competition";

@Component({
    selector: 'competition-users-input',
    templateUrl: './competition-users-input.component.html',
    styleUrls: ['./competition-users-input.component.scss'],
})
export class CompetitionUsersInputComponent implements OnInit {

    @Input() users: User[];
    @Input() competition: Competition;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.userService.users.snapshotChanges().subscribe(users => {
            this.users = users.map(user => ({id: user.key, ...user.payload.val()}));
        });
    }
}
