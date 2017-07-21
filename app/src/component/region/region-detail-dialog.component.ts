import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig, MdDialogRef } from '@angular/material';

import { environment } from '../../environments/environment';

import { Region } from '../../model/region';
import { RegionService } from '../../service/region.service';
import { DetailDialogComponent } from '../common/detail-dialog.component';

@Component({
    selector: 'region-detail-dialog',
    templateUrl: '../../template/region/region-detail-dialog.component.html'
})
export class RegionDetailDialogComponent extends DetailDialogComponent<Region, RegionService, RegionDetailDialogComponent> {
    logo: string;
    logoBase64: string;

    constructor(private regionService: RegionService, protected snackBar: MdSnackBar, protected snackBarConfig: MdSnackBarConfig, protected dialogRef: MdDialogRef<RegionDetailDialogComponent>, private fb: FormBuilder) {
        super(regionService, snackBar, snackBarConfig, dialogRef);
    }

    protected buildForm() {
        return this.fb.group({
            name: [null, Validators.required],
            code: [null, Validators.required],
            parentId: [this.data]
        });
    }
}