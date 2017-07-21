import { NgModule } from '@angular/core';

import { CommonImportModule } from './common-import.module';
import { UserRouting } from '../routing/user.routing';

import { UserManagementComponent } from '../component/user/user-management.component';
import { UserDetailDialogComponent } from '../component/user/user-detail-dialog.component';
import { UserService } from '../service/user.service';

@NgModule({
    imports: [
        CommonImportModule,
        UserRouting
    ],
    declarations: [
        UserManagementComponent,
        UserDetailDialogComponent
    ],
    entryComponents: [
        UserDetailDialogComponent
    ],
    providers: [
        UserService
    ]
})
export class UserModule { }