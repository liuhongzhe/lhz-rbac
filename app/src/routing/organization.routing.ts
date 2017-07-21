import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationManagementComponent } from '../component/organization/organization-management.component';

const organizationManagementRoutes: Routes = [
    { path: '', component: OrganizationManagementComponent }
];

@NgModule({
    imports: [RouterModule.forChild(organizationManagementRoutes)],
    exports: [RouterModule]
})
export class OrganizationRouting { }