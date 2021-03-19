/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { ReportModule } from './report.module';

/* Containers */
import * as reportContainers from './containers';

/* Guards */
import * as reportGuards from './guards';
import { AuthGuard } from '@modules/auth/guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: reportContainers.AllComponent,
    },
    {
        path: 'submission-status',
        canActivate: [AuthGuard],
        component: reportContainers.SubmissionStatusComponent,
    },
    {
        path: 'condition',
        canActivate: [AuthGuard],
        component: reportContainers.ConditionComponent,
    },
    {
        path: 'funding',
        canActivate: [AuthGuard],
        component: reportContainers.FundingComponent,
    },
    {
        path: 'coverage',
        canActivate: [AuthGuard],
        component: reportContainers.CoverageComponent,
    },
    {
        path: 'distribution',
        canActivate: [AuthGuard],
        component: reportContainers.DistributionComponent,
    },
];

@NgModule({
    imports: [ReportModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class ReportRoutingModule {}
