import { Component, OnInit, Input, KeyValueDiffers } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CompetitionService } from "../../services/competition.service";
import { MatchService } from "../../services/match.service";
import { UserService } from "../../services/user.service";
import { Competition } from "../../models/competition";
import { Match } from "../../models/match";
import { DataSet } from 'vis';

@Component({
    selector: 'match-scheme',
    templateUrl: './match-scheme.component.html',
    styleUrls: ['./match-scheme.component.scss'],
    providers: [MatchService]
})
export class MatchSchemeComponent implements OnInit {
    graphData = {};

    @Input() matchNodes: any[] = [];
    @Input() matchEdges: any[] = [];
    public competition: Competition = new Competition();
    public competitionId: string;
    public matches: Match[] = [];
    private differ: any;

    private loadedMatches = false;
    private nodesGenerated = false;
    private calls = 0;

    constructor(
        private matchService: MatchService,
        private competitionService: CompetitionService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private differs: KeyValueDiffers
    ) {
        this.differ = differs.find({}).create();
    }

    ngOnInit() {
        this.competitionId = this.route.snapshot.paramMap.get('id');
        if (this.competitionId) {
            this.competitionService.getCompetition(this.competitionId).subscribe(competition => {
                if (competition.key) {
                    this.competition = { id: competition.key, ...competition.payload.val() }
                } else {
                    this.competition = new Competition();
                }
            });
        }
    }

    ngDoCheck() {
        var changesCompetition = this.differ.diff(this.competition);
        if (this.competition.rounds) {
            if (changesCompetition) {
                for(var i = 0; i < this.competition.rounds.length; i++){
                    for(var j = 0; j < this.competition.rounds[i].matches.length; j++){
                        this.matches.push(this.competition.rounds[i].matches[j]);
                    }
                }
            }
        }
    }
}

