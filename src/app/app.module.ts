import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// models
import {Match} from "../app/models/match";

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/log-in/log-in.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { MatchDetailComponent } from './components/match-detail/match-detail.component';

// services
import { AuthorizationService } from '../app/services/authorization.service';
import { MatchService } from '../app/services/match.service';

// firebase
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MatchListComponent,
        MatchDetailComponent
    ],
    imports: [
        BrowserModule,
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
