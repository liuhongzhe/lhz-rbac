import { Component } from '@angular/core';

import { Cache } from '../cache';

@Component({
    selector: 'dashboard',
    templateUrl: '../template/dashboard.component.html'
})
export class DashboardComponent {
    constructor(cache: Cache, ) {
        cache.title = '桌面';
    }
}