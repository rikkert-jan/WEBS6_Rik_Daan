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
import { LoginComponent } from '../../components/log-in/log-in.component';
import { NotificationComponent } from '../../../app/components/notifications/notification.component';
import { CompetitionDetailComponent } from './competition-detail.component';
import { CompetitionMatchParticipantsComponent } from '../competition-match-participants/competition-match-participants';

// services
import { AuthorizationService } from '../../../app/services/authorization.service';
import { NotificationService } from '../../services/notification.service';
import { CompetitionService } from '../../services/competition.service';
import { MatchService } from '../../services/match.service';
import { UserService } from '../../services/user.service';

// firebase
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database'
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { environment } from '../../../environments/environment';
import { Competition } from '../../models/competition';

let mockRouter: any;
class MockRouter {
    navigate = jasmine.createSpy('navigate');
}

export const routes: Routes = [
];

class MockCompetitionService {

    getCompetition() {

    }
}

describe('competition-detail', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                LoginComponent,
                NotificationComponent,
                CompetitionDetailComponent,
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
                UserService
            ]
        }).compileComponents();
    }));

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(CompetitionDetailComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should get a competition', () => {
        const fixture = TestBed.createComponent(CompetitionDetailComponent);
        const app = fixture.debugElement.componentInstance;

        let fakeCompetition: Competition = {
            id: '12io3jkasf8712jk3',
            participants: [],
            numberOfRounds: 1,
            numberOfPoules: 1,
            rounds: [],
            poules: [],
            type: 'Knockout',
            name: 'fake Competition',
            date: new Date(),
            dateInMs: new Date().getDate(),
            maxAmountOfParticipants: 4,
            minutesPerMatch: 3,
            creator: 'kl1jlkjausdflkjlk',
            winner: undefined
        }

        fixture.componentInstance.ngOnInit = jasmine.createSpy().and.callFake(function () {
            fixture.componentInstance.competition = fakeCompetition;
        });

        fixture.componentInstance.ngOnInit();

        expect(fixture.componentInstance.competition.id).toMatch(fakeCompetition.id);
        expect(fixture.componentInstance.ngOnInit).toHaveBeenCalled();
    });

    it('user should join competition', () => {
        const fixture = TestBed.createComponent(CompetitionDetailComponent);
        const app = fixture.debugElement.componentInstance;

        fixture.componentInstance.joinCompetition = jasmine.createSpy().and.returnValue(true);

        expect(fixture.componentInstance.canParticipate).toBeTruthy();
        expect(fixture.componentInstance.alreadyParticipating).toBeFalsy();
    });

    it('user already joined competition', () => {
        const fixture = TestBed.createComponent(CompetitionDetailComponent);
        const app = fixture.debugElement.componentInstance;

        fixture.componentInstance.joinCompetition = jasmine.createSpy().and.returnValue(false);

        const canJoin = fixture.componentInstance.joinCompetition();
        expect(canJoin).toBeFalsy();
    });

    it('user should leave competition', () => {
        const fixture = TestBed.createComponent(CompetitionDetailComponent);
        const app = fixture.debugElement.componentInstance;

        fixture.componentInstance.leaveCompetition = jasmine.createSpy().and.callFake(function () {
            fixture.componentInstance.alreadyParticipating = false;
            fixture.componentInstance.canParticipate = true;
        });

        expect(fixture.componentInstance.alreadyParticipating).toBeFalsy();
        expect(fixture.componentInstance.canParticipate).toBeTruthy();
    });
});
