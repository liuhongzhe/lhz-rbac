import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManagementComponent } from '../component/user/user-management.component';

const userManagementRoutes: Routes = [
    { path: '', component: UserManagementComponent }
];

@NgModule({
    imports: [RouterModule.forChild(userManagementRoutes)],
    exports: [RouterModule]
})
export class UserRouting { }