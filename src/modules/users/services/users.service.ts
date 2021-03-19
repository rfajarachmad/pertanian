import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';

import { UserModalComponent } from '../components';
import { User } from '../models';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UsersService {
    constructor(private http: HttpClient) {
        this._init();
    }

    getUsers$(): Observable<{}> {
        return of({});
    }

    _init(): void {
        const data = [
            {
                id: 1,
                name: 'Administrator',
                email: 'admin@gmail.com',
                password: 'test1234',
                confirm_password: 'test1234',
                role: 'ADMIN',
                status: 'Active',
            },
            {
                id: 2,
                name: 'Agus Guntara',
                email: 'agus@gmail.com',
                password: 'test1234',
                confirm_password: 'test1234',
                role: 'ADMIN',
                status: 'Active',
            },
            {
                id: 3,
                name: 'Wahyu Utomo',
                email: 'wahyu@gmail.com',
                password: 'test1234',
                confirm_password: 'test1234',
                role: 'PENYULUH',
                status: 'Active',
            },
            {
                id: 4,
                name: 'Galuh Riswara',
                email: 'galuh@gmail.com',
                password: 'test1234',
                confirm_password: 'test1234',
                role: 'PENYULUH',
                status: 'Active',
            },
            {
                id: 5,
                name: 'Septi Raharja',
                email: 'septi@gmail.com',
                password: 'test1234',
                confirm_password: 'test1234',
                role: 'PENGAWAS',
                status: 'Active',
            },
            {
                id: 6,
                name: 'Indra Lesmana',
                email: 'indra@gmail.com',
                password: 'test1234',
                confirm_password: 'test1234',
                role: 'PENGAWAS',
                status: 'Active',
            },
        ];

        const arrayStr = window.sessionStorage.getItem('users');
        if (!arrayStr) {
            window.sessionStorage.setItem('users', JSON.stringify(data));
        }
    }

    save(user: User): Observable<User> {
        if (!user.id) {
            user.status = 'Active';
            return this.http.post<User>(environment.api + '/users', user);
        } else {
            return this.http.put<User>(environment.api + '/users/' + user.id, user);
        }
    }

    list(): Observable<User[]> {
        return this.http.get<User[]>(environment.api + '/users');
    }

    get(email: string): Observable<User> {
        const arrayStr = window.sessionStorage.getItem('users');
        let users: User[] = [];
        let result = {} as User;
        if (arrayStr) {
            users = JSON.parse(arrayStr);
            users.forEach(item => {
                if (item.email === email) {
                    result = item;
                }
            });
        }
        return of(result);
    }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(environment.api + '/login', {
            email,
            password,
        });
    }
}
