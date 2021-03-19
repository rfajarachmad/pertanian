import { TestBed } from '@angular/core/testing';

import { EquipmentGuard } from './equipment.guard';

describe('_Template Module Guards', () => {
    let equipmentGuard: EquipmentGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [EquipmentGuard],
        });
        equipmentGuard = TestBed.inject(EquipmentGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            equipmentGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
