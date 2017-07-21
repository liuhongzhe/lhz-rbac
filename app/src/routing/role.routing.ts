import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleManagementComponent } from '../component/role/role-management.component';

const roleManagementRoutes: Routes = [
    { path: '', component: RoleManagementComponent }
];

@NgModule({
    imports: [RouterModule.forChild(roleManagementRoutes)],
    exports: [RouterModule]
})
export class RoleRouting { }