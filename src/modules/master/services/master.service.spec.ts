import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';

describe('MasterService', () => {
    let masterService: MasterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MasterService],
        });
        masterService = TestBed.inject(MasterService);
    });

    describe('getMaster$', () => {
        it('should return Observable<Master>', () => {
            masterService.getMaster$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
