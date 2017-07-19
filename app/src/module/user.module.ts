import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialImportModule } from './material-import.module';
import { UserRouting } from '../routing/user.routing';

import { UserManagementComponent } from '../component/user/user-management.component';
import { UserDetailDialogComponent } from '../component/user/user-detail-dialog.component';
import { UserService } from '../service/user.service';

@NgModule({
    declarations: [
        UserManagementComponent
        // UserDetailDialogComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialImportModule,
        UserRouting
    ],
    entryComponents: [
        // UserDetailDialogComponent
    ],
    providers: [
        UserService
    ]
})
export class UserModule { }