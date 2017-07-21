import { Component } from '@angular/core';
import { ComponentType, MdSnackBar, MdSnackBarConfig, MdDialog } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';

import { environment } from '../../environments/environment';
import { Cache } from '../../cache';
import { CrudPageComponent } from '../common/crud-page.component';
import { Role } from '../../model/role';
import { RoleService } from '../../service/role.service';
import { RoleDetailDialogComponent } from './role-detail-dialog.component';

@Component({
    selector: 'role-management',
    templateUrl: '../../template/role/role-management.component.html'
})
export class RoleManagementComponent extends CrudPageComponent<Role, RoleService, RoleDetailDialogComponent> {
    constructor(protected cache: Cache, protected media: ObservableMedia, private roleService: RoleService, protected snackBar: MdSnackBar, protected snackBarConfig: MdSnackBarConfig, protected dialog: MdDialog) {
        super(cache, media, roleService, snackBar, snackBarConfig, dialog);
        this.cache.title = '角色划理';
    }

    getName(role: Role) {
        return role.name;
    }

    getDialog() {
        return RoleDetailDialogComponent;
    }
}