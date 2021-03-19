/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

/* Components */
import * as equipmentComponents from './components';

/* Containers */
import * as equipmentContainers from './containers';

/* Guards */
import * as equipmentGuards from './guards';

/* Services */
import * as equipmentServices from './services';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '@modules/master/services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        GooglePlaceModule,
    ],
    entryComponents: [...equipmentComponents.components],
    providers: [
        ...equipmentServices.services,
        ...equipmentGuards.guards,
        NgbActiveModal,
        MasterService,
    ],
    declarations: [...equipmentContainers.containers, ...equipmentComponents.components],
    exports: [...equipmentContainers.containers, ...equipmentComponents.components],
})
export class EquipmentModule {}
