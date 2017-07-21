import { NgModule } from '@angular/core';

import { CommonImportModule } from './common-import.module';
import { RoleRouting } from '../routing/role.routing';

import { RoleManagementComponent } from '../component/role/role-management.component';
import { RoleDetailDialogComponent } from '../component/role/role-detail-dialog.component';
import { RoleService } from '../service/role.service';

@NgModule({
    imports: [
        CommonImportModule,
        RoleRouting
    ],
    declarations: [
        RoleManagementComponent,
        RoleDetailDialogComponent
    ],
    entryComponents: [
        RoleDetailDialogComponent
    ],
    providers: [
        RoleService
    ]
})
export class RoleModule { }