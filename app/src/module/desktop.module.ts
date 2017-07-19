import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialImportModule } from './material-import.module';
import { DesktopRouting } from '../routing/desktop.routing';

import { DesktopComponent } from '../component/desktop.component';
import { MenuService } from '../service/menu.service';

@NgModule({
    declarations: [
        DesktopComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MaterialImportModule,
        DesktopRouting
    ],
    providers: [
        MenuService
    ]
})
export class DesktopModule { }