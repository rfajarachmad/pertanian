/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { EquipmentModule } from './equipment.module';

/* Containers */
import * as equipmentContainers from './containers';

/* Guards */
import * as equipmentGuards from './guards';
import { AuthGuard } from '@modules/auth/guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: equipmentContainers.ListComponent,
    },
    {
        path: 'verification',
        canActivate: [AuthGuard],
        component: equipmentContainers.VerificationComponent,
    },
];

@NgModule({
    imports: [EquipmentModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class EquipmentRoutingModule {}
