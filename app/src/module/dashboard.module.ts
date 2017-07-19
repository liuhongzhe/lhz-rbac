import { NgModule } from '@angular/core';

import { MaterialImportModule } from './material-import.module';
import { DashboardRouting } from '../routing/dashboard.routing';

import { DashboardComponent } from '../component/dashboard.component';
import { MenuService } from '../service/menu.service';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        MaterialImportModule,
        DashboardRouting
    ],
    providers: [
        MenuService
    ]
})
export class DashboardModule { }