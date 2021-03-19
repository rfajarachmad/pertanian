import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
    let usersService: UsersService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UsersService],
        });
        usersService = TestBed.inject(UsersService);
    });

    describe('getUsers$', () => {
        it('should return Observable<Users>', () => {
            usersService.getUsers$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
