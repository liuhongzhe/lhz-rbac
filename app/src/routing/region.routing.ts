import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegionManagementComponent } from '../component/region/region-management.component';

const regionManagementRoutes: Routes = [
    { path: '', component: RegionManagementComponent }
];

@NgModule({
    imports: [RouterModule.forChild(regionManagementRoutes)],
    exports: [RouterModule]
})
export class RegionRouting { }