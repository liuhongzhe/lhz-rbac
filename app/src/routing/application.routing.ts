import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationManagementComponent } from '../component/application/application-management.component';

const applicationManagementRoutes: Routes = [
    { path: '', component: ApplicationManagementComponent }
];

@NgModule({
    imports: [RouterModule.forChild(applicationManagementRoutes)],
    exports: [RouterModule]
})
export class ApplicationRouting { }