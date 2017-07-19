import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { BlockUIModule } from 'ng-block-ui';

import { MaterialImportModule } from './material-import.module';
import { AppRouting } from '../routing/app.routing';

import { AppComponent } from '../component/app.component';
import { LoginComponent } from '../component/login.component';
import { AdminService } from '../service/admin.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        FlexLayoutModule,
        BlockUIModule,
        MaterialImportModule,
        AppRouting
    ],
    providers: [
        AdminService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }