import { Component, Input, OnInit } from '@angular/core';
import { Round } from "../../models/round";

@Component({
    selector: 'poule-scheme',
    templateUrl: './poule-scheme.component.html',
    styleUrls: ['./poule-scheme.component.scss'],
})
export class PouleSchemeComponent implements OnInit {

    @Input() poules: any[];
    @Input() rounds: Round[];
    public roundsPerPoule: any[] = [];

    constructor() {

    }

    ngOnInit() {
        var prevPoule = 1;
        var rounds: Round[] = [];
        for (var i = 0; i < this.rounds.length; i++) {
            var round = this.rounds[i];
            var pouleNumber = round.pouleNumber;
            if (prevPoule != pouleNumber) {
                var pouleParticipants = [];
                for (var j = 0; j < this.poules.length; j++) {
                    if (j + 1 == prevPoule) {
                        pouleParticipants = this.poules[j].participants;
                    }
                }
                this.roundsPerPoule.push({ pouleNumber: prevPoule, participants: pouleParticipants, rounds: rounds });
                rounds = [];
            }
            rounds.push(round);

            if (i + 1 == this.rounds.length) {
                var pouleParticipants = [];
                for (var j = 0; j < this.poules.length; j++) {
                    if (j + 1 == pouleNumber) {
                        pouleParticipants = this.poules[j].participants;
                    }
                }
                this.roundsPerPoule.push({ pouleNumber: pouleNumber, participants: pouleParticipants, rounds: rounds });
                rounds = [];
            }
            prevPoule = pouleNumber;
        }
        console.log(this.roundsPerPoule);
    }
}

