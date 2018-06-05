import { Component, OnInit } from '@angular/core';
import { CompetitionService } from "../../services/competition.service";
import { Competition } from "../../models/competition";

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
        this.competitionService.competitions.snapshotChanges().subscribe((competitions) => {
            this.competitions = competitions.map(
                competition => new Competition(
                    competition.key,
                    competition.payload.val().participants,
                    competition.payload.val().rounds,
                    competition.payload.val().type,
                    competition.payload.val().name,
                    competition.payload.val().date,
                    competition.payload.val().maxAmountOfParticipants,
                    competition.payload.val().minutesPerMatch,
                    competition.payload.val().creator,
                    competition.payload.val().winner
                )
            ) as Competition[];
    });
}
}
