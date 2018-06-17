import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';

// models
import { Competition } from "../models/competition";

// components
import { MatchSchemeComponent } from '../components/match-scheme/match-scheme.component';
import { MatchSimpleComponent } from '../components/match-simple/match-simple.component';
import { KnockoutSchemeComponent } from '../components/knockout-scheme/knockout-scheme.component';
import {TournamentSchemeComponent} from "../components/tournament-scheme/tournament-scheme.component";
import {PouleSchemeComponent} from "../components/poule-scheme/poule-scheme.component";

//Directives
import { GraphVisDirective } from '../components/knockout-scheme/graphvis.directive';

// services
import { CompetitionService } from '../services/competition.service';
import { UserService } from '../services/user.service';
import { MatchService } from '../services/match.service';

export const routes: Routes = [
    { path: 'competitions/:id/scheme', component: MatchSchemeComponent },
];

@NgModule({
    declarations: [
        MatchSchemeComponent,
        MatchSimpleComponent,
        GraphVisDirective,
        KnockoutSchemeComponent,
        TournamentSchemeComponent,
        PouleSchemeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
    ],
    providers: [
        CompetitionService,
        UserService,
        MatchService,
    ],
    bootstrap: [MatchSchemeComponent]
})
export class SchemeModule { }
