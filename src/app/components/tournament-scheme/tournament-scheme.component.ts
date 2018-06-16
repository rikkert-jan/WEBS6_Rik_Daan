import { Component, Input } from '@angular/core';
import { Round } from "../../models/round";

@Component({
    selector: 'tournament-scheme',
    templateUrl: './tournament-scheme.component.html',
    styleUrls: ['./tournament-scheme.component.scss'],
})
export class TournamentSchemeComponent {

    @Input()  rounds: Round[];

    constructor() {
    }
}

