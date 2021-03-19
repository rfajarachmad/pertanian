/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { MasterModule } from './master.module';

/* Containers */
import * as masterContainers from './containers';

/* Guards */
import * as masterGuards from './guards';
import { AuthGuard } from '@modules/auth/guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: 'alsintan',
        canActivate: [AuthGuard],
        component: masterContainers.AlsintanComponent,
    },
    {
        path: 'location',
        canActivate: [AuthGuard],
        component: masterContainers.LocationComponent,
    },
    {
        path: 'funding',
        canActivate: [AuthGuard],
        component: masterContainers.FundingComponent,
    },
];

@NgModule({
    imports: [MasterModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class MasterRoutingModule {}
