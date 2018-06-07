import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// models
import { Match } from "../models/match";

// components
import { MatchListComponent } from '../components/match-list/match-list.component';
import { MatchFormComponent } from '../components/match-form/match-form.component';
import { MatchDetailComponent } from '../components/match-detail/match-detail.component';

// services
import { MatchService } from '../services/match.service';

export const routes: Routes = [
    { path: 'matches', component: MatchListComponent },
    { path: 'matches/add', component: MatchFormComponent },
    { path: 'matches/:id', component: MatchDetailComponent },
    { path: 'matches/:id/edit', component: MatchFormComponent }
];

@NgModule({
    declarations: [
        MatchListComponent,
        MatchFormComponent,
        MatchDetailComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        MatchService
    ],
    bootstrap: [MatchListComponent]
})
export class MatchModule { }
