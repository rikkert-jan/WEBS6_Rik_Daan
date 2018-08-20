import { ComponentFixture, TestBed, fakeAsync, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons'

// models
import { Match } from "../../models/match";

// components
import { AppComponent } from '../../app.component';
import { NotificationComponent } from '../../../app/components/notifications/notification.component';
import { CompetitionMatchParticipantsComponent } from './competition-match-participants';
import { LoginComponent } from '../log-in/log-in.component';

// services
import { AuthorizationService } from '../../../app/services/authorization.service';
import { NotificationService } from '../../services/notification.service';
import { CompetitionService } from '../../services/competition.service';
import { MatchService } from '../../services/match.service';
import { UserService } from '../../services/user.service';

// firebase
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database'
import { AngularFireModule, FirebaseApp, FirebaseAppProvider } from 'angularfire2';
import { environment } from '../../../environments/environment';
import { Competition } from '../../models/competition';

import { By } from '@angular/platform-browser';

export const routes: Routes = [
];

let mockMatch: Match = {
    id: '987gij24',
    status: 'started',
    creator: '1',
    participants: [
        {
            id: '1',
            email: '1@1.nl',
            name: '1',
        }, {
            id: '2',
            email: '2@2.nl',
            name: '2',
        }
    ],
    startingTime: new Date(),
    startingTimeInMs: Date.now(),
    winner: undefined,
    prevMatch1: undefined,
    prevMatch2: undefined
}

class mockMatchService {
    getMatch() {
        return mockMatch;
    }
}

describe('log-in', () => {
    let service: mockMatchService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                LoginComponent,
                NotificationComponent,
                CompetitionMatchParticipantsComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                RouterModule.forRoot(routes),
                AngularFireModule.initializeApp(environment.firebase),
                AngularFireAuthModule,
                AngularFireDatabaseModule,
                ButtonsModule
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/my/app' },
                AuthorizationService,
                NotificationService,
                CompetitionService,
                MatchService,
                UserService,
                FirebaseAppProvider
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        service = new mockMatchService();
    });

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(CompetitionMatchParticipantsComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should have 2 participating users', async(() => {
        const fixture = TestBed.createComponent(CompetitionMatchParticipantsComponent);

        fixture.componentInstance.match = service.getMatch();
        fixture.componentInstance.participants = service.getMatch().participants;

        expect(fixture.componentInstance.participants.length).toEqual(2);
    }));
});
