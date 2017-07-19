import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../component/login.component';

const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'desktop', loadChildren: '../module/desktop.module#DesktopModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouting { }