import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService, UserService } from '@modules/auth/services';
import { SideNavItems, SideNavSection } from '@modules/navigation/models';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-side-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav.component.html',
    styleUrls: ['side-nav.component.scss'],
    providers: [AuthService],
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Input() sidenavStyle!: string;
    @Input() sideNavItems!: SideNavItems;
    @Input() sideNavSections!: SideNavSection[];

    login: any = {};
    role = null;

    subscription: Subscription = new Subscription();
    routeDataSubscription!: Subscription;

    constructor(
        public navigationService: NavigationService,
        public userService: UserService,
        public authService: AuthService
    ) {}

    ngOnInit() {
        this.login = this.authService.getLoginUser();
        this.role = this.login.role;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
