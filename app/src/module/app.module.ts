import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import 'hammerjs';

import { CommonImportModule } from './common-import.module';
import { AppRouting } from '../routing/app.routing';

import { Cache } from '../cache';
import { AppComponent } from '../component/app.component';
import { LoginComponent } from '../component/login.component';
import { AdminService } from '../service/admin.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        RouterModule,
        CommonImportModule,
        AppRouting
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    providers: [
        AdminService,
        Cache
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }