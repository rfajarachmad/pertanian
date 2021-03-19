/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as reportComponents from './components';

/* Containers */
import * as reportContainers from './containers';

/* Guards */
import * as reportGuards from './guards';

/* Services */
import * as reportServices from './services';
import { EquipmentService } from '@modules/equipment/services';
import { MasterService } from '@modules/master/services';
import { ModalFormComponent } from '@modules/equipment/components';
import { EquipmentModule } from '@modules/equipment/equipment.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        GoogleMapsModule,
        EquipmentModule,
    ],
    entryComponents: [ModalFormComponent],
    providers: [
        ...reportServices.services,
        ...reportGuards.guards,
        EquipmentService,
        MasterService,
    ],
    declarations: [...reportContainers.containers, ...reportComponents.components],
    exports: [...reportContainers.containers, ...reportComponents.components],
})
export class ReportModule {}
