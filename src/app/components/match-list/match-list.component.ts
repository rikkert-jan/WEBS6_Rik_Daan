import { Component, OnInit } from '@angular/core';
import { MatchService } from "../../services/match.service";
import { Match } from "../../models/match";

@Component({
    selector: 'match-list',
    templateUrl: './match-list.component.html',
    styleUrls: ['./match-list.component.scss'],
    providers: [MatchService]
})
export class MatchListComponent implements OnInit {

    public matches: Match[];

    constructor(private matchService: MatchService) { }

    ngOnInit() {
        this.matchService.matches.snapshotChanges().subscribe((matches) => {
            this.matches = matches.map(
                m => ({ id: m.key, ...m.payload.val() })
            );
        });
    }
}
