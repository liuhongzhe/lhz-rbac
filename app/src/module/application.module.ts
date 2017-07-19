import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialImportModule } from './material-import.module';
import { CommonImportModule } from './common-import.module';
import { ApplicationRouting } from '../routing/application.routing';

import { ApplicationManagementComponent } from '../component/application/application-management.component';
import { ApplicationDetailDialogComponent } from '../component/application/application-detail-dialog.component';
import { ApplicationService } from '../service/application.service';

@NgModule({
    declarations: [
        ApplicationManagementComponent,
        ApplicationDetailDialogComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialImportModule,
        CommonImportModule,
        ApplicationRouting
    ],
    entryComponents: [
        ApplicationDetailDialogComponent
    ],
    providers: [
        ApplicationService
    ]
})
export class ApplicationModule { }