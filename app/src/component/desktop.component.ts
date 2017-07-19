import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

import { MenuService } from '../service/menu.service';
import { Menu } from '../model/menu';
import { Cache } from '../cache';


@Component({
    selector: 'desktop',
    templateUrl: '../template/desktop.component.html'
})
export class DesktopComponent implements OnInit {
    @ViewChild('sidenav') private sidenav: MdSidenav;
    sidenavMode: string;
    sidenavIsOpen: boolean;
    sidenavIsShowText: boolean;
    queryIsOpened: boolean;
    searchText: string;
    get cache() {
        return Cache;
    }

    menus: Menu[];

    constructor(private router: Router, private media: ObservableMedia, private menuService: MenuService) {
        media.subscribe((change: MediaChange) => {
            this.setSidenavState();
        });
        this.setSidenavState();
    }

    ngOnInit() {
        this.menuService.find().then(r => {
            this.menus = r.rows;
        });
    }

    sidenavToggle() {
        this.sidenav.toggle();
    }

    private setSidenavState() {
        this.sidenavMode = this.media.isActive('xs') ? null : 'side';
        this.sidenavIsOpen = this.sidenavMode !== null;
        this.sidenavIsShowText = !(this.media.isActive('sm') || this.media.isActive('md'));
    }

    logout() {
        Cache.loginUser = null;
        this.router.navigate(['']);
    }
}