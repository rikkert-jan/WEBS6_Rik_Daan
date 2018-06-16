import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';

// models
import { Competition } from "../models/competition";

// components
import { CompetitionListComponent } from '../components/competition-list/competition-list.component';
import { CompetitionFormComponent } from '../components/competition-form/competition-form.component';
import { CompetitionDetailComponent } from '../components/competition-detail/competition-detail.component';
import { CompetitionUsersInputComponent } from '../components/competition-users-input/competition-users-input.component';
import { PoolUserComponent } from '../components/competition-user-pool/competition-user-pool.component';
import { MatchSchemeComponent } from '../components/match-scheme/match-scheme.component';
import { MatchSimpleComponent } from '../components/match-simple/match-simple.component';
import { KnockoutSchemeComponent } from '../components/knockout-scheme/knockout-scheme.component';
import { CompetitionMatchParticipantsComponent } from '../components/competition-match-participants/competition-match-participants';
import {TournamentSchemeComponent} from "../components/tournament-scheme/tournament-scheme.component";
import {PouleSchemeComponent} from "../components/poule-scheme/poule-scheme.component";

//Directives
import { GraphVisDirective } from '../components/knockout-scheme/graphvis.directive';

// services
import { CompetitionService } from '../services/competition.service';
import { UserService } from '../services/user.service';
import { MatchService } from '../services/match.service';

export const routes: Routes = [
    { path: 'competitions', component: CompetitionListComponent },
    { path: 'competitions/add', component: CompetitionFormComponent },
    { path: 'competitions/:id', component: CompetitionDetailComponent },
    { path: 'competitions/:id/edit', component: CompetitionFormComponent },
    { path: 'competitions/:id/scheme', component: MatchSchemeComponent },
];

@NgModule({
    declarations: [
        CompetitionListComponent,
        CompetitionFormComponent,
        CompetitionDetailComponent,
        CompetitionUsersInputComponent,
        CompetitionMatchParticipantsComponent,
        MatchSchemeComponent,
        MatchSimpleComponent,
        GraphVisDirective,
        PoolUserComponent,
        KnockoutSchemeComponent,
        TournamentSchemeComponent,
        PouleSchemeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
        DragulaModule
    ],
    providers: [
        CompetitionService,
        UserService,
        MatchService,
    ],
    bootstrap: [CompetitionListComponent]
})
export class CompetitionModule { }
