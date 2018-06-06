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
                m => new Match(
                    m.key,
                    m.payload.val().status,
                    m.payload.val().creator,
                    m.payload.val().participants,
                    m.payload.val().startingTime,
                    m.payload.val().winner
                )
            ) as Match[];
        });
    }
}
