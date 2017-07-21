import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig, MdDialogRef } from '@angular/material';

import { environment } from '../../environments/environment';

import { Role } from '../../model/role';
import { RoleService } from '../../service/role.service';
import { DetailDialogComponent } from '../common/detail-dialog.component';

@Component({
    selector: 'role-detail-dialog',
    templateUrl: '../../template/role/role-detail-dialog.component.html'
})
export class RoleDetailDialogComponent extends DetailDialogComponent<Role, RoleService, RoleDetailDialogComponent> {
    logo: string;
    logoBase64: string;

    constructor(private roleService: RoleService, protected snackBar: MdSnackBar, protected snackBarConfig: MdSnackBarConfig, protected dialogRef: MdDialogRef<RoleDetailDialogComponent>, private fb: FormBuilder) {
        super(roleService, snackBar, snackBarConfig, dialogRef);
    }

    protected buildForm() {
        return this.fb.group({
            name: [null, Validators.required]
        });
    }
}