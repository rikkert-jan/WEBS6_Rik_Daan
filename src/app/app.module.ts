import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

// models
import { Match } from "../app/models/match";

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/log-in/log-in.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { MatchDetailComponent } from './components/match-detail/match-detail.component';
import { MatchFormComponent } from './components/match-form/match-form.component';

// services
import { AuthorizationService } from '../app/services/authorization.service';
import { MatchService } from '../app/services/match.service';

// firebase
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

export const routes: Routes = [
    { path: '', redirectTo: 'start', pathMatch: 'full' },
    { path: 'start', component: AppComponent },
];


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MatchListComponent,
        MatchDetailComponent,
        MatchFormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule
    ],
    providers: [
        AuthorizationService,
        MatchService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
