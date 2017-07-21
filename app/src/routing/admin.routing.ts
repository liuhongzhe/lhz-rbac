import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminManagementComponent } from '../component/admin/admin-management.component';

const adminManagementRoutes: Routes = [
    { path: '', component: AdminManagementComponent }
];

@NgModule({
    imports: [RouterModule.forChild(adminManagementRoutes)],
    exports: [RouterModule]
})
export class AdminRouting { }