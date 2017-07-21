import { Injectable } from '@angular/core';
import { Http, RequestMethod } from '@angular/http';

import { ModelService } from './model-service';
import { Region } from '../model/region';
import { Pagination } from '../entity/pagination';
import { FindWithCount } from '../entity/find-with-count';

@Injectable()
export class RegionService extends ModelService<Region> {
    constructor(protected http: Http) {
        super(http, 'region');
    }

    findByParentId(parentId: string, pagination: Pagination = null, text: string = null) {
        var url = this.modelName + '/find-by-parent-id?';
        if (parentId) {
            url += 'parent_id=' + parentId;
        }
        return this.requestJson<FindWithCount<Region>>(url, RequestMethod.Get);
    }
}