import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';

// models
import { Competition } from "../models/competition";

// components
import { CompetitionFormComponent } from '../components/competition-form/competition-form.component';
import { CompetitionUsersInputComponent } from '../components/competition-users-input/competition-users-input.component';
import { PoolUserComponent } from '../components/competition-user-pool/competition-user-pool.component';

// services
import { CompetitionService } from '../services/competition.service';
import { UserService } from '../services/user.service';
import { MatchService } from '../services/match.service';

export const routes: Routes = [
    { path: 'competitions/add', component: CompetitionFormComponent },
    { path: 'competitions/:id/edit', component: CompetitionFormComponent },
];

@NgModule({
    declarations: [
        CompetitionFormComponent,
        CompetitionUsersInputComponent,
        PoolUserComponent,
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
    bootstrap: [CompetitionFormComponent]
})
export class CompetitionAdminModule { }
