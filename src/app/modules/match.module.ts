import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// models
import { Match } from "../models/match";

// components
import { MatchListComponent } from '../components/match-list/match-list.component';
import { MatchDetailComponent } from '../components/match-detail/match-detail.component';
import { MatchFormComponent } from '../components/match-form/match-form.component';

// services
import { MatchService } from '../services/match.service';

export const routes: Routes = [
    { path: '', redirectTo: 'start', pathMatch: 'full' },
    { path: 'start', component: MatchListComponent },
    { path: 'matches', component: MatchListComponent },
    { path: 'matches/:id/edit', component: MatchFormComponent }
];


@NgModule({
    declarations: [
        MatchListComponent,
        MatchDetailComponent,
        MatchFormComponent
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
