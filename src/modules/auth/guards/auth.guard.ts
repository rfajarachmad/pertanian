import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {}

    canActivate(): Observable<boolean> {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['auth/login']);
            return of(false);
        }
        return of(true);
    }
}
