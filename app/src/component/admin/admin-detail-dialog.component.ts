import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig, MdDialogRef } from '@angular/material';

import { environment } from '../../environments/environment';

import { Admin } from '../../model/admin';
import { AdminService } from '../../service/admin.service';
import { DetailDialogComponent } from '../common/detail-dialog.component';

@Component({
    selector: 'admin-detail-dialog',
    templateUrl: '../../template/admin/admin-detail-dialog.component.html'
})
export class AdminDetailDialogComponent extends DetailDialogComponent<Admin, AdminService, AdminDetailDialogComponent> {
    logo: string;
    logoBase64: string;

    constructor(private adminService: AdminService, protected snackBar: MdSnackBar, protected snackBarConfig: MdSnackBarConfig, protected dialogRef: MdDialogRef<AdminDetailDialogComponent>, private fb: FormBuilder) {
        super(adminService, snackBar, snackBarConfig, dialogRef);
    }

    onLogoChange(base64: string) {
        if (base64) {
            this.logoBase64 = base64;
        }
        else {
            this.logo = null;
            this.logoBase64 = null;
            this.form.patchValue({
                logo: null,
                logoThumbnail: null
            });
        }
    }

    protected afterFindById(data: any) {
        return new Promise<any>((resolve) => {
            this.logo = data.logo ? (environment.serviceUrlRoot + '/' + data.logo) : null;
            resolve(data);
        });
    }

    protected beforeSubmit(data: any) {
        return new Promise<any>((resolve) => {
            data.logoBase64 = this.logoBase64;
            resolve(data);
        });
    }

    protected buildForm() {
        let fcs = {
            logo: [null],
            logoThumbnail: [null],
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            username: [null, Validators.required],
            phone: [null],
            email: [null]
        };
        if (!this.id) {
            fcs['password'] = [null, Validators.required];
        }
        return this.fb.group(fcs);
    }
}