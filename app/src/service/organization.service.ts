import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';

import { ModelService } from './model-service';
import { Organization } from '../model/organization';
import { Pagination } from '../entity/pagination';
import { FindWithCount } from '../entity/find-with-count';

@Injectable()
export class OrganizationService extends ModelService<Organization> {
    constructor(protected http: Http) {
        super(http, 'organization');
    }

    findByParentId(parentId: string, pagination: Pagination = null, text: string = null) {
        var url = this.modelName + '/find-by-parent-id?';
        if (parentId) {
            url += 'parent_id=' + parentId;
        }
        return this.requestJson<FindWithCount<Organization>>(url, RequestMethod.Get);
    }
}