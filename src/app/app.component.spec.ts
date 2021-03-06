import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

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
import { FirebaseApp } from 'angularfire2/firebase.app.module';

export const routes: Routes = [
];

describe('AppComponent', () => {
    let fixture;
    let component;

    beforeEach(() => {
        TestBed.configureTestingModule({
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
                { provide: APP_BASE_HREF, useValue: '/my/app' },
                AuthorizationService,
                NotificationService
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    it('should create a component', fakeAsync(() => {
        expect(component).toBeTruthy();
    }));

});