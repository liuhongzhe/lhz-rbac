import { NgModule } from '@angular/core';

import { CommonImportModule } from './common-import.module';
import { OrganizationRouting } from '../routing/organization.routing';

import { OrganizationManagementComponent } from '../component/organization/organization-management.component';
import { OrganizationDetailDialogComponent } from '../component/organization/organization-detail-dialog.component';
import { OrganizationService } from '../service/organization.service';

@NgModule({
    imports: [
        CommonImportModule,
        OrganizationRouting
    ],
    declarations: [
        OrganizationManagementComponent,
        OrganizationDetailDialogComponent
    ],
    entryComponents: [
        OrganizationDetailDialogComponent
    ],
    providers: [
        OrganizationService
    ]
})
export class OrganizationModule { }