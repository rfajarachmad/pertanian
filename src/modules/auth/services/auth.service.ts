import { Injectable } from '@angular/core';
import { UsersService } from '@modules/users/services';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    constructor(public userService: UsersService) {}

    getAuth$(): Observable<{}> {
        return of({});
    }

    public isAuthenticated(): boolean {
        const loginStr = window.sessionStorage.getItem('login');
        return loginStr != null;
    }

    public login(credential: any): Observable<boolean> {
        return this.userService.login(credential.email, credential.password).pipe(
            map((user: any) => {
                if (user) {
                    window.sessionStorage.setItem('login', JSON.stringify(user));
                    return true;
                } else {
                    return false;
                }
            })
        );
    }

    public logout(): void {
        window.sessionStorage.removeItem('login');
    }

    public getLoginUser(): any {
        const loginStr = window.sessionStorage.getItem('login');
        if (loginStr) {
            return JSON.parse(loginStr);
        }

        return {};
    }
}
