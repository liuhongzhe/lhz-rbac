import { NgModule } from '@angular/core';

import { CommonImportModule } from './common-import.module';
import { AdminRouting } from '../routing/admin.routing';

import { AdminManagementComponent } from '../component/admin/admin-management.component';
import { AdminDetailDialogComponent } from '../component/admin/admin-detail-dialog.component';
import { AdminService } from '../service/admin.service';

@NgModule({
    imports: [
        CommonImportModule,
        AdminRouting
    ],
    declarations: [
        AdminManagementComponent,
        AdminDetailDialogComponent
    ],
    entryComponents: [
        AdminDetailDialogComponent
    ],
    providers: [
        AdminService
    ]
})
export class AdminModule { }