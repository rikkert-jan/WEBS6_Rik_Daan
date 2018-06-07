import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// models
import { Competition } from "../models/competition";

// components
import { CompetitionListComponent } from '../components/competition-list/competition-list.component';
import { CompetitionListDetailComponent } from '../components/competition-list-detail/competition-list-detail.component';
import { CompetitionFormComponent } from '../components/competition-form/competition-form.component';
import { CompetitionDetailComponent } from '../components/competition-detail/competition-detail.component';
import { CompetitionUsersInputComponent } from '../components/competition-users-input/competition-users-input.component';
import { CompetitionUsersComponent } from '../components/competition-users/competition-users.component';

// services
import { CompetitionService } from '../services/competition.service';
import { UserService } from '../services/user.service';
import { MatchService } from '../services/match.service';
import { RoundService } from '../services/round.service';

export const routes: Routes = [
    { path: 'competitions', component: CompetitionListComponent },
    { path: 'competitions/add', component: CompetitionFormComponent },
    { path: 'competitions/:id', component: CompetitionDetailComponent },   
    { path: 'competitions/:id/edit', component: CompetitionFormComponent }
];


@NgModule({
    declarations: [
        CompetitionListComponent,
        CompetitionListDetailComponent,
        CompetitionFormComponent,
        CompetitionDetailComponent,
        CompetitionUsersInputComponent,
        CompetitionUsersComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        CompetitionService,
        UserService,
        MatchService,
        RoundService
    ],
    bootstrap: [CompetitionListComponent]
})
export class CompetitionModule { }
