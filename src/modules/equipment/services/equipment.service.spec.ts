import { TestBed } from '@angular/core/testing';

import { EquipmentService } from './equipment.service';

describe('EquipmentService', () => {
    let equipmentService: EquipmentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EquipmentService],
        });
        equipmentService = TestBed.inject(EquipmentService);
    });

    describe('getEquipment$', () => {
        it('should return Observable<Equipment>', () => {
            equipmentService.getEquipment$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
