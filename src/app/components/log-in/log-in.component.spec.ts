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

class mockAuthService {
    authenticated = false;

    isAuthenticated() {
        return this.authenticated;
    }
}

describe('log-in', () => {
    let service: mockAuthService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                LoginComponent,
                NotificationComponent,
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
        service = new mockAuthService();
    });

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should be authenticated', async(() => {
        const fixture = TestBed.createComponent(LoginComponent);

        service.authenticated = true;

        fixture.componentInstance.login = jasmine.createSpy().and.callFake(function () {
            fixture.componentInstance.isAuthenticated = service.isAuthenticated();
        });
        
        fixture.componentInstance.login();

        expect(fixture.componentInstance.isAuthenticated).toBeTruthy();
    }));

    it('user should no longer be authenticated', () => {
        const fixture = TestBed.createComponent(LoginComponent);

        fixture.componentInstance.login = jasmine.createSpy().and.callFake(function () {
            service.authenticated = true;
            fixture.componentInstance.isAuthenticated = service.authenticated;
        });
        
        fixture.componentInstance.logout = jasmine.createSpy().and.callFake(function () {
            service.authenticated = false;
            fixture.componentInstance.isAuthenticated = service.authenticated;
        });

        fixture.componentInstance.login();
        fixture.componentInstance.logout();

        expect(fixture.componentInstance.isAuthenticated).toBeFalsy();
    });
});
