import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// models
import { Match } from "../app/models/match";

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/log-in/log-in.component';

// services
import { AuthorizationService } from '../app/services/authorization.service';

// modules
import { MatchModule } from '../app/modules/match.module';
import { CompetitionModule } from '../app/modules/competition.module';

// firebase
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

export const routes: Routes = [
    { path: '', component: AppComponent },
];


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        MatchModule,
        CompetitionModule,
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule
    ],
    providers: [
        AuthorizationService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
