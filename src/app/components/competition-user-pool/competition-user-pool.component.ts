import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
    selector: 'pooluser',
    templateUrl: './competition-user-pool.component.html',
    styleUrls: ['./competition-user-pool.component.scss', "../../../../node_modules/dragula/dist/dragula.css"],
})
export class PoolUserComponent implements OnInit {

    @Input() public poule: any;

    constructor(
        private userService: UserService,
    ) { }

    ngOnInit() {
        console.log(this.poule);
        this.userService.users.snapshotChanges().subscribe(users => {
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                for (var j = 0; j < this.poule.participants.length; j++) {
                    if (user.key == this.poule.participants[j].id) {
                        this.poule.participants[j] = { id: user.key, ...user.payload.val() }
                    }
                }
            }
        });
    }
}
