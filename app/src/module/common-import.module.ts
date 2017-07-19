import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialImportModule } from './material-import.module';

import { DialogOkComponent } from '../component/common/dialog-ok.component';
import { DialogCancelComponent } from '../component/common/dialog-cancel.component';
import { ConfirmComponent } from '../component/common/confirm.component';
import { ImageUploadComponent } from '../component/common/image-upload.component';

@NgModule({
    declarations: [
        DialogOkComponent,
        DialogCancelComponent,
        ConfirmComponent,
        ImageUploadComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialImportModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialImportModule,
        DialogOkComponent,
        DialogCancelComponent,
        ConfirmComponent,
        ImageUploadComponent
    ],
    entryComponents: [
        ConfirmComponent
    ]
})
export class CommonImportModule { }