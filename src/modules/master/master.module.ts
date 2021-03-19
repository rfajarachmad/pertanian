/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as masterComponents from './components';

/* Containers */
import * as masterContainers from './containers';

/* Guards */
import * as masterGuards from './guards';

/* Services */
import * as masterServices from './services';
import { AuthGuard } from '@modules/auth/guards';
import { AlsintanModalComponent } from './components/alsintan-modal/alsintan-modal.component';
import { FundingModalComponent } from './components/funding-modal/funding-modal.component';
import { LocationModalComponent } from './components/location-modal/location-modal.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
    entryComponents: [AlsintanModalComponent, FundingModalComponent, LocationModalComponent],
    providers: [...masterServices.services, ...masterGuards.guards, AuthGuard],
    declarations: [...masterContainers.containers, ...masterComponents.components],
    exports: [...masterContainers.containers, ...masterComponents.components],
})
export class MasterModule {}
