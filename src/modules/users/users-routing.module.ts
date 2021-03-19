/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { UsersModule } from './users.module';

/* Containers */
import * as usersContainers from './containers';

/* Guards */
import * as usersGuards from './guards';
import { AuthGuard } from '@modules/auth/guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: usersContainers.ListComponent,
    },
];

@NgModule({
    imports: [UsersModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class UsersRoutingModule {}
