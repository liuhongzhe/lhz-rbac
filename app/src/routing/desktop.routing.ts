import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesktopComponent } from '../component/desktop.component';

const desktopRoutes: Routes = [
    {
        path: '',
        component: DesktopComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: '../module/dashboard.module#DashboardModule' },
            { path: 'application-management', loadChildren: '../module/application.module#ApplicationModule' },
            { path: 'region-management', loadChildren: '../module/region.module#RegionModule' },
            { path: 'organization-management', loadChildren: '../module/organization.module#OrganizationModule' },
            { path: 'user-management', loadChildren: '../module/user.module#UserModule' },
            { path: 'role-management', loadChildren: '../module/role.module#RoleModule' },
            { path: 'admin-management', loadChildren: '../module/admin.module#AdminModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(desktopRoutes)],
    exports: [RouterModule]
})
export class DesktopRouting { }