/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as usersComponents from './components';

/* Containers */
import * as usersContainers from './containers';

/* Guards */
import * as usersGuards from './guards';

/* Services */
import * as usersServices from './services';
import { AuthGuard } from '@modules/auth/guards';
import { UserModalComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
    entryComponents: [UserModalComponent],
    providers: [...usersServices.services, ...usersGuards.guards, AuthGuard],
    declarations: [...usersContainers.containers, ...usersComponents.components],
    exports: [...usersContainers.containers, ...usersComponents.components],
})
export class UsersModule {}
