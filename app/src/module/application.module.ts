import { NgModule } from '@angular/core';

import { CommonImportModule } from './common-import.module';
import { ApplicationRouting } from '../routing/application.routing';

import { ApplicationManagementComponent } from '../component/application/application-management.component';
import { ApplicationDetailDialogComponent } from '../component/application/application-detail-dialog.component';
import { ApplicationService } from '../service/application.service';

@NgModule({
    imports: [
        CommonImportModule,
        ApplicationRouting
    ],
    declarations: [
        ApplicationManagementComponent,
        ApplicationDetailDialogComponent
    ],
    entryComponents: [
        ApplicationDetailDialogComponent
    ],
    providers: [
        ApplicationService
    ]
})
export class ApplicationModule { }