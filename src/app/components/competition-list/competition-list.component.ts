import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { CompetitionService } from "../../services/competition.service";
import { Competition } from "../../models/competition";
import { OnInit } from "@angular/core";

@Component({
    selector: 'competition-list',
    templateUrl: './competition-list.component.html',
    styleUrls: ['./competition-list.component.scss'],
    providers: [CompetitionService]
})
export class CompetitionListComponent implements OnInit {

    public competitions: Competition[];

    constructor(private competitionService: CompetitionService) { }

    ngOnInit() {
        this.competitionService.competitionObservable.subscribe((competitions) => {
            this.competitions = competitions as Competition[];
        });
    }
}
