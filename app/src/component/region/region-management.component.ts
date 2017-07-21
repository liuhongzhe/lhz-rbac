import { Component } from '@angular/core';
import { ComponentType, MdSnackBar, MdSnackBarConfig, MdDialog } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';

import { environment } from '../../environments/environment';
import { Cache } from '../../cache';
import { NavCrudPageComponent } from '../common/nav-crud-page.component';
import { Region } from '../../model/region';
import { RegionService } from '../../service/region.service';
import { Pagination } from '../../entity/pagination';
import { FindWithCount } from '../../entity/find-with-count';
import { RegionDetailDialogComponent } from './region-detail-dialog.component';

@Component({
    selector: 'region-management',
    templateUrl: '../../template/region/region-management.component.html'
})
export class RegionManagementComponent extends NavCrudPageComponent<Region, RegionService, RegionDetailDialogComponent> {
    constructor(protected cache: Cache, protected media: ObservableMedia, private regionService: RegionService, protected snackBar: MdSnackBar, protected snackBarConfig: MdSnackBarConfig, protected dialog: MdDialog) {
        super(cache, media, regionService, snackBar, snackBarConfig, dialog);
        this.cache.title = '行政区划管理';
    }

    protected invokeFind(pagination?: Pagination, text?: string) {
        return new Promise<FindWithCount<Region>>((resolve, reject) => {
            this.modelService.findByParentId(this.parentId, pagination, text).then(r => {
                resolve(r);
            }).catch(e => {
                reject(e);
            });
        });
    }

    protected getName(region: Region) {
        return region.name + ' - ' + region.code;
    }

    protected getDialog() {
        return RegionDetailDialogComponent;
    }
}