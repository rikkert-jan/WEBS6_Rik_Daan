import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons'

// models
import { Match } from "../app/models/match";

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/log-in/log-in.component';
import { NotificationComponent } from '../app/components/notifications/notification.component';

// services
import { AuthorizationService } from '../app/services/authorization.service';
import { NotificationService } from './services/notification.service';

// modules
import { MatchModule } from '../app/modules/match.module';
import { MatchAdminModule } from '../app/modules/matchadmin.module';
import { CompetitionModule } from '../app/modules/competition.module';
import { CompetitionAdminModule } from '../app/modules/competitionadmin.module';
import { SchemeModule } from '../app/modules/schemes.module';

// firebase
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

export const routes: Routes = [
];


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NotificationComponent
    ],
    imports: [
        MatchModule,
        MatchAdminModule,
        CompetitionModule,
        CompetitionAdminModule,
        SchemeModule,
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        ButtonsModule
    ],
    providers: [
        AuthorizationService,
        NotificationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
