import { Component } from '@angular/core';
import { ComponentType, MdSnackBar, MdSnackBarConfig, MdDialog } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';

import { environment } from '../../environments/environment';
import { Cache } from '../../cache';
import { CrudPageComponent } from '../common/crud-page.component';
import { Admin } from '../../model/admin';
import { AdminService } from '../../service/admin.service';
import { AdminDetailDialogComponent } from './admin-detail-dialog.component';

@Component({
    selector: 'admin-management',
    templateUrl: '../../template/admin/admin-management.component.html'
})
export class AdminManagementComponent extends CrudPageComponent<Admin, AdminService, AdminDetailDialogComponent> {
    constructor(protected cache: Cache, protected media: ObservableMedia, private adminService: AdminService, protected snackBar: MdSnackBar, protected snackBarConfig: MdSnackBarConfig, protected dialog: MdDialog) {
        super(cache, media, adminService, snackBar, snackBarConfig, dialog);
        this.cache.title = '管理员管理';
    }

    getName(admin: Admin) {
        return admin.lastName + ' ' + admin.firstName;
    }

    getDialog() {
        return AdminDetailDialogComponent;
    }
}