import { NgModule } from '@angular/core';

import { CommonImportModule } from './common-import.module';
import { RegionRouting } from '../routing/region.routing';

import { RegionManagementComponent } from '../component/region/region-management.component';
import { RegionDetailDialogComponent } from '../component/region/region-detail-dialog.component';
import { RegionService } from '../service/region.service';

@NgModule({
    imports: [
        CommonImportModule,
        RegionRouting
    ],
    declarations: [
        RegionManagementComponent,
        RegionDetailDialogComponent
    ],
    entryComponents: [
        RegionDetailDialogComponent
    ],
    providers: [
        RegionService
    ]
})
export class RegionModule { }