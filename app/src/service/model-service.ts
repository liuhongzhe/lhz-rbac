import { Http, RequestMethod } from '@angular/http';

import { HttpService } from './http-service';
import { Model } from '../model/model';
import { Pagination } from '../entity/pagination';
import { FindWithCount } from '../entity/find-with-count';

export abstract class ModelService<T extends Model> extends HttpService {
    constructor(protected http: Http, protected modelName: string) {
        super(http);
    }

    find(pagination: Pagination = null, text: string = null) {
        var url = this.modelName + '?' + this.buildPaginationQueryString(pagination) + this.buildSearchTextQueryString(text);
        return this.requestJson<FindWithCount<T>>(url, RequestMethod.Get);
    }

    create(data: any): Promise<string> {
        var url = this.modelName;
        return this.requestText(url, RequestMethod.Post, data);
    }

    update(id: string, data: any) {
        var url = this.modelName + '/' + id;
        return this.requestJson<void>(url, RequestMethod.Put, data);
    }

    destroyById(id: string) {
        var url = this.modelName + '/' + id;
        return this.requestJson<void>(url, RequestMethod.Delete);
    }

    findById(id: string) {
        var url = this.modelName + '/' + id;
        return this.requestJson<T>(url, RequestMethod.Get);
    }
}