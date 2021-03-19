import { TestBed } from '@angular/core/testing';

import { MasterGuard } from './master.guard';

describe('_Template Module Guards', () => {
    let masterGuard: MasterGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [MasterGuard],
        });
        masterGuard = TestBed.inject(MasterGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            masterGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
