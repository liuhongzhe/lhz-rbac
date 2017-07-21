import { Component } from '@angular/core';
import { ComponentType, MdSnackBar, MdSnackBarConfig, MdDialog } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';

import { environment } from '../../environments/environment';
import { Cache } from '../../cache';
import { NavCrudPageComponent } from '../common/nav-crud-page.component';
import { Organization } from '../../model/organization';
import { OrganizationService } from '../../service/organization.service';
import { Pagination } from '../../entity/pagination';
import { FindWithCount } from '../../entity/find-with-count';
import { OrganizationDetailDialogComponent } from './organization-detail-dialog.component';

@Component({
    selector: 'organization-management',
    templateUrl: '../../template/organization/organization-management.component.html'
})
export class OrganizationManagementComponent extends NavCrudPageComponent<Organization, OrganizationService, OrganizationDetailDialogComponent> {
    constructor(protected cache: Cache, protected media: ObservableMedia, private organizationService: OrganizationService, protected snackBar: MdSnackBar, protected snackBarConfig: MdSnackBarConfig, protected dialog: MdDialog) {
        super(cache, media, organizationService, snackBar, snackBarConfig, dialog);
        this.cache.title = '机构管理';
    }

    protected invokeFind(pagination?: Pagination, text?: string) {
        return new Promise<FindWithCount<Organization>>((resolve, reject) => {
            this.modelService.findByParentId(this.parentId, pagination, text).then(r => {
                resolve(r);
            }).catch(e => {
                reject(e);
            });
        });
    }

    protected getName(organization: Organization) {
        return organization.name;
    }

    protected getDialog() {
        return OrganizationDetailDialogComponent;
    }
}