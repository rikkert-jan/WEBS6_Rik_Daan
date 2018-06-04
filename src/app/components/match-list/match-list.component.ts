import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { MatchService } from "../../services/match.service";
import { Match } from "../../models/match";
import { OnInit } from "@angular/core";

@Component({
    selector: 'match-list',
    templateUrl: './match-list.component.html',
    styleUrls: ['./match-list.component.scss'],
    providers: [MatchService]
})
export class MatchListComponent implements OnInit {

    public matchObservable: Observable<Match[]>;
    public matches: Match[];

    constructor(private matchService: MatchService) { }

    ngOnInit() {
        this.matchService.matchObservable.subscribe((someList) => {
            this.matches = someList;
        });
    }
}
