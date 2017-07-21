import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BlockUIModule } from 'ng-block-ui';

import { MaterialImportModule } from './material-import.module';

import { DialogOkComponent } from '../component/common/dialog-ok.component';
import { DialogCancelComponent } from '../component/common/dialog-cancel.component';
import { ConfirmComponent } from '../component/common/confirm.component';
import { ImageUploadComponent } from '../component/common/image-upload.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        BlockUIModule,
        MaterialImportModule
    ],
    declarations: [
        DialogOkComponent,
        DialogCancelComponent,
        ConfirmComponent,
        ImageUploadComponent
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        BlockUIModule,
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