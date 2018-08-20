import { Observable } from "rxjs";
import { TestBed, inject } from "@angular/core/testing";
import { MatchService } from "./match.service";
import { AngularFireDatabase } from "angularfire2/database";
import { Match } from "../models/match";

let fixtureMatches = [
    { id: 1, status: 'open', creator: 1, participants: [], startingTime: Date.now() },
    { id: 2, status: 'open', creator: 1, participants: [], startingTime: Date.now() },
    { id: 3, status: 'closed', creator: 1, participants: [], startingTime: Date.now() },
];

let angularFireDatabaseStub = { list: () => { } };
let mockMatches$ = Observable.of(fixtureMatches);

describe('MatchService', () => {

    beforeEach(() => {
        spyOn(angularFireDatabaseStub, 'list').and.returnValue(mockMatches$);

        TestBed.configureTestingModule({
            providers: [
                MatchService, { provide: AngularFireDatabase, useValue: angularFireDatabaseStub }
            ]
        });
    });

    // it('getAllMatches', inject([MatchService], (service: MatchService) => {
    //     let matches$ = service.getMatches();
    //     matches$.subscribe(matches => {
    //         expect(matches.length).toEqual(fixtureMatches.length);
    //     });
    // }))

    // oud

    // let matchService: MatchService;
    // let database: AngularFireDatabase;

    // beforeEach(() => {
    //     database = new AngularFireDatabase(new FirebaseApp);
    //     matchService = new MatchService(database, new UserService(database));
    // });

    // app.database error
    // it('getMatches should return list of matches', () => {
    //     (done: DoneFn) => {
    //         matchService.getMatches().subscribe(value => {
    //             expect(value.length).toBeTruthy();
    //             done();
    //         });
    //     }
    // });
});
