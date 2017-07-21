import { NgModule } from '@angular/core';

import { CommonImportModule } from './common-import.module';
import { DesktopRouting } from '../routing/desktop.routing';

import { DesktopComponent } from '../component/desktop.component';
import { MenuService } from '../service/menu.service';

@NgModule({
    imports: [
        CommonImportModule,
        DesktopRouting
    ],
    declarations: [
        DesktopComponent
    ],
    providers: [
        MenuService
    ]
})
export class DesktopModule { }