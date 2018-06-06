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

// services
import { CompetitionService } from '../services/competition.service';

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
        CompetitionDetailComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        CompetitionService
    ],
    bootstrap: [CompetitionListComponent]
})
export class CompetitionModule { }
