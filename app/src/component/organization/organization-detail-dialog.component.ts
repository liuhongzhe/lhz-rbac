import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig, MdDialogRef } from '@angular/material';

import { environment } from '../../environments/environment';

import { Organization } from '../../model/organization';
import { OrganizationService } from '../../service/organization.service';
import { DetailDialogComponent } from '../common/detail-dialog.component';

@Component({
    selector: 'organization-detail-dialog',
    templateUrl: '../../template/organization/organization-detail-dialog.component.html'
})
export class OrganizationDetailDialogComponent extends DetailDialogComponent<Organization, OrganizationService, OrganizationDetailDialogComponent> {
    logo: string;
    logoBase64: string;

    constructor(private organizationService: OrganizationService, protected snackBar: MdSnackBar, protected snackBarConfig: MdSnackBarConfig, protected dialogRef: MdDialogRef<OrganizationDetailDialogComponent>, private fb: FormBuilder) {
        super(organizationService, snackBar, snackBarConfig, dialogRef);
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
        return this.fb.group({
            logo: [null],
            logoThumbnail: [null],
            name: [null, Validators.required],
            phone: [null],
            address: [null],
            parentId: [this.data]
        });
    }
}