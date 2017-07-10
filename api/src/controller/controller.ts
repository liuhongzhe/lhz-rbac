import * as restify from 'restify';
import * as Sequelize from 'sequelize';

import { config } from '../config';
import { RbacStorage } from '../storage/rbac.storage';
import { Pagination } from '../entity/pagination';

export abstract class Controller {
    protected rbacStorage: RbacStorage = process[config.rbacStorageKey];
    public static idName: string = 'id';
    public static searchTextName: string = 'search_text';
    public static sizeName: string = 'size';
    public static indexName: string = 'index';

    protected existsRequestParameter(req: restify.Request, name: string) {
        return req.params[name] ? true : false;
    }

    protected getRequestParameter(req: restify.Request, name: string, defaultValue: string = null) {
        let value: string = req.params[name];
        if (value && value !== '') {
            return value;
        }
        else {
            return defaultValue;
        }
    }

    protected getRequestId(req: restify.Request, defaultValue: string = null, idName: string = null) {
        return this.getRequestParameter(req, idName || Controller.idName, defaultValue);
    }

    protected getRequestSearchText(req: restify.Request, defaultValue: string = null, searchTextName: string = null): string {
        return this.getRequestParameter(req, searchTextName || Controller.searchTextName, defaultValue);
    }

    protected getRequestPagination(req: restify.Request, sizeName: string = null, indexName: string = null) {
        let pagination: Pagination = null;
        let sizeString = this.getRequestParameter(req, sizeName || Controller.sizeName);
        let indexString = this.getRequestParameter(req, indexName || Controller.indexName);
        if (indexString || sizeString) {
            pagination = {};
            if (sizeString) {
                pagination.size = Number(sizeString);
            }
            if (indexString) {
                pagination.index = Number(indexString);
            }
        }
        return pagination;
    }

    protected buildPaginationFindOptions(req: restify.Request, findOptions: Sequelize.FindOptions, sizeName: string = null, indexName: string = null) {
        let pagination = this.getRequestPagination(req);
        if (pagination) {
            if (pagination.size) {
                findOptions.limit = pagination.size;
            }
            if (pagination.index) {
                findOptions.offset = pagination.index;
            }
        }
        return findOptions;
    }
}