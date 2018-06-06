import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { Competition } from "../../models/competition";

@Component({
    selector: 'competition-users',
    templateUrl: './competition-users.component.html',
    styleUrls: ['./competition-users.component.scss'],
})
export class CompetitionUsersComponent implements OnInit {

    @Input() competition: Competition;
    @Input() users: User[];

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        // CODE OM DE USERS BIJ DEZE COMPETITIE OP TE HALEN
    }
}
