import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// models
import { Competition } from "../models/competition";

// components
import { CompetitionListComponent } from '../components/competition-list/competition-list.component';
import { CompetitionDetailComponent } from '../components/competition-detail/competition-detail.component';
import { CompetitionMatchParticipantsComponent } from '../components/competition-match-participants/competition-match-participants';

// services
import { CompetitionService } from '../services/competition.service';
import { UserService } from '../services/user.service';
import { MatchService } from '../services/match.service';

export const routes: Routes = [
    { path: 'competitions', component: CompetitionListComponent },
    { path: 'competitions/:id/detail', component: CompetitionDetailComponent },
];

@NgModule({
    declarations: [
        CompetitionListComponent,
        CompetitionDetailComponent,
        CompetitionMatchParticipantsComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
    ],
    providers: [
        CompetitionService,
        UserService,
        MatchService,
    ],
    bootstrap: [CompetitionListComponent]
})
export class CompetitionModule { }
