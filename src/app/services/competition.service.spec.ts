import { compareArrays } from 'ngx-bootstrap/chronos/utils/compare-arrays';
import { TestBed, async } from '@angular/core/testing';

import { CompetitionService } from "../services/competition.service";

describe('CompetitionService', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CompetitionService
            ],
        }).compileComponents();
    }));
    var service = TestBed.get(CompetitionService) as CompetitionService;    
    it('should return a competition', async(() => {
        expect(service.getCompetitions()).toBeDefined();
    }));
});