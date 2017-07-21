import { NgModule } from '@angular/core';

import { CommonImportModule } from './common-import.module';
import { DashboardRouting } from '../routing/dashboard.routing';

import { DashboardComponent } from '../component/dashboard.component';

@NgModule({
    imports: [
        CommonImportModule,
        DashboardRouting
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule { }