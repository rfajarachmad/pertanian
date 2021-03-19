import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserService } from '@modules/auth/services';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
    providers: [AuthService],
})
export class TopNavUserComponent implements OnInit {
    user: any = {};

    constructor(
        public userService: UserService,
        public authService: AuthService,
        public router: Router
    ) {}
    ngOnInit() {
        this.user = this.authService.getLoginUser();
    }

    public logout(): void {
        this.authService.logout();
        this.router.navigate(['auth/login']);
    }
}
