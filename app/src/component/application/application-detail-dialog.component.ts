import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig, MdDialogRef } from '@angular/material';

import { environment } from '../../environments/environment';

import { Application } from '../../model/application';
import { ApplicationService } from '../../service/application.service';
import { DetailDialogComponent } from '../common/detail-dialog.component';

@Component({
    selector: 'application-detail-dialog',
    templateUrl: '../../template/application/application-detail-dialog.component.html'
})
export class ApplicationDetailDialogComponent extends DetailDialogComponent<Application, ApplicationService, ApplicationDetailDialogComponent> {
    logo: string;
    logoBase64: string;

    constructor(private applicationService: ApplicationService, protected snackBar: MdSnackBar, protected snackBarConfig: MdSnackBarConfig, protected dialogRef: MdDialogRef<ApplicationDetailDialogComponent>, private fb: FormBuilder) {
        super(applicationService, snackBar, snackBarConfig, dialogRef);
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
            logo: [''],
            logoThumbnail: [''],
            name: ['', Validators.required],
            description: ['']
        });
    }
}