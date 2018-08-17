import { async, TestBed } from "@angular/core/testing";
import { CompetitionDetailComponent } from "./competition-detail.component";
import { CompetitionMatchParticipantsComponent } from "../competition-match-participants/competition-match-participants";

let mockRouter: any;
class MockRouter {
    navigate = jasmine.createSpy('navigate');
}

describe('competition-detail', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CompetitionDetailComponent,
                CompetitionMatchParticipantsComponent]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(CompetitionDetailComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
