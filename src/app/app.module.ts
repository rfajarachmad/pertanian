import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalFormComponent } from '@modules/equipment/components';
import { UsersService } from '@modules/users/services';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, SweetAlert2Module.forRoot()],
    providers: [UsersService],
    bootstrap: [AppComponent],
})
export class AppModule {}
